import { motion } from "motion/react";
import { ArrowLeft, GraduationCap, BookOpen, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

const guideSections = [
  {
    icon: GraduationCap,
    title: "Understanding Your Options",
    content: [
      "Universities: 4-year degree programs (KU, UoN, Strathmore, USIU)",
      "TVET Colleges: Technical skills and diplomas (Technical University of Kenya, Nairobi Polytechnic)",
      "Professional Certifications: Short courses (KIM, CPSP Kenya, ACCA)",
      "Online Learning: Platforms like Coursera, edX with local partnerships",
    ],
  },
  {
    icon: BookOpen,
    title: "Course Selection Process",
    content: [
      "Step 1: Assess your Senior School (Grade 12) performance and career interests",
      "Step 2: Research courses matching your grades and interests",
      "Step 3: Consider job market demand in Kenya",
      "Step 4: Apply through KUCCPS or direct to institutions",
      "Step 5: Explore scholarship and HELB loan options",
    ],
  },
  {
    icon: Lightbulb,
    title: "Career Pathway Planning",
    content: [
      "Identify your interests and strengths through self-assessment",
      "Research growth sectors: Tech, Healthcare, Finance, Agriculture",
      "Consider both passion and practical job prospects",
      "Plan for continuous learning and skill upgrades",
      "Build networks through internships and mentorships",
    ],
  },
];

export default function CareerGuidePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-zinc-900 mb-4">
            Career Guide
          </h1>
          <p className="text-zinc-600 text-lg">
            Your comprehensive guide to navigating tertiary education and career
            choices in Kenya.
          </p>
        </motion.div>

        {/* Guide Sections */}
        <div className="space-y-8">
          {guideSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-zinc-200 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-xl font-semibold text-zinc-900">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-700">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Find Your Path?</h2>
          <p className="mb-6 text-indigo-100">
            Take our career assessment to discover the best courses and
            institutions for your goals.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
          >
            Start Assessment
          </button>
        </motion.div>
      </div>
    </div>
  );
}
