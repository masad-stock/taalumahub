import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Button, Card } from '@/src/components/ui';
import { QUESTIONS } from '@/src/data/questions';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface QuizPageProps {
  currentQuestionIndex: number;
  answers: Record<string, any>;
  onAnswer: (questionId: string, value: any) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
}

export function QuizPage({ 
  currentQuestionIndex, 
  answers, 
  onAnswer, 
  onNext, 
  onPrev, 
  onSubmit 
}: QuizPageProps) {
  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1;
  const hasAnswer = !!answers[currentQuestion.id];
  
  const isSelected = (option: string) => {
    if (currentQuestion.type === 'single') {
      return answers[currentQuestion.id] === option;
    }
    return (answers[currentQuestion.id] || []).includes(option);
  };

  const handleOptionClick = (option: string) => {
    if (currentQuestion.type === 'single') {
      onAnswer(currentQuestion.id, option);
    } else {
      const current = answers[currentQuestion.id] || [];
      onAnswer(
        currentQuestion.id, 
        current.includes(option) 
          ? current.filter((o: string) => o !== option)
          : [...current, option]
      );
    }
  };

  return (
    <motion.div 
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
        <h3 className="text-2xl font-bold leading-tight">{currentQuestion.text}</h3>
        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            const selected = isSelected(option);
            return (
              <button 
                key={option} 
                onClick={() => handleOptionClick(option)} 
                className={cn(
                  'w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group',
                  selected 
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900' 
                    : 'border-zinc-100 hover:border-zinc-200 text-zinc-600'
                )}
              >
                <span className="font-medium">{option}</span>
                <div className={cn(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                  selected 
                    ? 'border-indigo-600 bg-indigo-600' 
                    : 'border-zinc-200 group-hover:border-zinc-300'
                )}>
                  {selected && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
              </button>
            );
          })}
        </div>
      </Card>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onPrev} 
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </Button>
        {isLastQuestion ? (
          <Button onClick={onSubmit} disabled={!hasAnswer}>
            Finish & See Results
          </Button>
        ) : (
          <Button onClick={onNext} disabled={!hasAnswer}>
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
