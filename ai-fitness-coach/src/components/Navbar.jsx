import { useTheme } from "../state/ThemeContext";
import { FaMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";
import { GiWeightLiftingUp } from "react-icons/gi";
export default function Navbar() {
  const { dark, setDark } = useTheme();

  return (
    <nav className="sticky top-0 z-20 border-b bg-white/90 dark:bg-gray-900/90 backdrop-blur border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex flex-row">
          <GiWeightLiftingUp className="text-2xl tracking-tight text-blue-100 dark:text-gray-100"/>
          <h1 className="text-lg font-semibold tracking-tight text-blue-100 dark:text-gray-100">
            AI Fitness Coach
          </h1>
        </div>
        
        <button
          onClick={() => setDark((d) => !d)}
          className="px-3 py-1 rounded-md border text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100"
          aria-label="Toggle theme"
        >
          {dark ? <LuSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
}
