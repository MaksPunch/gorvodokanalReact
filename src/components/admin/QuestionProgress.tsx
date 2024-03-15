import React, { useEffect, useRef, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import {
  fetchQuestions,
  selectQuestionById,
} from "../../store/reducers/questionSlice.ts";
import {
  fetchAnswers,
  selectAnswersByQuestionId,
  selectRightAnswersByQuestionId,
  selectSelectedAnswersByQuestionId,
} from "../../store/reducers/answerSlice.ts";
import { checkIfArraysEquals } from "../../utils/checkIfArraysEquals.ts";
import { classNames } from "../../utils/classNames.ts";
import { CSSTransition } from "react-transition-group";
import MyButton from "../MyButton.tsx";

interface PropTypes extends React.ComponentPropsWithoutRef<"div"> {
  questionId: number;
}

const QuestionProgress = ({ questionId }: PropTypes) => {
  const dispatch = useAppDispatch();
  const { status: questionStatus } = useAppSelector(
    (state) => state.questionReducer,
  );
  const { status: answerStatus } = useAppSelector(
    (state) => state.answerReducer,
  );
  const question = useAppSelector((state) =>
    selectQuestionById(state, questionId),
  );
  const answers = useAppSelector(
    selectAnswersByQuestionId(questionId, question?.type),
  );
  const selectedAnswers = useAppSelector(
    selectSelectedAnswersByQuestionId(questionId),
  );
  const rightAnswers = useAppSelector(
    selectRightAnswersByQuestionId(questionId),
  );
  const [answerIsRight, setAnswerIsRight] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [questionTypeText, setQuestionTypeText] = React.useState<string>("");

  useEffect(() => {
    if (questionStatus === "idle") {
      dispatch(fetchQuestions());
    }

    if (answerStatus === "idle") {
      dispatch(fetchAnswers());
    }
  }, [answerStatus, dispatch, questionStatus]);

  useEffect(() => {
    if (question && question.type !== "text") {
      const rightAnswers = answers.filter(
        (el) =>
          el.questionId === question.id && el.rightAnswer && el.type !== "text",
      );
      const selectedAnswers = answers.filter(
        (el) =>
          el.questionId === question.id && el.selected && el.type !== "text",
      );

      const isAnswerRight = checkIfArraysEquals(rightAnswers, selectedAnswers);

      if (isAnswerRight && !answerIsRight) {
        setAnswerIsRight(true);
      } else if (!isAnswerRight && answerIsRight) {
        setAnswerIsRight(false);
      }
    } else {
      const questionAnswer = answers.find(
        (el) => el.questionId === question.id && el.type === "text",
      );
      if (!questionAnswer) return;

      const isTextAnswerRight =
        questionAnswer.answer.toLowerCase().trim() ===
        questionAnswer.userInput?.toLowerCase().trim();

      if (isTextAnswerRight && !answerIsRight) {
        setAnswerIsRight(true);
      } else if (!isTextAnswerRight && answerIsRight) {
        setAnswerIsRight(false);
      }
    }
  }, [question, answers, answerIsRight]);

  useEffect(() => {
    if (question.type === "text") {
      setQuestionTypeText("Слово или словосочетание");
    } else if (question.type === "radio") {
      setQuestionTypeText("Один из списка");
    } else if (question.type === "checkbox") {
      setQuestionTypeText("Несколько из списка");
    }
  }, [question]);

  return (
    <div className="flex flex-col gap-2.5 w-full border rounded p-2.5">
      <div
        className="flex justify-between items-center cursor-pointer gap-3"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-col gap-px">
          <p className="text-lg font-medium">{question?.name}</p>
          <div className="flex gap-5 items-center">
            <p className="text-xs font-medium">{questionTypeText}</p>
            <p className={answerIsRight ? "text-green-600" : "text-red-600"}>
              {answerIsRight ? "Верный ответ" : "Неверный ответ"}
            </p>
          </div>
        </div>
        <ChevronRightIcon
          className={classNames(
            "size-6 min-w-6 min-h-6 transition-transform",
            expanded ? "rotate-90" : "rotate-0",
          )}
        />
      </div>
      <CSSTransition
        nodeRef={nodeRef}
        unmountOnExit
        in={expanded}
        timeout={{
          exit: 400,
        }}
        classNames="open-answerProgress"
      >
        <div className="flex flex-col gap-1.5" ref={nodeRef}>
          <p className="font-medium">
            Выбранный вариант:{" "}
            <b>"{selectedAnswers.map((el) => el.answer).join('", "')}" </b>
          </p>
          <p className="font-medium">
            Правильный вариант:{" "}
            <b className="text-green-600">
              "{rightAnswers.map((el) => el.answer).join('", "')}"{" "}
            </b>
          </p>
          <MyButton className="mt-3 bg-green-600 hover:bg-green-700">
            Отметить как правильно
          </MyButton>
        </div>
      </CSSTransition>
    </div>
  );
};

export default QuestionProgress;
