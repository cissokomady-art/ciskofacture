"use client";

import React, { createContext, useContext, useState } from "react";

export interface DateRange {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
}

interface DateRangeContextType {
  range: DateRange;
  setRange: (range: DateRange) => void;
  resetRange: () => void;
}

const defaultRange: DateRange = {
  startDate: "",
  endDate: "",
};

const DateRangeContext = createContext<DateRangeContextType>({
  range: defaultRange,
  setRange: () => {},
  resetRange: () => {},
});

export function DateRangeProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<DateRange>(defaultRange);

  const resetRange = () => {
    setRange({ startDate: "", endDate: "" });
  };

  return (
    <DateRangeContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </DateRangeContext.Provider>
  );
}

export function useDateRange() {
  return useContext(DateRangeContext);
}
