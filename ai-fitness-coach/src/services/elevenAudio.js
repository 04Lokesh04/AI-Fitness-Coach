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


let voices = [];

function loadVoices() {
  voices = speechSynthesis.getVoices();
  if (!voices.length) {
    speechSynthesis.onvoiceschanged = () => {
      voices = speechSynthesis.getVoices();
    };
  }
}
loadVoices();

export function playAudio(text, options = {}) {
  if (!text) return;

  const {
    rate = 1.0,     
    pitch = 1.0,    
    lang = "en-US", 
    preferredVoice = "Google UK English Male", 
  } = options;

  speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = rate;
  utter.pitch = pitch;
  utter.lang = lang;

  const match = voices.find(v => v.name.includes(preferredVoice));
  if (match) {
    utter.voice = match;
  } else if (voices.length > 0) {
    utter.voice =
      voices.find(v => v.lang.startsWith("en")) || voices[0];
  }

  speechSynthesis.speak(utter);
}
