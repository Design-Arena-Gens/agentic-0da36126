"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity } from "lucide-react";

import { InsightsPanel } from "@/components/insights-panel";
import { ResultCard } from "@/components/result-card";
import { SearchHero } from "@/components/search-hero";
import { TrendingTopics } from "@/components/trending-topics";
import { SearchResponse } from "@/types/search";

const DEFAULT_QUERY = "محرك بحث بالذكاء الاصطناعي";

export default function Home() {
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [data, setData] = useState<SearchResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeSearch = async (nextQuery: string) => {
    const finalQuery = nextQuery.trim() || DEFAULT_QUERY;
    setIsSearching(true);
    setError(null);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: finalQuery }),
      });

      if (!response.ok) {
        throw new Error("فشل في جلب النتائج");
      }

      const payload = (await response.json()) as SearchResponse;
      setData(payload);
      setQuery(finalQuery);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "حدث خطأ غير متوقع",
      );
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    void executeSearch(DEFAULT_QUERY);
  }, []);

  const stats = useMemo(() => {
    if (!data) {
      return null;
    }
    return {
      took: data.stats.took,
      totalResults: data.stats.totalResults,
    };
  }, [data]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 pb-24 pt-12 text-white sm:px-10">
      <SearchHero
        value={query}
        onChange={setQuery}
        onSubmit={(value) => void executeSearch(value)}
        isSearching={isSearching}
      />

      {error ? (
        <div className="rounded-3xl border border-red-500/40 bg-red-500/10 p-6 text-sm text-red-100">
          {error}
        </div>
      ) : null}

      {stats ? (
        <section className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.3em] text-zinc-400">
          <span className="inline-flex items-center gap-2 rounded-full border border-[--color-border] bg-black/40 px-4 py-2">
            <Activity className="size-3 text-[--color-accent]" />
            {stats.totalResults} نتائج متاحة
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[--color-border] bg-black/40 px-4 py-2">
            تم تجهيز الإجابة في {stats.took} مللي ثانية
          </span>
        </section>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <div className="space-y-6">
          {data?.results.map((result, index) => (
            <ResultCard key={result.id} result={result} index={index} />
          ))}
        </div>

        <div className="space-y-6">
          {data ? (
            <InsightsPanel
              insights={data.insights}
              onSelectSuggestion={(value) => void executeSearch(value)}
            />
          ) : null}
          {data ? (
            <TrendingTopics
              topics={data.trendingTopics}
              onSelect={(topic) => void executeSearch(topic)}
            />
          ) : null}
        </div>
      </div>
    </main>
  );
}
