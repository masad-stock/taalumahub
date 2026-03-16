import { motion } from "motion/react";
import { ArrowLeft, HandshakeIcon, Building2, GraduationCap, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/src/components/ui";

const partnerCategories = [
  {
    icon: GraduationCap,
    title: "Universities & Colleges",
    partners: [
      "University of Nairobi (UoN)",
      "Kenyatta University (KU)",
      "Strathmore University",
      "Jomo Kenyatta University (JKUAT)",
      "United States International University (USIU-Africa)",
      "Technical University of Kenya",
      "Daystar University",
      "Mount Kenya University",
      "African Leadership University",
      "Aga Khan University",
    ],
  },
  {
    icon: Building2,
    title: "TVET & Technical Colleges",
    partners: [
      "Kenya Technical Teachers College (KTTC)",
      "Technical University of Mombasa",
      "Kenya Medical Training College (KMTC)",
      "Kenya Utalii College",
      "Nairobi Technical Training Institute",
      "The Co-operative University",
      "Bukura Agricultural College",
      "Mombasa Polytechnic",
      "Kenya Forestry College",
      "Animal Health & Industry Training Institute",
    ],
  },
  {
    icon: Award,
    title: "Professional Bodies",
    partners: [
      "Kenya Institute of Management (KIM)",
      "Institute of Certified Public Accountants (ICPAK)",
      "Law Society of Kenya",
      "Engineering Board of Kenya",
      "Nursing Council of Kenya",
      "Computer Society of Kenya",
      "Kenya Association of Manufacturers",
      "Institute of Human Resource Management",
      "Real Estate Stakeholders Association",
      "Marketing Society of Kenya",
    ],
  },
  {
    icon: HandshakeIcon,
    title: "Industry Partners",
    partners: [
      "Safaricom PLC",
      "Kenya Power & Lighting Company",
      "Kenya Revenue Authority",
      "Kenya Pipeline Company",
      "Kenya Ports Authority",
      "National Hospital Insurance Fund",
      "Communications Authority",
      "Central Bank of Kenya",
      "Kenya Airways",
      "Standard Group",
    ],
  },
];

export default function PartnersPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
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
          <h1 className="text-3xl font-bold text-zinc-900 mb-4">Our Partners</h1>
          <p className="text-zinc-600 text-lg max-w-2xl">
            We collaborate with leading educational institutions, professional 
            bodies, and industry partners to provide accurate career guidance 
            for Kenyan students.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {partnerCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-zinc-900">
                    {category.title}
                  </h2>
                </div>
                <ul className="space-y-2">
                  {category.partners.map((partner) => (
                    <li
                      key={partner}
                      className="text-sm text-zinc-600 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                      {partner}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Become a Partner CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-zinc-100 rounded-2xl p-8 text-center"
        >
          <h2 className="text-xl font-semibold text-zinc-900 mb-2">
            Are you an institution interested in partnering?
          </h2>
          <p className="text-zinc-600 mb-4">
            Join our network to connect with thousands of prospective students.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Contact Us
          </button>
        </motion.div>
      </div>
    </div>
  );
}
