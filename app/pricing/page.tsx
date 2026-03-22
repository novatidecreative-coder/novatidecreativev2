"use client";

import Link from "next/link";
import { CheckCircle, X, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import PricingCards from "@/components/PricingCards";

const comparisonFeatures = [
  { name: "24/7 Call Answering", standard: true, pro: true, starter: false, managed: false },
  { name: "Lead Qualification", standard: "Basic", pro: "Advanced", starter: false, managed: false },
  { name: "Appointment Scheduling", standard: true, pro: true, starter: false, managed: false },
  { name: "Text Message Automation", standard: false, pro: true, starter: false, managed: false },
  { name: "Photo Collection", standard: false, pro: true, starter: false, managed: false },
  { name: "CRM Integration", standard: "Basic", pro: "Advanced", starter: false, managed: false },
  { name: "Custom Website Design", standard: false, pro: false, starter: true, managed: true },
  { name: "SEO Optimization", standard: false, pro: false, starter: "Basic", managed: "Ongoing" },
  { name: "Hosting Included", standard: false, pro: false, starter: false, managed: true },
  { name: "Unlimited Updates", standard: false, pro: false, starter: false, managed: true },
  { name: "Priority Support", standard: false, pro: true, starter: false, managed: true },
  { name: "Monthly Reporting", standard: false, pro: true, starter: false, managed: true }
];

const faqs = [
  {
    q: "Can I switch plans later?",
    a: "Yes! You can upgrade or downgrade your plan at any time. We'll prorate the charges accordingly."
  },
  {
    q: "Is there a contract?",
    a: "No long-term contracts required. All monthly plans are month-to-month with a 30-day cancellation notice."
  },
  {
    q: "What's included in the setup fee?",
    a: "Setup includes customization, training, integration with your tools, and testing to ensure everything works perfectly."
  },
  {
    q: "Do you offer refunds?",
    a: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your first month (excluding setup fees)."
  },
  {
    q: "Can I bundle services for a discount?",
    a: "Absolutely! Combine AI Receptionist + Website for 10% off. Contact us for a custom quote."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, ACH transfers, and can invoice for annual plans."
  }
];

export default function PricingPage() {
  const renderCell = (value: boolean | string) => {
    if (value === true) {
      return <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />;
    } else if (value === false) {
      return <X className="w-5 h-5 text-gray-600 mx-auto" />;
    } else {
      return <span className="text-sm text-gray-300">{value}</span>;
    }
  };

  return (
    <main className="min-h-screen pt-16">
      <PricingCards headlineLevel="h1" />

      {/* Bundle Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glassmorphism border border-yellow-600/50 rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Save 10% with a Bundle
            </h3>
            <p className="text-gray-300 mb-6">
              Combine AI Receptionist + Website Design for a complete business growth solution
            </p>
            <Link
              href="/book-demo"
              className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Request Custom Quote
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section
        id="feature-comparison"
        className="py-20 px-4 bg-black overflow-x-auto scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Detailed Feature Comparison
            </h2>
            <p className="text-gray-400">
              See exactly what's included in each package
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glassmorphism border border-gray-800 rounded-2xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left p-4 text-white font-semibold">
                      Features
                    </th>
                    <th className="p-4 text-center text-white font-semibold">AI Standard</th>
                    <th className="p-4 text-center text-white font-semibold">AI Pro</th>
                    <th className="p-4 text-center text-white font-semibold">Web Starter</th>
                    <th className="p-4 text-center text-white font-semibold">Web Managed</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr
                      key={feature.name}
                      className={`${
                        index !== comparisonFeatures.length - 1 ? "border-b border-gray-800" : ""
                      } hover:bg-gray-900/50 transition-colors`}
                    >
                      <td className="p-4 text-gray-300">{feature.name}</td>
                      <td className="p-4 text-center">
                        {renderCell(feature.standard)}
                      </td>
                      <td className="p-4 text-center">
                        {renderCell(feature.pro)}
                      </td>
                      <td className="p-4 text-center">
                        {renderCell(feature.starter)}
                      </td>
                      <td className="p-4 text-center">
                        {renderCell(feature.managed)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400">
              Have questions? We have answers.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glassmorphism border border-gray-800 rounded-xl p-6"
              >
                <div className="flex items-start space-x-3">
                  <HelpCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{faq.q}</h3>
                    <p className="text-gray-400">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Not Sure Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Not Sure Which Package Is Right?
            </h2>
            <p className="text-gray-400 mb-8">
              Book a free consultation and we'll help you choose the best solution for your business
            </p>
            <Link
              href="/book-demo"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Schedule Free Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
