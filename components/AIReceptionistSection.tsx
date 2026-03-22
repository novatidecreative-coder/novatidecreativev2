"use client";

import Link from "next/link";
import { ArrowRight, Phone, Clock, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
  {
    icon: Phone,
    title: "24/7 answering",
    description:
      "Every ring gets a consistent, professional response—after hours and during busy jobs.",
  },
  {
    icon: Clock,
    title: "Qualification & booking",
    description:
      "Custom scripts and depth: from quick intake to full photo-and-document workflows before you roll a truck.",
  },
  {
    icon: MessageSquare,
    title: "SMS + CRM handoff",
    description:
      "Automated texts, reminders, and structured notes in the tools you already use.",
  },
];

const proWorkflow = [
  { step: "1", title: "Customer calls", description: "AI answers instantly" },
  { step: "2", title: "AI qualifies the lead", description: "Asks custom questions about the job" },
  { step: "3", title: "Requests photos via text", description: "Sends automated SMS requesting photos/documents" },
  { step: "4", title: "Customer sends details", description: "Photos, measurements, damage photos, etc." },
  { step: "5", title: "AI books appointment", description: "Schedules with full context and all materials ready" },
  { step: "6", title: "You receive complete lead package", description: "All info, photos, and qualification notes in your CRM" }
];

export default function AIReceptionistSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Capture Every Lead—Without a Fixed “Tier”
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Call coverage, qualification depth, SMS follow-up, and CRM sync are scoped to{" "}
            <span className="text-gray-300">your</span> volume and trade—not a one-size
            menu. See{" "}
            <Link
              href="/pricing"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
            >
              pricing &amp; packages
            </Link>{" "}
            for how we quote it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/ai-receptionist"
              className="inline-flex items-center justify-center gap-2 border-2 border-blue-600 text-white hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              AI receptionist details
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/book-demo"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Get a custom quote
            </Link>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glassmorphism border border-gray-800 rounded-xl p-6 text-left"
              >
                <div className="w-11 h-11 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-blue-400" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glassmorphism border border-gray-800 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            How it works
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proWorkflow.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-4">
                  {item.step}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm">
                  {item.description}
                </p>
                {index < proWorkflow.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-8 top-4 text-purple-500 w-6 h-6" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
