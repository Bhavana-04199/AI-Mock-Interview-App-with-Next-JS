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

    console.log("🚀 ~ GetFeedback ~ result:", result);
    setFeedbackList(result);
  };

  // ✅ Calculate overall rating dynamically
  const overallRating = useMemo(() => {
    if (!feedbackList.length) return 0;
    const total = feedbackList.reduce((sum, item) => sum + Number(item.rating || 0), 0);
    return (total / feedbackList.length).toFixed(1);
  }, [feedbackList]);

  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold text-green-600'>Congratulations!</h2>
      <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>

      {feedbackList?.length == 0 ?
        <h2 className='font-bold text-lg text-green-500'>No interview Feedback</h2>
        :
        <>
          {/* ✅ Dynamic Overall Rating */}
          <h2 className='text-primary text-lg my-2'>
            Your overall interview rating: <strong>{overallRating}/10</strong>
          </h2>

          {/* ✅ Overall Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${overallRating * 10}%` }}
            />
          </div>

          <h2 className='text-sm text-gray-500'>
            Find below interview questions with correct answers, your answer and feedback for improvements for your next interview
          </h2>

          {feedbackList && feedbackList.map((item, index) => {
            const ratingPercent = (Number(item.rating || 0) / 10) * 100;

            return (
              <Collapsible key={index} className='mt-7'>
                <CollapsibleTrigger className='p-2 flex justify-between bg-secondary rounded-lg my-2 text-left gap-7 w-full'>
                  {item.question} <ChevronsUpDown className='h-4' />
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className='flex flex-col gap-2'>

                    {/* ✅ Rating */}
                    <h2 className='text-red-500 p-2 border rounded-lg'>
                      <strong>Rating:</strong> {item.rating}/10
                    </h2>

                    {/* ✅ Question Progress Bar */}
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

                    <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'>
                      <strong>Feedback: </strong>{item.feedback}
                    </h2>

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
