import { IAnswer } from "../../utils/types.ts";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../store.ts";

const answerAdapter = createEntityAdapter<IAnswer>();

const initialState = answerAdapter.getInitialState<{
  status: string;
  entities: IAnswer[];
}>({
  status: "idle",
  entities: [],
});

export const fetchAnswers = createAsyncThunk(
  "answers/fetchAnswers",
  async () => {
    return [
      {
        id: 1,
        answer: "Правила дорожного движения.",
        questionId: 1,
        rightAnswer: false,
        selected: true,
        testId: 1,
      },
      {
        id: 2,
        answer: "Правила поведения в Интернете",
        questionId: 1,
        rightAnswer: true,
        selected: true,
        testId: 1,
      },
      {
        id: 3,
        answer: "Правила поведения на уроке.",
        questionId: 1,
        rightAnswer: false,
        selected: false,
        testId: 1,
      },
      {
        id: 4,
        answer: "Авторизация",
        questionId: 2,
        rightAnswer: true,
        selected: true,
        testId: 1,
      },
      {
        id: 5,
        answer: "Подотчетность",
        questionId: 2,
        rightAnswer: false,
        selected: false,
        testId: 1,
      },
      {
        id: 6,
        answer: "Конфиденциальность",
        questionId: 2,
        rightAnswer: false,
        selected: false,
        testId: 1,
      },
      {
        id: 7,
        answer: "Доступность",
        questionId: 2,
        rightAnswer: false,
        selected: false,
        testId: 1,
      },
      {
        id: 8,
        answer: "Целостность",
        questionId: 2,
        rightAnswer: false,
        selected: false,
        testId: 1,
      },
      {
        id: 9,
        answer: "Отправляемые результаты",
        questionId: 3,
        rightAnswer: true,
        selected: true,
        testId: 1,
      },
      {
        id: 10,
        answer: "Роли и ответственность участников",
        questionId: 3,
        rightAnswer: false,
        selected: false,
        testId: 1,
      },
      {
        id: 11,
        answer: "Методы и средства, необходимые для выполнения работ",
        questionId: 3,
        rightAnswer: false,
        selected: false,
        testId: 1,
      },
      {
        id: 12,
        answer: "Состав и последовательность выполняемых работ",
        questionId: 3,
        rightAnswer: false,
        selected: false,
        testId: 1,
      },
      {
        id: 13,
        answer: "",
        type: "text",
        questionId: 1,
        rightAnswer: true,
        selected: false,
        testId: 1,
        userInput: "",
      },
      {
        id: 14,
        answer: "",
        type: "text",
        questionId: 2,
        rightAnswer: true,
        selected: false,
        testId: 1,
        userInput: "",
      },
      {
        id: 15,
        answer: "",
        type: "text",
        questionId: 3,
        rightAnswer: true,
        selected: false,
        testId: 1,
        userInput: "",
      },
    ] as IAnswer[];
  },
);

export const answerSlice = createSlice({
  name: "answerSlice",
  initialState,
  reducers: (create) => ({
    selectAnswer: create.reducer<{ answerId: number; type: string }>(
      (state, action) => {
        const answers = answerAdapter.getSelectors().selectAll(state);
        const answer = answers.find((el) => el.id === action.payload.answerId);
        const selectedAnswer = answers.find(
          (el) => el.selected && el.questionId === answer?.questionId,
        );
        if (selectedAnswer && action.payload.type === "radio") {
          answerAdapter.updateOne(state, {
            id: selectedAnswer.id,
            changes: { selected: false },
          });
        }
        if (action.payload.type === "checkbox" && answer?.selected) {
          answerAdapter.updateOne(state, {
            id: answer.id,
            changes: { selected: false },
          });
        } else {
          answerAdapter.updateOne(state, {
            id: action.payload.answerId,
            changes: { selected: true },
          });
        }
      },
    ),
    selectRightAnswer: create.reducer<{
      id: number;
      type: string;
      changeType?: boolean;
    }>((state, action) => {
      const answers = answerAdapter.getSelectors().selectAll(state);
      const answer = answers.find((el) => el.id === action.payload.id);
      const selectedAnswers = answers.filter(
        (el) => el.rightAnswer && el.questionId === answer?.questionId,
      );
      if (
        selectedAnswers &&
        (action.payload.type === "radio" ||
          (action.payload.type === "checkbox" && action.payload.changeType))
      ) {
        for (const selectedAnswer of selectedAnswers) {
          answerAdapter.updateOne(state, {
            id: selectedAnswer.id,
            changes: { rightAnswer: false },
          });
        }
      }

      if (
        answer?.rightAnswer &&
        action.payload.type === "checkbox" &&
        !action.payload.changeType
      ) {
        answerAdapter.updateOne(state, {
          id: answer.id,
          changes: { rightAnswer: false },
        });
      } else {
        answerAdapter.updateOne(state, {
          id: action.payload.id,
          changes: { rightAnswer: true },
        });
      }
    }),
    addOneAnswer: answerAdapter.addOne,
    changeAnswerName: create.reducer<{ answerId: number; name: string }>(
      (state, action) => {
        answerAdapter.updateOne(state, {
          id: action.payload.answerId,
          changes: { answer: action.payload.name },
        });
      },
    ),
    removeOneAnswer: create.reducer<number>((state, action) => {
      answerAdapter.removeOne(state, action.payload);
    }),
    removeManyAnswers: answerAdapter.removeMany,
    changeUserInput: create.reducer<{ answerId: number; input: string }>(
      (state, action) => {
        answerAdapter.updateOne(state, {
          id: action.payload.answerId,
          changes: { userInput: action.payload.input },
        });
      },
    ),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnswers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAnswers.fulfilled, (state, action) => {
        answerAdapter.setAll(state, action.payload);
        state.status = "succeeded";
      });
  },
});

export const {
  selectAnswer,
  selectRightAnswer,
  addOneAnswer,
  changeAnswerName,
  removeOneAnswer,
  changeUserInput,
  removeManyAnswers,
} = answerSlice.actions;

export const { selectAll: selectAnswers, selectById: selectAnswerById } =
  answerAdapter.getSelectors((state: RootState) => state.answerReducer);

const selectAnswersAction = (state: RootState) => state.answerReducer.entities;

export const selectAnswersByQuestionId = (questionId: number, type: string) => {
  return createSelector(selectAnswersAction, (state) =>
    Object.values(state).filter(
      (el) => el.questionId === questionId && type !== "text",
    ),
  );
};
export const selectAnswersByTestId = (testId: number) => {
  return createSelector(selectAnswersAction, (state) =>
    Object.values(state).filter((el) => el.testId === testId),
  );
};
export const selectSelectedAnswersByQuestionId = (questionId: number) => {
  return createSelector(selectAnswersAction, (state) =>
    Object.values(state).filter(
      (el) => el.questionId === questionId && el.selected && el.type !== "text",
    ),
  );
};
export const selectRightAnswersByQuestionId = (questionId: number) => {
  return createSelector(selectAnswersAction, (state) =>
    Object.values(state).filter(
      (el) =>
        el.questionId === questionId && el.rightAnswer && el.type !== "text",
    ),
  );
};
export const selectTextAnswer = (questionId: number) => {
  return createSelector(selectAnswersAction, (state) =>
    Object.values(state).find(
      (el) => el.questionId === questionId && el.type === "text",
    ),
  );
};

export default answerSlice.reducer;
