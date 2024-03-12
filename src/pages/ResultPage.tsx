import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEffect, useState } from "react";
import NavigationSteps from "../components/NavigationSteps.tsx";
import { COURSES_PAGE_ROUTE, SECTION_PAGE_ROUTE } from "../utils/consts.ts";
import {
  changeSection,
  fetchSections,
  selectSectionById,
} from "../store/reducers/sectionSlice.ts";
import { fetchTests } from "../store/reducers/testSlice.ts";
import {
  fetchAnswers,
  selectAnswersByTestId,
} from "../store/reducers/answerSlice.ts";
import {
  fetchQuestions,
  selectQuestionsByTestId,
} from "../store/reducers/questionSlice.ts";
import { changeCourse } from "../store/reducers/courseSlice.ts";
import { IAnswer } from "../utils/types.ts";

export default function ResultPage() {
  const { sectionId } = useParams<"sectionId">();
  const dispatch = useAppDispatch();
  const section = useAppSelector((state) =>
    selectSectionById(state, Number(sectionId)),
  );
  const test = useAppSelector((state) =>
    selectSectionById(state, section?.testId),
  );
  const answers = useAppSelector(selectAnswersByTestId(section?.testId));
  const questions = useAppSelector(selectQuestionsByTestId(section?.testId));

  const [rightAnswers, setRightAnswers] = useState<number>(0);

  const { status: sectionStatus } = useAppSelector(
    (state) => state.sectionReducer,
  );
  const { status: answerStatus } = useAppSelector(
    (state) => state.answerReducer,
  );
  const { status: testStatus } = useAppSelector((state) => state.testReducer);
  const { status: questionStatus } = useAppSelector(
    (state) => state.questionReducer,
  );
  useEffect(() => {
    if (sectionStatus === "idle") {
      dispatch(fetchSections());
    }
    if (testStatus === "idle") {
      dispatch(fetchTests());
    }
    if (questionStatus === "idle") {
      dispatch(fetchQuestions());
    }
    if (answerStatus === "idle") {
      dispatch(fetchAnswers());
    }
    dispatch(changeSection(Number(sectionId)));
  }, [
    sectionId,
    sectionStatus,
    testStatus,
    dispatch,
    questionStatus,
    answerStatus,
  ]);

  function checkIfArraysEquals(array1: IAnswer[], array2: IAnswer[]) {
    if (array1.length !== array2.length) {
      return false;
    }

    for (let i = 0; i < array1.length; i++) {
      if (array1[i].id !== array2[i].id) return false;
    }
    return true;
  }

  useEffect(() => {
    const rightAnswersCount = questions.reduce((count, question) => {
      if (question.type !== "text") {
        const rightAnswers = answers.filter(
          (el) =>
            el.questionId === question.id &&
            el.rightAnswer &&
            el.type !== "text",
        );
        const selectedAnswers = answers.filter(
          (el) =>
            el.questionId === question.id && el.selected && el.type !== "text",
        );

        if (checkIfArraysEquals(rightAnswers, selectedAnswers)) {
          return count + 1;
        }
      } else {
        const questionAnswer = answers.find(
          (el) => el.questionId === question.id && el.type === "text",
        );
        if (!questionAnswer) return count;
        if (questionAnswer.answer === questionAnswer.userInput) {
          return count + 1;
        }
      }
      return count;
    }, 0);

    setRightAnswers(rightAnswersCount);
  }, [answers, questions]);

  useEffect(() => {
    if (section) {
      document.title =
        'Результаты теста на тему "' +
        section.name +
        '" | Система дистанцинного обучения ВологдаГорВодоканал';
    } else {
      document.title =
        "Тема | Система дистанцинного обучения ВологдаГорВодоканал";
    }
  }, [section]);

  useEffect(() => {
    dispatch(changeCourse(section?.courseId));
  }, [section, dispatch]);

  return (
    <div className="main-wrapper">
      <div className="flex justify-between items-center mb-20">
        <NavigationSteps />
        <p>
          {section?.steps} / {section?.steps} шагов пройдено
        </p>
      </div>
      <div className="w-full flex-col justify-start items-center gap-12 flex">
        <div className="flex-col justify-start items-center gap-1.5 flex">
          <h1>Результат</h1>
          <p className="text-black text-lg font-semibold">
            Тест на тему: “{test?.name}”
          </p>
        </div>
        <div className="items-center flex flex-col">
          <h1 className="text-green-600 font-bold">
            Верных ответов - {rightAnswers}
          </h1>
          <p>из {questions?.length} вопросов</p>
        </div>
        <div className="flex justify-center gap-7">
          <Link
            to={COURSES_PAGE_ROUTE}
            className="px-5 py-2 bg-white rounded shadow-md hover:bg-gray-50 transition-colors"
          >
            Вернуться к курсу
          </Link>
          <Link
            to={SECTION_PAGE_ROUTE + "/" + (Number(sectionId) + 1)}
            className="px-5 py-2 bg-blue-700 rounded text-white hover:bg-blue-800 transition-colors"
          >
            Следующая тема
          </Link>
        </div>
      </div>
    </div>
  );
}
