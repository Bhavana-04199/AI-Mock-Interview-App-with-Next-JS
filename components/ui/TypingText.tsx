"use client";

import { useEffect, useState } from "react";

const textArray = [
  "Tell me about yourself...",
  "Why do you want this job?",
  "Explain your biggest strength.",
  "How do you solve difficult problems?",
];

export default function TypingText() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [char, setChar] = useState(0);

  useEffect(() => {
    const typing = setTimeout(() => {
      setText(textArray[index].substring(0, char + 1));
      setChar(char + 1);

      if (char === textArray[index].length) {
        setTimeout(() => {
          setChar(0);
          setIndex((index + 1) % textArray.length);
        }, 2000);
      }
    }, 70);

    return () => clearTimeout(typing);
  }, [char, index]);

  return <span className="typing-text">{text}</span>;
}
