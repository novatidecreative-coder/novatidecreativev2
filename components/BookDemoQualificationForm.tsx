"use client";

import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  Home,
  Loader2,
  Sun,
  Wind,
} from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xaqpgnqd";

type QualificationFormState = {
  businessType: string;
  yearsInBusiness: string;
  jobsPerMonth: string;
  monthlyRevenue: string;
  leadFollowUp: string[];
  biggestProblem: string;
  monthlyBudget: string;
  decisionMaker: string;
  timeline: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

const initialState: QualificationFormState = {
  businessType: "",
  yearsInBusiness: "",
  jobsPerMonth: "",
  monthlyRevenue: "",
  leadFollowUp: [],
  biggestProblem: "",
  monthlyBudget: "",
  decisionMaker: "",
  timeline: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
};

function isDisqualified(data: QualificationFormState): boolean {
  if (
    data.monthlyRevenue === "under10k" &&
    data.monthlyBudget === "under200"
  ) {
    return true;
  }
  if (
    data.yearsInBusiness === "lessThan1" &&
    data.monthlyRevenue === "under10k"
  ) {
    return true;
  }
  return false;
}

const cardBase =
  "rounded-xl border-2 p-4 sm:p-5 text-left cursor-pointer transition-all duration-200 flex gap-3 sm:gap-4 items-start";
const cardInactive =
  "border-transparent bg-[#141c32] hover:bg-[#1a2540] shadow-sm shadow-black/20";
const cardActive =
  "border-[var(--pricing-electric-blue)] bg-[rgba(56,189,248,0.08)] shadow-[0_0_0_1px_rgba(56,189,248,0.15)]";

type OptionCardProps = {
  selected: boolean;
  onSelect: () => void;
  icon?: ReactNode;
  title: string;
  description?: string;
  multi?: boolean;
};

function OptionCard({
  selected,
  onSelect,
  icon,
  title,
  description,
  multi,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`${cardBase} w-full ${selected ? cardActive : cardInactive}`}
    >
      {icon && (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-400/25 bg-blue-500/10 text-[var(--pricing-electric-blue)]">
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1 text-left">
        <span className="flex items-center gap-2">
          <span className="font-medium text-white">{title}</span>
          {multi && selected && (
            <Check className="h-4 w-4 shrink-0 text-[var(--pricing-electric-blue)]" />
          )}
        </span>
        {description && (
          <span className="mt-1 block text-sm text-[var(--pricing-muted)]">
            {description}
          </span>
        )}
      </span>
    </button>
  );
}

const gridClass = "grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4";

export default function BookDemoQualificationForm({
  onQualifiedComplete,
}: {
  onQualifiedComplete: () => void;
}) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QualificationFormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const progress = useMemo(() => (step / 4) * 100, [step]);

  const update = useCallback(
    <K extends keyof QualificationFormState>(
      key: K,
      value: QualificationFormState[K]
    ) => {
      setData((d) => ({ ...d, [key]: value }));
      setFieldErrors((e) => {
        const next = { ...e };
        delete next[key as string];
        return next;
      });
    },
    []
  );

  const toggleFollowUp = useCallback((id: string) => {
    setData((d) => {
      const set = new Set(d.leadFollowUp);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      return { ...d, leadFollowUp: [...set] };
    });
    setFieldErrors((e) => {
      const next = { ...e };
      delete next.leadFollowUp;
      return next;
    });
  }, []);

  const validateStep = (s: number): boolean => {
    const err: Record<string, string> = {};
    if (s === 1) {
      if (!data.businessType) err.businessType = "Choose an option";
      if (!data.yearsInBusiness) err.yearsInBusiness = "Choose an option";
      if (!data.jobsPerMonth) err.jobsPerMonth = "Choose an option";
    }
    if (s === 2) {
      if (!data.monthlyRevenue) err.monthlyRevenue = "Choose an option";
      if (!data.biggestProblem) err.biggestProblem = "Choose an option";
    }
    if (s === 3) {
      if (!data.monthlyBudget) err.monthlyBudget = "Choose an option";
      if (!data.decisionMaker) err.decisionMaker = "Choose an option";
      if (!data.timeline) err.timeline = "Choose an option";
    }
    if (s === 4) {
      if (!data.firstName.trim()) err.firstName = "Required";
      if (!data.lastName.trim()) err.lastName = "Required";
      if (!data.phone.trim()) err.phone = "Required";
      else if (
        !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
          data.phone.trim()
        )
      ) {
        err.phone = "Enter a valid phone number";
      }
      if (!data.email.trim()) err.email = "Required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
        err.email = "Enter a valid email";
      }
    }
    setFieldErrors(err);
    return Object.keys(err).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    if (step === 3) {
      if (isDisqualified(data)) {
        router.push("/book-demo/not-a-fit");
        return;
      }
      setStep(4);
      return;
    }
    if (step < 4) setStep((x) => x + 1);
  };

  const goBack = () => {
    if (step > 1) setStep((x) => x - 1);
  };

  const submitFinal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (!validateStep(4)) return;
    setSubmitting(true);
    try {
      const payload = {
        _subject: "Strategy call qualification — Novatide",
        _replyto: data.email.trim(),
        qualified: "yes",
        business_type: data.businessType,
        years_in_business: data.yearsInBusiness,
        jobs_per_month: data.jobsPerMonth,
        monthly_revenue: data.monthlyRevenue,
        lead_follow_up: data.leadFollowUp.join(", ") || "(none selected)",
        biggest_problem: data.biggestProblem,
        monthly_budget_growth: data.monthlyBudget,
        decision_maker: data.decisionMaker,
        timeline_start: data.timeline,
        first_name: data.firstName.trim(),
        last_name: data.lastName.trim(),
        phone: data.phone.trim(),
        email: data.email.trim(),
      };
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          (json as { error?: string }).error || "Something went wrong"
        );
      }
      onQualifiedComplete();
    } catch {
      setSubmitError(
        "We could not send your details. Please try again or email us directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const stepTitle =
    step === 1
      ? "Tell us about your business"
      : step === 2
        ? "Where are you right now?"
        : step === 3
          ? "Let's talk numbers"
          : "Almost there";

  return (
    <div
      className="w-full max-w-2xl mx-auto rounded-2xl border border-white/[0.08] bg-[#0f1629] p-6 sm:p-8 md:p-10 shadow-xl shadow-black/40"
      style={{ backgroundColor: "var(--pricing-section-bg, #0a0f1e)" }}
    >
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--pricing-electric-blue)]">
            Step {step} of 4
          </p>
          {step > 1 && (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--pricing-muted)] hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          )}
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1e293b]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-[var(--pricing-electric-blue)]"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 28, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6 text-balance">
            {stepTitle}
          </h2>

          {step === 1 && (
            <div className="space-y-8">
              <div>
                <p className="text-sm font-medium text-white mb-3">
                  Business type
                </p>
                <div className={gridClass}>
                  {(
                    [
                      {
                        id: "roofing",
                        title: "Roofing",
                        icon: <Home className="h-5 w-5" />,
                      },
                      {
                        id: "hvac",
                        title: "HVAC",
                        icon: <Wind className="h-5 w-5" />,
                      },
                      {
                        id: "solar",
                        title: "Solar",
                        icon: <Sun className="h-5 w-5" />,
                      },
                      {
                        id: "other",
                        title: "Other",
                        icon: <Briefcase className="h-5 w-5" />,
                      },
                    ] as const
                  ).map((o) => (
                    <OptionCard
                      key={o.id}
                      selected={data.businessType === o.id}
                      onSelect={() => update("businessType", o.id)}
                      icon={o.icon}
                      title={o.title}
                    />
                  ))}
                </div>
                {fieldErrors.businessType && (
                  <p className="mt-2 text-sm text-red-400">
                    {fieldErrors.businessType}
                  </p>
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-white mb-3">
                  How long have you been in business?
                </p>
                <div className={gridClass}>
                  {(
                    [
                      { id: "lessThan1", title: "Less than 1 year" },
                      { id: "1to3", title: "1–3 years" },
                      { id: "3plus", title: "3+ years" },
                    ] as const
                  ).map((o) => (
                    <OptionCard
                      key={o.id}
                      selected={data.yearsInBusiness === o.id}
                      onSelect={() => update("yearsInBusiness", o.id)}
                      title={o.title}
                    />
                  ))}
                </div>
                {fieldErrors.yearsInBusiness && (
                  <p className="mt-2 text-sm text-red-400">
                    {fieldErrors.yearsInBusiness}
                  </p>
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-white mb-3">
                  How many jobs do you close per month?
                </p>
                <div className={gridClass}>
                  {(
                    [
                      { id: "1to5", title: "1–5" },
                      { id: "6to15", title: "6–15" },
                      { id: "16plus", title: "16+" },
                    ] as const
                  ).map((o) => (
                    <OptionCard
                      key={o.id}
                      selected={data.jobsPerMonth === o.id}
                      onSelect={() => update("jobsPerMonth", o.id)}
                      title={o.title}
                    />
                  ))}
                </div>
                {fieldErrors.jobsPerMonth && (
                  <p className="mt-2 text-sm text-red-400">
                    {fieldErrors.jobsPerMonth}
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div>
                <p className="text-sm font-medium text-white mb-3">
                  What&apos;s your current monthly revenue?
                </p>
                <div className={gridClass}>
                  {(
                    [
                      { id: "under10k", title: "Under $10k" },
                      { id: "10k30k", title: "$10k–$30k" },
                      { id: "30k75k", title: "$30k–$75k" },
                      { id: "75kplus", title: "$75k+" },
                    ] as const
                  ).map((o) => (
                    <OptionCard
                      key={o.id}
                      selected={data.monthlyRevenue === o.id}
                      onSelect={() => update("monthlyRevenue", o.id)}
                      title={o.title}
                    />
                  ))}
                </div>
                {fieldErrors.monthlyRevenue && (
                  <p className="mt-2 text-sm text-red-400">
                    {fieldErrors.monthlyRevenue}
                  </p>
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-white mb-3">
                  How are you currently following up with leads?{" "}
                  <span className="font-normal text-[var(--pricing-muted)]">
                    (select all that apply)
                  </span>
                </p>
                <div className={gridClass}>
                  {(
                    [
                      {
                        id: "phone",
                        title: "Manually by phone",
                      },
                      {
                        id: "spreadsheet",
                        title: "Spreadsheet or notes",
                      },
                      {
                        id: "crm",
                        title: "Basic CRM",
                      },
                      {
                        id: "none",
                        title: "I'm not — leads fall through",
                      },
                    ] as const
                  ).map((o) => (
                    <OptionCard
                      key={o.id}
                      selected={data.leadFollowUp.includes(o.id)}
                      onSelect={() => toggleFollowUp(o.id)}
                      title={o.title}
                      multi
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-white mb-3">
                  What&apos;s your biggest problem right now?
                </p>
                <div className={gridClass}>
                  {(
                    [
                      { id: "missingLeads", title: "Missing leads" },
                      { id: "slowFollowUp", title: "Slow follow-up" },
                      { id: "noSystem", title: "No system" },
                      { id: "poorWebsite", title: "Poor website" },
                    ] as const
                  ).map((o) => (
                    <OptionCard
                      key={o.id}
                      selected={data.biggestProblem === o.id}
                      onSelect={() => update("biggestProblem", o.id)}
                      title={o.title}
                    />
                  ))}
                </div>
                {fieldErrors.biggestProblem && (
                  <p className="mt-2 text-sm text-red-400">
                    {fieldErrors.biggestProblem}
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div>
                <p className="text-sm font-medium text-white mb-3">
                  What&apos;s your monthly budget for growth tools?
                </p>
                <div className={gridClass}>
                  {(
                    [
                      { id: "under200", title: "Under $200" },
                      { id: "200to500", title: "$200–$500" },
                      { id: "500to1000", title: "$500–$1,000" },
                      { id: "1000plus", title: "$1,000+" },
                    ] as const
                  ).map((o) => (
                    <OptionCard
                      key={o.id}
                      selected={data.monthlyBudget === o.id}
                      onSelect={() => update("monthlyBudget", o.id)}
                      title={o.title}
                    />
                  ))}
                </div>
                {fieldErrors.monthlyBudget && (
                  <p className="mt-2 text-sm text-red-400">
                    {fieldErrors.monthlyBudget}
                  </p>
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-white mb-3">
                  Are you the decision maker?
                </p>
                <div className={gridClass}>
                  {(
                    [
                      {
                        id: "yes",
                        title: "Yes, it's my business",
                      },
                      {
                        id: "partner",
                        title: "I need to check with a partner",
                      },
                    ] as const
                  ).map((o) => (
                    <OptionCard
                      key={o.id}
                      selected={data.decisionMaker === o.id}
                      onSelect={() => update("decisionMaker", o.id)}
                      title={o.title}
                    />
                  ))}
                </div>
                {fieldErrors.decisionMaker && (
                  <p className="mt-2 text-sm text-red-400">
                    {fieldErrors.decisionMaker}
                  </p>
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-white mb-3">
                  How soon are you looking to get started?
                </p>
                <div className={gridClass}>
                  {(
                    [
                      { id: "asap", title: "ASAP" },
                      { id: "30days", title: "Within 30 days" },
                      { id: "researching", title: "Just researching" },
                    ] as const
                  ).map((o) => (
                    <OptionCard
                      key={o.id}
                      selected={data.timeline === o.id}
                      onSelect={() => update("timeline", o.id)}
                      title={o.title}
                    />
                  ))}
                </div>
                {fieldErrors.timeline && (
                  <p className="mt-2 text-sm text-red-400">
                    {fieldErrors.timeline}
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <form onSubmit={submitFinal} className="space-y-5">
              <p className="text-sm text-[var(--pricing-muted)] mb-4">
                You&apos;re a great fit for a strategy call. Leave your details
                and we&apos;ll open the calendar next.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="qd-first"
                    className="block text-xs font-medium text-[var(--pricing-muted)] mb-1.5"
                  >
                    First name
                  </label>
                  <input
                    id="qd-first"
                    value={data.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#141c32] px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--pricing-electric-blue)] focus:ring-1 focus:ring-[var(--pricing-electric-blue)]"
                    placeholder="Alex"
                    autoComplete="given-name"
                  />
                  {fieldErrors.firstName && (
                    <p className="mt-1 text-sm text-red-400">
                      {fieldErrors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="qd-last"
                    className="block text-xs font-medium text-[var(--pricing-muted)] mb-1.5"
                  >
                    Last name
                  </label>
                  <input
                    id="qd-last"
                    value={data.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-[#141c32] px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--pricing-electric-blue)] focus:ring-1 focus:ring-[var(--pricing-electric-blue)]"
                    placeholder="Rivera"
                    autoComplete="family-name"
                  />
                  {fieldErrors.lastName && (
                    <p className="mt-1 text-sm text-red-400">
                      {fieldErrors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="qd-phone"
                  className="block text-xs font-medium text-[var(--pricing-muted)] mb-1.5"
                >
                  Phone number
                </label>
                <input
                  id="qd-phone"
                  type="tel"
                  value={data.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#141c32] px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--pricing-electric-blue)] focus:ring-1 focus:ring-[var(--pricing-electric-blue)]"
                  placeholder="(555) 123-4567"
                  autoComplete="tel"
                />
                {fieldErrors.phone && (
                  <p className="mt-1 text-sm text-red-400">
                    {fieldErrors.phone}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="qd-email"
                  className="block text-xs font-medium text-[var(--pricing-muted)] mb-1.5"
                >
                  Email
                </label>
                <input
                  id="qd-email"
                  type="email"
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#141c32] px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--pricing-electric-blue)] focus:ring-1 focus:ring-[var(--pricing-electric-blue)]"
                  placeholder="you@company.com"
                  autoComplete="email"
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
              {submitError && (
                <p className="text-sm text-red-400">{submitError}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-6 transition-colors"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Book My Free Strategy Call"
                )}
              </button>
            </form>
          )}
        </motion.div>
      </AnimatePresence>

      {step < 4 && (
        <div className="mt-10">
          <button
            type="button"
            onClick={goNext}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 transition-colors"
          >
            Continue
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      )}

      <p className="mt-6 text-center text-xs sm:text-sm text-gray-500 leading-relaxed">
        Takes less than 2 minutes · No obligation · 100% free strategy call
      </p>
    </div>
  );
}
