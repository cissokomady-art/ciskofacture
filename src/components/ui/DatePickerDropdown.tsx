"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
} from "lucide-react";

interface DatePickerDropdownProps {
  initialDate?: Date;
  onSelectDate?: (date: Date) => void;
  className?: string;
}

const MONTH_NAMES_FR = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];

export function DatePickerDropdown({
  initialDate = new Date(2026, 1, 22), // 22 Février 2026
  onSelectDate,
  className,
}: DatePickerDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [viewDate, setViewDate] = useState<Date>(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
  const [periodLabel, setPeriodLabel] = useState<string>("Février 2026");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  // Navigation mois
  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Calcul du calendrier
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7; // Lundi = 0

  const handleSelectDay = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
    setPeriodLabel(`${day} ${MONTH_NAMES_FR[currentMonth].slice(0, 4)}. ${currentYear}`);
    if (onSelectDate) onSelectDate(newDate);
    setIsOpen(false);
  };

  const handleSelectPreset = (preset: "thisMonth" | "lastMonth" | "quarter" | "year") => {
    if (preset === "thisMonth") {
      const d = new Date(2026, 1, 22);
      setSelectedDate(d);
      setViewDate(new Date(2026, 1, 1));
      setPeriodLabel("Février 2026");
    } else if (preset === "lastMonth") {
      const d = new Date(2026, 0, 31);
      setSelectedDate(d);
      setViewDate(new Date(2026, 0, 1));
      setPeriodLabel("Janvier 2026");
    } else if (preset === "quarter") {
      const d = new Date(2026, 2, 31);
      setSelectedDate(d);
      setViewDate(new Date(2026, 2, 1));
      setPeriodLabel("1er Trimestre 2026");
    } else if (preset === "year") {
      const d = new Date(2026, 11, 31);
      setSelectedDate(d);
      setViewDate(new Date(2026, 1, 1));
      setPeriodLabel("Année 2026");
    }
    setIsOpen(false);
  };

  // Progress ratio in the month (e.g. 22 / 28)
  const progressRatio = Math.min(100, Math.round((selectedDate.getDate() / daysInMonth) * 100));

  return (
    <div className={cn("relative inline-block text-left", className)} ref={dropdownRef}>
      {/* 1. Bouton Déclencheur dans la TopNav */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1.5 bg-white border text-xs font-medium rounded-[8px] transition-all duration-150 cursor-pointer shadow-2xs shrink-0",
          isOpen
            ? "border-brand-600 ring-2 ring-brand-500/20 text-brand-900 bg-brand-50/30"
            : "border-gray-200/90 text-gray-700 hover:border-gray-300 hover:bg-gray-50/80"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <CalendarIcon className="w-3.5 h-3.5 text-brand-600 shrink-0" />
        <span className="whitespace-nowrap font-semibold text-gray-800">{periodLabel}</span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-gray-400 transition-transform duration-200 shrink-0",
            isOpen && "rotate-180 text-brand-600"
          )}
        />
      </button>

      {/* 2. Popover Calendrier Inspiré du Design Uploadé */}
      {isOpen && (
        <div className="absolute right-0 mt-2 z-50 w-80 bg-white border border-gray-200/90 rounded-2xl shadow-2xl p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
          {/* Header du Calendrier (Inspiration visuelle exacte) */}
          <div className="flex items-start justify-between">
            <div className="space-y-0.5">
              {/* Grand numéro du jour sélectionné */}
              <div className="text-3xl font-black text-gray-900 tracking-tight leading-none font-sans">
                {selectedDate.getDate()}
              </div>
              {/* Nom du mois et année */}
              <div className="text-sm font-semibold text-gray-500 capitalize">
                {MONTH_NAMES_FR[currentMonth]} {currentYear}
              </div>
            </div>

            {/* Icône Calendrier 3D stylisée (comme dans l'image de référence) */}
            <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-md p-1 flex flex-col justify-between overflow-hidden">
              {/* Barre rouge bordeaux du haut */}
              <div className="h-2 w-full bg-brand-600 rounded-t-[4px]" />
              {/* Grille de points */}
              <div className="grid grid-cols-5 gap-0.5 px-1 pb-1">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-1 h-1 rounded-full",
                      i === 7 ? "bg-brand-600" : "bg-gray-300"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Barre de progression segmentée (Inspiration de l'image) */}
          <div className="flex items-center gap-1">
            <div className="h-1 flex-1 bg-brand-600 rounded-[2px]" />
            <div
              className={cn(
                "h-1 flex-1 rounded-[2px] transition-colors",
                progressRatio > 40 ? "bg-brand-600" : "bg-gray-200"
              )}
            />
            <div
              className={cn(
                "h-1 flex-1 rounded-[2px] transition-colors",
                progressRatio > 75 ? "bg-brand-600" : "bg-gray-200"
              )}
            />
            <div className="h-1 flex-1 bg-gray-200 rounded-[2px]" />
          </div>

          {/* Navigation Mois (Précédent / Suivant) */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-bold text-gray-800">
              {MONTH_NAMES_FR[currentMonth]} {currentYear}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1 rounded-[6px] text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition cursor-pointer"
                title="Mois précédent"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1 rounded-[6px] text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition cursor-pointer"
                title="Mois suivant"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Grille des Jours de la Semaine */}
          <div className="grid grid-cols-7 text-center text-[11px] font-bold text-gray-400 tracking-wider">
            {WEEKDAYS.map((wd, index) => (
              <div key={index} className="py-1">
                {wd}
              </div>
            ))}
          </div>

          {/* Grille des Jours du Mois */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {/* Cases vides pour le début du mois */}
            {[...Array(firstDayIndex)].map((_, i) => (
              <div key={`empty-${i}`} className="h-8 w-8" />
            ))}

            {/* Jours du mois */}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const isSelected =
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === currentMonth &&
                selectedDate.getFullYear() === currentYear;

              const isToday =
                new Date().getDate() === day &&
                new Date().getMonth() === currentMonth &&
                new Date().getFullYear() === currentYear;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={cn(
                    "h-8 w-8 mx-auto flex items-center justify-center rounded-[7px] text-xs font-semibold transition-all duration-150 cursor-pointer relative",
                    isSelected
                      ? "bg-brand-600 text-white shadow-sm shadow-brand-800/30 scale-105 font-bold"
                      : "text-gray-700 hover:bg-brand-50 hover:text-brand-700",
                    isToday && !isSelected && "border border-brand-300 font-bold text-brand-700"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Raccourcis Périodes Rapides (Presets) */}
          <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-1.5 text-[11px]">
            <button
              type="button"
              onClick={() => handleSelectPreset("thisMonth")}
              className="py-1.5 px-2 bg-gray-50 hover:bg-brand-50 hover:text-brand-700 text-gray-600 rounded-[6px] font-medium transition text-center cursor-pointer"
            >
              Ce mois-ci
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset("lastMonth")}
              className="py-1.5 px-2 bg-gray-50 hover:bg-brand-50 hover:text-brand-700 text-gray-600 rounded-[6px] font-medium transition text-center cursor-pointer"
            >
              Mois dernier
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset("quarter")}
              className="py-1.5 px-2 bg-gray-50 hover:bg-brand-50 hover:text-brand-700 text-gray-600 rounded-[6px] font-medium transition text-center cursor-pointer"
            >
              Ce trimestre
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset("year")}
              className="py-1.5 px-2 bg-gray-50 hover:bg-brand-50 hover:text-brand-700 text-gray-600 rounded-[6px] font-medium transition text-center cursor-pointer"
            >
              Année 2026
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
