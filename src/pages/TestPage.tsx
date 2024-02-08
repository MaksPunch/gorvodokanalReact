import { Link, useParams } from "react-router-dom";
import { SECTION_PAGE_ROUTE, TEST_PAGE_ROUTE } from "../utils/consts.ts";
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";
import NavigationSteps from "../components/NavigationSteps.tsx";
import { useEffect, useState } from "react";
import MyRadio from "../components/MyRadio.tsx";
import { classNames } from "../utils/classNames.ts";
import {
  fetchAnswers,
  selectAnswer,
  selectAnswersByQuestionId,
} from "../store/reducers/answerSlice.ts";
import {
  fetchQuestions,
  selectQuestionById,
  selectQuestionsByTestId,
} from "../store/reducers/questionSlice.ts";
import {
  changeSection,
  fetchSections,
  selectSectionById,
} from "../store/reducers/sectionSlice.ts";
import { changeCourse } from "../store/reducers/courseSlice.ts";

const TestPage = () => {
  const { questionId, sectionId } = useParams<"questionId" | "sectionId">();
  const [nextQuestionId, setNextQuestionId] = useState<number | string>(2);
  const dispatch = useAppDispatch();
  const answersForQuestion = useAppSelector(
    selectAnswersByQuestionId(Number(questionId)),
  );
  const section = useAppSelector((state) =>
    selectSectionById(state, Number(sectionId)),
  );
  const questions = useAppSelector(selectQuestionsByTestId(section?.testId));
  const question = useAppSelector((state) =>
    selectQuestionById(state, Number(questionId)),
  );
  const { status: sectionStatus } = useAppSelector(
    (state) => state.sectionReducer,
  );
  const { status: questionStatus } = useAppSelector(
    (state) => state.questionReducer,
  );
  const { status: answerStatus } = useAppSelector(
    (state) => state.answerReducer,
  );
  useEffect(() => {
    if (sectionStatus === "idle") {
      dispatch(fetchSections());
    }
    if (questionStatus === "idle") {
      dispatch(fetchQuestions());
    }
    if (answerStatus === "idle") {
      dispatch(fetchAnswers());
    }

    dispatch(changeSection(Number(sectionId)));
  }, [sectionId, sectionStatus, questionStatus, answerStatus, dispatch]);

  useEffect(() => {
    dispatch(changeCourse(section?.courseId));
  }, [section, dispatch]);

  useEffect(() => {
    const nextQuestionFound = questions.find(
      (el) => el.id === Number(questionId) + 1 && el.testId === section?.testId,
    );
    if (!nextQuestionFound) setNextQuestionId("result");
    else setNextQuestionId(nextQuestionFound.id);
  }, [questionId, questions, section]);

  let typeText;
  if (question?.type === "radio") {
    typeText = "Выберите один вариант из списка";
  } else if (question?.type === "checkbox") {
    typeText = "Выберите несколько вариантов из списка";
  } else {
    typeText = "Напишите слово или словосочетание";
  }

  function selectAnswerFunction(answerId: number) {
    dispatch(selectAnswer(answerId));
  }

  return (
    <div>
      <div className="main-wrapper flex flex-col gap-12">
        <div className="flex justify-between items-center">
          <NavigationSteps />
          <p>0 / {section?.steps} шагов пройдено</p>
        </div>
        <div className="test-container flex flex-col gap-5">
          <div className="flex justify-between items-start gap-5">
            <div className="flex flex-col gap-5">
              <div className="test-header">
                <h2 className="font-bold">{question?.name}</h2>
                <div className="text-xs font-normal">{typeText}</div>
              </div>
              <div className="flex flex-col gap-4">
                {question?.type === "radio" && answersForQuestion
                  ? answersForQuestion.map(({ answer, id, selected }) => (
                      <MyRadio
                        key={id}
                        label={answer}
                        value={id}
                        name={"question_" + question.id}
                        selectAnswer={selectAnswerFunction}
                        selected={selected}
                      />
                    ))
                  : ""}
                {/*{question.type === 'checkbox' && question.answers ?*/}
                {/*    question.answers?.map(({answer, id}) =>*/}
                {/*        <MyCheckbox key={id} label={answer} value={id} name={"question_" + question.id}/>*/}
                {/*    )*/}
                {/*    :*/}
                {/*    ""*/}
                {/*}*/}
                {question?.type === "text" && answersForQuestion ? (
                  <input
                    type="text"
                    name={"question_" + question.id}
                    className="px-2.5 py-2 bg-white rounded shadow border border-black border-opacity-40"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="min-w-64 p-4 rounded-md border border-black border-opacity-30 flex flex-col justify-center items-center gap-6">
              <h2 className="font-semibold">Вопросы теста</h2>
              <div className="justify-start items-start gap-4 inline-flex flex-wrap">
                {questions.map(({ id, done }, index) => (
                  <Link
                    key={id}
                    to={
                      SECTION_PAGE_ROUTE +
                      "/" +
                      sectionId +
                      TEST_PAGE_ROUTE +
                      "/" +
                      id
                    }
                    className={classNames(
                      id === Number(questionId)
                        ? "border-2 border-blue-400"
                        : "border border-black border-opacity-25",
                      done ? "bg-emerald-400" : "bg-white",
                      "px-6 py-2 rounded gap-2.5 flex",
                    )}
                  >
                    <p
                      className={classNames(
                        question?.done ? "text-white" : "text-black",
                        "text-xl tracking-tight",
                      )}
                    >
                      {index + 1}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Link
          to={
            SECTION_PAGE_ROUTE +
            "/" +
            sectionId +
            TEST_PAGE_ROUTE +
            "/" +
            nextQuestionId
          }
          className="self-end text-sm px-4 py-2 rounded bg-blue-700 text-white flex justify-center items-center gap-2.5"
        >
          {typeof nextQuestionId === "number"
            ? "Следующий вопрос"
            : "Перейти к результатам"}
        </Link>
      </div>
    </div>
  );
};

export default TestPage;
