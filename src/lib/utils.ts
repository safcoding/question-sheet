import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { question } from "~/app/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateScore = (
  questions: question[],
  userAnswers: Record<number, number>
): number => {
    let score = 0;

    questions.forEach((q) => {
      if (userAnswers[q.questionId] === q.correctAns) {
        score++;
      }
    });

    return score;
  };