import React from "react";
import { formatFCFA } from "@/lib/format/currency";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Clock, AlertTriangle, CheckCircle2, FileSpreadsheet } from "lucide-react";

export interface StatCardProps {
  title: string;
  amount: number;
  subtitle?: string;
  trendPercentage?: number;
  trendLabel?: string;
  isPositive?: boolean;
  type?: "revenue" | "pending" | "overdue" | "total";
  className?: string;
}

export function StatCard({
  title,
  amount,
  subtitle,
  trendPercentage,
  trendLabel,
  isPositive = true,
  type = "revenue",
  className,
}: StatCardProps) {
  // Styles et icônes en fonction du type de métrique
  const typeConfig = {
    revenue: {
      icon: CheckCircle2,
      iconContainer: "bg-emerald-50 text-emerald-600 border border-emerald-100/80",
    },
    pending: {
      icon: Clock,
      iconContainer: "bg-amber-50 text-amber-600 border border-amber-100/80",
    },
    overdue: {
      icon: AlertTriangle,
      iconContainer: "bg-rose-50 text-rose-600 border border-rose-100/80",
    },
    total: {
      icon: FileSpreadsheet,
      iconContainer: "bg-brand-50 text-brand-700 border border-brand-100/80",
    },
  }[type];

  const Icon = typeConfig.icon;

  return (
    <div
      className={cn(
        "group relative bg-white border border-gray-200/90 rounded-xl p-4 sm:p-4.5 shadow-card hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col justify-between min-h-[132px] sm:min-h-[138px] w-full min-w-0",
        className
      )}
    >
      <div>
        {/* Header de la carte : Titre et Icône */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[12px] sm:text-xs font-semibold text-gray-500 leading-tight truncate">
            {title}
          </span>
          <div className={cn("w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-[8px] flex items-center justify-center flex-shrink-0", typeConfig.iconContainer)}>
            <Icon className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Montant principal en FCFA (police légèrement diminuée et plus élégante) */}
        <div className="my-1">
          <div className="text-base sm:text-lg lg:text-[19px] font-bold text-gray-900 tracking-tight whitespace-nowrap font-sans">
            {formatFCFA(amount)}
          </div>
        </div>
      </div>

      {/* Footer de la carte : Tendance & Sous-titre */}
      <div className="pt-2 mt-1.5 border-t border-gray-100 flex items-center justify-between text-[11px] gap-2 flex-wrap sm:flex-nowrap">
        {trendPercentage !== undefined ? (
          <div className="flex items-center gap-1.5 min-w-0">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[5px] font-semibold text-[10.5px] whitespace-nowrap shrink-0",
                isPositive
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                  : "bg-rose-50 text-rose-700 border border-rose-200/60"
              )}
            >
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {trendPercentage > 0 ? `+${trendPercentage}%` : `${trendPercentage}%`}
            </span>
            {trendLabel && <span className="text-gray-400 truncate whitespace-nowrap text-[10.5px]">{trendLabel}</span>}
          </div>
        ) : (
          <span className="text-gray-400 whitespace-nowrap text-[10.5px]">{trendLabel || "Ce mois-ci"}</span>
        )}

        {subtitle && (
          <span className="text-gray-500 font-medium truncate text-right text-[10.5px] sm:text-[11px]">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
