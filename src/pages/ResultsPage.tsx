import { motion } from 'motion/react';
import { Button, Card } from '@/src/components/ui';
import { ASSESSMENT_PRICE } from '@/src/data/questions';
import { Assessment, AssessmentResult } from '@/src/types';
import { Lock, CreditCard, Loader2, CheckCircle, Award, BookOpen } from 'lucide-react';

interface ResultsPageProps {
  activeAssessment: Assessment | null;
  isPaying: boolean;
  phoneNumber: string;
  paymentStatus: 'idle' | 'pending' | 'success' | 'failed';
  onPhoneChange: (phone: string) => void;
  onPay: () => void;
  onBackToDashboard: () => void;
}

export function ResultsPage({ 
  activeAssessment, 
  isPaying, 
  phoneNumber, 
  paymentStatus, 
  onPhoneChange, 
  onPay, 
  onBackToDashboard 
}: ResultsPageProps) {
  if (!activeAssessment) return null;

  const { unlocked, computedResult } = activeAssessment;
  const { topCareers, summary, strengths, suggestedCourses } = computedResult;

  const unlockFeatures = [
    'Detailed Career Rationale',
    'Curated Learning Paths',
    'Industry Salary Insights',
    'Lifetime Access'
  ];

  if (!unlocked) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="space-y-8"
      >
        <div className="max-w-2xl mx-auto space-y-8 py-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-4xl font-bold">Unlock Your Full Report</h2>
            <p className="text-zinc-500 text-lg">
              We've analyzed your answers! Pay a one-time fee of <b>KES {ASSESSMENT_PRICE}</b> to unlock your personalized career roadmap and learning paths.
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
                  onChange={(e) => onPhoneChange(e.target.value)} 
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
              onClick={onPay} 
              disabled={isPaying || phoneNumber.length < 10}
            >
              {isPaying ? (
                <><Loader2 className="w-5 h-5 animate-spin" />Checking phone...</>
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
            {unlockFeatures.map(f => (
              <div key={f} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-zinc-100">
                <CheckCircle className="w-5 h-5 text-indigo-500" />
                <span className="text-sm font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-12 py-8"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold">Your Career Roadmap</h2>
        <p className="text-zinc-500 max-w-2xl mx-auto">{summary}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {topCareers.map((career, idx) => (
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
            <Award className="w-6 h-6 text-indigo-600" />Key Strengths
          </h3>
          <div className="flex flex-wrap gap-2">
            {strengths.map(s => (
              <span key={s} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-medium border border-indigo-100">
                {s}
              </span>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />Suggested Courses
          </h3>
          <div className="space-y-3">
            {suggestedCourses.map(c => (
              <div key={c} className="flex items-center gap-3 p-4 bg-white border border-zinc-100 rounded-xl">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="font-medium">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center pt-12">
        <Button variant="outline" onClick={onBackToDashboard}>Back to Dashboard</Button>
      </div>
    </motion.div>
  );
}
