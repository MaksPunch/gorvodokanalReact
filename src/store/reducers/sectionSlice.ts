import {createAsyncThunk, createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import {ISection} from "../../utils/types.ts";
import {RootState} from "../store.ts";

const sectionsAdapter = createEntityAdapter<ISection>()

export const fetchSections = createAsyncThunk(
    'sections/fetchSections',
    async () => {
        return [
            {
                id: 1,
                name: "Цифровые преступники",
                content: "живите",
                testId: 1,
                steps: 5,
                courseId: 1
            },
            {
                id: 2,
                name: "Безопасность в интернете",
                content: "живите",
                testId: 1,
                steps: 10,
                courseId: 1
            },
            {
                id: 3,
                name: "Безопасность для детей",
                content: "живите",
                testId: 1,
                steps: 2,
                courseId: 1
            },
            {
                id: 4,
                name: "Целостность, доступность и конфиденциальность информации",
                content: "живите",
                testId: 1,
                steps: 4,
                courseId: 2
            },
            {
                id: 5,
                name: "Классификация информации по видам тайны и степеням конфиденциальности",
                content: "живите",
                testId: 1,
                steps: 8,
                courseId: 2
            },
            {
                id: 6,
                name: "Жизненные циклы конфиденциальной информации",
                content: "живите",
                testId: 1,
                steps: 3,
                courseId: 2
            },
        ] as ISection[]
    })

const initialState = sectionsAdapter.getInitialState<{ status: string, entities: ISection[], sectionId: number }>({
    status: 'idle',
    entities: [],
    sectionId: 0
})


export const sectionSlice = createSlice({
    name: "sectionSlice",
    initialState,
    reducers: (create) => ({
        changeSection: create.reducer<number>((state, action) => {
            state.sectionId = action.payload;
        }),
        setSectionContent: create.reducer<{sectionId: number, content: string}>((state, action) => {
            const sections = sectionsAdapter.getSelectors().selectAll(state);
            const section = sections.find((el) => el.id === action.payload.sectionId);
            if (!section) throw new Error('not found');
            sectionsAdapter.updateOne(state, {id: action.payload.sectionId, changes: {content: action.payload.content}})
        }),
        setSectionName: create.reducer<{sectionId: number, name: string}>((state, action) => {
            const sections = sectionsAdapter.getSelectors().selectAll(state);
            const section = sections.find((el) => el.id === action.payload.sectionId);
            if (!section) throw new Error('not found');
            sectionsAdapter.updateOne(state, {id: action.payload.sectionId, changes: {name: action.payload.name}})
        }),
        createOneSection: sectionsAdapter.addOne,
        removeOneSection: sectionsAdapter.removeOne,
        removeManySections: sectionsAdapter.removeMany
    }),
    extraReducers: builder => {
        builder
            .addCase(fetchSections.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchSections.fulfilled, (state, action) => {
                sectionsAdapter.setAll(state, action.payload)
                state.status = 'succeeded'
            })
    }
})


export default sectionSlice.reducer;

export const {changeSection, setSectionContent, setSectionName, createOneSection, removeOneSection, removeManySections} = sectionSlice.actions

export const {selectAll: selectSections, selectById: selectSectionById} =
    sectionsAdapter.getSelectors((state: RootState) => state.sectionReducer)

const selectSectionsAction = (state: RootState) => state.sectionReducer.entities;

export const selectSectionsByCourseId = (courseId: number) => {
    return createSelector(selectSectionsAction, (state) =>
        Object.values(state).filter((el) => el.courseId === courseId)
    )
}
export const getSectionsQuantityFromCourse = (courseId: number) => {
    return createSelector(selectSectionsByCourseId(courseId), (state) =>
        state.length
    )
}
