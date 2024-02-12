import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {
    changeAnswerName,
    fetchAnswers,
    selectAnswersByQuestionId, selectTextAnswer,
} from "../../store/reducers/answerSlice.ts";
import AnswerEdit from "./AnswerEdit.tsx";

const AnswersList = ({questionId, type}: {
    questionId: number,
    type: string
}) => {
    const {status} = useAppSelector(state => state.answerReducer)
    const dispatch = useAppDispatch()
    const questionAnswers = useAppSelector(selectAnswersByQuestionId(questionId));
    const textAnswer = useAppSelector(selectTextAnswer(questionId));

    function changeName(id: number, name: string) {
        dispatch(changeAnswerName({answerId: id, name}))
    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAnswers());
        }
    }, [dispatch, status]);

    return (
        <div className="flex flex-col gap-2.5 pl-7">
            {type === 'text' && textAnswer ?
                <input className="px-2.5 py-2 bg-white rounded shadow border border-black border-opacity-40" type="text"
                       name={"question_text_" + questionId} id={"question_text_" + questionId}
                       value={textAnswer.answer} onChange={(e) => changeName(textAnswer.id, e.target.value)}/>
                :
                questionAnswers.map(({answer, id, rightAnswer, type: answerType}) => {
                        return (answerType === 'text' ? "" :
                            <AnswerEdit id={id} rightAnswer={rightAnswer} type={type} questionId={questionId}
                                        answer={answer}
                                        key={id}/>)
                    }

                    // <MyRadio key={id} name={"question_" + questionId} id={'answer_' + id} label={answer}
                    //          selected={rightAnswer} value={id} selectAnswer={() => selectAnswer(id)}/>
                )}
        </div>
    );
};


export default AnswersList;