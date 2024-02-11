import {useParams} from "react-router-dom";
import MyButton from "../../components/MyButton";
import MyInput from "../../components/MyInput";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchTests, selectTestById} from "../../store/reducers/testSlice";
import {useEffect, useMemo, useState} from "react";
import {
    addOneQuestion,
    fetchQuestions, removeOneQuestion,
    selectQuestionsByTestId, selectQuestionType,
} from "../../store/reducers/questionSlice";
import {ChevronRightIcon, PlusCircleIcon} from "@heroicons/react/24/outline";
import TextareaAutosize from 'react-textarea-autosize';
import MyRadio from "../../components/MyRadio.tsx";
import AnswersList from "../../components/admin/AnswersList.tsx";
import {
    addOneAnswer,
    fetchAnswers,
    selectAnswers,
    selectRightAnswer
} from "../../store/reducers/answerSlice.ts";

const TestPageAdmin = () => {
    const {testId} = useParams<"testId">();
    const dispatch = useAppDispatch();
    const test = useAppSelector((state) => selectTestById(state, Number(testId)));
    const testNameValue = test?.name || "";
    const {status: testStatus} = useAppSelector((state) => state.testReducer);
    const {status: answerStatus} = useAppSelector((state) => state.answerReducer);
    const {status: questionStatus} = useAppSelector(
        (state) => state.questionReducer,
    );
    const [name, setName] = useState<string>(testNameValue);
    const questions = useAppSelector(selectQuestionsByTestId(Number(testId)));
    const answers = useAppSelector(state => selectAnswers(state));

    useEffect(() => {
        if (testStatus === "idle") {
            dispatch(fetchTests());
        }
        setName(testNameValue);

        if (questionStatus === "idle") {
            dispatch(fetchQuestions());
        }

        if (answerStatus === 'idle') {
            dispatch(fetchAnswers());
        }
    }, [dispatch, testStatus, questionStatus, testNameValue, answerStatus]);

    const questionsNames: {
        [key: number]: { type: string, name: string };
    } = useMemo(() => {
        return {};
    }, []);

    for (const question of questions) {
        questionsNames[question.id] = {type: question.type, name: question.name};
    }

    const [questionsCopy, setQuestionsCopy] =
        useState(questionsNames);

    useEffect(() => {
        setQuestionsCopy(questionsNames);
    }, [questionsNames]);

    function changeQuestionType(questionId: number, type: string) {
        const answer = answers.find(el => el.questionId === questionId);
        if (answer) {
            dispatch(selectRightAnswer({id: answer.id, type, changeType: true}));
        }
        dispatch(selectQuestionType({questionId, type}));
    }

    function removeQuestion(questionId: number) {
        dispatch(removeOneQuestion(questionId));
    }

    function addAnswer(questionId: number) {
        const lastAnswer = answers[answers.length - 1]
        dispatch(addOneAnswer({answer: "", testId: Number(testId), rightAnswer: false, questionId, selected: false, id: lastAnswer.id + 1}))
    }

    function addQuestion() {
        const lastQuestion = questions[questions.length - 1];
        dispatch(addOneQuestion({id: lastQuestion.id + 1, name: "", type: "radio", testId: Number(testId), done: false}));
    }

    return (
        <div className="main-wrapper">
            <div className="flex justify-between mb-7">
                <h1>Редактирование теста</h1>
                <MyButton>Сохранить</MyButton>
            </div>
            <div className="flex flex-col gap-7">
                <MyInput
                    label="Название теста"
                    name="testName"
                    type="text"
                    className="w-1/2"
                    value={name}
                    onChangeHandle={(e) => setName(e.target.value)}
                />
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3 items-center">
                        <h2>Вопросы</h2>
                        <PlusCircleIcon className="size-6 stroke-blue-600 cursor-pointer" onClick={() => addQuestion()}/>
                    </div>
                </div>
                {questions.map((question) => {
                    let type: string;
                    switch (question.type) {
                        case "radio":
                            type = 'Один из списка';
                            break;
                        case "checkbox":
                            type = 'Несколько из списка';
                            break;
                        case "text":
                            type = 'Слово или словосочетание';
                            break;
                        default:
                            type = 'Один из списка';
                            question.type = 'radio';
                    }
                    return (
                        <div className="flex flex-col gap-5 p-4 border border-opacity-50 border-black rounded"
                             key={question.id}>
                            <div className="flex flex-col gap-2.5">
                                <div className="flex gap-4 items-center">
                                    <TextareaAutosize
                                        value={questionsCopy[question.id].name}
                                        className="border-0 rounded w-full resize-none bg-gray-100 py-1 px-2"
                                        onChange={(e) =>
                                            setQuestionsCopy({
                                                ...questionsCopy,
                                                [question.id]: {name: e.target.value, type: question.type},
                                            })
                                        }
                                    />
                                    <ChevronRightIcon className="size-6"/>
                                </div>
                                <p className="text-sm">{type}</p>
                            </div>
                            <div className="flex gap-4 justify-between">
                                <MyRadio name={"question_type_" + question.id} label="Один из списка"
                                         value="radio"
                                         selected={question.type === 'radio'}
                                         selectAnswer={() => changeQuestionType(question.id, 'radio')}
                                         id={'question_radio_' + question.id}
                                />
                                <MyRadio name={"question_type_" + question.id} label="Несколько из списка"
                                         value="checkbox"
                                         selected={question.type === 'checkbox'}
                                         selectAnswer={() => changeQuestionType(question.id, 'checkbox')}
                                         id={'question_checkbox_' + question.id}
                                />
                                <MyRadio name={"question_type_" + question.id} label="Слово или словосочетание"
                                         value="text"
                                         selected={question.type === 'text'}
                                         selectAnswer={() => changeQuestionType(question.id, 'text')}
                                         id={'question_text_' + question.id}
                                />
                            </div>
                            <p className="font-medium">
                                Варианты ответов:
                            </p>
                            <AnswersList type={question.type} questionId={question.id}/>
                            <div className="flex justify-between items-center">
                                {question.type ? <MyButton onClick={() => addAnswer(question.id)}>Добавить вариант ответа</MyButton> : ""}
                                <button className="bg-red-500 px-4 py-2 rounded text-white" onClick={() => removeQuestion(question.id)}>Удалить вопрос</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default TestPageAdmin;
