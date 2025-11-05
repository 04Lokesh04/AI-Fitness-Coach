// const API = import.meta.env.VITE_API_BASE;

// export async function playAudio(text) {
//   const res = await fetch(`${API}/api/generateAudio`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ text }),
//   });

//   if (!res.ok) throw new Error("Audio generation failed");

//   const blob = await res.blob();
//   const url = URL.createObjectURL(blob);

//   const audio = new Audio(url);
//   audio.play();
// }


// ✅ Browser TTS — NO backend required

let voices = [];

function loadVoices() {
  voices = speechSynthesis.getVoices();
  if (!voices.length) {
    // Voices may not be loaded yet — wait for event
    speechSynthesis.onvoiceschanged = () => {
      voices = speechSynthesis.getVoices();
    };
  }
}
loadVoices();

export function playAudio(text, options = {}) {
  if (!text) return;

  const {
    rate = 1.0,     // 0.5 (slow) → 2.0 (fast)
    pitch = 1.0,    // 0 (low) → 2 (high)
    lang = "en-US", // language
    preferredVoice = "Google UK English Male", // fallback voice name
  } = options;

  // Stop existing speech
  speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = rate;
  utter.pitch = pitch;
  utter.lang = lang;

  // 🎤 Try selecting a good voice
  const match = voices.find(v => v.name.includes(preferredVoice));
  if (match) {
    utter.voice = match;
  } else if (voices.length > 0) {
    // fallback — first English voice
    utter.voice =
      voices.find(v => v.lang.startsWith("en")) || voices[0];
  }

  speechSynthesis.speak(utter);
}
