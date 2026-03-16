import { Question } from "@/src/types";

export const QUESTIONS: Question[] = [
  // Section 1: Yes/No Questions (1-10) - Academic & Learning Preferences
  {
    id: "q1",
    text: "Did you enjoy mathematics in your CBC studies?",
    type: "single",
    options: ["Yes", "No"],
  },
  {
    id: "q2",
    text: "Are you comfortable presenting in front of your class?",
    type: "single",
    options: ["Yes", "No"],
  },
  {
    id: "q3",
    text: "Do you prefer studying in a classroom setting over practical work?",
    type: "single",
    options: ["Yes", "No"],
  },
  {
    id: "q4",
    text: "Are you curious about how machines and technology work?",
    type: "single",
    options: ["Yes", "No"],
  },
  {
    id: "q5",
    text: "Do you enjoy biology and learning about the human body?",
    type: "single",
    options: ["Yes", "No"],
  },
  {
    id: "q6",
    text: "Would you like a career that involves traveling outside Kenya?",
    type: "single",
    options: ["Yes", "No"],
  },
  {
    id: "q7",
    text: "Are you good at managing your study time and deadlines?",
    type: "single",
    options: ["Yes", "No"],
  },
  {
    id: "q8",
    text: "Do you enjoy working on group projects with classmates?",
    type: "single",
    options: ["Yes", "No"],
  },
  {
    id: "q9",
    text: "Have you researched different universities and colleges in Kenya?",
    type: "single",
    options: ["Yes", "No"],
  },
  {
    id: "q10",
    text: "Do you enjoy creative subjects like art, music, or drama?",
    type: "single",
    options: ["Yes", "No"],
  },

  // Section 2: True/False Questions (11-20) - Work Style & Career Interests
  {
    id: "q11",
    text: "I prefer a structured daily routine for studying.",
    type: "single",
    options: ["True", "False"],
  },
  {
    id: "q12",
    text: "I naturally take leadership roles in school activities.",
    type: "single",
    options: ["True", "False"],
  },
  {
    id: "q13",
    text: "I enjoy explaining concepts and helping classmates learn.",
    type: "single",
    options: ["True", "False"],
  },
  {
    id: "q14",
    text: "I would consider a career in agriculture or farming.",
    type: "single",
    options: ["True", "False"],
  },
  {
    id: "q15",
    text: "I work well under pressure and tight deadlines.",
    type: "single",
    options: ["True", "False"],
  },
  {
    id: "q16",
    text: "I would enjoy a hands-on career like construction or mechanics.",
    type: "single",
    options: ["True", "False"],
  },
  {
    id: "q17",
    text: "I enjoy solving complex problems and puzzles.",
    type: "single",
    options: ["True", "False"],
  },
  {
    id: "q18",
    text: "I like keeping up with news about Kenyan businesses and economy.",
    type: "single",
    options: ["True", "False"],
  },
  {
    id: "q19",
    text: "I prefer working independently rather than in teams.",
    type: "single",
    options: ["True", "False"],
  },
  {
    id: "q20",
    text: "I would consider a professional career in sports.",
    type: "single",
    options: ["True", "False"],
  },

  // Section 3: Agree/Disagree Questions (21-30) - Values & Priorities
  {
    id: "q21",
    text: "I am open to studying a course I had not originally planned for.",
    type: "single",
    options: ["Agree", "Disagree"],
  },
  {
    id: "q22",
    text: "It is okay to take a gap year after Senior School to figure out my path.",
    type: "single",
    options: ["Agree", "Disagree"],
  },
  {
    id: "q23",
    text: "Getting a job with job security is more important than high salary.",
    type: "single",
    options: ["Agree", "Disagree"],
  },
  {
    id: "q24",
    text: "Speaking with career counselors and professionals is valuable.",
    type: "single",
    options: ["Agree", "Disagree"],
  },
  {
    id: "q25",
    text: "I would choose a course I am passionate about even if it pays less.",
    type: "single",
    options: ["Agree", "Disagree"],
  },
  {
    id: "q26",
    text: "I want to achieve significant success in my chosen career.",
    type: "single",
    options: ["Agree", "Disagree"],
  },
  {
    id: "q27",
    text: "I prefer knowing what my work schedule will be like each day.",
    type: "single",
    options: ["Agree", "Disagree"],
  },
  {
    id: "q28",
    text: "I am willing to relocate to Nairobi, Mombasa, or another city for studies.",
    type: "single",
    options: ["Agree", "Disagree"],
  },
  {
    id: "q29",
    text: "Having time for family, church, and hobbies is important in my future job.",
    type: "single",
    options: ["Agree", "Disagree"],
  },
  {
    id: "q30",
    text: "I would rather study what I love than what my parents want.",
    type: "single",
    options: ["Agree", "Disagree"],
  },

  // Section 4: Scale Questions (31-40) - Priorities & Skills
  {
    id: "q31",
    text: "How important is earning a high salary in your future career?",
    type: "single",
    options: ["1 - Not important", "2 - Very important"],
  },
  {
    id: "q32",
    text: "How comfortable are you with computers and technology?",
    type: "single",
    options: ["1 - Not comfortable", "2 - Very comfortable"],
  },
  {
    id: "q33",
    text: "How much do you enjoy creative and artistic activities?",
    type: "single",
    options: ["1 - Not much", "2 - Very much"],
  },
  {
    id: "q34",
    text: "How important is work-life balance to you?",
    type: "single",
    options: ["1 - Not important", "2 - Very important"],
  },
  {
    id: "q35",
    text: "How interested are you in starting your own business someday?",
    type: "single",
    options: ["1 - Not interested", "2 - Very interested"],
  },
  {
    id: "q36",
    text: "How important is it to work in a sector with many job openings in Kenya?",
    type: "single",
    options: ["1 - Not important", "2 - Very important"],
  },
  {
    id: "q37",
    text: "How much do you enjoy solving difficult challenges?",
    type: "single",
    options: ["1 - Not much", "2 - Very much"],
  },
  {
    id: "q38",
    text: "How open are you to changing your career path later in life?",
    type: "single",
    options: ["1 - Not open", "2 - Very open"],
  },
  {
    id: "q39",
    text: "How important is helping your community through your work?",
    type: "single",
    options: ["1 - Not important", "2 - Very important"],
  },
  {
    id: "q40",
    text: "How driven are you to excel and be the best in your field?",
    type: "single",
    options: ["1 - Not driven", "2 - Very driven"],
  },
];

export const ASSESSMENT_PRICE = 200;
