import Navbar from "../components/Navbar";
import QuoteCard from "../components/QuoteCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePlan } from "../state/PlanContext";

const GOALS = ["Weight Loss", "Muscle Gain", "Endurance", "General Fitness"];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const LOCATIONS = ["Home", "Gym", "Outdoor"];
const DIETS = ["Veg", "Non-Veg", "Vegan", "Keto"];

export default function Home() {
  const nav = useNavigate();
  const { setProfile } = usePlan();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: "",
    level: "",
    location: "",
    diet: "",
    stress: "",
    medical: "",
  });

  const change = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.goal || !form.level || !form.location || !form.diet) {
      alert("Please select Goal, Level, Location, and Diet.");
      return;
    }
    setProfile(form);
    nav("/plans");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar />
      <QuoteCard />

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-5">
          <h2 className="text-xl font-semibold mb-4">Your Details</h2>

          <form onSubmit={submit} className="grid gap-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Input label="Name" name="name" value={form.name} onChange={change} />
              <Input type="number" label="Age" name="age" value={form.age} onChange={change} />
              <Input label="Gender" name="gender" value={form.gender} onChange={change} placeholder="Male / Female / Other" />
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <Input type="number" label="Height (cm)" name="height" value={form.height} onChange={change} />
              <Input type="number" label="Weight (kg)" name="weight" value={form.weight} onChange={change} />
              <Select label="Fitness Goal" name="goal" value={form.goal} onChange={change} options={GOALS} />
              <Select label="Current Level" name="level" value={form.level} onChange={change} options={LEVELS} />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Select label="Workout Location" name="location" value={form.location} onChange={change} options={LOCATIONS} />
              <Select label="Diet Preference" name="diet" value={form.diet} onChange={change} options={DIETS} />
              <Input label="Stress Level (1-10)" name="stress" value={form.stress} onChange={change} />
            </div>

            <div>
              <label className="text-sm font-medium">Medical History</label>
              <textarea
                name="medical"
                value={form.medical}
                onChange={change}
                placeholder="e.g., knee pain, diabetes"
                className="mt-1 w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 h-24"
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded bg-blue-600 text-white">
                Get Plan
              </button>
              <button
                type="button"
                onClick={() => nav("/plans?load=saved")}
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700"
              >
                View Saved Plans
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        className="mt-1 w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <select
        {...props}
        className="mt-1 w-full rounded border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
