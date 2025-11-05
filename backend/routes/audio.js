import express from "express";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("audio api hit");

  try {
    const { text } = req.body;
    text.substring(0,10)

    if (!text) {
      return res.status(400).json({ error: "Missing text" });
    }

    const voiceId = process.env.ELEVEN_LABS_VOICE_ID;
    const apiKey = process.env.ELEVEN_LABS_KEY;

    if (!voiceId || !apiKey) {
      return res.status(400).json({ error: "Missing ELEVEN config" });
    }

    const client = new ElevenLabsClient({
      apiKey,
    });

    const audio = await client.textToSpeech.convert(voiceId, {
      text,
      modelId: "eleven_multilingual_v2",
      outputFormat: "mp3_44100_128",
    });

    const arrayBuffer = await audio.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.set("Content-Type", "audio/mpeg");
    res.send(buffer);

  } catch (err) {
    console.error("ElevenLabs Error:", err);
    res.status(500).json({ error: "Audio generation failed" });
  }
});

export default router;


// router.post("/", async (req, res) => {
//   try {
//     const { text } = req.body;
//     const voice_id = process.env.ELEVEN_LABS_VOICE_ID || "default_voice_id";
//     const url = `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`;

//     const r = await axios.post(url, {
//       text,
//       modelId: 'eleven_multilingual_v2',
//         outputFormat: 'mp3_44100_128', 
//     }, {
//       headers: {
//         "xi-api-key": process.env.ELEVEN_LABS_KEY,
//         "Content-Type": "application/json",
//         "Accept": "audio/mpeg"
//       },
//       responseType: "arraybuffer"
//     });

//     res.set("Content-Type", "audio/mpeg");
//     res.send(r.data);
//   } catch (err) {
//     console.error("Audio API error:", err.response?.data || err.message);
//     res.status(500).json({ error: "Audio generation failed." });
//   }
// });
// export default router;

