import express from "express"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
const app=express()


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-fitness-coach-roan.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//   })
// );


app.use(express.json())

import plan from './routes/plans.js'
import image from './routes/image.js'
import audio from './routes/audio.js'
import quote from './routes/quote.js'

app.use('/api/generateImage', image)
app.use('/api/generatePlans', plan)
app.use('/api/generateaudio', audio)
app.use('/api/generateQuote', quote)

const port= process.env.PORT || 5000

app.listen(port, ()=> console.log(`Server is running on ${port}`))