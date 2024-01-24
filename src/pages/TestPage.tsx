import {Link, useNavigate, useParams} from "react-router-dom";
import {HOME_ROUTE, SECTION_PAGE_ROUTE, TEST_PAGE_ROUTE} from "../utils/consts.ts";
import {useAppSelector} from "../hooks/redux.ts";
import NavigationSteps from "../components/NavigationSteps.tsx";
import {useEffect, useState} from "react";
import {IQuestion, ISection} from "../utils/types.ts";
import MyRadio from "../components/MyRadio.tsx";

const TestPage = () => {
    const {questionId, sectionId} = useParams<'questionId' | 'sectionId'>();
    const [question, setQuestion] = useState<IQuestion>({
        id: 1,
        testId: 1,
        type: 'radio',
        name: '',
        answers: [
            {answer: '', rightAnswer: false, questionId: 1, id: 1}
        ]
    })
    const [nextQuestionId, setNextQuestionId] = useState<number | string>(2);
    const [section, setSection] = useState<ISection>({name: '', id: 1, content: "", steps: 4, testId: 1})
    const navigate = useNavigate();
    const sections = useAppSelector(state => state.sectionReducer)
    const tests = useAppSelector(state => state.testReducer)

    useEffect(() => {
        if (!questionId || !sectionId) return navigate(HOME_ROUTE);
        const sectionFound = sections.find(el => el.id === Number(sectionId));
        if (!sectionFound) return navigate('not_found');
        setSection(sectionFound);
        const testId = sectionFound.testId;
        const test = tests.find(el => el.id === testId)
        if (!test) return navigate('not_found');

        const questionFound = test.questions.find(el => el.id === Number(questionId));
        if (!questionFound) return navigate('not_found');
        setQuestion(questionFound);
        const nextQuestionFound = test.questions.find(el => el.id === Number(questionId) + 1);
        if (!nextQuestionFound) setNextQuestionId('result');
        else setNextQuestionId(nextQuestionFound.id);
    }, [questionId]);

    let typeText;
    if (question.type === 'radio') {
        typeText = 'Выберите один вариант из списка'
    } else if (question.type === 'checkbox') {
        typeText = 'Выберите несколько вариантов из списка'
    } else {
        typeText = 'Напишите слово или словосочетание'
    }
    return (
        <div>
            <div className="main-wrapper flex flex-col gap-12">
                <div className="flex justify-between items-center">
                    <NavigationSteps/>
                    <p>0/{section.steps} шагов пройдено</p>
                </div>
                <div className="test-container flex flex-col gap-5">
                    <div className="test-header">
                        <h2 className="font-bold">{question.name}</h2>
                        <div className="text-xs font-normal">{typeText}</div>
                    </div>
                    <div className="flex flex-col gap-4">
                        {question.type === 'radio' && question.answers ?
                            question.answers.map(({answer, id}) =>
                                <MyRadio key={id} label={answer} value={id.toString()} name={"question_" + question.id}/>
                            )
                            :
                            ""
                        }
                        {/*{question.type === 'checkbox' && question.answers ?*/}
                        {/*    question.answers?.map(({answer, id}) =>*/}
                        {/*        <MyCheckbox key={id} label={answer} value={id} name={"question_" + question.id}/>*/}
                        {/*    )*/}
                        {/*    :*/}
                        {/*    ""*/}
                        {/*}*/}
                        {question.type === 'text' && question.answers ?
                            <input type="text" name={"question_" + question.id} className="px-2.5 py-2 bg-white rounded shadow border border-black border-opacity-40"/>
                            :
                            ""
                        }
                    </div>
                </div>
                <Link
                    to={SECTION_PAGE_ROUTE + '/' + sectionId + TEST_PAGE_ROUTE + "/" + nextQuestionId}
                    className="self-end text-sm px-4 py-2 rounded bg-blue-700 text-white flex justify-center items-center gap-2.5"
                >
                    Следующий вопрос
                </Link>
            </div>
        </div>
    );
};

export default TestPage;