"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle, Save } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [finalAnswer, setFinalAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Reset when question changes
  useEffect(() => {
    setUserAnswer("");
    setFinalAnswer("");
    setResults([]);
  }, [activeQuestionIndex]);

  // Append speech text
  useEffect(() => {
    results.forEach((result) => {
      setUserAnswer((prev) => prev + result.transcript + " ");
    });
  }, [results]);

  const StartStopRecording = () => {
    if (isRecording) {
      stopSpeechToText();
      setFinalAnswer(userAnswer);
      toast.success("Recording completed 🎤");
    } else {
      startSpeechToText();
      setFinalAnswer("");
    }
  };

  // ================= SAVE ANSWER =================
  const SaveAnswer = async () => {
    if (!userAnswer || userAnswer.trim().length < 5) {
      toast.error("Please record or type an answer first");
      return;
    }

    try {
      setLoading(true);

      const question =
        mockInterviewQuestion?.[activeQuestionIndex]?.question || "";

      const correctAnswer =
        mockInterviewQuestion?.[activeQuestionIndex]?.answer || "";

      // AI feedback
      const feedbackPrompt = `
      Question: ${question}
      User Answer: ${userAnswer}
      Give rating (1-10) and feedback in JSON:
      { "rating": number, "feedback": "text" }
      `;

      const result = await chatSession.sendMessage(feedbackPrompt);
      let textResp = await result.response.text();

      const jsonMatch = textResp.match(/\{[\s\S]*\}/);
      const JsonfeedbackResp = jsonMatch
        ? JSON.parse(jsonMatch[0])
        : { rating: 0, feedback: "No feedback generated" };

      // CALL API ROUTE
      const res = await fetch("/api/save-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mockIdRef: interviewData?.mockId,
          question: question,
          correctAns: correctAnswer,
          userAns: userAnswer,
          feedback: JsonfeedbackResp.feedback,
          rating: JsonfeedbackResp.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        }),
      });

      if (!res.ok) throw new Error("API failed");

      toast.success("Answer saved successfully ✅");
      setFinalAnswer(userAnswer);
      setUserAnswer("");
      setResults([]);
    } catch (err) {
      console.error("SAVE ERROR 👉", err);
      toast.error("Failed to save answer");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p>Web Speech API is not available 🤷‍♂️</p>;

  return (
    <div className="flex justify-center items-center flex-col">

      {/* Webcam UI */}
      <div className="flex flex-col my-10 justify-center items-center bg-black rounded-lg p-5 relative">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
          alt="webcam"
          priority
        />
      </div>

      {/* Record Button */}
      <Button variant="outline" className="my-4" onClick={StartStopRecording}>
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2 items-center">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>

      {/* Textarea */}
      <textarea
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Type or record your answer..."
        className="w-full max-w-2xl border rounded-lg p-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {/* Save Button */}
      <Button
        onClick={SaveAnswer}
        disabled={loading}
        className="mt-4 flex gap-2 items-center"
      >
        <Save size={16} />
        {loading ? "Saving..." : "Save Answer"}
      </Button>

      {/* Saved Answer */}
      {finalAnswer && (
        <div className="w-full max-w-2xl mt-4 p-4 border rounded-lg bg-green-50">
          <h3 className="font-semibold text-green-700 mb-1">
            Saved Answer
          </h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {finalAnswer}
          </p>
        </div>
      )}

    </div>
  );
};

export default RecordAnswerSection;
