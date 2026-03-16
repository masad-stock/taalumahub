import { Target, BarChart2, GraduationCap, Lightbulb, Users, Award, LucideIcon } from 'lucide-react';

export interface ServiceItem {
  icon: string;
  bg: string;
  title: string;
  desc: string;
}

export const SERVICES: ServiceItem[] = [
  { 
    icon: 'Target', 
    bg: 'bg-indigo-50', 
    title: 'Career Assessment', 
    desc: 'Our data-driven psychometric quiz maps your interests, strengths, and education to the careers where you\'ll thrive most.' 
  },
  { 
    icon: 'BarChart2', 
    bg: 'bg-blue-50', 
    title: 'Market Insights', 
    desc: 'Get real-time salary benchmarks, demand trends, and growth projections for careers in the Kenyan and East African job market.' 
  },
  { 
    icon: 'GraduationCap', 
    bg: 'bg-purple-50', 
    title: 'Learning Pathways', 
    desc: 'Curated course recommendations from top platforms — Coursera, Udemy, local colleges — tailored to your career goals.' 
  },
  { 
    icon: 'Lightbulb', 
    bg: 'bg-amber-50', 
    title: 'Skills Gap Analysis', 
    desc: 'Understand exactly which skills you need to develop to land your target role, with actionable steps to close the gap.' 
  },
  { 
    icon: 'Users', 
    bg: 'bg-emerald-50', 
    title: 'Mentorship Matching', 
    desc: 'Get connected with industry professionals who have walked the path you want to take. Real guidance, real experience.' 
  },
  { 
    icon: 'Award', 
    bg: 'bg-rose-50', 
    title: 'Certification Guidance', 
    desc: 'We highlight the most recognized certifications in your field and help you prioritize which ones to pursue first.' 
  }
];

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  Target,
  BarChart2,
  GraduationCap,
  Lightbulb,
  Users,
  Award,
};
