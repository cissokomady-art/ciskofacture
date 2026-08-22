"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { formatDateNumeric } from "@/lib/format/date";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Check,
  ArrowRight,
  X,
} from "lucide-react";

export interface DateRange {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
}

interface DateRangePickerProps {
  range: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

const MONTH_NAMES = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const DAYS_SHORT = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];

export function DateRangePicker({
  range,
  onChange,
  className,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Current view month/year in calendar popover
  const initialDate = range.startDate ? new Date(range.startDate) : new Date();
  const [viewYear, setViewYear] = useState(initialDate.getFullYear() || 2026);
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth() || 1); // 0-indexed

  // Local selection state while picking
  const [selectingStart, setSelectingStart] = useState<string | null>(range.startDate);
  const [selectingEnd, setSelectingEnd] = useState<string | null>(range.endDate);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  // Synchronize when external range changes
  useEffect(() => {
    setSelectingStart(range.startDate);
    setSelectingEnd(range.endDate);
  }, [range]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Quick preset shortcuts
  const applyPreset = (type: "this_month" | "last_30" | "last_7" | "last_month" | "this_year" | "all") => {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();

    if (type === "this_month") {
      const start = new Date(y, m, 1);
      const end = new Date(y, m + 1, 0);
      const sStr = start.toISOString().split("T")[0];
      const eStr = end.toISOString().split("T")[0];
      setSelectingStart(sStr);
      setSelectingEnd(eStr);
      onChange({ startDate: sStr, endDate: eStr });
      setViewYear(y);
      setViewMonth(m);
      setIsOpen(false);
    } else if (type === "last_30") {
      const end = today;
      const start = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      const sStr = start.toISOString().split("T")[0];
      const eStr = end.toISOString().split("T")[0];
      setSelectingStart(sStr);
      setSelectingEnd(eStr);
      onChange({ startDate: sStr, endDate: eStr });
      setIsOpen(false);
    } else if (type === "last_7") {
      const end = today;
      const start = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const sStr = start.toISOString().split("T")[0];
      const eStr = end.toISOString().split("T")[0];
      setSelectingStart(sStr);
      setSelectingEnd(eStr);
      onChange({ startDate: sStr, endDate: eStr });
      setIsOpen(false);
    } else if (type === "last_month") {
      const start = new Date(y, m - 1, 1);
      const end = new Date(y, m, 0);
      const sStr = start.toISOString().split("T")[0];
      const eStr = end.toISOString().split("T")[0];
      setSelectingStart(sStr);
      setSelectingEnd(eStr);
      onChange({ startDate: sStr, endDate: eStr });
      setViewYear(start.getFullYear());
      setViewMonth(start.getMonth());
      setIsOpen(false);
    } else if (type === "this_year") {
      const start = new Date(y, 0, 1);
      const end = new Date(y, 11, 31);
      const sStr = start.toISOString().split("T")[0];
      const eStr = end.toISOString().split("T")[0];
      setSelectingStart(sStr);
      setSelectingEnd(eStr);
      onChange({ startDate: sStr, endDate: eStr });
      setIsOpen(false);
    } else if (type === "all") {
      setSelectingStart("");
      setSelectingEnd("");
      onChange({ startDate: "", endDate: "" });
      setIsOpen(false);
    }
  };

  // Month navigation
  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  // Calendar Day Click Handler
  const handleDateClick = (dateStr: string) => {
    if (!selectingStart || (selectingStart && selectingEnd)) {
      // Start a new range
      setSelectingStart(dateStr);
      setSelectingEnd(null);
    } else if (selectingStart && !selectingEnd) {
      // Pick end date
      if (dateStr < selectingStart) {
        setSelectingStart(dateStr);
        setSelectingEnd(selectingStart);
        onChange({ startDate: dateStr, endDate: selectingStart });
      } else {
        setSelectingEnd(dateStr);
        onChange({ startDate: selectingStart, endDate: dateStr });
      }
    }
  };

  // Build calendar matrix for current viewMonth/viewYear
  const getDaysMatrix = () => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const lastDay = new Date(viewYear, viewMonth + 1, 0);
    const daysInMonth = lastDay.getDate();

    // In JS, 0 is Sunday, 1 is Monday... convert to Monday = 0
    let startDayOfWeek = firstDay.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const matrix: Array<{ day: number; dateStr: string; isCurrentMonth: boolean }> = [];

    // Previous month padding
    const prevMonthLastDay = new Date(viewYear, viewMonth, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const d = prevMonthLastDay - i;
      const m = viewMonth === 0 ? 11 : viewMonth - 1;
      const y = viewMonth === 0 ? viewYear - 1 : viewYear;
      const dateStr = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      matrix.push({ day: d, dateStr, isCurrentMonth: false });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      matrix.push({ day: d, dateStr, isCurrentMonth: true });
    }

    // Next month padding to complete 35 or 42 grid cells
    const remaining = 35 - matrix.length > 0 ? 35 - matrix.length : (42 - matrix.length > 0 ? 42 - matrix.length : 0);
    for (let d = 1; d <= remaining; d++) {
      const m = viewMonth === 11 ? 0 : viewMonth + 1;
      const y = viewMonth === 11 ? viewYear + 1 : viewYear;
      const dateStr = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      matrix.push({ day: d, dateStr, isCurrentMonth: false });
    }

    return matrix;
  };

  const daysMatrix = getDaysMatrix();

  const isRangeActive = Boolean(range.startDate || range.endDate);

  return (
    <div className={cn("relative inline-block", className)} ref={containerRef}>
      {/* Notion-style Trigger Button: Two segments (Date de départ & Date d'arrivée) */}
      <div className="flex items-center gap-1.5 p-1 bg-white hover:bg-gray-50 border border-gray-200/90 hover:border-gray-300 rounded-[9px] shadow-2xs transition-all duration-150">
        {/* Bouton Date de Départ */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            if (range.startDate) {
              const d = new Date(range.startDate);
              setViewYear(d.getFullYear());
              setViewMonth(d.getMonth());
            }
          }}
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[7px] text-xs font-semibold transition cursor-pointer whitespace-nowrap",
            range.startDate
              ? "bg-brand-50 text-brand-900 border border-brand-200/80"
              : "text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
          )}
          title="Date de départ"
        >
          <CalendarIcon className="w-3.5 h-3.5 text-brand-600 shrink-0" />
          <span className="text-[11px] text-gray-400 font-normal">Du :</span>
          <span className="font-mono font-bold">
            {range.startDate ? formatDateNumeric(range.startDate) : "Début"}
          </span>
        </button>

        <span className="text-gray-300 text-xs">➔</span>

        {/* Bouton Date d'Arrivée */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            if (range.endDate) {
              const d = new Date(range.endDate);
              setViewYear(d.getFullYear());
              setViewMonth(d.getMonth());
            }
          }}
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[7px] text-xs font-semibold transition cursor-pointer whitespace-nowrap",
            range.endDate
              ? "bg-brand-50 text-brand-900 border border-brand-200/80"
              : "text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
          )}
          title="Date d'arrivée"
        >
          <span className="text-[11px] text-gray-400 font-normal">Au :</span>
          <span className="font-mono font-bold">
            {range.endDate ? formatDateNumeric(range.endDate) : "Fin"}
          </span>
        </button>

        {/* Clear reset button if filtered */}
        {isRangeActive && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              applyPreset("all");
            }}
            title="Réinitialiser la période (Tout afficher)"
            className="p-1 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-[5px] transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Notion-Style Popover Modal */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50 bg-white border border-gray-200/90 rounded-2xl shadow-2xl p-4 sm:p-5 w-[330px] sm:w-[480px] animate-in fade-in zoom-in-95 duration-150">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            {/* Left side: Quick Period Presets */}
            <div className="sm:w-36 space-y-1 pb-3 sm:pb-0 border-b sm:border-b-0 sm:border-r border-gray-100 pr-0 sm:pr-3 shrink-0">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                Raccourcis
              </span>
              {[
                { id: "this_month", label: "Ce mois-ci" },
                { id: "last_30", label: "30 derniers jours" },
                { id: "last_7", label: "7 derniers jours" },
                { id: "last_month", label: "Mois dernier" },
                { id: "this_year", label: "Année 2026" },
                { id: "all", label: "Toutes les dates" },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => applyPreset(p.id as any)}
                  className="w-full text-left px-2.5 py-1.5 text-xs font-semibold rounded-[7px] hover:bg-brand-50 hover:text-brand-700 text-gray-600 transition cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Right side: Interactive Calendar Grid */}
            <div className="flex-1 min-w-0">
              {/* Calendar Month Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-900 tracking-tight">
                  {MONTH_NAMES[viewMonth]} {viewYear}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={prevMonth}
                    className="p-1 rounded-[6px] hover:bg-gray-100 text-gray-600 transition cursor-pointer"
                    aria-label="Mois précédent"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextMonth}
                    className="p-1 rounded-[6px] hover:bg-gray-100 text-gray-600 transition cursor-pointer"
                    aria-label="Mois suivant"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Day Headers (Lu, Ma, Me...) */}
              <div className="grid grid-cols-7 gap-1 text-center mb-1">
                {DAYS_SHORT.map((d) => (
                  <span key={d} className="text-[10px] font-bold text-gray-400">
                    {d}
                  </span>
                ))}
              </div>

              {/* Day Cells Grid */}
              <div className="grid grid-cols-7 gap-1">
                {daysMatrix.map(({ day, dateStr, isCurrentMonth }) => {
                  const isSelectedStart = selectingStart === dateStr;
                  const isSelectedEnd = selectingEnd === dateStr;
                  const isInRange =
                    selectingStart &&
                    selectingEnd &&
                    dateStr > selectingStart &&
                    dateStr < selectingEnd;

                  const isHoverInRange =
                    selectingStart &&
                    !selectingEnd &&
                    hoveredDate &&
                    dateStr > selectingStart &&
                    dateStr <= hoveredDate;

                  return (
                    <button
                      key={dateStr}
                      type="button"
                      onClick={() => handleDateClick(dateStr)}
                      onMouseEnter={() => setHoveredDate(dateStr)}
                      className={cn(
                        "h-7 text-xs rounded-[6px] font-medium transition-all duration-100 flex items-center justify-center cursor-pointer",
                        !isCurrentMonth && "text-gray-300",
                        isCurrentMonth && "text-gray-700 hover:bg-gray-100",
                        (isSelectedStart || isSelectedEnd) &&
                          "bg-brand-600 text-white font-bold hover:bg-brand-700 shadow-2xs",
                        (isInRange || isHoverInRange) &&
                          "bg-brand-50 text-brand-900 font-semibold rounded-none"
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Bottom status / apply */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <div className="text-[11px] text-gray-500 font-mono">
                  {selectingStart ? formatDateNumeric(selectingStart) : "..."} ➔{" "}
                  {selectingEnd ? formatDateNumeric(selectingEnd) : "..."}
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-[8px] transition cursor-pointer shadow-2xs"
                >
                  Appliquer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
