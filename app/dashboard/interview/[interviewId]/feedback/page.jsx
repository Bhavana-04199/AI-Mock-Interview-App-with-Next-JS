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
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);
  };

  // 🔹 Simple similarity scoring (Jaccard)
  const calculateScore = (userAns, correctAns) => {
    if (!userAns || !correctAns) return 0;

    const u = new Set(userAns.toLowerCase().split(/\W+/));
    const c = new Set(correctAns.toLowerCase().split(/\W+/));

    const intersection = new Set([...u].filter(x => c.has(x)));
    const union = new Set([...u, ...c]);

    const similarity = intersection.size / union.size;
    return Math.min(10, Math.max(1, (similarity * 10).toFixed(1)));
  };

  // 🔹 Extract key points (first 3 sentences)
  const getKeyPoints = (text) => {
    if (!text) return [];
    return text.split('.').slice(0, 3).map(t => t.trim()).filter(Boolean);
  };

  // 🔹 Compute ratings dynamically
  const evaluatedList = useMemo(() => {
    return feedbackList.map(item => ({
      ...item,
      computedRating: calculateScore(item.userAns, item.correctAns),
      keyPoints: getKeyPoints(item.correctAns)
    }));
  }, [feedbackList]);

  const overallRating = useMemo(() => {
    if (!evaluatedList.length) return 0;
    const total = evaluatedList.reduce((sum, item) => sum + Number(item.computedRating), 0);
    return (total / evaluatedList.length).toFixed(1);
  }, [evaluatedList]);

  // 🔹 Translate helper
  const translateText = (text) => {
    const lang = navigator.language || "en";
    const url = `https://translate.google.com/?sl=auto&tl=${lang}&text=${encodeURIComponent(text)}&op=translate`;
    window.open(url, "_blank");
  };

  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold text-green-600'>Congratulations!</h2>
      <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>

      {evaluatedList.length === 0 ?
        <h2 className='font-bold text-lg text-green-500'>No interview Feedback</h2>
        :
        <>
          <h2 className='text-primary text-lg my-2'>
            Your overall interview rating: <strong>{overallRating}/10</strong>
          </h2>

          {/* Overall Graph */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${overallRating * 10}%` }}
            />
          </div>

          <h2 className='text-sm text-gray-500'>
            Find below interview questions with correct answers, your answer and feedback for improvements for your next interview
          </h2>

          {evaluatedList.map((item, index) => {
            const ratingPercent = (item.computedRating / 10) * 100;

            const combinedText = `
            Question: ${item.question}
            Your Answer: ${item.userAns}
            Correct Answer: ${item.correctAns}
            Feedback: ${item.feedback}
            `;

            return (
              <Collapsible key={index} className='mt-7'>
                <CollapsibleTrigger className='p-2 flex justify-between bg-secondary rounded-lg my-2 text-left gap-7 w-full'>
                  {item.question} <ChevronsUpDown className='h-4' />
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className='flex flex-col gap-2'>

                    {/* Rating */}
                    <h2 className='text-red-500 p-2 border rounded-lg'>
                      <strong>Rating:</strong> {item.computedRating}/10
                    </h2>

                    {/* Graph */}
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-500 h-3 rounded-full"
                        style={{ width: `${ratingPercent}%` }}
                      />
                    </div>

                    {/* Answers */}
                    <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'>
                      <strong>Your Answer: </strong>{item.userAns}
                    </h2>

                    <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'>
                      <strong>Correct Answer Looks Like: </strong>{item.correctAns}
                    </h2>

                    {/* Key Points */}
                    <div className='p-2 border rounded-lg bg-yellow-50 text-sm'>
                      <strong>Key Points:</strong>
                      <ul className='list-disc ml-5'>
                        {item.keyPoints.map((kp, i) => <li key={i}>{kp}</li>)}
                      </ul>
                    </div>

                    <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'>
                      <strong>Feedback: </strong>{item.feedback}
                    </h2>

                    {/* Translate Button */}
                    <Button
                      variant="outline"
                      onClick={() => translateText(combinedText)}
                    >
                      Translate to my language
                    </Button>

                  </div>
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </>
      }

      <Button className='mt-5' onClick={() => router.replace('/dashboard')}>
        Go Home
      </Button>
    </div>
  );
}

export default Feedback;
