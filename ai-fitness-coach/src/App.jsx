import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Plans from "./pages/Plans";
import { ThemeProvider } from "./state/ThemeContext";
import { PlanProvider } from "./state/PlanContext";

export default function App() {
  return (
    <ThemeProvider>
      <PlanProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
        </Routes>
      </PlanProvider>
    </ThemeProvider>
  );
}
