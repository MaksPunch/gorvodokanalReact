import {createSlice} from "@reduxjs/toolkit";
import {ISection} from "../../utils/types.ts";

const initialState: ISection[] = [
    {
        id: 1,
        name: "Цифровые преступники",
        content: "живите",
        testId: 1,
        steps: 5
    },
    {
        id: 2,
        name: "Безопасность в интернете",
        content: "живите",
        testId: 1,
        steps: 10
    },
    {
        id: 3,
        name: "Безопасность для детей",
        content: "живите",
        testId: 1,
        steps: 2
    },
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