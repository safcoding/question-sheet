import type { question, QuestionCardProps } from "~/app/types";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const displayChoices = (
    data:question,
    onSelectAnswer: (id: number, idx: number) => void, 
    selectedAnswer: number | undefined
) => {
    return data.choices.map((choice, index) => {
        const isSelected = selectedAnswer === index;
        
        return (
            <Button 
                variant={isSelected ? "default" : "outline"} 
                key={index} 
                className="w-full max-w-sm justify-center whitespace-normal h-auto py-3"
                onClick={() => onSelectAnswer(data.questionId, index)}
            > 
            {choice} 
            </Button>
        );
    });
};

export const QuestionCard = ({ data, onSelectAnswer, selectedAnswer }: QuestionCardProps) => (
    <div className=" w-full max-w-sm p-6 space-y-4">
        <Card>
            <CardHeader>
                <CardTitle>{data.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {displayChoices(data, onSelectAnswer, selectedAnswer)}
            </CardContent>
        </Card>
    </div>

)