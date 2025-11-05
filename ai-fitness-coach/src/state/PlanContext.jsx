// import { createContext, useContext, useState } from "react";

// const PlanCtx = createContext();

// export function PlanProvider({ children }) {
//   const [profile, setProfile] = useState(null);
//   const [plans, setPlans] = useState(null);
//   const [quote, setQuote] = useState(null);

//   return (
//     <PlanCtx.Provider value={{ profile, setProfile, plans, setPlans, quote, setQuote }}>
//       {children}
//     </PlanCtx.Provider>
//   );
// }

// export const usePlan = () => useContext(PlanCtx);

import { createContext, useContext, useState } from "react";

export const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [plans, setPlans] = useState(null);
  const [quote, setQuote] = useState(null);

  return (
    <PlanContext.Provider
      value={{
        profile,
        setProfile,
        plans,
        setPlans,
        quote,
        setQuote,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}
