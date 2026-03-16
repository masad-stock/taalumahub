export interface TeamMember {
  name: string;
  role: string;
  img: string;
}

export const TEAM: TeamMember[] = [
  { name: 'Amina Wanjiru', role: 'Co-Founder & CEO', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80' },
  { name: 'Brian Otieno', role: 'Head of Product', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80' },
  { name: 'Cynthia Muthoni', role: 'Lead Career Counsellor', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' }
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const TESTIMONIALS: Testimonial[] = [
  { 
    quote: 'TaalumaHub helped me realize I was meant for UX design. I enrolled in a course and landed my first job within 6 months.', 
    name: 'Kevin M.', 
    role: 'UX Designer, Nairobi' 
  },
  { 
    quote: 'I was stuck between medicine and data science. The assessment gave me clarity I couldn\'t find anywhere else.', 
    name: 'Fatuma A.', 
    role: 'Data Analyst, Mombasa' 
  },
  { 
    quote: 'The learning path recommendations were spot on. I got my AWS certification and doubled my salary.', 
    name: 'James K.', 
    role: 'Cloud Engineer, Kisumu' 
  }
];

export interface Value {
  icon: string;
  title: string;
  desc: string;
}

export const VALUES: Value[] = [
  { 
    icon: 'Star', 
    title: 'Integrity', 
    desc: 'We give honest, data-backed guidance — never telling you what you want to hear, but what you need to know.' 
  },
  { 
    icon: 'Users', 
    title: 'Inclusivity', 
    desc: 'Our platform is designed for everyone — from fresh school leavers to mid-career professionals seeking a change.' 
  },
  { 
    icon: 'Lightbulb', 
    title: 'Innovation', 
    desc: 'We continuously improve our assessment models using the latest research in career psychology and AI.' 
  }
];

export const STATS = [
  ['5,000+', 'Assessments Done'],
  ['94%', 'Satisfaction Rate'],
  ['120+', 'Career Paths Mapped']
] as const;

export const HERO_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80', alt: 'Professional Woman', mt: '' },
  { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80', alt: 'Team Collaboration', mt: 'sm:mt-12' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', alt: 'Young Professional', mt: '' }
];
