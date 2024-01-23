import {Link} from "react-router-dom";
import {COURSE_PAGE_ROUTE} from "../utils/consts.ts";

interface propTypes {
    name: string,
    progress?: number,
    sectionsQuantity?: number,
    id: number,
    classes?: string
}

const CourseBlock = ({name, progress, sectionsQuantity, id, classes}: propTypes) => {
    let sectionsEnding = "тем";
    if (sectionsQuantity) {
        if (sectionsQuantity%10 === 1) {
            sectionsEnding = "тема"
        } else if (sectionsQuantity%10 === 2 || sectionsQuantity%10 === 3 || sectionsQuantity%10 === 4) {
            sectionsEnding = "темы"
        }
    }
    return (
            <div className={"course flex flex-col gap-3.5 px-7 py-5 rounded " + classes}>
                <div className="flex flex-col">
                    <p className="text-xs">Курс</p>
                    <Link to={COURSE_PAGE_ROUTE + `${id}`}><h1 className="font-bold">{name}</h1></Link>
                </div>
                {progress ?
                    <div className="progress-bar-wrapper flex flex-col gap-1.5">
                        <p className="text-sm">{progress}% выполнено</p>
                        <div className="progress-bar relative">
                            <span className="block absolute rounded-full h-full progress w-1/2"></span>
                            <span className="block h-full w-full rounded-full progress-bar-full"></span>
                        </div>
                    </div>
                    : ""}
                {sectionsQuantity ?
                    <p className="text-xs">Доступно {sectionsQuantity} {sectionsEnding}</p>
                    : ""}
            </div>
    );
};

export default CourseBlock;