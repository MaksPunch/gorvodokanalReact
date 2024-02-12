import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {ITest} from "../../utils/types.ts";
import {RootState} from "../store.ts";

const testAdapter = createEntityAdapter<ITest>()

const initialState = testAdapter.getInitialState<{status: string, entities: ITest[]}>({
    status: "idle",
    entities: []
})

export const fetchTests = createAsyncThunk(
    'tests/fetchTests',
    async () => {
        return [
            {
                id: 1,
                name: "Информационная безопасность",
            },
        ] as ITest[]
    }
)

export const testSlice = createSlice({
    name: "testSlice",
    initialState,
    reducers: (create) => ({
        createOneTest: testAdapter.addOne,
        removeOneTest: testAdapter.removeOne,
        setTestName: create.reducer<{testId: number, name: string}>((state, action) => {
            testAdapter.updateOne(state, {id: action.payload.testId, changes: {name: action.payload.name}});
        })
    }),
    extraReducers: builder => {
        builder
            .addCase(fetchTests.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchTests.fulfilled, (state, action) => {
                testAdapter.setAll(state, action.payload);
                state.status = 'succeeded'
            })
    }
});

export const {createOneTest, removeOneTest, setTestName} = testSlice.actions;

export const {selectAll: selectTests, selectById: selectTestById} =
    testAdapter.getSelectors((state: RootState) => state.testReducer)

export default testSlice.reducer;
