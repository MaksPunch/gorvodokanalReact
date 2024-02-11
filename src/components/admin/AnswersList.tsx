import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {
    fetchAnswers,
    selectAnswersByQuestionId,
} from "../../store/reducers/answerSlice.ts";
import AnswerEdit from "./AnswerEdit.tsx";

const AnswersList = ({questionId, type}: {
    questionId: number,
    type: string
}) => {
    const {status} = useAppSelector(state => state.answerReducer)
    const dispatch = useAppDispatch()
    const questionAnswers = useAppSelector(selectAnswersByQuestionId(questionId));



    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAnswers());
        }
    }, [dispatch, status]);

    return (
        <div className="flex flex-col gap-2.5 pl-7">
            {type === 'text' ?
                ""
                :
                questionAnswers.map(({answer, id, rightAnswer}) =>
                    <AnswerEdit id={id} rightAnswer={rightAnswer} type={type} questionId={questionId} answer={answer} key={id}/>
                // <MyRadio key={id} name={"question_" + questionId} id={'answer_' + id} label={answer}
                //          selected={rightAnswer} value={id} selectAnswer={() => selectAnswer(id)}/>
            ) }
        </div>
    );
};


export default AnswersList;