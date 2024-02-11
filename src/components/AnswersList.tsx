import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {fetchAnswers, selectAnswersByQuestionId, selectRightAnswer} from "../store/reducers/answerSlice.ts";

const AnswersList = ({questionId, type}: {
    questionId: number,
    type: string
}) => {
    const {status} = useAppSelector(state => state.answerReducer)
    const dispatch = useAppDispatch()
    const questionAnswers = useAppSelector(selectAnswersByQuestionId(questionId));

    function selectAnswer(answerId: number) {
        dispatch(selectRightAnswer({id: answerId, type}));
    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAnswers());
        }
    }, [dispatch, status]);

    return (
        <div className="flex flex-col gap-2.5 pl-7">
            {questionAnswers.map(({answer, id, rightAnswer}) =>
                <div className="flex gap-2.5 items-center" key={id}>
                    <input
                        type={type}
                        id={"answer_" + id}
                        name={"question" + questionId}
                        onChange={() => selectAnswer(id)}
                        checked={rightAnswer}
                        className={type ==='checkbox' ? "rounded" : ""}
                    />
                    <label htmlFor={"answer_" + id}>{answer}</label>
                </div>
                // <MyRadio key={id} name={"question_" + questionId} id={'answer_' + id} label={answer}
                //          selected={rightAnswer} value={id} selectAnswer={() => selectAnswer(id)}/>
            )}
        </div>
    );
};

export default AnswersList;