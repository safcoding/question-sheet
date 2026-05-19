export type question = {
questionId: number,
question: string,
choices: Array<number>,
correctAns: number
}

export interface QuestionCardProps {
  data: question;
  onSelectAnswer: (questionId: number, choiceIndex: number) => void;
  selectedAnswer: number | undefined;
}