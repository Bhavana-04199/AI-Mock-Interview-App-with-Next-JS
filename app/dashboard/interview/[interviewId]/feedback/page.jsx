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
    removeGoogleBanner();
  }, []);

  // ✅ REMOVE GOOGLE TOP BAR WITHOUT HIDING DROPDOWN
  const removeGoogleBanner = () => {
    const style = document.createElement("style");
    style.innerHTML = `
      body { top: 0px !important; }
      .goog-te-banner-frame { display:none !important; }
      .goog-te-balloon-frame { display:none !important; }
      #goog-gt-tt { display:none !important; }
    `;
    document.head.appendChild(style);

    const observer = new MutationObserver(() => {
      document.body.style.top = "0px";
      const banner = document.querySelector('.goog-te-banner-frame');
      if (banner) banner.remove();
    });

    observer.observe(document.body, { childList: true, subtree: true });
  };

  // ✅ LOAD GOOGLE TRANSLATE
  const loadGoogleTranslate = () => {
    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  };

  // ✅ SHOW ORIGINAL LANGUAGE
  const resetTranslation = () => {
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = "en";
      select.dispatchEvent(new Event("change"));
    }
  };

  // ✅ CLOSE TRANSLATION COMPLETELY
  const closeTranslation = () => {
    document.cookie = "googtrans=/en/en;path=/;";
    window.location.reload();
  };

  const GetFeedback = async () => {
    const result = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "—";
    const pad = (n) => n.toString().padStart(2, "0");
    return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const interviewDate = useMemo(() => {
    if (!feedbackList.length) return "—";
    const raw = feedbackList[0]?.createdAt || feedbackList[0]?.updatedAt || feedbackList[0]?.date;
    return formatDateTime(raw);
  }, [feedbackList]);

  // ===== AI SCORE =====
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

      {/* ✅ TRANSLATOR CONTROLS */}
      <div className="flex justify-end items-center gap-2 mb-4 print:hidden">
        <div id="google_translate_element"></div>

        <button
          onClick={resetTranslation}
          className="text-xs border px-2 py-1 rounded hover:bg-gray-100"
        >
          Show Original
        </button>

        <button
          onClick={closeTranslation}
          className="text-xs border px-2 py-1 rounded hover:bg-gray-100"
        >
          ✕
        </button>
      </div>

      <h2 className='text-3xl font-bold text-green-600'>Congratulations!</h2>
      <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>

      {/* ---- rest of your UI unchanged ---- */}

      <div className="flex gap-3 mt-6 print:hidden">
        <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
        <Button variant="outline" onClick={downloadReport}>Download Report</Button>
      </div>
    </div>
  );
}

export default Feedback;
