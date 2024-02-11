import TextareaAutosize from "react-textarea-autosize";
import {XCircleIcon, PencilSquareIcon} from "@heroicons/react/24/outline";
import {changeAnswerName, removeOneAnswer, selectRightAnswer} from "../../store/reducers/answerSlice.ts";
import {useAppDispatch} from "../../hooks/redux.ts";
import {useRef, useState} from "react";

const AnswerEdit = ({id, type, questionId, rightAnswer, answer}: {
    id: number,
    type: string,
    questionId: number,
    rightAnswer: boolean,
    answer: string
}) => {
    const dispatch = useAppDispatch();
    const [edit, setEdit] = useState<boolean>(false);

    function selectAnswer(answerId: number) {
        dispatch(selectRightAnswer({id: answerId, type}));
    }

    function changeName(id: number, name: string) {
        dispatch(changeAnswerName({answerId: id, name}))
    }

    function removeAnswer(id: number) {
        dispatch(removeOneAnswer(id));
    }

    function handleEdit() {
        setEdit(!edit);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                inputRef.current?.focus();
            })
        })
    }

    const inputRef = useRef<HTMLTextAreaElement>(null);

    return (
        <div className="flex gap-2.5 items-center" key={id}>
            <input
                type={type}
                id={"answer_" + id}
                name={"question" + questionId}
                onChange={() => selectAnswer(id)}
                checked={rightAnswer}
                className={type === 'checkbox' ? "rounded" : ""}
            />
            {edit ?
                <TextareaAutosize className="border-0 border-b p-0 px-1 resize-none w-full" ref={inputRef} value={answer}
                                  onChange={(e) => changeName(id, e.target.value)}/> :
                <label htmlFor={"answer_" + id} className="w-full">{answer}</label>}
            <div className="w-full flex gap-4 items-center">
                <PencilSquareIcon className="min-w-5 max-h-5 cursor-pointer" onClick={() => handleEdit()}/>
                <XCircleIcon onClick={() => removeAnswer(id)} className="min-w-5 max-h-5 text-red-500 cursor-pointer"/>
            </div>
        </div>
    );
};

export default AnswerEdit;