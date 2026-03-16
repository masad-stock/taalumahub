import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Button, Card } from '@/src/components/ui';
import { SERVICES, SERVICE_ICONS } from '@/src/data/services';
import { ArrowRight } from 'lucide-react';

interface ServicesPageProps {
  onStart: () => void;
}

export function ServicesPage({ onStart }: ServicesPageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }} 
      className="space-y-20 py-12"
    >
      <div className="text-center space-y-4">
        <span className="text-indigo-600 font-semibold text-sm uppercase tracking-widest">What We Offer</span>
        <h2 className="text-5xl font-bold tracking-tight">Services Built for <span className="text-indigo-600">Your Future</span></h2>
        <p className="text-zinc-500 text-lg max-w-2xl mx-auto">From self-discovery to career placement, TaalumaHub walks with you every step of the way.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map((s, i) => {
          const Icon = SERVICE_ICONS[s.icon];
          return (
            <Card key={i} className="p-8 space-y-4 hover:shadow-md transition-shadow">
              <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center', s.bg)}>
                <Icon className="w-7 h-7 text-current" />
              </div>
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="text-zinc-500 leading-relaxed">{s.desc}</p>
            </Card>
          );
        })}
      </div>

      <div className="rounded-3xl overflow-hidden relative h-80">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80" 
          alt="Team working" 
          className="w-full h-full object-cover" 
          referrerPolicy="no-referrer" 
        />
        <div className="absolute inset-0 bg-indigo-900/70 flex flex-col items-center justify-center text-center space-y-6 px-4">
          <h3 className="text-4xl font-bold text-white">Ready to find your path?</h3>
          <p className="text-indigo-200 max-w-lg">Take our free assessment today and get a personalized career roadmap in minutes.</p>
          <Button onClick={onStart} className="px-8 py-3 text-lg">Start Free Assessment</Button>
        </div>
      </div>
    </motion.div>
  );
}
