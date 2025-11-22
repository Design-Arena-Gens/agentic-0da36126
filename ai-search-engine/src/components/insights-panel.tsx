"use client";

import { Bot, Compass, HelpCircle } from "lucide-react";

import { SearchInsights } from "@/types/search";

type Props = {
  insights: SearchInsights;
  onSelectSuggestion: (value: string) => void;
};

export function InsightsPanel({ insights, onSelectSuggestion }: Props) {
  const { relatedQuestions, smartSuggestions, deepDiveTopics } = insights;

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-[--color-border] bg-[--color-surface] p-6">
        <header className="flex items-center gap-3">
          <HelpCircle className="size-5 text-[--color-accent]" />
          <h2 className="text-sm font-semibold tracking-wide text-white">
            أسئلة مرتبطة بالبحث
          </h2>
        </header>
        <ul className="mt-4 space-y-3 text-sm text-zinc-200">
          {relatedQuestions.map((question) => (
            <li key={question}>
              <button
                type="button"
                onClick={() => onSelectSuggestion(question)}
                className="text-left transition hover:text-[--color-accent]"
              >
                {question}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl border border-[--color-border] bg-[--color-surface] p-6">
        <header className="flex items-center gap-3">
          <Bot className="size-5 text-[--color-accent]" />
          <h2 className="text-sm font-semibold tracking-wide text-white">
            اقتراحات ذكية
          </h2>
        </header>
        <div className="mt-4 flex flex-wrap gap-2">
          {smartSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onSelectSuggestion(suggestion)}
              className="rounded-full border border-[--color-border] bg-black/20 px-3 py-1 text-xs text-zinc-200 transition hover:border-[--color-accent] hover:text-[--color-accent]"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-[--color-border] bg-[--color-surface] p-6">
        <header className="flex items-center gap-3">
          <Compass className="size-5 text-[--color-accent]" />
          <h2 className="text-sm font-semibold tracking-wide text-white">
            مواضيع للتعمق
          </h2>
        </header>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-300">
          {deepDiveTopics.map((topic) => (
            <span
              key={topic}
              className="rounded-lg border border-[--color-border] bg-black/10 px-3 py-1"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
