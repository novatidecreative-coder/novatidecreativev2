"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare, Globe, Phone, Layers } from "lucide-react";

const services = [
  {
    name: "SMS & Follow-Up Automation",
    line1: "Lead nurture, reminders, no-show recovery,",
    line2: "onboarding flows",
    hint: "custom quote · typically $300–600/mo",
    icon: MessageSquare,
    popular: true,
  },
  {
    name: "Website Build",
    line1: "Custom responsive site, SEO foundation,",
    line2: "contact forms, Google Analytics",
    hint: "one-time · scope dependent",
    icon: Globe,
    popular: false,
  },
  {
    name: "AI Receptionist",
    line1: "24/7 call answering, lead qualification,",
    line2: "appointment scheduling, CRM sync",
    hint: "custom quote · starts at $100/mo",
    icon: Phone,
    popular: false,
  },
  {
    name: "Full System Build",
    line1: "Pipeline setup, all automations, website,",
    line2: "ongoing management",
    hint: "custom quote · bundled savings",
    icon: Layers,
    popular: false,
  },
];

type PricingCardsProps = {
  /** Use h1 on standalone pricing page; h2 when another hero already owns the page h1 */
  headlineLevel?: "h1" | "h2";
};

export default function PricingCards({
  headlineLevel = "h2",
}: PricingCardsProps) {
  const Headline = headlineLevel;

  return (
    <section
      className="py-16 md:py-24 px-4"
      style={{ backgroundColor: "var(--pricing-section-bg)" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          <p
            className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase mb-4"
            style={{ color: "var(--pricing-electric-blue)" }}
          >
            Pricing
          </p>
          <Headline className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white mb-5 leading-tight text-balance">
            Built around your operation — not a template
          </Headline>
          <p
            className="text-base md:text-lg leading-relaxed text-balance"
            style={{ color: "var(--pricing-muted)" }}
          >
            Every contractor is different. Your quote is based on what you
            actually need: scope of automations, number of pipelines, and
            ongoing support level.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`relative flex flex-col rounded-xl border p-4 sm:p-5 md:p-6 h-full ${
                  service.popular
                    ? "border-blue-500/40 shadow-lg shadow-blue-500/10"
                    : ""
                }`}
                style={{
                  backgroundColor: "rgba(15, 23, 42, 0.45)",
                  borderColor: service.popular
                    ? "rgba(59, 130, 246, 0.35)"
                    : "var(--pricing-card-border)",
                }}
              >
                {service.popular && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white sm:text-xs">
                    Most popular
                  </div>
                )}

                <div
                  className="mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border sm:h-11 sm:w-11"
                  style={{
                    backgroundColor: "var(--pricing-icon-bg)",
                    borderColor: "var(--pricing-icon-border)",
                  }}
                >
                  <Icon
                    className="h-5 w-5 sm:h-[22px] sm:w-[22px]"
                    style={{ color: "var(--pricing-electric-blue)" }}
                    aria-hidden
                  />
                </div>

                <h3 className="text-[15px] font-medium leading-snug text-white mb-2">
                  {service.name}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-1"
                  style={{ color: "var(--pricing-muted)" }}
                >
                  {service.line1}
                  <br />
                  {service.line2}
                </p>
                <p
                  className="mt-auto pt-3 text-[13px] leading-snug font-medium"
                  style={{ color: "var(--pricing-electric-blue)" }}
                >
                  {service.hint}
                </p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 md:mt-16"
        >
          <div
            className="h-px w-full max-w-4xl mx-auto mb-10 md:mb-12"
            style={{ backgroundColor: "var(--pricing-card-border)" }}
            aria-hidden
          />

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-xl mx-auto mb-10">
            <Link
              href="/book-demo"
              className="inline-flex justify-center items-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 text-base font-semibold transition-colors text-center"
            >
              Get a custom quote
            </Link>
            <Link
              href="/pricing#feature-comparison"
              className="inline-flex justify-center items-center rounded-lg border-2 border-blue-500/60 text-white hover:bg-blue-500/10 px-6 py-3.5 text-base font-semibold transition-colors text-center"
            >
              See what&apos;s included
            </Link>
          </div>

          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-gray-400 px-2">
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-full bg-green-500"
              aria-hidden
            />
            <span>
              No long-term contracts · Cancel anytime · 30-day money-back
              guarantee
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
