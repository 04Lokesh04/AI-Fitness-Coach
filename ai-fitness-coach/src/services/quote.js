const API = import.meta.env.VITE_API_BASE;

const LS_KEY = "daily-quote";
const today = () => new Date().toISOString().slice(0, 10);

export async function fetchAIQuote({ goal = "", level = "" }) {
  const res = await fetch(`${API}/api/generateQuote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ goal, level }),
  });

  if (!res.ok) throw new Error("Quote fetch failed");
  return res.json();
}

export async function getDailyQuoteAI({ goal = "", level = "" }) {
  const cached = localStorage.getItem(LS_KEY);
  if (cached) {
    const data = JSON.parse(cached);
    if (data.date === today()) return data.quote;
  }

  try {
    const quote = await fetchAIQuote({ goal, level });
    localStorage.setItem(
      LS_KEY,
      JSON.stringify({ date: today(), quote })
    );
    return quote;
  } catch {
    return {
      text: "Keep going — progress compounds.",
      author: "AI Coach",
    };
  }
}
