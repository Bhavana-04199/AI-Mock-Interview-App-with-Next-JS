"use client";

import { useEffect, useState } from "react";

const questions = [
  "Tell me about yourself",
  "Why should we hire you?",
  "Explain a challenging project you worked on",
  "What are your strengths?",
];

export default function TypingText() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < questions[index].length) {
      const timer = setTimeout(() => {
        setText((prev) => prev + questions[index][charIndex]);
        setCharIndex(charIndex + 1);
      }, 60);

      return () => clearTimeout(timer);
    }

    const reset = setTimeout(() => {
      setText("");
      setCharIndex(0);
      setIndex((index + 1) % questions.length);
    }, 2000);

    return () => clearTimeout(reset);
  }, [charIndex, index]);

  return (
    <p className="text-blue-500 text-lg mt-4 min-h-[30px]">
      {text}
    </p>
  );
}
