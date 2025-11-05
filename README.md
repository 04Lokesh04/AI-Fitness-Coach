# AI Fitness Coach

An AI-powered personal fitness assistant that generates:
- Customized workout & diet plans
- Daily motivational quotes
- AI-generated images for workouts & meals
- AI voice narration for plans
- PDF export of complete plans

Built with **React + Express + Gemini AI + ElevenLabs + Clipdrop**  
Deployed via **Render + Vercel**

---

##  Features

# Personalized plan based on:
- Age, height, weight, gender
- Goal (weight loss, muscle gain, endurance)
- Diet preference
- Fitness level
- Workout location
- Stress level
- Medical conditions

# AI-Generated:
- 7-Day Workout Plan
- 7-Day Diet Plan
- Motivation Tips
- Images for exercises + meals
- Text-to-Speech audio (ElevenLabs)
- Export to PDF

# App Extras
- Save & reload plans
- Light / Dark mode
- Responsive UI

---

##  Tech Stack

###  Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Context API

###  Backend
- Node.js
- Express.js
- CORS
- dotenv

### AI Services
| Feature | API |
|--------|-----|
| Workout / Diet / Quotes | Google Gemini |
| Text-to-Speech | ElevenLabs |
| Image Generation | Clipdrop |

---

##  Folder Structure

AI-fitness-coach/
├─ ai-fitness-coach/      # React Frontend
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ services/
│  │  ├─ state/
│  │  └─ assets/
│  └─ package.json
│
└─ backend/               # Express Backend
   ├─ routes/
   ├─ server.js
   ├─ .env
   └─ package.json

#Environment Variables
Frontend (.env)
```
VITE_API_BASE=https://your-backend-url.com
```
Backend (.env)

```
PORT=5000
GOOGLE_API_KEY=your_gemini_key
ELEVENLABS_API_KEY=your_elevenlabs_key
CLIPDROP_API_KEY=your_clipdrop_key
```

Clone repo
```
git clone https://github.com/04Lokesh04/ai-fitness-coach.git
cd AI-fitness-coach
```
# Backend
```
cd backend
npm install
npm start
```

Runs at → http://localhost:5000

# Frontend
```
cd ai-fitness-coach
npm install
npm run dev
```

Runs at → http://localhost:5173
