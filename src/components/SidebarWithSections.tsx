import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {fetchCourses, selectCourseById, toggleSidebar} from "../store/reducers/courseSlice.ts";
import {fetchSections, selectSectionsByCourseId} from "../store/reducers/sectionSlice.ts";
import {XMarkIcon, ChevronRightIcon} from '@heroicons/react/24/outline'
import {Link} from "react-router-dom";
import {COURSE_PAGE_ROUTE, SECTION_PAGE_ROUTE} from "../utils/consts.ts";
import {classNames} from "../utils/classNames.ts";

const SidebarWithSections = () => {
    const dispatch = useAppDispatch()
    const {courseId, sidebarOpen} = useAppSelector(state => state.courseReducer);
    const {sectionId} = useAppSelector(state => state.sectionReducer);
    const course = useAppSelector(state => selectCourseById(state, courseId))
    const sections = useAppSelector(selectSectionsByCourseId(courseId));
    useEffect(() => {
        dispatch(fetchCourses());
        dispatch(fetchSections())
    }, [courseId]);

    return (
        <div
            className={classNames(
                "fixed left-0 top-0 h-svh w-80 bg-blue-700 z-40 sidebar flex flex-col gap-2.5 text-white px-4 py-6",
                sidebarOpen ? "" : "-translate-x-96")}
        >
            <div className="flex gap-4">
                <XMarkIcon
                    className="min-w-6 max-h-6 mt-1.5 cursor-pointer"
                    onClick={() => dispatch(toggleSidebar())}
                />
                <Link to={COURSE_PAGE_ROUTE + "/" + course?.id}
                      className="text-2xl font-bold line-clamp-2">{course?.name}</Link>
            </div>
            <div className="flex flex-col gap-4">
                <p className="font-medium">Темы</p>
                <div className="flex flex-col gap-2.5">
                    {sections.map(({name, id}, index) =>
                        <div
                            className={classNames("flex justify-between gap-3.5 px-2.5 py-2 rounded ", (sectionId === id) ? "bg-black bg-opacity-20" : "")}>
                            <Link className="text-lg font-medium line-clamp-2"
                                  to={SECTION_PAGE_ROUTE + "/" + id}>{index + 1}. {name}</Link>
                            <ChevronRightIcon className="min-w-6 max-h-6 size-6"/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SidebarWithSections;