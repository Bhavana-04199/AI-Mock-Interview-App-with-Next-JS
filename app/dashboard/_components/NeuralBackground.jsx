"use client";

export default function NeuralBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {Array.from({ length: 25 }).map((_, i) => (
        <span
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  );
}
