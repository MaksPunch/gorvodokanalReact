import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {Link, useParams} from "react-router-dom";
import CourseBlock from "../components/CourseBlock.tsx";
import {SECTION_PAGE_ROUTE} from "../utils/consts.ts";
import {useEffect} from "react";
import {
    changeSection,
    fetchSections,
    selectSectionsByCourseId,
} from "../store/reducers/sectionSlice.ts";
import {changeCourse, fetchCourses, selectCourseById} from "../store/reducers/courseSlice.ts";
import {RootState} from "../store/store.ts";

type Params = 'courseId'

const CoursePage = () => {
    // const courses = useAppSelector(state => state.courseReducer)
    const {courseId} = useParams<Params>();
    // const navigate = useNavigate();
    const dispatch = useAppDispatch();
    // const [course, setCourse] = useState<ICourse>({name: '', id: 1, sectionsQuantity: 4})
    const sections = useAppSelector(selectSectionsByCourseId(Number(courseId)));
    const course = useAppSelector((state: RootState) => selectCourseById(state, Number(courseId)));
    useEffect(() => {
        dispatch(fetchCourses());
        dispatch(fetchSections());
        dispatch(changeCourse(Number(courseId)));
        dispatch(changeSection(0));
        // const course = courses.find((el) => el.id === Number(id))
        // if (!course) return navigate(HOME_ROUTE);
        // setCourse(course);
    }, [courseId]);

    return (
        <div className="main-wrapper flex items-start gap-7">
            <CourseBlock className="min-w-[409px]" name={course?.name} progress={50} id={Number(courseId)}></CourseBlock>
            <div className="sections-in-course-wrapper mb-4 w-full flex flex-col gap-4">
                <h2>Программа курса</h2>
                <div className="sections-container flex flex-col gap-6 w-full">
                    {sections.map(({name, id, steps}) =>
                        <Link to={SECTION_PAGE_ROUTE + `/${id}`} key={id}
                              className="px-5 py-3 rounded shadow border border-black border-opacity-50 flex justify-between items-center gap-2.5">
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