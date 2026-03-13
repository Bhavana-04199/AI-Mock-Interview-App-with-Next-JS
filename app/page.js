"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
return ( <div className="relative flex items-center justify-center h-screen overflow-hidden bg-black">

```
  {/* Animated Gradient Background */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-black to-purple-900 animate-gradient"></div>

  {/* Floating Circles Animation */}
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

  {/* Custom Animation Styles */}
  <style jsx>{`
    .animate-gradient {
      background-size: 400% 400%;
      animation: gradientMove 12s ease infinite;
    }

    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .circle {
      position: absolute;
      display: block;
      width: 120px;
      height: 120px;
      background: rgba(255,255,255,0.05);
      animation: float 25s linear infinite;
      bottom: -150px;
      border-radius: 50%;
    }

    .circle:nth-child(1) {
      left: 25%;
      width: 80px;
      height: 80px;
      animation-delay: 0s;
    }

    .circle:nth-child(2) {
      left: 10%;
      width: 150px;
      height: 150px;
      animation-delay: 2s;
      animation-duration: 20s;
    }

    .circle:nth-child(3) {
      left: 70%;
      width: 100px;
      height: 100px;
      animation-delay: 4s;
    }

    .circle:nth-child(4) {
      left: 40%;
      width: 200px;
      height: 200px;
      animation-delay: 0s;
      animation-duration: 18s;
    }

    .circle:nth-child(5) {
      left: 65%;
      width: 120px;
      height: 120px;
      animation-delay: 3s;
    }

    @keyframes float {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      100% {
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
      }
    }
  `}</style>
</div>
```

);
}
