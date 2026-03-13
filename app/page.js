"use client";

import AIInterviewIllustration from "./components/AIInterviewIllustration";

export default function Home() {
  return (
    <main className="hero">

      {/* Animated Background */}
      <div className="gradient-bg"></div>

      {/* Floating Particles */}
      <div className="particles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Content */}
      <div className="hero-content">

        <h1 className="hero-title">
          Virtual AI Interview
        </h1>

        <p className="hero-subtitle">
          Practice interviews with an AI-powered system and
          improve your confidence before real job interviews.
        </p>

        <button
          className="hero-btn"
          onClick={() => (window.location.href = "/dashboard")}
        >
          Get Started
        </button>

        {/* Illustration */}
        <div className="hero-illustration">
          <AIInterviewIllustration />
        </div>

      </div>

    </main>
  );
}
