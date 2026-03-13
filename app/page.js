"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="hero-container">

      {/* Animated Gradient Background */}
      <div className="gradient-bg"></div>

      {/* Animated Particles */}
      <div className="particles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* AI Interview Illustration */}
      <div className="ai-illustration">

        {/* Human */}
        <div className="human">
          <div className="head"></div>
          <div className="body"></div>
        </div>

        {/* Robot */}
        <div className="robot">
          <div className="robot-head">
            <div className="eye"></div>
            <div className="eye"></div>
          </div>
          <div className="robot-body"></div>
        </div>

        {/* Table */}
        <div className="table"></div>

      </div>

      {/* Content */}
      <div className="hero-content">

        <h1 className="title">
          Virtual AI Interview
        </h1>

        <p className="subtitle">
          Practice real interviews with AI-powered questions and instant feedback
        </p>

        <Button
          className="start-btn"
          onClick={() => (window.location.href = "/dashboard")}
        >
          Start Interview
        </Button>

      </div>
    </div>
  );
}
