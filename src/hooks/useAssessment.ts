import { useState, useCallback } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/src/firebase";
import { ASSESSMENT_PRICE } from "@/src/data/questions";
import { Assessment, AssessmentResult } from "@/src/types";
import { User } from "firebase/auth";

export type PaymentStatus = "idle" | "pending" | "success" | "failed";

export interface UseAssessmentReturn {
  answers: Record<string, any>;
  currentQuestionIndex: number;
  activeAssessment: Assessment | null;
  isPaying: boolean;
  phoneNumber: string;
  paymentStatus: PaymentStatus;
  setPhoneNumber: (phone: string) => void;
  handleAnswer: (questionId: string, value: any) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  submitQuiz: (user: User) => Promise<void>;
  initiatePayment: (user: User) => Promise<void>;
  resetAssessment: () => void;
  setActiveAssessment: (assessment: Assessment | null) => void;
}

export function computeResult(ans: Record<string, any>): AssessmentResult {
  // Score calculation based on 40 questions
  const scores: Record<string, number> = {
    technology: 0,
    healthcare: 0,
    business: 0,
    engineering: 0,
    creative: 0,
    agriculture: 0,
    education: 0,
    hospitality: 0,
  };

  // Parse answers
  const getAnswer = (qid: string) => ans[qid]?.[0] || ans[qid];

  // Section 1: Yes/No (Q1-10)
  if (getAnswer("q1") === "Yes") scores.technology += 1; // Math/problem solving
  if (getAnswer("q2") === "Yes") scores.business += 1; // Public speaking
  if (getAnswer("q3") === "Yes")
    scores.business += 1; // Office work
  else scores.engineering += 1;
  if (getAnswer("q4") === "Yes") scores.engineering += 1; // Machines/tech
  if (getAnswer("q5") === "Yes") scores.healthcare += 1; // Biology
  if (getAnswer("q6") === "Yes") scores.hospitality += 1; // Travel
  if (getAnswer("q7") === "Yes") scores.business += 1; // Time management
  if (getAnswer("q8") === "Yes") scores.business += 1; // Group work
  if (getAnswer("q9") === "Yes") scores.education += 1; // Researching careers
  if (getAnswer("q10") === "Yes") scores.creative += 1; // Creative

  // Section 2: True/False (Q11-20)
  if (getAnswer("q11") === "True") scores.business += 1; // Routine
  if (getAnswer("q12") === "True") scores.business += 1; // Leadership
  if (getAnswer("q13") === "True") scores.education += 1; // Teaching others
  if (getAnswer("q14") === "True") scores.agriculture += 2; // Agriculture
  if (getAnswer("q15") === "True") scores.hospitality += 1; // Fast-paced
  if (getAnswer("q16") === "True") scores.engineering += 2; // Hands-on
  if (getAnswer("q17") === "True") scores.technology += 1; // Puzzles
  if (getAnswer("q18") === "True") scores.business += 1; // Business news
  if (getAnswer("q19") === "True") scores.creative += 1; // Independent
  if (getAnswer("q20") === "True") scores.hospitality += 2; // Sports

  // Section 3: Agree/Disagree (Q21-30)
  if (getAnswer("q21") === "Agree") scores.technology += 1; // New subjects
  if (getAnswer("q23") === "Agree") scores.business += 1; // Job security
  if (getAnswer("q25") === "Agree") scores.creative += 1; // Passion over pay
  if (getAnswer("q26") === "Agree") scores.business += 1; // Big achievements
  if (getAnswer("q29") === "Agree") scores.education += 1; // Work-life balance
  if (getAnswer("q30") === "Agree") scores.creative += 1; // Follow passion

  // Section 4: Scale Questions (Q31-40)
  // Money importance (Q31)
  if (getAnswer("q31")?.includes("2")) scores.business += 1;
  // Tech comfort (Q32)
  if (getAnswer("q32")?.includes("2")) scores.technology += 2;
  // Creativity (Q33)
  if (getAnswer("q33")?.includes("2")) scores.creative += 2;
  // Business interest (Q35)
  if (getAnswer("q35")?.includes("2")) scores.business += 2;
  // Job market (Q36)
  if (getAnswer("q36")?.includes("2")) {
    scores.healthcare += 1;
    scores.education += 1;
  }
  // Challenges (Q37)
  if (getAnswer("q37")?.includes("2")) scores.technology += 1;
  // Helping others (Q39)
  if (getAnswer("q39")?.includes("2")) {
    scores.healthcare += 2;
    scores.education += 1;
  }
  // Driven (Q40)
  if (getAnswer("q40")?.includes("2")) scores.business += 1;

  // Get top 3 career categories
  const sortedCareers = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => key);

  // Career recommendations with Kenyan institutions
  const careerData: Record<
    string,
    {
      title: string;
      rationale: string;
      institutions: string[];
      courses: string[];
    }
  > = {
    technology: {
      title: "Software Developer / IT Professional",
      rationale:
        "Your strong analytical skills and comfort with technology make you ideal for Kenya's growing tech sector. Nairobi is becoming a major tech hub in East Africa.",
      institutions: [
        "University of Nairobi (UoN) - BSc Computer Science",
        "Kenyatta University (KU) - BSc IT",
        "Strathmore University - BSc Informatics and Computer Science",
        "JKUAT - BSc Computer Technology",
        "African Leadership University (ALU)",
        "Moringa School - Software Engineering Bootcamp",
        "Zindua School - Coding Program",
      ],
      courses: [
        "Software Engineering",
        "Computer Science",
        "Information Technology",
        "Data Science",
        "Cybersecurity",
      ],
    },
    healthcare: {
      title: "Medical / Healthcare Professional",
      rationale:
        "Your interest in biology and helping others makes healthcare a perfect fit. Kenya has a growing healthcare sector with strong demand.",
      institutions: [
        "University of Nairobi (UoN) - MBChB Medicine",
        "Kenyatta University (KU) - BSc Nursing",
        "JKUAT - BSc Clinical Medicine",
        "Aga Khan University - Nursing & Medicine",
        "Kenya Medical Training College (KMTC) - Nursing Diploma",
        "St. Paul's University - Health Sciences",
        "Mount Kenya University - Medical Courses",
      ],
      courses: [
        "Medicine & Surgery",
        "Nursing",
        "Clinical Medicine",
        "Pharmacy",
        "Public Health",
      ],
    },
    business: {
      title: "Business / Management Professional",
      rationale:
        "Your leadership skills and interest in business make you suited for Kenya's dynamic business environment. Nairobi is East Africa's business hub.",
      institutions: [
        "University of Nairobi (UoN) - Bachelor of Commerce",
        "Strathmore Business School - BBA",
        "United States International University (USIU-Africa) - Business Admin",
        "Kenyatta University (KU) - BBA",
        "Daystar University - Business Courses",
        "Kenya Institute of Management (KIM)",
        "CPSP Kenya - Professional Certifications",
      ],
      courses: [
        "Business Administration",
        "Finance",
        "Marketing",
        "Human Resource",
        "Supply Chain Management",
      ],
    },
    engineering: {
      title: "Engineer / Technical Professional",
      rationale:
        "Your hands-on approach and problem-solving skills are perfect for engineering. Kenya's infrastructure growth needs skilled engineers.",
      institutions: [
        "University of Nairobi (UoN) - BSc Engineering",
        "JKUAT - Various Engineering Programs",
        "Technical University of Kenya (TUK) - Engineering",
        "Kenyatta University - Engineering",
        "Mombasa Polytechnic - Engineering Diploma",
        "Technical University of Mombasa (TUM)",
        "TVET Colleges - Craft & Technician Certificates",
      ],
      courses: [
        "Civil Engineering",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Building & Construction",
        "Automotive Engineering",
      ],
    },
    creative: {
      title: "Creative / Media Professional",
      rationale:
        "Your creative interests align with Kenya's booming creative industry including film, digital media, and design.",
      institutions: [
        "Kenyatta University - BSc Film Technology",
        "Daystar University - Communication",
        "United States International University (USIU) - Fine Arts",
        "Kenyatta University - Design",
        "Shang Tao Media Arts College",
        "Nairobi Institute of Technology - Design",
        "Africa Digital Media Institute",
      ],
      courses: [
        "Film & Media Production",
        "Graphic Design",
        "Animation",
        "Fashion Design",
        "Music Production",
      ],
    },
    agriculture: {
      title: "Agricultural Specialist",
      rationale:
        "Your interest in agriculture aligns with Kenya's key economic sector. Modern agriculture offers exciting tech-driven opportunities.",
      institutions: [
        "University of Nairobi - BSc Agriculture",
        "JKUAT - BSc Horticulture",
        "Egerton University - Agriculture Programs",
        "Kenya Agricultural College (KAC)",
        "Bukura Agricultural College",
        "TVET Colleges - Agriculture Certificates",
        "Animal Health & Industry Training Institute",
      ],
      courses: [
        "Agricultural Science",
        "Horticulture",
        "Animal Health",
        "Agribusiness",
        "Agricultural Engineering",
      ],
    },
    education: {
      title: "Educator / Trainer",
      rationale:
        "Your ability to explain concepts and help others makes you ideal for education. Kenya has high demand for quality teachers.",
      institutions: [
        "University of Nairobi - BEd",
        "Kenyatta University - BEd",
        "Kisii University - Education",
        "Maseno University - Education",
        "Kenya Technical Teachers College (KTTC)",
        "Kagumo Teachers College",
        "Primary Teacher Training Colleges",
      ],
      courses: [
        "Secondary Education",
        "Early Childhood Education",
        "Special Needs Education",
        "Technical Education",
        "Education Administration",
      ],
    },
    hospitality: {
      title: "Hospitality / Tourism Professional",
      rationale:
        "Your interest in travel and dynamic environments suits Kenya's world-class tourism industry.",
      institutions: [
        "Kenya Utalii College - Hotel Management",
        "University of Nairobi - Tourism",
        "Kenyatta University - Hospitality",
        "Mombasa Aviation College - Tourism",
        "Nairobi Institute of Business Studies",
        "Bomas of Kenya - Cultural Tourism Training",
        "Strathmore University - Hospitality",
      ],
      courses: [
        "Hotel Management",
        "Tourism Management",
        "Travel & Tourism",
        "Events Management",
        "Aviation Operations",
      ],
    },
  };

  const topCareers = sortedCareers.map((key) => {
    const data = careerData[key] || careerData.business;
    return {
      title: data.title,
      rationale: data.rationale,
      institutions: data.institutions,
      courses: data.courses,
    };
  });

  // Generate summary based on top career
  const summary = `Based on your assessment, you show strong potential in ${topCareers[0]?.title.toLowerCase() || "business"}. Your skills align with Kenya's growing economy and job market needs.`;

  return {
    topCareers: topCareers.slice(0, 3),
    summary,
    strengths: ["Analytical Thinking", "Problem Solving", "Adaptability"],
    suggestedCourses: topCareers[0]?.courses?.slice(0, 3) || [
      "Business Administration",
      "Computer Skills",
      "Communication",
    ],
  };
}

export function useAssessment(): UseAssessmentReturn {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [activeAssessment, setActiveAssessment] = useState<Assessment | null>(
    null,
  );
  const [isPaying, setIsPaying] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");

  const handleAnswer = useCallback((questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const nextQuestion = useCallback(() => {
    setCurrentQuestionIndex((i) => i + 1);
  }, []);

  const prevQuestion = useCallback(() => {
    setCurrentQuestionIndex((i) => Math.max(0, i - 1));
  }, []);

  const submitQuiz = useCallback(
    async (user: User) => {
      const result = computeResult(answers);
      const assessmentData: Assessment = {
        userId: user.uid,
        answers: Object.entries(answers).map(([id, val]) => ({
          questionId: id,
          value: val,
        })),
        computedResult: result,
        unlocked: false,
        priceAtPurchase: ASSESSMENT_PRICE,
        createdAt: new Date().toISOString(),
      };
      const docRef = await addDoc(
        collection(db, "assessments"),
        assessmentData,
      );
      setActiveAssessment({ ...assessmentData, id: docRef.id });
    },
    [answers],
  );

  const initiatePayment = useCallback(
    async (user: User) => {
      if (!activeAssessment?.id || !phoneNumber) return;
      setIsPaying(true);
      setPaymentStatus("pending");
      try {
        const response = await fetch("/api/mpesa/stkpush", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phoneNumber: phoneNumber.replace("+", ""),
            amount: ASSESSMENT_PRICE,
            assessmentId: activeAssessment.id,
            userId: user?.uid,
          }),
        });
        const data = await response.json();
        if (data.ResponseCode === "0") {
          const isDemo = data.MerchantRequestID?.startsWith("DEMO");
          await addDoc(collection(db, "payments"), {
            userId: user?.uid,
            assessmentId: activeAssessment.id,
            amount: ASSESSMENT_PRICE,
            status: isDemo ? "paid" : "pending",
            merchantRequestId: data.MerchantRequestID,
            checkoutRequestId: data.CheckoutRequestID,
            createdAt: new Date().toISOString(),
          });
          if (isDemo) {
            await updateDoc(doc(db, "assessments", activeAssessment.id), {
              unlocked: true,
            });
          }
        } else {
          setPaymentStatus("failed");
          setIsPaying(false);
        }
      } catch (error) {
        console.error("Payment initiation failed", error);
        setPaymentStatus("failed");
        setIsPaying(false);
      }
    },
    [activeAssessment, phoneNumber],
  );

  const resetAssessment = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setActiveAssessment(null);
    setPhoneNumber("");
    setPaymentStatus("idle");
    setIsPaying(false);
  }, []);

  return {
    answers,
    currentQuestionIndex,
    activeAssessment,
    isPaying,
    phoneNumber,
    paymentStatus,
    setPhoneNumber,
    handleAnswer,
    nextQuestion,
    prevQuestion,
    submitQuiz,
    initiatePayment,
    resetAssessment,
    setActiveAssessment,
  };
}
