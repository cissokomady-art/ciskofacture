"use client";

import React from "react";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingPartners } from "@/components/landing/LandingPartners";
import { LandingProblem } from "@/components/landing/LandingProblem";
import { LandingFeatures } from "@/components/landing/LandingFeatures";
import { LandingTestimonials } from "@/components/landing/LandingTestimonials";
import { LandingPricing } from "@/components/landing/LandingPricing";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#18181B] flex flex-col selection:bg-brand-100 selection:text-brand-900 overflow-x-hidden">
      {/* 1. Floating Responsive Navigation Bar */}
      <LandingNavbar />

      {/* Main Landing Page Content */}
      <main className="flex-1">
        {/* 2. Hero Section with Interactive CTAs and 3D Floating Elements */}
        <LandingHero />

        {/* 3. Social Proof & African Payment Ecosystem Partners */}
        <LandingPartners />

        {/* 4. Problem & Challenges Section */}
        <LandingProblem />

        {/* 5. Bento Grid Features Section */}
        <LandingFeatures />

        {/* 6. Testimonials from African Entrepreneurs */}
        <LandingTestimonials />

        {/* 7. Transparent FCFA Pricing Plans */}
        <LandingPricing />
      </main>

      {/* 8. Comprehensive African SaaS Footer */}
      <LandingFooter />
    </div>
  );
}
