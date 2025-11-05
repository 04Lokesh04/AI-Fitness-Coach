const API = import.meta.env.VITE_API_BASE;

export async function fetchPlans(profile) {
  const res = await fetch(`${API}/api/generatePlans`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ profile }),
  });

  if (!res.ok) throw new Error("Failed fetching plans");
  return res.json();
}
