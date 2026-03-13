"use client";

import NeuralBackground from "./components/NeuralBackground";
import TypingText from "./components/TypingText";

export default function Home() {
  return (
    <main className="main-container">

      {/* Animated AI Background */}
      <NeuralBackground />

      {/* Hero Content */}
      <div className="hero">

        <h1 className="title">
          Virtual AI Interview
        </h1>

        <p className="subtitle">
          Practice interviews with an AI powered system
        </p>

        {/* AI Typing Question */}
        <div className="ai-question">
          <TypingText />
        </div>

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
