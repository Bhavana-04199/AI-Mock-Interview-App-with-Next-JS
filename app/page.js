"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import NeuralBackground from ".dashboard/_components/NeuralBackground";
import TypingText from ".dashboard/_components/TypingText";

export default function Home() {
  const router = useRouter();

  return (
    <main className="relative flex items-center justify-center min-h-screen bg-slate-950 text-white">

      {/* Animated Background */}
      <NeuralBackground />

      {/* Card */}
      <div className="bg-slate-900 p-10 rounded-xl shadow-lg text-center max-w-xl">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/logo.svg"
            alt="AI Interview"
            width={80}
            height={80}
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold">
          Virtual AI Interview
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 mt-2">
          Practice interviews with an AI powered system
        </p>

        {/* AI Question */}
        <TypingText />

        {/* Start Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Start Interview
        </button>

      </div>
    </main>
  );
}
