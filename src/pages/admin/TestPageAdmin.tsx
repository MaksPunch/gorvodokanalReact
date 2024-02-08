import { useParams } from "react-router-dom";
import MyButton from "../../components/MyButton";
import MyInput from "../../components/MyInput";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchTests, selectTestById } from "../../store/reducers/testSlice";
import { useEffect, useMemo, useState } from "react";
import {
  fetchQuestions,
  selectQuestionsByTestId,
} from "../../store/reducers/questionSlice";
import { ChevronRightIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

const TestPageAdmin = () => {
  const { testId } = useParams<"testId">();
  const dispatch = useAppDispatch();
  const test = useAppSelector((state) => selectTestById(state, Number(testId)));
  const testNameValue = test?.name || "";
  const { status: testStatus } = useAppSelector((state) => state.testReducer);
  const { status: questionStatus } = useAppSelector(
    (state) => state.questionReducer,
  );
  const [name, setName] = useState<string>(testNameValue);
  const questions = useAppSelector(selectQuestionsByTestId(Number(testId)));

  useEffect(() => {
    if (testStatus === "idle") {
      dispatch(fetchTests());
    }
    setName(testNameValue);

    if (questionStatus === "idle") {
      dispatch(fetchQuestions());
    }
  }, [dispatch, testStatus, questionStatus, testNameValue]);

  const questionsNames: {
    [key: number]: string;
  } = useMemo(() => {
    return {};
  }, []);

  for (const question of questions) {
    questionsNames[question.id] = question.name;
  }

  const [questionsNamesValues, setQuestionsNamesValues] =
    useState(questionsNames);

  useEffect(() => {
    setQuestionsNamesValues(questionsNames);
  }, [questionsNames]);

  return (
    <div className="main-wrapper">
      <div className="flex justify-between mb-7">
        <h1>Редактирование теста</h1>
        <MyButton>Сохранить</MyButton>
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
            <PlusCircleIcon className="size-6 stroke-blue-600 cursor-pointer" />
          </div>
        </div>
        {questions.map((question) => (
          <div className="flex flex-col gap-2.5 p-4 border border-opacity-50 border-black rounded">
            <div className="flex justify-">
              <textarea
                value={questionsNamesValues[question.id]}
                className="border-0 p-0 rounded w-full resize-none height-6 max-height-10"
                rows="1"
                onChange={(e) =>
                  setQuestionsNamesValues({
                    ...questionsNamesValues,
                    [question.id]: e.target.value,
                  })
                }
              />
              <ChevronRightIcon className="size-6" />
            </div>
            <p>{question.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestPageAdmin;
