import {combineReducers, configureStore} from "@reduxjs/toolkit";
import courseReducer from "./reducers/courseSlice.ts";
import sectionReducer from "./reducers/sectionSlice.ts";
import testReducer from "./reducers/testSlice.ts";

const rootReducer = combineReducers({
    courseReducer,
    sectionReducer,
    testReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']