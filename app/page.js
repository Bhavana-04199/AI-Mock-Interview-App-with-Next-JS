"use client";

import NeuralBackground from "./components/ui/NeuralBackground";
import TypingText from "./components/ui/TypingText";

export default function Home() {
  return (
    <main className="main-container">

      <NeuralBackground />

      <div className="hero">

        <h1 className="title">
          Virtual AI Interview
        </h1>

        <p className="subtitle">
          Practice interviews with an AI powered system
        </p>

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
