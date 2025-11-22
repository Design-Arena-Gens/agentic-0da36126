"use client";

import { useEffect, useState } from "react";
import { Loader2, Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  isSearching: boolean;
};

export function SearchHero({ value, onChange, onSubmit, isSearching }: Props) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onChange(localValue);
    onSubmit(localValue.trim());
  };

  return (
    <section className="space-y-6">
      <div className="text-end">
        <p className="inline-flex items-center gap-2 rounded-full border border-[--color-border] bg-black/40 px-4 py-2 text-xs text-zinc-300">
          <span className="font-semibold text-[--color-accent]">Aurora</span>
          محرك بحث ذكي للخبراء
        </p>
      </div>
      <h1 className="text-4xl font-semibold text-white sm:text-5xl">
        اكتشف المعرفة المتقدمة حول بناء محركات البحث بالذكاء الاصطناعي
      </h1>
      <p className="max-w-2xl text-sm text-zinc-300">
        أدخل سؤالك لعرض نتائج مدعومة بالتحليل الدلالي، اقتراحات ذكية، وروابط
        جاهزة للتطبيق العملي.
      </p>

      <form
        onSubmit={handleSubmit}
        className="group relative overflow-hidden rounded-3xl border border-[--color-border] bg-[--color-surface] p-2 backdrop-blur"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-black/40 p-3 text-[--color-accent]">
            <Search className="size-5" />
          </div>
          <input
            type="text"
            className="w-full bg-transparent text-lg text-white outline-none placeholder:text-zinc-500"
            placeholder="ابحث عن استراتيجيات الزحف الذكي أو تحسين الترتيب"
            value={localValue}
            onChange={(event) => {
              const nextValue = event.target.value;
              setLocalValue(nextValue);
              onChange(nextValue);
            }}
            dir="auto"
          />
          <button
            type="submit"
            className="flex items-center gap-2 rounded-2xl bg-[--color-accent] px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300"
          >
            {isSearching ? (
              <>
                <Loader2 className="size-4 animate-spin" /> جاري البحث…
              </>
            ) : (
              "ابدأ البحث"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
