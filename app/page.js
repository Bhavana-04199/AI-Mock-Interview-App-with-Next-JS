"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden bg-black">

      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-black to-purple-900 animate-gradient"></div>

      {/* Floating Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <span className="circle"></span>
        <span className="circle"></span>
        <span className="circle"></span>
        <span className="circle"></span>
        <span className="circle"></span>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Virtual AI Interview
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Tailored Interview Practice for AI Enthusiasts
        </p>

        <Button
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg rounded-lg shadow-lg transition"
          onClick={() => (window.location.href = "/dashboard")}
        >
          Get Started
        </Button>
      </div>

    </div>
  );
}
