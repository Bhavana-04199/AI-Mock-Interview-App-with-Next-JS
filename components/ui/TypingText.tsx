"use client";

import { useState, useEffect } from "react";

export default function TypingText() {

  const questions = [
    "Tell me about yourself",
    "Why should we hire you",
    "What are your strengths"
  ];

  const [text, setText] = useState("");

  useEffect(() => {
    setText(questions[0]);
  }, []);

  return <p>{text}</p>;
}
