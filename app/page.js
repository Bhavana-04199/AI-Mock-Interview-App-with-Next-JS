"use client";

import Image from "next/image";
import NeuralBackground from "./components/ui/NeuralBackground";
import TypingText from "./components/ui/TypingText";

export default function Home() {
  return (
    <main className="main-container">

      {/* Animated Background */}
      <NeuralBackground />

      {/* Hero Card */}
      <div className="hero">

        {/* Logo */}
        <div className="logo-container">
          <Image
            src="/logo.png"
            alt="AI Interview Logo"
            width={80}
            height={80}
          />
        </div>

        <h1 className="title">
          Virtual AI Interview
        </h1>

        <p className="subtitle">
          Practice interviews with an AI powered system
        </p>

        {/* AI Question */}
        <div className="ai-question">
          <TypingText />
        </div>

        {/* Start Button */}
        <button
          className="start-btn"
          onClick={() => (window.location.href = "/dashboard")}
        >
          Start Interview
        </button>

      </div>

    </main>
  );
}
