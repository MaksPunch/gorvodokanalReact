import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {useEffect} from "react";
import {fetchTests, selectTests} from "../../store/reducers/testSlice.ts";
import {TEST_PAGE_ADMIN_ROUTE} from "../../utils/consts.ts";
import {Link} from "react-router-dom";
import {fetchQuestions, selectQuestionsByTestId} from "../../store/reducers/questionSlice.ts";

const TestsPageAdmin = () => {
    const tests = useAppSelector(state => selectTests(state))
    const {status: testStatus} = useAppSelector(state => state.testReducer);
    const {status: questionStatus} = useAppSelector(state => state.questionReducer);
    const dispatch = useAppDispatch();
    const questionsQuantities: {
        [key: number]: number
    } = {};

    for (let test of tests) {
        questionsQuantities[test.id] = useAppSelector(selectQuestionsByTestId(test.id)).length
    }

    useEffect(() => {
        if (testStatus === 'idle') {
            dispatch(fetchTests());
        }

        if (questionStatus === 'idle') {
            dispatch(fetchQuestions());
        }
    }, []);

    return (
        <div>
            {tests.map(({name, id}) => {
                    let ending = '';

                    if (questionsQuantities[id] === 1) {
                        ending = 'вопрос'
                    } else if (questionsQuantities[id] > 1 && questionsQuantities[id] < 5) {
                        ending = 'вопроса'
                    } else {
                        ending = 'вопросов'
                    }

                    return <Link to={TEST_PAGE_ADMIN_ROUTE + "/" + id} key={id}
                                 className="w-full flex flex-col gap-2.5 p-2.5 border border-black border-opacity-50 rounded-md cursor-pointer"
                    >
                        <div className="flex justify-between items-center">
                            <h2>{name}</h2>
                        </div>
                        <p>В тест входит {questionsQuantities[id]} {ending}</p>
                    </Link>
                }
            )}
        </div>
    );
};

export default TestsPageAdmin;