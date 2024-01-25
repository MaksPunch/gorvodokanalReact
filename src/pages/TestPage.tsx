import { Link, useNavigate, useParams } from "react-router-dom";
import {
  HOME_ROUTE,
  SECTION_PAGE_ROUTE,
  TEST_PAGE_ROUTE,
} from "../utils/consts.ts";
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";
import NavigationSteps from "../components/NavigationSteps.tsx";
import { useEffect, useState } from "react";
import { IQuestion, ISection, ITest } from "../utils/types.ts";
import MyRadio from "../components/MyRadio.tsx";
import { classNames } from "../utils/classNames.ts";
import { selectAnswer } from "../store/reducers/testSlice.ts";

const TestPage = () => {
  const { questionId, sectionId } = useParams<"questionId" | "sectionId">();
  const [question, setQuestion] = useState<IQuestion>({
    id: 1,
    testId: 1,
    type: "radio",
    name: "",
    answers: [
      { answer: "", rightAnswer: false, questionId: 1, id: 1, selected: false },
    ],
    done: false,
  });
  const [nextQuestionId, setNextQuestionId] = useState<number | string>(2);
  const [section, setSection] = useState<ISection>({
    name: "",
    id: 1,
    content: "",
    steps: 4,
    testId: 1,
  });
  const [test, setTest] = useState<ITest>({
    name: "",
    id: 1,
    questions: [question],
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sections = useAppSelector((state) => state.sectionReducer);
  const tests = useAppSelector((state) => state.testReducer);

  useEffect(() => {
    if (!questionId || !sectionId) return navigate(HOME_ROUTE);
    const sectionFound = sections.find((el) => el.id === Number(sectionId));
    if (!sectionFound) return navigate("not_found");
    setSection(sectionFound);
    const testId = sectionFound.testId;
    const testFound = tests.find((el) => el.id === testId);
    if (!testFound) return navigate("not_found");
    setTest(testFound);

    const questionFound = testFound.questions.find(
      (el) => el.id === Number(questionId),
    );
    if (!questionFound) return navigate("not_found");
    setQuestion(questionFound);
    const nextQuestionFound = testFound.questions.find(
      (el) => el.id === Number(questionId) + 1,
    );
    if (!nextQuestionFound) setNextQuestionId("result");
    else setNextQuestionId(nextQuestionFound.id);
  }, [questionId]);

  let typeText;
  if (question.type === "radio") {
    typeText = "Выберите один вариант из списка";
  } else if (question.type === "checkbox") {
    typeText = "Выберите несколько вариантов из списка";
  } else {
    typeText = "Напишите слово или словосочетание";
  }

  function selectAnswerFunction(answerId: number) {
    dispatch(
      selectAnswer({
        questionId: Number(questionId),
        answerId,
        testId: test.id,
      }),
    );
    // const question = test.questions.find((el) => el.id === Number(questionId));
    // const answer = question?.answers?.find((el) => el.id === answerId);
    // if (answer) {
    //   console.log(answer);
    //   answer.selected = true;
    // }
  }

  return (
    <div>
      <div className="main-wrapper flex flex-col gap-12">
        <div className="flex justify-between items-center">
          <NavigationSteps />
          <p>0/{section.steps} шагов пройдено</p>
        </div>
        <div className="test-container flex flex-col gap-5">
          <div className="flex justify-between items-start gap-5">
            <div className="flex flex-col gap-5">
              <div className="test-header">
                <h2 className="font-bold">{question.name}</h2>
                <div className="text-xs font-normal">{typeText}</div>
              </div>
              <div className="flex flex-col gap-4">
                {question.type === "radio" && question.answers
                  ? question.answers.map(({ answer, id, selected }) => (
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
                {question.type === "text" && question.answers ? (
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
                {test?.questions.map(({ id, done }, index) => (
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
                        question.done ? "text-white" : "text-black",
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
          Следующий вопрос
        </Link>
      </div>
    </div>
  );
};

export default TestPage;
