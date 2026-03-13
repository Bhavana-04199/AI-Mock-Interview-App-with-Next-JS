"use client";

import { useEffect, useState } from "react";

const questions = [
  "Tell me about yourself...",
  "Why should we hire you?",
  "What are your strengths?",
  "Describe a challenging project you handled."
];

export default function TypingText() {

  const [text,setText] = useState("");
  const [index,setIndex] = useState(0);
  const [char,setChar] = useState(0);

  useEffect(()=>{

    const timer=setTimeout(()=>{

      setText(questions[index].substring(0,char+1));
      setChar(char+1);

      if(char===questions[index].length){
        setTimeout(()=>{
          setChar(0);
          setIndex((index+1)%questions.length);
        },2000);
      }

    },70);

    return()=>clearTimeout(timer);

  },[char,index]);

  return <span>{text}</span>

}
