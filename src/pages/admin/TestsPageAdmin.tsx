import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import { useEffect } from "react";
import { fetchTests, selectTests } from "../../store/reducers/testSlice.ts";
import { TEST_PAGE_ADMIN_ROUTE } from "../../utils/consts.ts";
import { Link } from "react-router-dom";
import {
  fetchQuestions,
  selectQuestions,
} from "../../store/reducers/questionSlice.ts";
import { IQuestion } from "../../utils/types.ts";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import InputWithIcon from "../../components/InputWithIcon.tsx";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Pagination from "../../components/Pagination.tsx";

const TestsPageAdmin = () => {
  const tests = useAppSelector((state) => selectTests(state));
  const questions: IQuestion[] = useAppSelector((state) =>
    selectQuestions(state),
  );
  const { status: testStatus } = useAppSelector((state) => state.testReducer);
  const { status: questionStatus } = useAppSelector(
    (state) => state.questionReducer,
  );
  const dispatch = useAppDispatch();
  const questionsQuantities: {
    [key: number]: number;
  } = {};

  for (const question of questions) {
    if (questionsQuantities[question.testId]) {
      questionsQuantities[question.testId]++;
    } else {
      questionsQuantities[question.testId] = 1;
    }
  }

  useEffect(() => {
    if (testStatus === "idle") {
      dispatch(fetchTests());
    }

    if (questionStatus === "idle") {
      dispatch(fetchQuestions());
    }
  }, [dispatch, testStatus, questionStatus]);

  useEffect(() => {
    document.title =
      "Редактирование тестов | Система дистанцинного обучения ВологдаГорВодоканал";
  }, []);

  return (
    <div className="main-wrapper flex flex-col gap-7">
      <div className="flex justify-between items-center">
        <h1>Редактирование тестов</h1>
        <Link
          to={
            TEST_PAGE_ADMIN_ROUTE + "/" + (tests[tests.length - 1]?.id + 1 || 1)
          }
          className="text-blue-600 cursor-pointer"
        >
          Добавить тест
        </Link>
      </div>
      <InputWithIcon
        Icon={MagnifyingGlassIcon}
        type={"text"}
        placeholder={"Поиск"}
      />
      <div className="flex flex-col gap-7">
        {tests.map(({ name, id }) => {
          let ending = "";
          if (questionsQuantities[id] === 1) {
            ending = "вопрос";
          } else if (
            questionsQuantities[id] > 1 &&
            questionsQuantities[id] < 5
          ) {
            ending = "вопроса";
          } else {
            ending = "вопросов";
          }
          return (
            <Link
              to={TEST_PAGE_ADMIN_ROUTE + "/" + id}
              key={id}
              className="w-full flex flex-col gap-2.5 p-2.5 border border-black border-opacity-50 rounded-md cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <h2>{name}</h2>
                <ChevronRightIcon className="size-6" />
              </div>
              <p>
                В тест входит {questionsQuantities[id]} {ending}
              </p>
            </Link>
          );
        })}
      </div>
      <Pagination />
    </div>
  );
};
export default TestsPageAdmin;
