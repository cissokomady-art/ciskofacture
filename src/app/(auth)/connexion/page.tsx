"use client";

import React, { Suspense } from "react";
import { AuthFormTabs } from "@/components/auth/AuthFormTabs";

export default function ConnexionPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-gray-400">Chargement...</div>}>
      <AuthFormTabs defaultTab="login" />
    </Suspense>
  );
}
