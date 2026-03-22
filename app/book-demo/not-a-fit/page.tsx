import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function BookDemoNotAFitPage() {
  return (
    <main
      className="min-h-screen pt-16 flex flex-col items-center px-4 py-16 md:py-24"
      style={{ backgroundColor: "var(--pricing-section-bg, #0a0f1e)" }}
    >
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/25 bg-blue-500/10 text-[var(--pricing-electric-blue)]">
          <Sparkles className="h-7 w-7" aria-hidden />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 text-balance leading-tight">
          We might not be the right fit just yet
        </h1>
        <p className="text-[var(--pricing-muted)] text-base leading-relaxed mb-8">
          That&apos;s okay—every business hits this stage. When you&apos;re ready
          to scale follow-up and systems, we&apos;ll be here. In the meantime,
          here&apos;s a free resource to help you get to your next level.
        </p>

        <div className="rounded-xl border border-white/[0.08] bg-[#141c32] p-6 mb-8 text-left">
          <p className="text-sm text-gray-400 mb-3">Free resource</p>
          <span className="text-[var(--pricing-electric-blue)] font-semibold underline underline-offset-4 decoration-blue-400/50">
            Growth checklist for contractors (link coming soon)
          </span>
          <p className="text-xs text-gray-500 mt-3">
            Replace this placeholder with your PDF, Notion page, or lead magnet
            URL when ready.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border-2 border-blue-500/50 text-white hover:bg-blue-500/10 font-semibold py-3 px-6 transition-colors"
          >
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
