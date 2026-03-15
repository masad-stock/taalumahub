import { Question } from './types';

export const QUESTIONS: Question[] = [
  { 
    id: 'q1', 
    text: 'Which activities sound most appealing to you?', 
    type: 'multi', 
    options: ['Designing apps or websites', 'Helping people solve personal problems', 'Analyzing complex data sets', 'Building or fixing physical equipment'] 
  },
  { 
    id: 'q2', 
    text: 'Which subjects did you enjoy most in school?', 
    type: 'multi', 
    options: ['Mathematics and Computer Science', 'Biology and Health Sciences', 'Business and Economics', 'Fine Arts and Design'] 
  },
  { 
    id: 'q3', 
    text: 'What is your highest level of education?', 
    type: 'single', 
    options: ['Secondary School', 'Diploma', 'Bachelor\'s Degree', 'Postgraduate Degree'] 
  },
  { 
    id: 'q4', 
    text: 'What is your preferred work environment?', 
    type: 'single', 
    options: ['Collaborative team setting', 'Independent/Remote work', 'Outdoor or Field work', 'Structured corporate office'] 
  },
  { 
    id: 'q5', 
    text: 'How comfortable are you with new technology?', 
    type: 'single', 
    options: ['Very comfortable (Early adopter)', 'Moderately comfortable', 'Prefer traditional methods'] 
  },
  { 
    id: 'q6', 
    text: 'Do you enjoy persuading others or selling ideas?', 
    type: 'single', 
    options: ['Yes, I find it natural', 'Sometimes, if I believe in the cause', 'No, I prefer to avoid it'] 
  },
  { 
    id: 'q7', 
    text: 'When working on a project, do you prefer focusing on:', 
    type: 'single', 
    options: ['People and relationships', 'Data and logic', 'Physical objects and tools'] 
  },
  { 
    id: 'q8', 
    text: 'Would you be interested in a hands-on technical trade?', 
    type: 'single', 
    options: ['Yes, definitely', 'Maybe, if the pay is good', 'No, I prefer office-based work'] 
  },
  { 
    id: 'q9', 
    text: 'Are you open to taking short professional certifications?', 
    type: 'single', 
    options: ['Yes, I love continuous learning', 'Only if required for a job', 'No, I\'m done with studying'] 
  },
  { 
    id: 'q10', 
    text: 'What is your primary career goal right now?', 
    type: 'single', 
    options: ['High income growth', 'Work-life balance', 'Making a social impact', 'Job stability and security'] 
  }
];

export const ASSESSMENT_PRICE = 200;
