import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Button, Card } from "@/src/components/ui";
import { CheckCircle, Mail, Phone, MapPin } from "lucide-react";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  const contactInfo = [
    { icon: MapPin, label: "Address", value: "Westlands, Nairobi, Kenya" },
    { icon: Phone, label: "Phone", value: "+254 729 341788" },
    { icon: Mail, label: "Email", value: "info@taalumahub.com" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-16 py-12"
    >
      <div className="text-center space-y-4">
        <span className="text-indigo-600 font-semibold text-sm uppercase tracking-widest">
          Get In Touch
        </span>
        <h2 className="text-5xl font-bold tracking-tight">
          We'd Love to <span className="text-indigo-600">Hear From You</span>
        </h2>
        <p className="text-zinc-500 text-lg max-w-xl mx-auto">
          Have a question, partnership idea, or just want to say hi? Our team is
          here for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="rounded-2xl overflow-hidden h-56">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
              alt="Office"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-6">
            {contactInfo.map((c, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                  <c.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                    {c.label}
                  </div>
                  <div className="font-medium text-zinc-800">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card className="p-8">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold">Message Sent!</h3>
              <p className="text-zinc-500">
                Thanks for reaching out. We'll get back to you within 24 hours.
              </p>
              <Button variant="outline" onClick={() => setSent(false)}>
                Send Another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-2xl font-bold">Send a Message</h3>
              {[
                {
                  label: "Your Name",
                  key: "name",
                  type: "text",
                  placeholder: "Jane Doe",
                },
                {
                  label: "Email Address",
                  key: "email",
                  type: "email",
                  placeholder: "jane@example.com",
                },
              ].map((f) => (
                <div key={f.key} className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-600">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    required
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [f.key]: e.target.value }))
                    }
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
              ))}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-600">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="How can we help you?"
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
                />
              </div>
              <Button type="submit" className="w-full py-3">
                Send Message
              </Button>
            </form>
          )}
        </Card>
      </div>
    </motion.div>
  );
}
