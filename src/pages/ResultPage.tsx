import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { useEffect, useState } from "react";
import { IAnswer, IQuestion, ISection, ITest } from "../utils/types";

export default function ResultPage() {
  const tests = useAppSelector((state) => state.testReducer);
  const sections = useAppSelector((state) => state.sectionReducer);
  const [questions, setQuestions] = useState<IQuestion[]>([
    {}},
  ]);
  const { sectionId } = useParams<"sectionId">();
  useEffect(() => {
    const section = sections.find(
      (el: ISection) => el.id === Number(sectionId),
    );
    const testFound = tests.find((el: ITest) => el.id === section.testId);
    console.log(section, testFound);

    setQuestions(testFound.questions);
  }, [sectionId]);
  return (
    <div>
      {questions.map((question) => (
        <div key={question.id}>{question.answer}</div>
      ))}
    </div>
  );
}
