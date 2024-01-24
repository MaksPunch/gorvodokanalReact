import InputWithIcon from "../components/InputWithIcon.tsx";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline"
import {BookOpenIcon} from "@heroicons/react/24/outline"
import {ArrowTopRightOnSquareIcon} from "@heroicons/react/24/outline"
import {Link} from "react-router-dom";
import {COURSES_PAGE_ROUTE, SECTION_PAGE_ROUTE} from "../utils/consts.ts";
import MyButton from "../components/MyButton.tsx";
import {useAppSelector} from "../hooks/redux.ts";
import CourseBlock from "../components/CourseBlock.tsx";

const Homepage = () => {
    const courses = useAppSelector(state => state.courseReducer)
    return (
        <div className="main-wrapper">
            <h1 className="text-3xl font-medium">Главная страница</h1>
            <div className="task-feed p-6 flex flex-col gap-7 rounded-md mt-7">
                <div className="task-feed-header flex flex-col gap-5">
                    <h1>Лента заданий</h1>
                    <InputWithIcon Icon={MagnifyingGlassIcon}  placeholder="Поиск" type="search"/>
                    <span className="block h-px w-full bg-black bg-opacity-30"/>
                </div>
                <div className="task-feed-sections flex flex-col gap-7">
                    <div className="feed-course-wrapper flex flex-col gap-4">
                        <h2>Информационная безопасность</h2>
                        <div className="feed-date-wrapper flex flex-col gap-4">
                            <p className="text-sm">Среда 20 января 2024</p>
                            <div className="feed-section-wrapper flex flex-col gap-3">
                                <div className="feed-section flex items-center gap-4">
                                    <p className="text-xs text-gray-400">12:00</p>
                                    <div className="feed-section-name flex items-center gap-2">
                                        <BookOpenIcon className="size-6"/>
                                        <Link to={SECTION_PAGE_ROUTE} className="text-sm font-light">Цифровая безопасность</Link>
                                    </div>
                                </div>
                                <span className="block h-px w-full bg-black bg-opacity-30"/>
                            </div>
                            <div className="feed-section-wrapper flex flex-col gap-3">
                                <div className="feed-section flex items-center gap-4">
                                    <p className="text-xs text-gray-400">12:00</p>
                                    <div className="feed-section-name flex items-center gap-2">
                                        <BookOpenIcon className="size-6"/>
                                        <Link to={SECTION_PAGE_ROUTE} className="text-sm font-light">Цифровая безопасность</Link>
                                    </div>
                                </div>
                                <span className="block h-px w-full bg-black bg-opacity-30"/>
                            </div>
                        </div>
                    </div>
                    <div className="feed-course-wrapper flex flex-col gap-4">
                        <h2>Информационная безопасность</h2>
                        <div className="feed-date-wrapper flex flex-col gap-4">
                            <p className="text-sm">Среда 20 января 2024</p>
                            <div className="feed-section-wrapper flex flex-col gap-3">
                                <div className="feed-section flex items-center gap-4">
                                    <p className="text-xs text-gray-400">12:00</p>
                                    <div className="feed-section-name flex items-center gap-2">
                                        <BookOpenIcon className="size-6"/>
                                        <Link to={SECTION_PAGE_ROUTE} className="text-sm font-light">Цифровая безопасность</Link>
                                    </div>
                                </div>
                                <span className="block h-px w-full bg-black bg-opacity-30"/>
                            </div>
                        </div>
                    </div>
                    <MyButton>Показать больше</MyButton>
                </div>
            </div>
            <div className="my-courses mt-12 mb-10">
                <div className="flex gap-5 items-center mb-7">
                    <h1>Мои курсы</h1>
                    <Link to={COURSES_PAGE_ROUTE}><ArrowTopRightOnSquareIcon className="size-5 text-blue-600 transition-transform hover:scale-110"/></Link>
                </div>
                <div className="courses-wrapper flex items-center flex-wrap gap-7 justify-between">
                    {courses.map(({id, name, sections}) =>
                        <CourseBlock name={name} key={id} sectionsQuantity={sections.length} progress={50} id={id}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Homepage;