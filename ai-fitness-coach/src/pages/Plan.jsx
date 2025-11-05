import Navbar from "../components/Navbar";
import QuoteCard from "../components/QuoteCard";
import DayCollapse from "../components/DayCollapse";
import ExerciseItem from "../components/ExerciseItems";
import MealItem from "../components/MealItems";

import { usePlan } from "../state/PlanContext";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { fetchPlans } from "../services/geminiText";
import { downloadPDF } from "../services/pdf";
import { playAudio } from "../services/elevenAudio";



const TABS = ["workout", "diet", "motivation"];

export default function Plans() {
  const { profile, plans, setPlans } = usePlan();
  const [active, setActive] = useState("workout");
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();
  const loc = useLocation();

  // load saved plans if requested
  useEffect(() => {
    const params = new URLSearchParams(loc.search);
    if (params.get("load") === "saved") {
      const saved = localStorage.getItem("savedPlans");
      if (saved) setPlans(JSON.parse(saved));
    }
  }, [loc.search, setPlans]);

  // generate plans if not present
  useEffect(() => {
    if (!plans) {
      if (!profile) {
        nav("/");
        return;
      }
      (async () => {
        try {
          setBusy(true);
          const data = await fetchPlans(profile);
          setPlans(data);
        } catch (e) {
          console.error(e);
          alert("Failed to generate plans.");
        } finally {
          setBusy(false);
        }
      })();
    }
  }, [plans, setPlans, profile, nav]);

  const onSave = () => {
    if (!plans) return;
    localStorage.setItem("savedPlans", JSON.stringify(plans));
    alert("Saved to device.");
  };

  const onRegenerate = async () => {
    if (!profile) return;
    try {
      setBusy(true);
      const data = await fetchPlans(profile);
      setPlans(data);
      setActive("workout");
    } catch (e) {
      console.error(e);
      alert("Regenerate failed.");
    } finally {
      setBusy(false);
    }
  };

  const onDownload = async () => {
    await downloadPDF("plans-root");
  };

  const speakWorkout = () => {
    if (!plans) return;
    playAudio(flattenWorkout(plans));
  };
  const speakDiet = () => {
    if (!plans) return;
    playAudio(flattenDiet(plans));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar />
      <QuoteCard />

      <main className="max-w-5xl mx-auto px-4 py-6" >
        <div className="mb-3 flex flex-wrap gap-2">
          <button onClick={onSave} className="px-3 py-2 rounded bg-emerald-600 text-white">
            Save
          </button>
          <button
            onClick={onRegenerate}
            disabled={busy}
            className="px-3 py-2 rounded bg-amber-600 text-white disabled:opacity-60"
          >
            Regenerate
          </button>
          <button onClick={onDownload} className="px-3 py-2 rounded bg-sky-600 text-white">
            Download PDF
          </button>
        </div>

        {/* Tabs */}
        <div className="flex w-full rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 mb-4">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              disabled={active === t}
              className={`flex-1 px-4 py-2 text-center transition
                  ${
                    active === t
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  }
                `}
            >
              {t === "workout" ? "Workout Plan" : t === "diet" ? "Diet Plan" : "Motivation"}
            </button>
          ))}
        </div>

        {busy && <p className="opacity-80 text-center mt-2.5">Generating plans…</p>}

        {!busy && plans && (
          <>
            <div id="plans-root">
              {active === "workout" && <WorkoutView plans={plans} />}
              {active === "diet" && <DietView plans={plans} />}
              {active === "motivation" && <MotivationView plans={plans} />}
            </div>
            <div className="mt-4 flex gap-2">
              {active === "workout" && (
                <button
                  onClick={speakWorkout}
                  className="px-3 py-2 rounded bg-blue-600 text-white"
                >
                  🔊 Read Workout
                </button>
              )}
              {active === "diet" && (
                <button
                  onClick={speakDiet}
                  className="px-3 py-2 rounded bg-blue-600 text-white"
                >
                  🔊 Read Diet
                </button>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function WorkoutView({ plans }) {
  return (
    <div className="grid gap-3">
      {plans.workoutByDay.map((day) => (
        <DayCollapse key={day.day} title={`Day ${day.day}`} defaultOpen={day.day === 1}>
          <ul className="grid gap-3">
            {day.exercises.map((ex, i) => (
              <ExerciseItem key={i} ex={ex} />
            ))}
            {day.notes && <li className="text-sm opacity-80">{day.notes}</li>}
          </ul>
        </DayCollapse>
      ))}
    </div>
  );
}

function DietView({ plans }) {
  return (
    <div className="grid gap-3">
      {plans.dietByDay.map((day) => (
        <DayCollapse key={day.day} title={`Day ${day.day}`} defaultOpen={day.day === 1}>
          <MealItem label="Breakfast" value={day.breakfast} />
          <MealItem label="Lunch" value={day.lunch} />
          <MealItem label="Snacks" value={day.snacks} />
          <MealItem label="Dinner" value={day.dinner} />
        </DayCollapse>
      ))}
    </div>
  );
}

function MotivationView({ plans }) {
  return (
    <div className="grid gap-3">
      {plans.tips.map((t, i) => (
        <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-800 p-3">
          {t}
        </div>
      ))}
    </div>
  );
}

// helpers to TTS
function flattenWorkout(plans) {
  return plans.workoutByDay
    .map(
      (d) =>
        `Day ${d.day}: ` +
        d.exercises
          .map((e) => `${e.name} ${e.sets}x${e.reps}, rest ${e.rest}`)
          .join("; ")
    )
    .join(". ");
}

function flattenDiet(plans) {
  return plans.dietByDay
    .map(
      (d) =>
        `Day ${d.day}: Breakfast ${d.breakfast}; Lunch ${d.lunch}; Snacks ${d.snacks}; Dinner ${d.dinner}`
    )
    .join(". ");
}
