import {combineReducers, configureStore} from "@reduxjs/toolkit";
import courseReducer from "./reducers/courseSlice.ts";
import sectionReducer from "./reducers/sectionSlice.ts";
import testReducer from "./reducers/testSlice.ts";
import answerReducer from "./reducers/answerSlice.ts";
import questionReducer from "./reducers/questionSlice.ts";

const rootReducer = combineReducers({
    courseReducer,
    sectionReducer,
    testReducer,
    answerReducer,
    questionReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']