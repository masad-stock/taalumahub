import { motion } from 'motion/react';
import { Button, Card } from '@/src/components/ui';
import { TrendingUp, Award, BookOpen } from 'lucide-react';

interface DashboardPageProps {
  onNewAssessment: () => void;
}

export function DashboardPage({ onNewAssessment }: DashboardPageProps) {
  const features = [
    {
      icon: TrendingUp,
      bg: 'bg-indigo-50',
      color: 'text-indigo-600',
      title: 'Growth Potential',
      desc: 'Track how your skills align with emerging market trends.'
    },
    {
      icon: Award,
      bg: 'bg-blue-50',
      color: 'text-blue-600',
      title: 'Certifications',
      desc: 'Discover top-rated courses to boost your employability.'
    },
    {
      icon: BookOpen,
      bg: 'bg-purple-50',
      color: 'text-purple-600',
      title: 'Learning Paths',
      desc: 'Step-by-step guides to transition into your dream role.'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Welcome back</h2>
        <Button onClick={onNewAssessment}>New Assessment</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <Card key={i} className="p-6 space-y-4">
            <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center`}>
              <f.icon className={`w-6 h-6 ${f.color}`} />
            </div>
            <h3 className="font-bold text-lg">{f.title}</h3>
            <p className="text-sm text-zinc-500">{f.desc}</p>
          </Card>
        ))}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Recent Assessments</h3>
        <Card className="p-8 text-center space-y-4 border-dashed bg-zinc-50/50">
          <p className="text-zinc-500">You haven't completed any assessments yet.</p>
          <Button variant="outline" onClick={onNewAssessment}>Take your first quiz</Button>
        </Card>
      </div>
    </motion.div>
  );
}
