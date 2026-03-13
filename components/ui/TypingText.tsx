"use client";

import { useEffect, useState } from "react";

const questions = [
  "Tell me about yourself",
  "Why should we hire you?",
  "Explain your biggest strength",
  "Describe a challenging project"
];

export default function TypingText() {

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [char, setChar] = useState(0);

  useEffect(() => {

    if (char < questions[index].length) {

      const timer = setTimeout(() => {
        setText((prev) => prev + questions[index][char]);
        setChar(char + 1);
      }, 60);

      return () => clearTimeout(timer);
    }

    const reset = setTimeout(() => {
      setText("");
      setChar(0);
      setIndex((index + 1) % questions.length);
    }, 2000);

    return () => clearTimeout(reset);

  }, [char, index]);

  return (
    <p className="typing-text">{text}</p>
  );
}
