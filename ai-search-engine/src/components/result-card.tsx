"use client";

import { ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";

import { RankedDocument } from "@/types/search";

type Props = {
  result: RankedDocument;
  index: number;
};

export function ResultCard({ result, index }: Props) {
  const scoreValue = Math.max(0, Math.min(100, result.score * 100)).toFixed(1);

  return (
    <article
      className="group rounded-3xl border border-[--color-border] bg-[--color-surface] p-6 backdrop-blur transition hover:border-[--color-accent] hover:shadow-[0_25px_60px_-45px_rgba(32,201,151,0.75)]"
    >
      <div className="flex justify-between gap-3 text-xs uppercase tracking-widest text-zinc-400">
        <span className="flex items-center gap-1">
          <Sparkles className="size-3 text-[--color-accent]" />
          نتيجة #{index + 1}
        </span>
        <span className="rounded-full bg-white/5 px-2 py-0.5 font-mono text-[10px] text-[--color-accent]">
          {scoreValue}%
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-white">
        <Link
          href={result.url}
          className="inline-flex items-center gap-2 hover:text-[--color-accent]"
        >
          {result.title}
          <ExternalLink className="size-4" />
        </Link>
      </h3>

      <p className="mt-3 text-sm leading-6 text-zinc-200">{result.snippet}</p>

      {result.highlights.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-medium text-emerald-300/80">
          {result.highlights.slice(0, 4).map((highlight) => (
            <span
              key={highlight}
              className="rounded-full bg-emerald-400/10 px-3 py-1"
            >
              {highlight}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        {result.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[--color-border] bg-black/20 px-3 py-1 text-xs text-zinc-300"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
