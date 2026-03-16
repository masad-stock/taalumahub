import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Button, Card } from '@/src/components/ui';
import { SERVICES, SERVICE_ICONS } from '@/src/data/services';
import { TESTIMONIALS, HERO_IMAGES } from '@/src/data/content';
import { CheckCircle, Star, ChevronRight, Target, BarChart2, GraduationCap } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onNavigate: (path: string) => void;
  loginError: string | null;
}

export function LandingPage({ onStart, onNavigate, loginError }: LandingPageProps) {
  const teaserServices = SERVICES.slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }} 
      className="space-y-20 py-12"
    >
      {/* Hero */}
      <div className="text-center space-y-8">
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.1]">
          Shaping Tomorrow's <br /> <span className="text-indigo-600">Professionals</span>
        </h1>
        <p className="text-xl text-zinc-500 max-w-2xl mx-auto">TaalumaHub helps you discover your true potential through data-driven career assessments and personalized roadmaps.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={onStart} className="px-8 py-4 text-lg">Start Free Assessment</Button>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <CheckCircle className="w-4 h-4 text-indigo-500" /><span>No credit card required</span>
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

      {/* Hero images */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {HERO_IMAGES.map((img, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -10 }} 
            className={cn('aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl', img.mt)}
          >
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 text-center">
        {[['5,000+', 'Assessments Completed'], ['94%', 'User Satisfaction'], ['120+', 'Career Paths']].map(([n, l]) => (
          <div key={l} className="space-y-1">
            <div className="text-4xl font-bold text-indigo-600">{n}</div>
            <div className="text-sm text-zinc-500">{l}</div>
          </div>
        ))}
      </div>

      {/* Services teaser */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Everything You Need to Launch Your Career</h2>
          <p className="text-zinc-500">From assessment to action plan — we've got you covered.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {teaserServices.map((s, i) => {
            const Icon = SERVICE_ICONS[s.icon];
            return (
              <Card key={i} className="p-6 space-y-3">
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', s.bg)}>
                  <Icon className="w-6 h-6 text-current" />
                </div>
                <h3 className="font-bold text-lg">{s.title}</h3>
                <p className="text-sm text-zinc-500">{s.desc}</p>
              </Card>
            );
          })}
        </div>
        <div className="text-center">
          <Button variant="outline" onClick={() => onNavigate('/services')}>View All Services <ChevronRight className="w-4 h-4" /></Button>
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-center">What Our Users Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Card key={i} className="p-6 space-y-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-zinc-600 text-sm leading-relaxed italic">"{t.quote}"</p>
              <div>
                <div className="font-bold text-sm">{t.name}</div>
                <div className="text-xs text-zinc-400">{t.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-indigo-600 rounded-3xl p-12 text-center space-y-6">
        <h2 className="text-4xl font-bold text-white">Your Career Journey Starts Today</h2>
        <p className="text-indigo-200 max-w-xl mx-auto">Join thousands of professionals who found their path with TaalumaHub. It takes less than 10 minutes.</p>
        <Button onClick={onStart} className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-3 text-lg">Start Free Assessment</Button>
      </div>
    </motion.div>
  );
}
