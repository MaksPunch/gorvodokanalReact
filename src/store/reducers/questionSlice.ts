import {IQuestion} from "../../utils/types.ts";
import {createAsyncThunk, createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";

export const questionAdapter = createEntityAdapter<IQuestion>()

const initialState = questionAdapter.getInitialState<{ status: string, entities: IQuestion[] }>({
    status: "idle",
    entities: []
})

export const fetchQuestions = createAsyncThunk(
    'questions/fetchQuestions',
    async () => {
        return [
            {
                id: 1,
                testId: 1,
                type: "checkbox",
                name: "Что такое «сетевой этикет»?",
                done: false,
            },
            {
                id: 2,
                testId: 1,
                type: "radio",
                name: 'Что описывает данное определение: "права и разрешения, предоставленные индивидууму (или процессу), которые обеспечивают возможность доступа к ресурсу."',
                done: false,
            },
            {
                id: 3,
                testId: 1,
                type: "radio",
                name: "Что НЕ определяется для каждого этапа жизненного цикла?",
                done: false,
            },
        ] as IQuestion[]
    }
)

export const questionSlice = createSlice({
    name: 'questionSlice',
    initialState,
    reducers: (create) => ({
        selectQuestionType: create.reducer<{ questionId: number, type: string }>((state, action) => {
            questionAdapter.updateOne(state, {id: action.payload.questionId, changes: {type: action.payload.type}})
        }),
        removeOneQuestion: questionAdapter.removeOne,
        removeManyQuestions: questionAdapter.removeMany,
        addOneQuestion: questionAdapter.addOne,
        markQuestionDone: create.reducer<number>((state, action) => {
            questionAdapter.updateOne(state, {id: action.payload, changes: {done: true}});
        }),
        markQuestionUndone: create.reducer<number>((state, action) => {
            questionAdapter.updateOne(state, {id: action.payload, changes: {done: false}});
        }),
        setQuestionName: create.reducer<{ questionId: number, name: string }>((state, action) => {
            questionAdapter.updateOne(state, {id: action.payload.questionId, changes: {name: action.payload.name}});
        })
    }),
    extraReducers: builder => {
        builder
            .addCase(fetchQuestions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                questionAdapter.setAll(state, action.payload);
                state.status = 'succeeded';
            })
    }
})
// export const {selectQuestionById, selectQuestionsByTestId} = questionSlice.selectors;

export const {
    selectQuestionType,
    removeOneQuestion,
    addOneQuestion,
    markQuestionDone,
    markQuestionUndone,
    removeManyQuestions,
    setQuestionName
} = questionSlice.actions;

export const {selectAll: selectQuestions, selectById: selectQuestionById} =
    questionAdapter.getSelectors((state: RootState) => state.questionReducer)

const selectTestsAction = (state: RootState) => state.questionReducer.entities

export const selectQuestionsByTestId = (testId: number) => {
    return createSelector(
        selectTestsAction,
        (state) =>
            Object.values(state).filter((el) => el.testId === testId)
    )
}

export default questionSlice.reducer