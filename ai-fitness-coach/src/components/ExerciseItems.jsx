import { useState } from "react";
import { fetchImage } from "../services/geminiImages";

export default function ExerciseItem({ ex }) {
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onGenerate() {
    setLoading(true);
    try {
      const  url  = await fetchImage(
        `Photorealistic demonstration of ${ex.name} exercise, proper form, gym, high detail`
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
    <li className="rounded-lg border border-gray-200 dark:border-gray-800 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium">{ex.name}</p>
          <p className="text-sm opacity-90">
            {ex.sets} sets × {ex.reps} reps • Rest: {ex.rest}
          </p>
        </div>
        <button
          onClick={onGenerate}
          className="px-3 py-1 rounded bg-purple-600 text-white disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Generating…" : "Generate Image"}
        </button>
      </div>
      {img && (
        <img
          src={img}
          alt={ex.name}
          className="mt-3 rounded-md w-full object-cover"
          loading="lazy"
        />
      )}
    </li>
  );
}
