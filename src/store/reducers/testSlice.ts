import { createSlice } from "@reduxjs/toolkit";
import { IAnswer, IQuestion, ITest } from "../../utils/types.ts";

const initialState: ITest[] = [
  {
    id: 1,
    name: "Информационная безопасность",
    questions: [
      {
        id: 1,
        testId: 1,
        type: "radio",
        name: "Что такое «сетевой этикет»?",
        answers: [
          {
            id: 1,
            answer: "Правила дорожного движения.",
            questionId: 1,
            rightAnswer: false,
            selected: false,
          },
          {
            id: 2,
            answer: "Правила поведения в Интернете",
            questionId: 1,
            rightAnswer: true,
            selected: false,
          },
          {
            id: 3,
            answer: "Правила поведения на уроке.",
            questionId: 1,
            rightAnswer: false,
            selected: false,
          },
        ],
        done: false,
      },
      {
        id: 2,
        testId: 1,
        type: "radio",
        name: 'Что описывает данное определение: "права и разрешения, предоставленные индивидууму (или процессу), которые обеспечивают возможность доступа к ресурсу."',
        answers: [
          {
            id: 4,
            answer: "Авторизация",
            questionId: 2,
            rightAnswer: true,
            selected: false,
          },
          {
            id: 5,
            answer: "Подотчетность",
            questionId: 2,
            rightAnswer: false,
            selected: false,
          },
          {
            id: 6,
            answer: "Конфиденциальность",
            questionId: 2,
            rightAnswer: false,
            selected: false,
          },
          {
            id: 7,
            answer: "Доступность",
            questionId: 2,
            rightAnswer: false,
            selected: false,
          },
          {
            id: 8,
            answer: "Целостность",
            questionId: 2,
            rightAnswer: false,
            selected: false,
          },
        ],
        done: false,
      },
      {
        id: 3,
        testId: 1,
        type: "radio",
        name: "Что НЕ определяется для каждого этапа жизненного цикла?",
        answers: [
          {
            id: 9,
            answer: "Отправляемые результаты",
            questionId: 2,
            rightAnswer: true,
            selected: false,
          },
          {
            id: 10,
            answer: "Роли и ответственность участников",
            questionId: 2,
            rightAnswer: false,
            selected: false,
          },
          {
            id: 11,
            answer: "Методы и средства, необходимые для выполнения работ",
            questionId: 2,
            rightAnswer: false,
            selected: false,
          },
          {
            id: 12,
            answer: "Состав и последовательность выполняемых работ",
            questionId: 2,
            rightAnswer: false,
            selected: false,
          },
        ],
        done: false,
      },
    ],
  },
];

export const testSlice = createSlice({
  name: "testSlice",
  reducers: (create) => ({
    selectAnswer: create.reducer(
      (
        state: ITest[],
        action: {
          payload: { questionId: number; answerId: number; testId: number };
        },
      ) => {
        const test = state.find((el: ITest) => el.id === action.payload.testId);
        if (!test) return;
        const question = test.questions.find(
          (el: IQuestion) => el.id === action.payload.questionId,
        );
        if (!question?.answers) return;
        const selectedAnswer = question.answers.find(
          (el: IAnswer) => el.selected === true,
        );
        if (selectedAnswer && question.type === "radio")
          selectedAnswer.selected = false;
        const answer = question.answers.find(
          (el: IAnswer) => el.id === action.payload.answerId,
        );
        if (answer && question.type !== "text") {
          answer.selected = true;
        }
      },
    ),
  }),
  initialState,
});

export const { selectAnswer } = testSlice.actions;

export default testSlice.reducer;
