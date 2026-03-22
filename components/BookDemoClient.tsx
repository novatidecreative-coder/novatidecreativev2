"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import {
  CalendarClock,
  MessageCircle,
  Lightbulb,
  ArrowRight,
  Phone,
  Globe,
  Zap,
  TrendingUp,
  Facebook,
} from "lucide-react";
import BookDemoQualificationForm from "@/components/BookDemoQualificationForm";

const BOOKING_WIDGET_URL =
  "https://app.novatidecreative.com/widget/bookings/novatidesmscalendar";

const expectations = [
  {
    icon: CalendarClock,
    title: "Short, focused session",
    description:
      "Plan for about 20–30 minutes. We respect your schedule and stay on topic.",
  },
  {
    icon: MessageCircle,
    title: "A real conversation",
    description:
      "No scripted pitch deck marathon. We ask about your business, pain points, and goals so the call actually helps you.",
  },
  {
    icon: Lightbulb,
    title: "Clear, practical takeaways",
    description:
      "You will leave with a honest read on what is realistic, what to prioritize first, and what working with Novatide could look like.",
  },
  {
    icon: ArrowRight,
    title: "No pressure",
    description:
      "If we are not the right fit, we will say so. If we are, we will outline next steps—only when you are ready.",
  },
];

const impactAreas = [
  {
    icon: Phone,
    title: "Never miss revenue on the phone",
    description:
      "AI receptionist coverage, smart qualification, and booking workflows turn missed calls and after-hours rings into booked jobs and qualified leads.",
  },
  {
    icon: Globe,
    title: "A site that earns trust and converts",
    description:
      "Modern, fast websites and landing experiences that reflect your brand and make it easy for visitors to take the next step.",
  },
  {
    icon: Zap,
    title: "Less manual follow-up",
    description:
      "Automations, reminders, and structured handoffs so your team spends time on work that moves the needle—not chasing voicemails.",
  },
  {
    icon: TrendingUp,
    title: "Measurable upside",
    description:
      "We focus on outcomes you can feel: more conversations, better-qualified leads, and a smoother path from first contact to booked revenue.",
  },
];

export default function BookDemoClient() {
  const [calendarUnlocked, setCalendarUnlocked] = useState(false);
  const calendarRef = useRef<HTMLElement>(null);

  const handleQualifiedComplete = useCallback(() => {
    setCalendarUnlocked(true);
    requestAnimationFrame(() => {
      calendarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <main className="min-h-screen pt-16 flex flex-col">
      <section
        className="relative py-12 md:py-16 px-4 border-b border-white/[0.06]"
        style={{ backgroundColor: "var(--pricing-section-bg, #0a0f1e)" }}
      >
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-[var(--pricing-electric-blue)]">
            Strategy call
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
            Book your free strategy call
          </h1>
          <p className="text-[var(--pricing-muted)] text-base md:text-lg leading-relaxed">
            A few quick questions help us show up prepared—then you&apos;ll pick
            a time that works.
          </p>
        </div>

        <BookDemoQualificationForm onQualifiedComplete={handleQualifiedComplete} />
      </section>

      {!calendarUnlocked && (
        <section
          className="relative py-16 md:py-20 px-4 bg-gradient-to-b from-black via-gray-900/80 to-black border-b border-gray-800/80"
          aria-hidden
        >
          <div className="max-w-2xl mx-auto text-center py-12 rounded-2xl border border-dashed border-gray-700 bg-black/30">
            <p className="text-gray-500 text-sm md:text-base px-6">
              Complete the short form above to unlock the calendar and schedule
              your call.
            </p>
          </div>
        </section>
      )}

      {calendarUnlocked && (
        <>
          <section className="relative py-16 md:py-20 px-4 bg-gradient-to-b from-black via-gray-900/80 to-black border-b border-gray-800/80">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <p className="text-sm font-medium text-blue-400 tracking-wide uppercase mb-3">
                Before you book
              </p>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-5 text-balance">
                See how Novatide can move the needle for{" "}
                <span className="text-blue-500">your</span> business
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed text-balance">
                This call is a working session—not a hard sell. We want to
                understand how you operate today, where leads slip through the
                cracks, and which changes would make the biggest difference in
                the next 90 days.
              </p>
            </div>

            <div className="max-w-5xl mx-auto px-0 sm:px-2">
              <h3 className="text-xl md:text-2xl font-semibold text-white text-center mb-10">
                What to expect on the call
              </h3>
              <ul className="grid sm:grid-cols-2 gap-5 md:gap-6 list-none p-0 m-0">
                {expectations.map(({ icon: Icon, title, description }) => (
                  <li
                    key={title}
                    className="flex gap-4 p-5 md:p-6 rounded-xl border border-gray-800 bg-[#111]/80 backdrop-blur-sm"
                  >
                    <div className="shrink-0 w-11 h-11 rounded-lg bg-blue-500/15 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-400" aria-hidden />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">{title}</h4>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="max-w-5xl mx-auto mt-16 md:mt-20 px-0 sm:px-2">
              <h3 className="text-xl md:text-2xl font-semibold text-white text-center mb-4">
                How Novatide can help you grow
              </h3>
              <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
                We combine AI-powered reception, web presence, and automation so
                your business captures more demand and converts it with less
                friction—without you needing to become a tech expert overnight.
              </p>
              <ul className="grid sm:grid-cols-2 gap-5 md:gap-6 list-none p-0 m-0">
                {impactAreas.map(({ icon: Icon, title, description }) => (
                  <li
                    key={title}
                    className="p-5 md:p-6 rounded-xl border border-gray-800/80 bg-gray-900/40"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <Icon
                        className="w-5 h-5 text-blue-500 shrink-0 mt-0.5"
                        aria-hidden
                      />
                      <h4 className="text-white font-semibold leading-snug">
                        {title}
                      </h4>
                    </div>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                      {description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section
            ref={calendarRef}
            id="book-demo-calendar"
            className="flex-1 flex flex-col items-center py-12 md:py-16 px-4 scroll-mt-20 bg-black"
          >
            <div className="w-full max-w-4xl mx-auto text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Schedule your call
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Thanks—pick a time below. Need a larger window?{" "}
                <a
                  href={BOOKING_WIDGET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                >
                  Open the scheduler in a new tab
                </a>
                .
              </p>
            </div>
            <div className="w-full max-w-4xl mx-auto flex-1 min-h-[min(720px,75vh)] flex flex-col">
              <div className="relative w-full flex-1 min-h-[min(720px,75vh)] rounded-xl overflow-hidden border border-gray-800 bg-[#1a1a1a] shadow-lg">
                <iframe
                  src={BOOKING_WIDGET_URL}
                  title="Schedule a strategy call with Novatide Creative"
                  className="absolute inset-0 w-full h-full min-h-[min(720px,75vh)] border-0"
                  allow="clipboard-write; fullscreen"
                />
              </div>
            </div>
          </section>
        </>
      )}

      <footer className="border-t border-gray-800 py-8 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white">Novatide Creative</h3>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-6 text-center text-sm">
            <div>
              <h4 className="text-gray-400 font-semibold mb-2">Company</h4>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/#process"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    How it works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Homepage
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-400 font-semibold mb-2">About</h4>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/instructions-for-opt-out"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Instructions for Opt out
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>

          <div className="text-center text-xs text-gray-600">
            Copyright © 2025 Novatide Creative
          </div>
        </div>
      </footer>
    </main>
  );
}
