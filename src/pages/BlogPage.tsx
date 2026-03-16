import { motion } from "motion/react";
import { Card } from "@/src/components/ui";
import { BookOpen, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "How to Choose the Right Course After Senior School",
    excerpt:
      "A comprehensive guide for Kenyan students on selecting tertiary education paths that align with career goals.",
    date: "March 15, 2026",
    category: "Career Guide",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Top 10 In-Demand Careers in Kenya 2026",
    excerpt:
      "Explore the fastest-growing job sectors in Kenya including technology, healthcare, and renewable energy.",
    date: "March 10, 2026",
    category: "Industry Insights",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Understanding TVET Colleges vs Universities",
    excerpt:
      "Breaking down the differences between technical colleges and universities to help you make informed decisions.",
    date: "March 5, 2026",
    category: "Education",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Success Story: From Senior School to Software Engineer",
    excerpt:
      "Meet John Kamau who transformed his career through coding bootcamps and is now working at a top tech company.",
    date: "February 28, 2026",
    category: "Success Stories",
    readTime: "4 min read",
  },
  {
    id: 5,
    title: "Scholarship Opportunities for Kenyan Students",
    excerpt:
      "A curated list of local and international scholarships available for undergraduate and postgraduate studies.",
    date: "February 20, 2026",
    category: "Funding",
    readTime: "10 min read",
  },
  {
    id: 6,
    title: "The Future of Work: Skills You Need in 2030",
    excerpt:
      "Future-proof your career by developing skills in AI, data analytics, and digital marketing.",
    date: "February 15, 2026",
    category: "Future Trends",
    readTime: "7 min read",
  },
];

export default function BlogPage() {
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
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">Blog</h1>
              <p className="text-zinc-600">
                Insights on education and career development in Kenya
              </p>
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-semibold text-lg text-zinc-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-zinc-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <p className="text-xs text-zinc-400">{post.date}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
