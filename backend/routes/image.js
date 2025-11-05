// import express from "express";
// import Replicate from "replicate";

// const router = express.Router();
// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN,
// });

// router.post("/", async (req, res) => {
//         console.log('Image api hit')
//     console.log(process.env.REPLICATE_API_TOKEN)

//   try {
//     const { prompt } = req.body;

//     const output = await replicate.run(
//       "black-forest-labs/flux-schnell",
//       { input: { prompt } }
//     );

//     const url = Array.isArray(output) ? output[0] : null;
//     res.json({ url });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Image generation failed" });
//   }
// });

// export default router;
import express from "express";
import dotenv from "dotenv";
import FormData from "form-data";
import fetch from "node-fetch";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(" image API hit");
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const form = new FormData();
    form.append("prompt", prompt);

    const response = await fetch(
      "https://clipdrop-api.co/text-to-image/v1",
      {
        method: "POST",
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
          ...form.getHeaders(),
        },
        body: form,
      }
    );

    if (!response.ok) {
      console.log(" ClipDrop error:", await response.text());
      return res.status(500).json({ error: "Image generation failed" });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.set("Content-Type", "image/png");
    return res.send(buffer);

  } catch (err) {
    console.error("ClipDrop server error:", err);
    return res.status(500).json({ error: "ClipDrop error" });
  }
});

export default router;
