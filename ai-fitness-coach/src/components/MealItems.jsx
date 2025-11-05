import { useState } from "react";
import { fetchImage } from "../services/geminiImages";

export default function MealItem({ label, value }) {
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onGenerate() {
    setLoading(true);
    try {
      const  url  = await fetchImage(
        `Food photography of ${value}, appetizing, soft studio light, high detail`
      );
      setImg(url);
    } catch (e) {
      console.error(e);
      alert("Image generation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-3 mb-2">
     <div className="flex items-center justify-between gap-3">
        <p className="flex-1">
          <span className="font-medium">{label}:</span> {value}
        </p>

        <button
          onClick={onGenerate}
          className="shrink-0 px-3 py-1 rounded bg-purple-600 text-white disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Generating…" : "Generate Image"}
        </button>
      </div>

      {img && (
        <img
          src={img}
          alt={label}
          className="mt-3 rounded-md w-full object-cover"
          loading="lazy"
        />
      )}
    </div>
  );
}
