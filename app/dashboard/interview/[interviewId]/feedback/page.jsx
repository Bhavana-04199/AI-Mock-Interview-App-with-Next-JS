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
  const [history, setHistory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
    loadHistory();
  }, []);

  const GetFeedback = async () => {
    const result = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);
  };

  // 📈 Interview history (local storage fallback)
  const loadHistory = () => {
    const data = JSON.parse(localStorage.getItem("interviewHistory") || "[]");
    setHistory(data);
  };

  const saveHistory = (score) => {
    const updated = [...history, { date: new Date().toLocaleDateString(), score }];
    localStorage.setItem("interviewHistory", JSON.stringify(updated));
    setHistory(updated);
  };

  // 🤖 AI scoring (API ready — fallback similarity)
  const aiScore = async (userAns, correctAns) => {
    try {
      // 👉 Replace with your API endpoint later
      // const res = await fetch("/api/ai-score",{method:"POST",body:JSON.stringify({userAns,correctAns})})
      // const data = await res.json()
      // return data.score

      // Fallback scoring
      const u = new Set(userAns.toLowerCase().split(/\W+/));
      const c = new Set(correctAns.toLowerCase().split(/\W+/));
      const similarity = [...u].filter(x => c.has(x)).length / new Set([...u, ...c]).size;
      return Math.min(10, Math.max(1, (similarity * 10).toFixed(1)));
    } catch {
      return 5;
    }
  };

  const [evaluatedList, setEvaluatedList] = useState([]);

  useEffect(() => {
    const evaluate = async () => {
      const scored = await Promise.all(
        feedbackList.map(async item => ({
          ...item,
          computedRating: await aiScore(item.userAns, item.correctAns),
          keyPoints: item.correctAns?.split('.').slice(0, 3)
        }))
      );
      setEvaluatedList(scored);
    };
    if (feedbackList.length) evaluate();
  }, [feedbackList]);

  const overallRating = useMemo(() => {
    if (!evaluatedList.length) return 0;
    const total = evaluatedList.reduce((sum, item) => sum + Number(item.computedRating), 0);
    const avg = (total / evaluatedList.length).toFixed(1);
    saveHistory(avg);
    return avg;
  }, [evaluatedList]);

  // 🎯 Improvement roadmap
  const roadmap = useMemo(() => {
    if (overallRating >= 8)
      return ["Practice advanced scenarios", "Work on speed", "Mock leadership questions"];
    if (overallRating >= 5)
      return ["Improve answer structure", "Add real examples", "Revise fundamentals"];
    return ["Learn core concepts", "Practice daily mock interviews", "Focus on clarity"];
  }, [overallRating]);

  const performanceLevel = overallRating >= 8 ? "Expert" :
    overallRating >= 5 ? "Intermediate" : "Beginner";

  const downloadReport = () => window.print();

  return (
    <div className='p-10 print:p-6'>
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

          {/* 🧠 Summary */}
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
              <p>{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* 📊 History */}
          <div className="my-6">
            <h3 className="font-semibold mb-2">Progress History</h3>
            <ul className="text-sm space-y-1">
              {history.map((h, i) => (
                <li key={i}>{h.date} — {h.score}/10</li>
              ))}
            </ul>
          </div>

          {/* 🎯 Roadmap */}
          <div className="p-4 border rounded-lg bg-purple-50 my-6">
            <h3 className="font-semibold">Personalized Improvement Roadmap</h3>
            <ul className="list-disc ml-6">
              {roadmap.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
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
