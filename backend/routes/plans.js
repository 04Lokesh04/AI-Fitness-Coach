import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

router.post("/", async (req, res) => {
        console.log('plan api hit')

  try {
    const { profile } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({model: "gemini-2.5-flash" });

    const prompt = `
Generate JSON ONLY.
User profile:
${JSON.stringify(profile)}

Return structure:
{
 "workoutByDay": [
   { "day": 1, "exercises":[{"name":"Squat","sets":3,"reps":10,"rest":"60s"}], "notes":"" },
   ...
 ],
 "dietByDay":[
   {
     "day":1,
     "breakfast":"Oats & berries",
     "lunch":"Chicken salad",
     "snacks":"Nuts",
     "dinner":"Paneer + veggies"
   },
   ...
 ],
 "tips":[ "Stay hydrated", "Posture matters", ...]
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const match = text.match(/\{[\s\S]*\}/);
    const json = JSON.parse(match[0]);

    res.json(json);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Plan generation failed" });
  }
});

export default router;
