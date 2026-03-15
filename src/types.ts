export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  phoneNumber?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'single' | 'multi' | 'rank';
  options: string[];
}

export interface CareerRecommendation {
  title: string;
  rationale: string;
}

export interface AssessmentResult {
  topCareers: CareerRecommendation[];
  summary: string;
  strengths: string[];
  suggestedCourses: string[];
}

export interface Assessment {
  id?: string;
  userId: string;
  answers: { questionId: string; value: any }[];
  computedResult: AssessmentResult;
  unlocked: boolean;
  priceAtPurchase: number;
  createdAt: string;
}

export interface Payment {
  id?: string;
  userId: string;
  assessmentId: string;
  amount: number;
  status: 'pending' | 'paid' | 'failed';
  merchantRequestId?: string;
  checkoutRequestId?: string;
  mpesaReceipt?: string;
  createdAt: string;
}
