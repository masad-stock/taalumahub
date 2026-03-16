import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Card } from '@/src/components/ui';
import { TEAM, TESTIMONIALS, VALUES, STATS, HERO_IMAGES } from '@/src/data/content';
import { Star, Users, Lightbulb } from 'lucide-react';

const VALUE_ICONS: Record<string, typeof Star> = {
  Star,
  Users,
  Lightbulb,
};

export function AboutPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }} 
      className="space-y-20 py-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-widest">Our Story</span>
          <h2 className="text-5xl font-bold tracking-tight leading-tight">We Believe Every Person Deserves a <span className="text-indigo-600">Clear Path Forward</span></h2>
          <p className="text-zinc-500 leading-relaxed text-lg">TaalumaHub was founded in Nairobi with a simple mission: help young Africans make confident, informed career decisions. Too many talented people end up in the wrong careers — not because of lack of ability, but lack of guidance.</p>
          <p className="text-zinc-500 leading-relaxed">We combine psychometric science, local market data, and technology to give every user a personalized roadmap — regardless of their background or resources.</p>
          <div className="flex gap-8 pt-4">
            {STATS.map(([num, label]) => (
              <div key={label}>
                <div className="text-3xl font-bold text-indigo-600">{num}</div>
                <div className="text-sm text-zinc-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80" alt="Team" className="rounded-2xl w-full h-56 object-cover" referrerPolicy="no-referrer" />
          <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80" alt="Professional" className="rounded-2xl w-full h-56 object-cover mt-8" referrerPolicy="no-referrer" />
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" alt="Young professional" className="rounded-2xl w-full h-56 object-cover" referrerPolicy="no-referrer" />
          <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=600&q=80" alt="Office" className="rounded-2xl w-full h-56 object-cover mt-8" referrerPolicy="no-referrer" />
        </div>
      </div>

      <div className="bg-indigo-50 rounded-3xl p-12 space-y-8">
        <h3 className="text-3xl font-bold text-center">Our Values</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {VALUES.map((v, i) => {
            const Icon = VALUE_ICONS[v.icon];
            return (
              <div key={i} className="space-y-3 text-center">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto shadow-sm">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="font-bold text-lg">{v.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="text-3xl font-bold text-center">Meet the Team</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {TEAM.map((m, i) => (
            <Card key={i} className="p-6 text-center space-y-4">
              <img src={m.img} alt={m.name} className="w-24 h-24 rounded-full object-cover mx-auto" referrerPolicy="no-referrer" />
              <div>
                <div className="font-bold text-lg">{m.name}</div>
                <div className="text-sm text-indigo-600">{m.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
