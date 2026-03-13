"use client";

import NeuralBackground from "./components/ui/NeuralBackground";
import TypingText from "./components/ui/TypingText";

export default function Home() {
  return (
    <main>

      <NeuralBackground />

      <h1>Virtual AI Interview</h1>

      <TypingText />

      <button
        onClick={() => (window.location.href = "/dashboard")}
      >
        Start Interview
      </button>

    </main>
  );
}
