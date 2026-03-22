"use client";

import Link from "next/link";
import { ArrowRight, Layout, Search, LineChart } from "lucide-react";
import { motion } from "framer-motion";

const webHighlights = [
  {
    icon: Layout,
    title: "Built for conversion",
    description:
      "Responsive layouts, clear calls-to-action, and fast load times so visitors actually book or call.",
  },
  {
    icon: Search,
    title: "SEO-ready from day one",
    description:
      "Solid structure, metadata, and content hierarchy—you are not launching into a black hole.",
  },
  {
    icon: LineChart,
    title: "Measure what matters",
    description:
      "Analytics and form tracking so you know which pages and campaigns pull their weight.",
  },
];

const portfolioImages = [
  {
    src: "/images/portfolio/project1.jpg",
    alt: "Modern business website design"
  },
  {
    src: "/images/portfolio/project2.jpg",
    alt: "Responsive web design showcase"
  },
  {
    src: "/images/portfolio/project3.jpg",
    alt: "Professional website portfolio"
  }
];

export default function WebsiteDesignSection() {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Professional Websites That Work As Hard As You Do
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            From a focused launch site to fully managed hosting and ongoing updates—scope
            and investment are quoted for what you need, not a sticker on a shelf. See{" "}
            <Link
              href="/pricing"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
            >
              pricing &amp; packages
            </Link>{" "}
            for the full picture.
          </p>
          <Link
            href="/book-demo"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Get a custom quote
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Portfolio Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16"
        >
          {portfolioImages.map((image, index) => (
            <div
              key={index}
              className="aspect-square rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500 transition-all duration-300 hover:scale-105"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-4">
          {webHighlights.map((item, index) => {
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

        {/* Bundle note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 text-center"
        >
          <div className="glassmorphism border border-blue-500/30 rounded-xl p-6 inline-block max-w-2xl">
            <p className="text-gray-300 text-sm md:text-base">
              Bundle website, AI receptionist, and SMS automations on one quote—most teams
              save versus piecing vendors together. We will spell it out line by line on
              your custom proposal.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}