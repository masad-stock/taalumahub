import { motion } from "motion/react";
import { ArrowLeft, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicyPage() {
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
              <Shield className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">
                Privacy Policy
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
          className="prose prose-zinc max-w-none"
        >
          <div className="bg-white border border-zinc-200 rounded-2xl p-8 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">
                1. Introduction
              </h2>
              <p className="text-zinc-600">
                TaalumaHub (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
                is committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you use our career guidance platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">
                2. Information We Collect
              </h2>
              <p className="text-zinc-600 mb-3">
                We collect the following types of information:
              </p>
              <ul className="list-disc list-inside text-zinc-600 space-y-2">
                <li>
                  <strong>Personal Information:</strong> Name, email address,
                  phone number, and payment information when you register or
                  make payments.
                </li>
                <li>
                  <strong>Assessment Data:</strong> Your answers to our career
                  assessment questions and resulting recommendations.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you
                  interact with our platform, including pages visited and
                  features used.
                </li>
                <li>
                  <strong>Device Information:</strong> IP address, browser type,
                  and device identifiers.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">
                3. How We Use Your Information
              </h2>
              <p className="text-zinc-600 mb-3">We use your information to:</p>
              <ul className="list-disc list-inside text-zinc-600 space-y-2">
                <li>
                  Provide personalized career guidance and recommendations
                </li>
                <li>Process payments for assessment services</li>
                <li>Improve our platform and user experience</li>
                <li>Communicate with you about our services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">
                4. Data Security
              </h2>
              <p className="text-zinc-600">
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. We use Firebase
                for secure data storage and industry-standard encryption for
                data transmission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">
                5. Your Rights
              </h2>
              <p className="text-zinc-600 mb-3">You have the right to:</p>
              <ul className="list-disc list-inside text-zinc-600 space-y-2">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your assessment data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">
                6. Contact Us
              </h2>
              <p className="text-zinc-600">
                If you have any questions about this Privacy Policy, please
                contact us at:{" "}
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
