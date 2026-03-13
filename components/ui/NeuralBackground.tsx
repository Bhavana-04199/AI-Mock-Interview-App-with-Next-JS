"use client";

export default function NeuralBackground() {
  return (
    <div>
      {Array.from({ length: 40 }).map((_, i) => (
        <span key={i}>•</span>
      ))}
    </div>
  );
}
