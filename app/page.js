"use client";
import { Button } from "@/components/ui/button"; // Assuming Button is styled with Tailwind
import Image from "next/image";

export default function Home() {
  return (
    <div
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }} // Replace with your image path
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white p-6 max-w-xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
         Virtual AI Interview
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Tailored Interview Practice for AI Enthusiasts
        </p>
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          onClick={() => (window.location.href = "/sign-in")} // Redirect to dashboard
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
