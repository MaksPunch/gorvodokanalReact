import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {ICourse} from "../../utils/types.ts";
import {RootState} from "../store.ts";

const courseAdapter = createEntityAdapter<ICourse>()

export const fetchCourses = createAsyncThunk(
    'sections/fetchCourses',
    async () => {
        return [
            {
                id: 1,
                name: 'Информационная безопасность',
                sectionsQuantity: 3
            },
            {
                id: 2,
                name: 'Основы защиты информации',
                sectionsQuantity: 3
            },
        ] as ICourse[]
    })

const initialState = courseAdapter.getInitialState<{
    status: string,
    entities: ICourse[],
    courseId: number,
    sidebarOpen: boolean
}>({
    status: 'idle',
    entities: [],
    courseId: 0,
    sidebarOpen: false
})

export const courseSlice = createSlice({
    name: 'courseSlice',
    initialState,
    reducers: (create) => ({
        changeCourse: create.reducer<number>((state, action) => {
            state.courseId = action.payload;
        }),
        toggleSidebar(state) {
            state.sidebarOpen = !state.sidebarOpen;
        }
    }),
    extraReducers: builder => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                courseAdapter.setAll(state, action.payload);
                state.status = 'idle';
            })
    }
})

export const {changeCourse, toggleSidebar} = courseSlice.actions;

export const {selectAll: selectCourses, selectById: selectCourseById} =
    courseAdapter.getSelectors((state: RootState) => state.courseReducer)

export default courseSlice.reducer;