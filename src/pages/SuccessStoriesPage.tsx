import { motion } from "motion/react";
import { ArrowLeft, Quote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/src/components/ui";

const successStories = [
  {
    name: "Grace Wanjiku",
    role: "Software Engineer",
    company: "Safaricom PLC",
    image: null,
    quote:
      "After completing Senior School, I was confused about which course to take. TaalumaHub helped me discover my passion for technology. I joined Moringa School and now I'm building solutions that impact millions of Kenyans.",
    journey: "Senior School 2019 → Moringa School → Safaricom",
  },
  {
    name: "Michael Ochieng",
    role: "Clinical Officer",
    company: "Kenyatta National Hospital",
    image: null,
    quote:
      "I always wanted to help people but didn't know which medical path suited me. The assessment guided me to clinical medicine, and KMTC gave me the practical skills I needed.",
    journey: "Senior School 2020 → KMTC → KNH",
  },
  {
    name: "Amina Hassan",
    role: "Agricultural Economist",
    company: "Kenya Agricultural & Livestock Research Organization",
    image: null,
    quote:
      "Growing up in a farming family, I knew I wanted to modernize agriculture. TaalumaHub connected my passion with the right course at Egerton University.",
    journey: "Senior School 2018 → Egerton University → KALRO",
  },
  {
    name: "David Kimani",
    role: "Entrepreneur",
    company: "Founder, TechMali Solutions",
    image: null,
    quote:
      "The career guide helped me realize I was meant for entrepreneurship. I took business courses at Strathmore and now run a successful tech startup in Nairobi.",
    journey: "Senior School 2017 → Strathmore University → Entrepreneur",
  },
  {
    name: "Lucy Njeri",
    role: "Registered Nurse",
    company: "Aga Khan University Hospital",
    image: null,
    quote:
      "Coming from a humble background, I needed to choose a career with job security. The assessment pointed me to nursing, and I've never looked back.",
    journey: "Senior School 2019 → KMTC Nursing → Aga Khan",
  },
  {
    name: "James Mutua",
    role: "Civil Engineer",
    company: "China Road & Bridge Corporation",
    image: null,
    quote:
      "I loved building things since childhood. The assessment confirmed engineering was right for me. Now I'm helping build Kenya's infrastructure.",
    journey: "Senior School 2016 → University of Nairobi → CRBC",
  },
];

export default function SuccessStoriesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 mb-6 mx-auto transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-zinc-900 mb-4">
            Success Stories
          </h1>
          <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
            Meet young Kenyans who found their career path through TaalumaHub
            and are now making an impact across various industries.
          </p>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {successStories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-indigo-600">
                      {story.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900">
                      {story.name}
                    </h3>
                    <p className="text-sm text-indigo-600">{story.role}</p>
                    <p className="text-xs text-zinc-500">{story.company}</p>
                  </div>
                </div>

                <div className="relative mb-4">
                  <Quote className="w-6 h-6 text-indigo-200 absolute -top-2 -left-2" />
                  <p className="text-zinc-600 text-sm italic pl-4">
                    "{story.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100">
                  <p className="text-xs text-zinc-500">
                    <span className="font-medium">Journey:</span>{" "}
                    {story.journey}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
