"use client";

import { useState } from "react";
import { QuestionCard } from "~/components/questionCard";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { questions } from "~/app/questions";
import type { question } from "~/app/types";
import { calculateScore } from "~/lib/utils";

export default function HomePage() {
  const [userAnswers, setUserAnswer] = useState<Record<number, number>>({});
  const [isNamingPhase, setIsNamingPhase] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [userName, setUserName] = useState("");

  const handleSelectAnswer = (questionId: number, choice: number) => {
    setUserAnswer((prev) => ({
      ...prev,
      [questionId]: choice,
    }));
  };

  const handleSubmitQuiz = () => {
    setIsNamingPhase(true);
  };

  const handleFinalSubmit = (e: React.SubmitEvent) => {
    e.preventDefault(); 
    if (userName.trim() !== "") {
      setIsNamingPhase(false);
      setShowResults(true);
    }
  };

  const handleResetQuiz = () => {
    setUserAnswer({}); 
    setUserName(""); 
    setIsNamingPhase(false); 
    setShowResults(false); 
  };

  const mapQuestions = (
    data: question[],
    onSelect: (id: number, index: number) => void,
    answers: Record<number, number>
  ) => {
    return data.map((item) => (
      <QuestionCard
        key={item.questionId}
        data={item}
        onSelectAnswer={onSelect}
        selectedAnswer={answers[item.questionId]}
      />
    ));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-[#2e026d] to-[#15162c] text-white p-6">
      <div className="w-full max-w-md space-y-6">
        {showResults ? (
          <Card className="bg-slate-800 text-white border-slate-700 p-6 text-center space-y-4">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-400">Quiz Completed!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xl">
                Great job, <span className="font-semibold text-purple-300">{userName}</span>!
              </p>
              <p className="text-3xl font-extrabold mt-4">
                Score: {calculateScore(questions, userAnswers)} / {questions.length}
              </p>
            </CardContent>
          </Card>
        ) : isNamingPhase ? (
          <Card className="bg-slate-800 text-white border-slate-700 p-6">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Before you see your score...</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-slate-400">Enter your full name:</label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="p-3 rounded-md bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
                    placeholder="e.g. Ahmad Ali"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-md"
                >
                  See My Results
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-6">
              {mapQuestions(questions, handleSelectAnswer, userAnswers)}
            </div>

              <div className="flex gap-3 mt-4 w-full">
                <Button
                  onClick={handleResetQuiz}
                  variant="ghost"
                  className="text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  Clear
                </Button>
                <Button
                  onClick={handleSubmitQuiz}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl shadow-lg transition"
                >
                  Submit All Answers
                </Button>
              </div>
          </>
        )}
      </div>
      <p className="mt-8 text-xs text-slate-400">© www.mathinenglish.com All rights reserved.</p>
    </main>
  );
}