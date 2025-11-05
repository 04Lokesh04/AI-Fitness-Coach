const API = import.meta.env.VITE_API_BASE;

export async function fetchImage(prompt) {
  const res = await fetch(`${API}/api/generateImage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

    if (!res.ok) throw new Error("Image generation failed");
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  }

