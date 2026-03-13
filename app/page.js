"use client";

import NeuralBackground from "@/components/ui/NeuralBackground";
import TypingText from "@/components/ui/TypingText";
import Image from "next/image";

export default function Home() {
  return (

    <main className="main-container">

      <NeuralBackground />

      <div className="hero">

        <Image
          src="/logo.png"
          alt="AI Interview"
          width={80}
          height={80}
        />

        <h1 className="title">
          Virtual AI Interview
        </h1>

        <p className="subtitle">
          Practice interviews with an AI powered system
        </p>

        <TypingText />

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
