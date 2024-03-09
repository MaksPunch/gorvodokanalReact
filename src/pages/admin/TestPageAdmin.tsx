import { useNavigate, useParams } from "react-router-dom";
import MyButton from "../../components/MyButton";
import MyInput from "../../components/MyInput";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  createOneTest,
  fetchTests,
  removeOneTest,
  selectTestById,
  selectTests,
  setTestName,
} from "../../store/reducers/testSlice";
import { createRef, useEffect, useState } from "react";
import {
  addOneQuestion,
  fetchQuestions,
  removeManyQuestions,
  removeOneQuestion,
  selectQuestions,
  selectQuestionsByTestId,
  selectQuestionType,
  setQuestionName,
} from "../../store/reducers/questionSlice";
import { ChevronRightIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import TextareaAutosize from "react-textarea-autosize";
import MyRadio from "../../components/MyRadio.tsx";
import AnswersList from "../../components/admin/AnswersList.tsx";
import {
  addOneAnswer,
  fetchAnswers,
  removeManyAnswers,
  selectAnswers,
  selectRightAnswer,
} from "../../store/reducers/answerSlice.ts";
import {
  setAlertClassName,
  setAlertContent,
  setAlertOpen,
} from "../../store/reducers/alertSlice.ts";
import { TESTS_PAGE_ADMIN_ROUTE } from "../../utils/consts.ts";
import { classNames } from "../../utils/classNames.ts";
import { CSSTransition } from "react-transition-group";

const TestPageAdmin = () => {
  const { testId } = useParams<"testId">();
  const dispatch = useAppDispatch();
  const test = useAppSelector((state) => selectTestById(state, Number(testId)));
  const testNameValue = test?.name || "";
  const { status: testStatus } = useAppSelector((state) => state.testReducer);
  const { status: answerStatus } = useAppSelector(
    (state) => state.answerReducer,
  );
  const { status: questionStatus } = useAppSelector(
    (state) => state.questionReducer,
  );
  const [name, setName] = useState<string>(testNameValue);
  const questions = useAppSelector((state) => selectQuestions(state));
  const questionsInTest = useAppSelector(
    selectQuestionsByTestId(Number(testId)),
  );
  const answers = useAppSelector((state) => selectAnswers(state));
  const tests = useAppSelector((state) => selectTests(state));
  const navigate = useNavigate();
  const [openQuestion, setOpenQuestion] = useState<number>(0);

  useEffect(() => {
    if (testStatus === "idle") {
      dispatch(fetchTests());
    }
    setName(testNameValue);

    if (questionStatus === "idle") {
      dispatch(fetchQuestions());
    }

    if (answerStatus === "idle") {
      dispatch(fetchAnswers());
    }
  }, [dispatch, testStatus, questionStatus, testNameValue, answerStatus]);

  function changeQuestionType(questionId: number, type: string) {
    const answer = answers.find((el) => el.questionId === questionId);
    if (answer) {
      dispatch(selectRightAnswer({ id: answer.id, type, changeType: true }));
    }
    dispatch(selectQuestionType({ questionId, type }));
  }

  function removeQuestion(questionId: number) {
    dispatch(removeOneQuestion(questionId));
  }

  function addAnswer(questionId: number) {
    const lastAnswerId = answers[answers.length - 1]?.id + 1 || 1;
    if (lastAnswerId) {
      dispatch(
        addOneAnswer({
          answer: "",
          testId: Number(testId),
          rightAnswer: false,
          questionId,
          selected: false,
          id: lastAnswerId,
        }),
      );
    }
  }

  function addQuestion() {
    const lastQuestionId = questions[questions.length - 1]?.id + 1 || 1;
    if (lastQuestionId) {
      dispatch(
        addOneQuestion({
          id: lastQuestionId,
          name: "",
          type: "radio",
          testId: Number(testId),
          done: false,
        }),
      );
    }
  }

  useEffect(() => {
    const testFound = tests.find((el) => el.id === Number(testId));
    if (!testFound) {
      const lastTestId = tests[tests.length - 1]?.id + 1 || 1;
      if (lastTestId) {
        dispatch(
          createOneTest({
            id: lastTestId,
            name: "",
          }),
        );
      }
    }
  }, [testId, tests, dispatch]);

  useEffect(() => {
    document.title = `Редактирование теста "${test?.name}" | Система дистанцинного обучения ВологдаГорВодоканал`;
  }, [test?.name]);

  function saveTest() {
    if (name === "") {
      dispatch(setAlertOpen());
      dispatch(setAlertContent("Название теста не может быть пустым"));
      dispatch(setAlertClassName("bg-red-500 text-white"));
      return;
    }
    if (name) {
      dispatch(setTestName({ testId: Number(testId), name }));
    }
    dispatch(setAlertOpen());
    dispatch(setAlertContent("Успешно сохранено"));
    dispatch(setAlertClassName("bg-green-500 text-white"));
  }

  function handleDeleteTest() {
    dispatch(removeOneTest(Number(testId)));
    const deletedQuestions = questionsInTest.map((el) => el.id);
    dispatch(removeManyQuestions(deletedQuestions));
    const deletedAnswers = answers.map((el) => {
      if (el.testId === Number(testId)) {
        return el.id;
      } else {
        return 0;
      }
    });
    if (deletedAnswers) {
      dispatch(removeManyAnswers(deletedAnswers));
    }
    return navigate(TESTS_PAGE_ADMIN_ROUTE);
  }

  return (
    <div className="main-wrapper pb-5">
      <div className="flex justify-between mb-7">
        <h1>Редактирование теста</h1>
        <div className="flex gap-7">
          <MyButton onClick={() => saveTest()}>Сохранить</MyButton>
          <button
            className="bg-red-500 px-4 py-2 rounded text-white"
            onClick={() => handleDeleteTest()}
          >
            Удалить тест
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-7">
        <MyInput
          label="Название теста"
          name="testName"
          type="text"
          className="w-1/2"
          value={name}
          onChangeHandle={(e) => setName(e.target.value)}
        />
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <h2>Вопросы</h2>
            <PlusCircleIcon
              className="size-6 stroke-blue-600 cursor-pointer"
              onClick={() => addQuestion()}
            />
          </div>
        </div>
        <div className="flex flex-col gap-7">
          {questionsInTest.map((question) => {
            let type: string;
            switch (question.type) {
              case "radio":
                type = "Один из списка";
                break;
              case "checkbox":
                type = "Несколько из списка";
                break;
              case "text":
                type = "Слово или словосочетание";
                break;
              default:
                type = "Один из списка";
                question.type = "radio";
            }
            const inCondition = openQuestion === question.id;
            const nodeRef = createRef<HTMLDivElement>();
            return (
              <div
                className="flex flex-col gap-5 p-4 border border-opacity-50 border-black rounded transition-all duration-500"
                key={question.id}
              >
                <div className="flex flex-col gap-2.5">
                  <div className="flex gap-4 items-center">
                    <TextareaAutosize
                      value={question.name}
                      className="border-0 rounded w-full resize-none bg-gray-100 py-1 px-2 shadow"
                      onChange={(e) =>
                        dispatch(
                          setQuestionName({
                            questionId: question.id,
                            name: e.target.value,
                          }),
                        )
                      }
                    />
                    <ChevronRightIcon
                      onClick={() =>
                        setOpenQuestion(
                          openQuestion === question.id ? 0 : question.id,
                        )
                      }
                      className={classNames(
                        "size-6 cursor-pointer transition-transform",
                        openQuestion === question.id ? "rotate-90" : "",
                      )}
                    />
                  </div>
                  <p
                    className={classNames(
                      "text-sm transition-all duration-500",
                      openQuestion === question.id
                        ? "opacity-0 select-none -my-4"
                        : "",
                    )}
                  >
                    {type}
                  </p>
                </div>
                <CSSTransition
                  nodeRef={nodeRef}
                  unmountOnExit
                  in={inCondition}
                  timeout={{
                    exit: 500,
                  }}
                  classNames="open-question"
                >
                  <div
                    ref={nodeRef}
                    className={classNames("flex flex-col gap-5")}
                  >
                    <div className="flex gap-4 justify-between">
                      <MyRadio
                        name={"question_type_" + question.id}
                        label="Один из списка"
                        value="radio"
                        selected={question.type === "radio"}
                        selectAnswer={() =>
                          changeQuestionType(question.id, "radio")
                        }
                        id={"question_radio_" + question.id}
                      />
                      <MyRadio
                        name={"question_type_" + question.id}
                        label="Несколько из списка"
                        value="checkbox"
                        selected={question.type === "checkbox"}
                        selectAnswer={() =>
                          changeQuestionType(question.id, "checkbox")
                        }
                        id={"question_checkbox_" + question.id}
                      />
                      <MyRadio
                        name={"question_type_" + question.id}
                        label="Слово или словосочетание"
                        value="text"
                        selected={question.type === "text"}
                        selectAnswer={() =>
                          changeQuestionType(question.id, "text")
                        }
                        id={"question_text_" + question.id}
                      />
                    </div>
                    <p className="font-medium">Варианты ответов:</p>
                    <AnswersList
                      type={question.type}
                      questionId={question.id}
                    />
                    <div className="flex justify-between items-center">
                      {question.type ? (
                        <MyButton onClick={() => addAnswer(question.id)}>
                          Добавить вариант ответа
                        </MyButton>
                      ) : (
                        ""
                      )}
                      <button
                        className="bg-red-500 px-4 py-2 rounded text-white"
                        onClick={() => removeQuestion(question.id)}
                      >
                        Удалить вопрос
                      </button>
                    </div>
                  </div>
                </CSSTransition>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TestPageAdmin;
