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
    if (answerStatus === "idle") {
      dispatch(fetchAnswers());
    }
    if (questionStatus === "idle") {
      dispatch(fetchQuestions());
    }

    if (answers) {
      let rightAnswersCount = 0;
      for (const answer of answers) {
        if (answer.rightAnswer && answer.selected) {
          rightAnswersCount++;
        }
      }
      setRightAnswers(rightAnswersCount);
    }

    dispatch(changeSection(Number(sectionId)));
  }, [
    sectionId,
    sectionStatus,
    answerStatus,
    testStatus,
    questionStatus,
    dispatch,
    answers,
  ]);

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
