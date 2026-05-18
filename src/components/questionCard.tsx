import type { question } from "~/lib/types";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const displayChoices = (data:question) => {
    return data.choices.map((choice, index) => {
        return <Button variant="outline" key={index} className="w-full p-2 "> {choice} </Button>})
}

export const QuestionCard = ({data}:{data: question}) => (
    <div className=" w-full max-w-sm p-6 space-y-4">
        <Card>
            <CardHeader>
                <CardTitle>{data.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {displayChoices(data)}
            </CardContent>
        </Card>
    </div>

)