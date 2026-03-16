import { motion } from "motion/react";
import { ArrowLeft, Cookie } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CookiePolicyPage() {
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
              <Cookie className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">
                Cookie Policy
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
                1. What Are Cookies
              </h2>
              <p className="text-zinc-600">
                Cookies are small text files that are placed on your device when
                you visit our website. They help us provide you with a better
                experience by remembering your preferences and enabling certain
                features.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">
                2. How We Use Cookies
              </h2>
              <p className="text-zinc-600 mb-3">
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc list-inside text-zinc-600 space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> Required for the website
                  to function properly, such as maintaining your login session.
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how
                  visitors interact with our website by collecting anonymous
                  information.
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Remember your settings
                  and preferences for a better experience.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">
                3. Third-Party Cookies
              </h2>
              <p className="text-zinc-600">
                We use services like Google Analytics and Firebase which may set
                their own cookies. These third-party services help us analyze
                website traffic and store your data securely. Their use of
                cookies is governed by their respective privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">
                4. Managing Cookies
              </h2>
              <p className="text-zinc-600">
                Most web browsers allow you to control cookies through their
                settings. You can choose to accept or reject cookies. However,
                disabling cookies may affect the functionality of our website,
                particularly the ability to stay logged in.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">
                5. Changes to This Policy
              </h2>
              <p className="text-zinc-600">
                We may update this Cookie Policy from time to time. We encourage
                you to review this page periodically for any changes. Your
                continued use of our website after any changes indicates your
                acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">
                6. Contact Us
              </h2>
              <p className="text-zinc-600">
                If you have questions about our use of cookies, please contact
                us at:{" "}
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
