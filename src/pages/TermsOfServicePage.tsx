import { motion } from "motion/react";
import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TermsOfServicePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">
                Terms of Service
              </h1>
              <p className="text-zinc-600">Last updated: March 2026</p>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-white border border-zinc-200 rounded-2xl p-8 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">
                1. Acceptance of Terms
              </h2>
              <p className="text-zinc-600">
                By accessing or using TaalumaHub, you agree to be bound by these
                Terms of Service. If you do not agree to these terms, please do
                not use our platform. These terms apply to all users, including
                students, parents, and educational institutions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">
                2. Our Services
              </h2>
              <p className="text-zinc-600 mb-3">
                TaalumaHub provides career guidance services for Kenyan
                students, including:
              </p>
              <ul className="list-disc list-inside text-zinc-600 space-y-2">
                <li>Career assessment quizzes</li>
                <li>Personalized career recommendations</li>
                <li>Information on Kenyan educational institutions</li>
                <li>Course and program suggestions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">
                3. User Accounts
              </h2>
              <p className="text-zinc-600">
                To access certain features, you must create an account using
                Google authentication. You are responsible for maintaining the
                confidentiality of your account information and for all
                activities that occur under your account. You must be at least
                16 years old to use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">
                4. Payments and Refunds
              </h2>
              <p className="text-zinc-600 mb-3">
                Our career assessment requires payment of KES 200. Payments are
                processed securely through M-Pesa. All payments are final and
                non-refundable except in cases where technical issues prevented
                delivery of the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">
                5. Disclaimer
              </h2>
              <p className="text-zinc-600">
                Our career recommendations are based on assessment responses and
                are provided as guidance only. We do not guarantee employment or
                admission to any institution. Final career decisions should be
                made after consulting with qualified career counselors, parents,
                and educational institutions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">
                6. Intellectual Property
              </h2>
              <p className="text-zinc-600">
                All content on TaalumaHub, including text, graphics, logos, and
                software, is our property or licensed to us. You may not copy,
                modify, distribute, or create derivative works without our prior
                written consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">
                7. Contact Information
              </h2>
              <p className="text-zinc-600">
                For questions about these Terms, please contact us at:{" "}
                <a
                  href="mailto:info@taalumahub.com"
                  className="text-indigo-600 hover:underline"
                >
                  info@taalumahub.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
