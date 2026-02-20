"use client"
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState, useMemo } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [evaluatedList, setEvaluatedList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
    loadGoogleTranslate();
  }, []);

  // ================= GOOGLE TRANSLATE =================
  const loadGoogleTranslate = () => {
    if (window.googleTranslateElementInit) return;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  };

  const GetFeedback = async () => {
    const result = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);
  };

  // ================= DATE FORMAT =================
  const formatDateTime = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const pad = (n) => n.toString().padStart(2, "0");
    return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} / ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const interviewDate = useMemo(() => {
    if (!feedbackList.length) return "";
    const raw = feedbackList[0]?.createdAt || feedbackList[0]?.date;
    return formatDateTime(raw);
  }, [feedbackList]);

  // ================= SMART AI SCORING =================
  const aiScore = async (userAns, correctAns) => {
    try {
      if (!userAns || userAns.trim().length < 5) return 0;

      const userText = userAns.toLowerCase();
      const correctText = correctAns.toLowerCase();

      const keywords = correctText.match(/\b[a-z]{4,}\b/g) || [];
      const uniqueKeywords = [...new Set(keywords)];

      const matched = uniqueKeywords.filter(k => userText.includes(k));
      const coverage = matched.length / (uniqueKeywords.length || 1);

      const sentenceCount = (userAns.match(/[.!?]/g) || []).length;
      const lengthFactor = Math.min(1, userAns.split(" ").length / 25);

      if (coverage < 0.15) return 0;

      const score = (coverage * 0.6 + lengthFactor * 0.25 + (sentenceCount > 0 ? 0.15 : 0)) * 10;
      return Number(score.toFixed(1));
    } catch {
      return 0;
    }
  };

  // ================= EVALUATION =================
  useEffect(() => {
    const evaluate = async () => {
      const scored = await Promise.all(
        feedbackList.map(async item => ({
          ...item,
          computedRating: await aiScore(item.userAns, item.correctAns),
          keyPoints: item.correctAns?.split('.').filter(Boolean).slice(0, 3)
        }))
      );
      setEvaluatedList(scored);
    };
    if (feedbackList.length) evaluate();
  }, [feedbackList]);

  // ================= OVERALL =================
  const overallRating = useMemo(() => {
    if (!evaluatedList.length) return 0;
    const total = evaluatedList.reduce((sum, i) => sum + Number(i.computedRating || 0), 0);
    return Number((total / evaluatedList.length).toFixed(1));
  }, [evaluatedList]);

  const performanceLevel =
    overallRating >= 8 ? "Expert" :
    overallRating >= 5 ? "Intermediate" : "Beginner";

  const downloadReport = () => window.print();

  return (
    <div className='p-10 print:p-6'>

      {/* ===== Google Translate ===== */}
      <div className="flex justify-end mb-4 print:hidden">
        <div id="google_translate_element"></div>
      </div>

      <h2 className='text-3xl font-bold text-green-600'>Congratulations!</h2>
      <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>

      {evaluatedList.length === 0 ?
        <h2 className='font-bold text-lg text-green-500'>No interview Feedback</h2>
        :
        <>
          <h2 className='text-primary text-lg my-2'>
            Your overall interview rating: <strong>{overallRating}/10</strong>
          </h2>

          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div className="bg-green-500 h-4 rounded-full"
              style={{ width: `${overallRating * 10}%` }} />
          </div>

          {/* ===== Summary ===== */}
          <div className="grid md:grid-cols-3 gap-4 my-6">
            <div className="p-4 border rounded-lg bg-blue-50">
              <h3 className="font-semibold">Performance Level</h3>
              <p>{performanceLevel}</p>
            </div>
            <div className="p-4 border rounded-lg bg-green-50">
              <h3 className="font-semibold">Questions Attempted</h3>
              <p>{evaluatedList.length}</p>
            </div>
            <div className="p-4 border rounded-lg bg-yellow-50">
              <h3 className="font-semibold">Interview Date</h3>
              <p>{interviewDate}</p>
            </div>
          </div>

          {evaluatedList.map((item, index) => {
            const ratingPercent = (item.computedRating / 10) * 100;

            return (
              <Collapsible key={index} className='mt-7'>
                <CollapsibleTrigger className='p-2 flex justify-between bg-secondary rounded-lg my-2 text-left gap-7 w-full'>
                  {item.question} <ChevronsUpDown className='h-4' />
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className='flex flex-col gap-2'>
                    <h2 className='text-red-500 p-2 border rounded-lg'>
                      <strong>Rating:</strong> {item.computedRating}/10
                    </h2>

                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-blue-500 h-3 rounded-full"
                        style={{ width: `${ratingPercent}%` }} />
                    </div>

                    <h2 className='p-2 border rounded-lg bg-red-50 text-sm'>
                      <strong>Your Answer: </strong>{item.userAns}
                    </h2>

                    <h2 className='p-2 border rounded-lg bg-green-50 text-sm'>
                      <strong>Correct Answer: </strong>{item.correctAns}
                    </h2>

                    <div className='p-2 border rounded-lg bg-yellow-50 text-sm'>
                      <strong>Key Points:</strong>
                      <ul className='list-disc ml-5'>
                        {item.keyPoints.map((kp, i) => <li key={i}>{kp}</li>)}
                      </ul>
                    </div>

                    <h2 className='p-2 border rounded-lg bg-blue-50 text-sm'>
                      <strong>Feedback: </strong>{item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </>
      }

      <div className="flex gap-3 mt-6 print:hidden">
        <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
        <Button variant="outline" onClick={downloadReport}>Download Report</Button>
      </div>
    </div>
  );
}

export default Feedback;
