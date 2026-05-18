import { questions } from "~/lib/questions";
import { QuestionCard } from "~/components/questionCard";
import type { question } from "~/lib/types";

const mapQuestions = (data: question[]) => {
  return data.map((data) => (
  <QuestionCard key={data.questionId} data={data}/>
  ))
}

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center from-[#2e026d] to-[#15162c] text-white">
      {mapQuestions(questions)}
    </main>
  );
}
