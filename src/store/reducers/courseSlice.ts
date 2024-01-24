import {createSlice} from "@reduxjs/toolkit";

export interface IAnswer {
    id: number,
    questionId: number,
    rightAnswer: boolean,
    answer: string
}

export interface IQuestion {
    id: number,
    testId: number,
    type: string,
    answers: null | IAnswer[],
}

export interface ITest {
    id: number,
    name: string,
    questions: IQuestion[],
}

export interface ISection {
    id: number,
    name: string,
    testId: number,
    content: string,
    steps: number
}

export interface ICourse {
    id: number,
    name: string,
    sections: ISection[]
}

const initialState: ICourse[] = [
    {
        id: 1,
        name: 'Информационная безопасность',
        sections: [
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
        ]
    },
    {
        id: 2,
        name: 'Основы защиты информации',
        sections: [
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
    },
]

export const courseSlice = createSlice({
    name: 'courseSlice',
    initialState,
    reducers: {}
})

export default courseSlice.reducer;