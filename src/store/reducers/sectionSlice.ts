import {ISection} from "./courseSlice.ts";
import {createSlice} from "@reduxjs/toolkit";

const initialState: ISection[] = [
    {
        id: 4,
        name: "Целостность, доступность и конфиденциальность информации",
        content: "живите",
        testId: 1,
        steps: 4
    },
    {
        id: 5,
        name: "Классификация информации по видам тайны и степеням конфиденциальности",
        content: "живите",
        testId: 1,
        steps: 8
    },
    {
        id: 6,
        name: "Жизненные циклы конфиденциальной информации",
        content: "живите",
        testId: 1,
        steps: 3
    },
]

export const sectionSlice = createSlice({
    name: "sectionSlice",
    initialState,
    reducers: {}
})

export default sectionSlice.reducer;