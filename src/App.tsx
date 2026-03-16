import { useEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { useAuth } from "./hooks/useAuth";
import { useAssessment } from "./hooks/useAssessment";
import { ErrorBoundary } from "./components/ErrorBoundary";
import {
  LandingPage,
  ServicesPage,
  AboutPage,
  ContactPage,
  DashboardPage,
  QuizPage,
  ResultsPage,
  BlogPage,
  CareerGuidePage,
  SuccessStoriesPage,
  PartnersPage,
  PrivacyPolicyPage,
  TermsOfServicePage,
  CookiePolicyPage,
} from "./pages";
import { Button } from "./components/ui";
import {
  Loader2,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  ChevronDown,
  LayoutDashboard,
  Target,
} from "lucide-react";
import { cn } from "./lib/utils";
import { Assessment } from "./types";
import "./index.css";

function Header({
  user,
  onLogin,
  onLogout,
  isPublic,
}: {
  user: ReturnType<typeof useAuth>["user"];
  onLogin: () => void;
  onLogout: () => void;
  isPublic: boolean;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: "Services", path: "/services" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-zinc-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer group"
              onClick={() => navigate(user ? "/dashboard" : "/")}
            >
              <img
                src="/logo.png"
                alt="TaalumaHub"
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Desktop Navigation */}
            {!user && isPublic && (
              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className={cn(
                      "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive(link.path)
                        ? "text-indigo-600"
                        : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80",
                    )}
                  >
                    {link.label}
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-indigo-50 rounded-lg -z-10"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </button>
                ))}
              </nav>
            )}

            {/* User Navigation */}
            {user && (
              <nav className="hidden lg:flex items-center gap-1">
                <button
                  onClick={() => navigate("/dashboard")}
                  className={cn(
                    "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive("/dashboard")
                      ? "text-indigo-600"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80",
                  )}
                >
                  Dashboard
                  {isActive("/dashboard") && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-indigo-50 rounded-lg -z-10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </button>
                <button
                  onClick={() => navigate("/quiz")}
                  className={cn(
                    "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive("/quiz")
                      ? "text-indigo-600"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80",
                  )}
                >
                  Take Assessment
                  {isActive("/quiz") && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-indigo-50 rounded-lg -z-10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </button>
              </nav>
            )}

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {user ? (
                <div className="flex items-center gap-2" ref={userMenuRef}>
                  {/* User Menu */}
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-100 transition-colors"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-zinc-200"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-indigo-600" />
                      </div>
                    )}
                    <span className="hidden sm:block text-sm font-medium text-zinc-700 max-w-[150px] truncate">
                      {user.displayName || user.email}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-zinc-400 transition-transform duration-200 hidden sm:block",
                        userMenuOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-4 sm:right-8 top-16 lg:top-20 w-56 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden z-50"
                      >
                        <div className="p-3 border-b border-zinc-100">
                          <p className="text-sm font-medium text-zinc-900 truncate">
                            {user.displayName || "User"}
                          </p>
                          <p className="text-xs text-zinc-500 truncate">
                            {user.email}
                          </p>
                        </div>
                        <div className="p-2">
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              navigate("/dashboard");
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-700 hover:bg-zinc-100 transition-colors text-left"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </button>
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              navigate("/quiz");
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-700 hover:bg-zinc-100 transition-colors text-left"
                          >
                            <Target className="w-4 h-4" />
                            New Assessment
                          </button>
                        </div>
                        <div className="p-2 border-t border-zinc-100">
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              onLogout();
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  {/* CTA Buttons */}
                  <div className="hidden md:flex items-center gap-3">
                    <Button
                      variant="ghost"
                      onClick={onLogin}
                      className="text-zinc-600 hover:text-zinc-900"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={onLogin}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-300"
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>

                  {/* Mobile Menu Button */}
                  <button
                    className="lg:hidden p-2.5 rounded-xl hover:bg-zinc-100 transition-colors"
                    onClick={() => setMobileMenuOpen((o) => !o)}
                    aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  >
                    <div className="w-5 h-5 relative">
                      <motion.span
                        animate={{
                          rotate: mobileMenuOpen ? 45 : 0,
                          y: mobileMenuOpen ? 8 : 0,
                        }}
                        className="absolute top-1 left-0 w-5 h-0.5 bg-zinc-700 rounded-full"
                      />
                      <motion.span
                        animate={{
                          opacity: mobileMenuOpen ? 0 : 1,
                          x: mobileMenuOpen ? -10 : 0,
                        }}
                        className="absolute top-2 left-0 w-5 h-0.5 bg-zinc-700 rounded-full"
                      />
                      <motion.span
                        animate={{
                          rotate: mobileMenuOpen ? -45 : 0,
                          y: mobileMenuOpen ? -8 : 0,
                        }}
                        className="absolute top-3 left-0 w-5 h-0.5 bg-zinc-700 rounded-full"
                      />
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && !user && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-zinc-900/20 backdrop-blur-sm z-40 lg:hidden"
              />
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="lg:hidden border-t border-zinc-200 bg-white overflow-hidden relative z-50"
              >
                <div className="px-4 py-6 space-y-4">
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link, index) => (
                      <motion.button
                        key={link.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => {
                          navigate(link.path);
                          setMobileMenuOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-3.5 rounded-xl text-base font-medium transition-all",
                          isActive(link.path)
                            ? "text-indigo-600 bg-indigo-50"
                            : "text-zinc-600 hover:bg-zinc-50",
                        )}
                      >
                        {link.label}
                      </motion.button>
                    ))}
                  </nav>

                  <div className="pt-4 border-t border-zinc-200 space-y-3">
                    <Button
                      variant="outline"
                      onClick={onLogin}
                      className="w-full py-3 text-base"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={onLogin}
                      className="w-full py-3 text-base bg-indigo-600 hover:bg-indigo-700"
                    >
                      Get Started Free
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const footerLinks = {
    company: [
      { label: "About Us", path: "/about" },
      { label: "Services", path: "/services" },
      { label: "Contact", path: "/contact" },
      { label: "Partners", path: "/partners" },
    ],
    resources: [
      { label: "Blog", path: "/blog" },
      { label: "Career Guide", path: "/career-guide" },
      { label: "Success Stories", path: "/success-stories" },
    ],
    legal: [
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms of Service", path: "/terms" },
      { label: "Cookie Policy", path: "/cookies" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-zinc-900 text-zinc-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="TaalumaHub"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              Empowering young Africans to make confident, informed career
              decisions through data-driven insights and personalized guidance.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-indigo-600 hover:text-white transition-all duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() =>
                      link.path.startsWith("/")
                        ? navigate(link.path)
                        : undefined
                    }
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="text-sm text-zinc-400">
              Get career tips and insights delivered to your inbox.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Thanks for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-500 text-center sm:text-left">
              © 2026 TaalumaHub. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+254 729 341788</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, loginError, login, logout } = useAuth();
  const {
    answers,
    currentQuestionIndex,
    activeAssessment,
    isPaying,
    phoneNumber,
    paymentStatus,
    setPhoneNumber,
    handleAnswer,
    nextQuestion,
    prevQuestion,
    submitQuiz,
    initiatePayment,
    resetAssessment,
    setActiveAssessment,
  } = useAssessment();

  // Listen for payment updates
  useEffect(() => {
    if (!user || !activeAssessment?.id) return;
    const unsub = onSnapshot(
      doc(db, "assessments", activeAssessment.id),
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setActiveAssessment({ ...(data as Assessment), id: snap.id });
        }
      },
    );
    return unsub;
  }, [user, activeAssessment?.id, setActiveAssessment]);

  const isPublicPage = ["/", "/services", "/about", "/contact"].includes(
    location.pathname,
  );

  const handleStartAssessment = async () => {
    if (user) {
      resetAssessment();
      navigate("/quiz");
    } else {
      await login();
    }
  };

  const handleQuizSubmit = async () => {
    if (!user) return;
    await submitQuiz(user);
    navigate("/results");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-emerald-100"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <Header
        user={user}
        onLogin={login}
        onLogout={logout}
        isPublic={isPublicPage}
      />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <div key={location.pathname}>
            <Routes location={location}>
              <Route
                path="/"
                element={
                  <LandingPage
                    onStart={handleStartAssessment}
                    onNavigate={navigate}
                    loginError={loginError}
                  />
                }
              />
              <Route
                path="/services"
                element={<ServicesPage onStart={handleStartAssessment} />}
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              <Route
                path="/dashboard"
                element={
                  user ? (
                    <DashboardPage onNewAssessment={handleStartAssessment} />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />

              <Route
                path="/quiz"
                element={
                  user ? (
                    <QuizPage
                      currentQuestionIndex={currentQuestionIndex}
                      answers={answers}
                      onAnswer={handleAnswer}
                      onNext={nextQuestion}
                      onPrev={prevQuestion}
                      onSubmit={handleQuizSubmit}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />

              <Route
                path="/results"
                element={
                  user && activeAssessment ? (
                    <ResultsPage
                      activeAssessment={activeAssessment}
                      isPaying={isPaying}
                      phoneNumber={phoneNumber}
                      paymentStatus={paymentStatus}
                      onPhoneChange={setPhoneNumber}
                      onPay={() => user && initiatePayment(user)}
                      onBackToDashboard={() => navigate("/dashboard")}
                    />
                  ) : (
                    <Navigate to="/dashboard" replace />
                  )
                }
              />

              <Route path="/blog" element={<BlogPage />} />
              <Route path="/career-guide" element={<CareerGuidePage />} />
              <Route path="/success-stories" element={<SuccessStoriesPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/cookies" element={<CookiePolicyPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
