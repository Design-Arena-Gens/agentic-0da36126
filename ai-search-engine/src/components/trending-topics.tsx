"use client";

import { Flame } from "lucide-react";

type Props = {
  topics: string[];
  onSelect: (topic: string) => void;
};

export function TrendingTopics({ topics, onSelect }: Props) {
  if (topics.length === 0) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-[--color-border] bg-[--color-surface] p-6">
      <header className="flex items-center gap-3">
        <Flame className="size-5 text-orange-400" />
        <h2 className="text-sm font-semibold tracking-wide text-white">
          المواضيع الأكثر بحثًا
        </h2>
      </header>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-200">
        {topics.map((topic) => (
          <button
            key={topic}
            type="button"
            onClick={() => onSelect(topic)}
            className="rounded-full border border-[--color-border] bg-black/30 px-4 py-1.5 transition hover:border-[--color-accent] hover:text-[--color-accent]"
          >
            #{topic}
          </button>
        ))}
      </div>
    </div>
  );
}
