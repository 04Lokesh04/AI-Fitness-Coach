// src/components/QuoteCard.jsx
import { useEffect } from "react";
import { usePlan } from "../state/PlanContext";
import { getDailyQuoteAI } from "../services/quote";

export default function QuoteCard() {
  const { quote, setQuote, profile } = usePlan();

  useEffect(() => {
    (async () => {
      try {
        const goal = profile?.goal || "";
        const level = profile?.level || "";
        const q = await getDailyQuoteAI({ goal, level });
        setQuote(q);
      } catch (e) {
        console.error("QuoteCard load error:", e);
      }
    })();
  }, [setQuote, profile?.goal, profile?.level]);

  if (!quote) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 mt-3">
      <div className="rounded-xl p-4 bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100">
        <p className="text-sm italic">“{quote.text}”</p>
        {quote.author && (
          <p className="text-xs mt-1 opacity-80">— {quote.author}</p>
        )}
      </div>
    </div>
  );
}
