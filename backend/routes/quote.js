import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

router.post("/", async (req, res) => {
        console.log('quote api hit')

  try {
    const { goal = "", level = "" } = req.body || {};

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", });

    const prompt = `
Return ONLY valid JSON in this schema:
{
  "text": "string (<= 20 words, punchy, non-cheesy, no emojis)",
  "author": "string; use 'AI Coach' if unknown"
}

Constraints:
- Fitness motivation, realistic and actionable.
- Avoid clichés & copyrighted phrases.
- Lightly tailor to:
  - goal: "${goal}"
  - level: "${level}"
`;

    const out = await model.generateContent(prompt);
    const raw = out.response.text();

    const match = raw.match(/\{[\s\S]*\}/);
    const json = match ? JSON.parse(match[0]) : JSON.parse(raw);

    if (!json?.text) {
      return res.status(502).json({ error: "Quote generation returned empty." });
    }
    return res.json(json);
  } catch (e) {
    console.error("Quote error:", e);
    return res.status(500).json({ error: "Quote generation failed." });
  }
});

export default router;
