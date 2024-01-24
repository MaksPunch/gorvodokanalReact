import {useAppSelector} from "../hooks/redux.ts";
import {Link, useNavigate, useParams} from "react-router-dom";
import CourseBlock from "../components/CourseBlock.tsx";
import {HOME_ROUTE, SECTION_PAGE_ROUTE} from "../utils/consts.ts";

type Params = 'id'

const CoursePage = () => {
    const courses = useAppSelector(state => state.courseReducer)
    const {id} = useParams<Params>();
    const course = courses.find((el) => el.id === Number(id))
    const navigate = useNavigate();
    if (!course) {
        return navigate(HOME_ROUTE);
    }
    return (
        <div className="main-wrapper flex items-start gap-7">
            <CourseBlock className="min-w-[409px]" name={course.name} progress={50} id={Number(id)}></CourseBlock>
            <div className="sections-in-course-wrapper mb-4 w-full flex flex-col gap-4">
                <h2>Программа курса</h2>
                <div className="sections-container flex flex-col gap-6 w-full">
                    {course.sections.map(({name, id, steps}) =>
                        <Link to={SECTION_PAGE_ROUTE + `/${id}`} key={id} className="px-5 py-3 rounded shadow border border-black border-opacity-50 flex justify-between items-center gap-2.5">
                            <h3 className="font-semibold line-clamp-1" title={name}>{name}</h3>
                            <p className="text-sm min-w-fit">0/{steps} шагов пройдено</p>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoursePage;