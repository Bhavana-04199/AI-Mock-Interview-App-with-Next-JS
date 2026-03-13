"use client";

export default function NeuralBackground() {

  const particles = Array.from({ length: 30 });

  return (
    <div className="neural-bg">
      {particles.map((_, i) => (
        <span key={i} className="particle"></span>
      ))}
    </div>
  );
}
