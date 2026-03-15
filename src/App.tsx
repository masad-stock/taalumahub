import React, { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  User
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  onSnapshot,
  orderBy,
  limit,
  updateDoc
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { QUESTIONS, ASSESSMENT_PRICE } from './constants';
import { Assessment, AssessmentResult, Payment, UserProfile } from './types';
import { 
  Briefcase, 
  ChevronRight, 
  ChevronLeft, 
  LogOut, 
  User as UserIcon, 
  CheckCircle, 
  Lock, 
  CreditCard,
  Loader2,
  TrendingUp,
  Award,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Components ---

const Button = ({ className, variant = 'primary', ...props }: any) => {
  const variants: any = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200',
    outline: 'border border-zinc-200 text-zinc-600 hover:bg-zinc-50',
    ghost: 'text-zinc-600 hover:bg-zinc-100'
  };
  return (
    <button 
      className={cn(
        'px-4 py-2 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2',
        variants[variant],
        className
      )} 
      {...props} 
    />
  );
};

const Card = ({ children, className }: any) => (
  <div className={cn('bg-white border border-zinc-100 rounded-2xl shadow-sm overflow-hidden', className)}>
    {children}
  </div>
);

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'landing' | 'quiz' | 'dashboard' | 'results'>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [activeAssessment, setActiveAssessment] = useState<Assessment | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'failed'>('idle');

  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        setLoginError(null);
        // Sync user profile
        const userRef = doc(db, 'users', u.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: u.uid,
            email: u.email,
            displayName: u.displayName,
            role: 'user',
            createdAt: new Date().toISOString()
          });
        }
        setView('dashboard');
      } else {
        setView('landing');
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Listen for assessment updates (e.g. when unlocked)
  useEffect(() => {
    if (!user || !activeAssessment?.id) return;
    const unsub = onSnapshot(doc(db, 'assessments', activeAssessment.id), (doc) => {
      if (doc.exists()) {
        const data = doc.data() as Assessment;
        setActiveAssessment({ ...data, id: doc.id });
        if (data.unlocked) {
          setPaymentStatus('success');
          setIsPaying(false);
        }
      }
    });
    return unsub;
  }, [user, activeAssessment?.id]);

  const handleLogin = async () => {
    setLoginError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error('Login failed', error);
      if (error.code === 'auth/popup-closed-by-user') {
        setLoginError('The login popup was closed. Please ensure popups are allowed and try again.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        // Ignore this one as it usually means another popup was opened
      } else {
        setLoginError('An error occurred during login. Please try again.');
      }
    }
  };

  const handleLogout = () => signOut(auth);

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const computeResult = (ans: Record<string, any>): AssessmentResult => {
    // Simple logic for demo
    const values = Object.values(ans).flat();
    const topCareers = [];
    
    if (values.includes('Designing apps or websites') || values.includes('Fine Arts and Design')) {
      topCareers.push({ title: 'Product Designer', rationale: 'Your interest in design and technology makes you a great fit for digital product creation.' });
    }
    if (values.includes('Analyzing complex data sets') || values.includes('Mathematics and Computer Science')) {
      topCareers.push({ title: 'Data Scientist', rationale: 'Your logical thinking and mathematical background are perfect for data-driven roles.' });
    }
    if (values.includes('Helping people solve personal problems') || values.includes('Biology and Health Sciences')) {
      topCareers.push({ title: 'Healthcare Professional', rationale: 'Your desire to help others combined with scientific interest points to medical or counseling paths.' });
    }
    if (values.includes('Building or fixing physical equipment') || values.includes('Physical objects and tools')) {
      topCareers.push({ title: 'Mechanical Engineer', rationale: 'Your hands-on approach and interest in tools suggest a strong future in engineering.' });
    }

    if (topCareers.length === 0) {
      topCareers.push({ title: 'Business Operations', rationale: 'Your versatile skills are highly valued in structured corporate environments.' });
    }

    return {
      topCareers: topCareers.slice(0, 3),
      summary: 'You have a balanced profile with strong potential in technical and creative fields.',
      strengths: ['Analytical Thinking', 'Problem Solving', 'Adaptability'],
      suggestedCourses: ['Intro to UX Design', 'Python for Data Science', 'Project Management Basics']
    };
  };

  const submitQuiz = async () => {
    if (!user) return;
    setLoading(true);
    const result = computeResult(answers);
    const assessmentData: Assessment = {
      userId: user.uid,
      answers: Object.entries(answers).map(([id, val]) => ({ questionId: id, value: val })),
      computedResult: result,
      unlocked: false,
      priceAtPurchase: ASSESSMENT_PRICE,
      createdAt: new Date().toISOString()
    };
    
    try {
      const docRef = await addDoc(collection(db, 'assessments'), assessmentData);
      setActiveAssessment({ ...assessmentData, id: docRef.id });
      setView('results');
    } catch (error) {
      console.error('Failed to save assessment', error);
    } finally {
      setLoading(false);
    }
  };

  const initiatePayment = async () => {
    if (!activeAssessment?.id || !phoneNumber) return;
    setIsPaying(true);
    setPaymentStatus('pending');

    try {
      const response = await fetch('/api/mpesa/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: phoneNumber.replace('+', ''),
          amount: ASSESSMENT_PRICE,
          assessmentId: activeAssessment.id,
          userId: user?.uid
        })
      });

      const data = await response.json();
      if (data.ResponseCode === '0') {
        const isDemo = data.MerchantRequestID?.startsWith('DEMO');

        // Create payment record
        await addDoc(collection(db, 'payments'), {
          userId: user?.uid,
          assessmentId: activeAssessment.id,
          amount: ASSESSMENT_PRICE,
          status: isDemo ? 'paid' : 'pending',
          merchantRequestId: data.MerchantRequestID,
          checkoutRequestId: data.CheckoutRequestID,
          createdAt: new Date().toISOString()
        });

        // Demo mode: unlock immediately without waiting for real M-Pesa callback
        if (isDemo) {
          await updateDoc(doc(db, 'assessments', activeAssessment.id), { unlocked: true });
        }
      } else {
        setPaymentStatus('failed');
        setIsPaying(false);
      }
    } catch (error) {
      console.error('Payment initiation failed', error);
      setPaymentStatus('failed');
      setIsPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-emerald-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setView(user ? 'dashboard' : 'landing')}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">TaalumaHub</span>
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-zinc-500">
                <UserIcon className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <Button variant="ghost" onClick={handleLogout} className="p-2">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <Button onClick={handleLogin}>Get Started</Button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <motion.div 
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-16 py-12"
            >
              <div className="text-center space-y-8">
                <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.1]">
                  Shaping Tomorrow’s <br /> <span className="text-indigo-600">Professionals</span>
                </h1>
                <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
                  TaalumaHub helps you discover your true potential through data-driven career assessments and personalized roadmaps.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button onClick={handleLogin} className="px-8 py-4 text-lg bg-indigo-600 hover:bg-indigo-700">
                    Start Free Assessment
                  </Button>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <CheckCircle className="w-4 h-4 text-indigo-500" />
                    <span>No credit card required</span>
                  </div>
                </div>

                {loginError && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm max-w-md mx-auto"
                  >
                    {loginError}
                  </motion.div>
                )}
              </div>

              {/* Hero Images Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80" 
                    alt="Professional Woman" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl sm:mt-12"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80" 
                    alt="Team Collaboration" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" 
                    alt="Young Professional" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}

          {view === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Welcome back</h2>
                <Button onClick={() => setView('quiz')}>New Assessment</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-lg">Growth Potential</h3>
                  <p className="text-sm text-zinc-500">Track how your skills align with emerging market trends.</p>
                </Card>
                <Card className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg">Certifications</h3>
                  <p className="text-sm text-zinc-500">Discover top-rated courses to boost your employability.</p>
                </Card>
                <Card className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-lg">Learning Paths</h3>
                  <p className="text-sm text-zinc-500">Step-by-step guides to transition into your dream role.</p>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">Recent Assessments</h3>
                <Card className="p-8 text-center space-y-4 border-dashed bg-zinc-50/50">
                  <p className="text-zinc-500">You haven't completed any assessments yet.</p>
                  <Button variant="outline" onClick={() => setView('quiz')}>Take your first quiz</Button>
                </Card>
              </div>
            </motion.div>
          )}

          {view === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium text-zinc-400">
                  <span>Question {currentQuestionIndex + 1} of {QUESTIONS.length}</span>
                  <span>{Math.round(((currentQuestionIndex + 1) / QUESTIONS.length) * 100)}% Complete</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                    className="h-full bg-indigo-600"
                  />
                </div>
              </div>

              <Card className="p-8 space-y-6">
                <h3 className="text-2xl font-bold leading-tight">
                  {QUESTIONS[currentQuestionIndex].text}
                </h3>

                <div className="space-y-3">
                  {QUESTIONS[currentQuestionIndex].options.map((option) => {
                    const isSelected = QUESTIONS[currentQuestionIndex].type === 'single' 
                      ? answers[QUESTIONS[currentQuestionIndex].id] === option
                      : (answers[QUESTIONS[currentQuestionIndex].id] || []).includes(option);

                    return (
                      <button
                        key={option}
                        onClick={() => {
                          if (QUESTIONS[currentQuestionIndex].type === 'single') {
                            handleAnswer(QUESTIONS[currentQuestionIndex].id, option);
                          } else {
                            const current = answers[QUESTIONS[currentQuestionIndex].id] || [];
                            const next = current.includes(option)
                              ? current.filter((o: string) => o !== option)
                              : [...current, option];
                            handleAnswer(QUESTIONS[currentQuestionIndex].id, next);
                          }
                        }}
                        className={cn(
                          'w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group',
                          isSelected 
                            ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900' 
                            : 'border-zinc-100 hover:border-zinc-200 text-zinc-600'
                        )}
                      >
                        <span className="font-medium">{option}</span>
                        <div className={cn(
                          'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                          isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-zinc-200 group-hover:border-zinc-300'
                        )}>
                          {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Card>

              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentQuestionIndex(i => Math.max(0, i - 1))}
                  disabled={currentQuestionIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </Button>
                
                {currentQuestionIndex === QUESTIONS.length - 1 ? (
                  <Button 
                    onClick={submitQuiz}
                    disabled={!answers[QUESTIONS[currentQuestionIndex].id]}
                  >
                    Finish & See Results
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setCurrentQuestionIndex(i => i + 1)}
                    disabled={!answers[QUESTIONS[currentQuestionIndex].id]}
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {view === 'results' && activeAssessment && (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {!activeAssessment.unlocked ? (
                <div className="max-w-2xl mx-auto space-y-8 py-12">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                      <Lock className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h2 className="text-4xl font-bold">Unlock Your Full Report</h2>
                    <p className="text-zinc-500 text-lg">
                      We've analyzed your answers! Pay a one-time fee of <b>KES {ASSESSMENT_PRICE}</b> to unlock your 
                      personalized career roadmap and learning paths.
                    </p>
                  </div>

                  <Card className="p-8 space-y-6">
                    <div className="space-y-4">
                      <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">M-Pesa Phone Number</label>
                      <div className="relative">
                        <input 
                          type="tel" 
                          placeholder="254700000000"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-lg font-mono"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          <CreditCard className="w-6 h-6 text-zinc-300" />
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400">Enter your number in the format 2547XXXXXXXX</p>
                    </div>

                    <Button 
                      className="w-full py-4 text-lg" 
                      onClick={initiatePayment}
                      disabled={isPaying || phoneNumber.length < 10}
                    >
                      {isPaying ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Checking phone...
                        </>
                      ) : (
                        `Pay KES ${ASSESSMENT_PRICE} via M-Pesa`
                      )}
                    </Button>

                    {paymentStatus === 'pending' && (
                      <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-700 text-sm flex gap-3">
                        <Loader2 className="w-5 h-5 animate-spin shrink-0" />
                        <p>Please check your phone for the M-Pesa STK push and enter your PIN. This page will update automatically.</p>
                      </div>
                    )}

                    {paymentStatus === 'failed' && (
                      <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
                        Payment failed or timed out. Please try again.
                      </div>
                    )}
                  </Card>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-zinc-100">
                      <CheckCircle className="w-5 h-5 text-indigo-500" />
                      <span className="text-sm font-medium">Detailed Career Rationale</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-zinc-100">
                      <CheckCircle className="w-5 h-5 text-indigo-500" />
                      <span className="text-sm font-medium">Curated Learning Paths</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-zinc-100">
                      <CheckCircle className="w-5 h-5 text-indigo-500" />
                      <span className="text-sm font-medium">Industry Salary Insights</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-zinc-100">
                      <CheckCircle className="w-5 h-5 text-indigo-500" />
                      <span className="text-sm font-medium">Lifetime Access</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-12 py-8">
                  <div className="text-center space-y-4">
                    <h2 className="text-4xl font-bold">Your Career Roadmap</h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto">{activeAssessment.computedResult.summary}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {activeAssessment.computedResult.topCareers.map((career, idx) => (
                      <Card key={idx} className="p-8 space-y-4 border-t-4 border-t-indigo-600">
                        <div className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Recommendation #{idx + 1}</div>
                        <h3 className="text-2xl font-bold">{career.title}</h3>
                        <p className="text-zinc-600 leading-relaxed">{career.rationale}</p>
                      </Card>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold flex items-center gap-2">
                        <Award className="w-6 h-6 text-indigo-600" />
                        Key Strengths
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {activeAssessment.computedResult.strengths.map(s => (
                          <span key={s} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-medium border border-indigo-100">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                        Suggested Courses
                      </h3>
                      <div className="space-y-3">
                        {activeAssessment.computedResult.suggestedCourses.map(c => (
                          <div key={c} className="flex items-center gap-3 p-4 bg-white border border-zinc-100 rounded-xl">
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            <span className="font-medium">{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-12">
                    <Button variant="outline" onClick={() => setView('dashboard')}>Back to Dashboard</Button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-100 py-12 mt-20">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
          <p className="text-zinc-400 text-sm">© 2026 TaalumaHub. Empowering your professional journey.</p>
          <div className="flex justify-center gap-6 text-sm text-zinc-400">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
