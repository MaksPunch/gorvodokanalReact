import {combineReducers, configureStore} from "@reduxjs/toolkit";
import courseReducer from "./reducers/courseSlice.ts";
import sectionReducer from "./reducers/sectionSlice.ts";
import testReducer from "./reducers/testSlice.ts";
import answerReducer from "./reducers/answerSlice.ts";
import questionReducer from "./reducers/questionSlice.ts";
import userReducer from "./reducers/userSlice.ts";
import alertReducer from "./reducers/alertSlice.ts";

const rootReducer = combineReducers({
    courseReducer,
    sectionReducer,
    testReducer,
    answerReducer,
    questionReducer,
    userReducer,
    alertReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']