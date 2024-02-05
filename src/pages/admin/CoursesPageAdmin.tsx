import {MagnifyingGlassIcon, PlusIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {fetchCourses, selectCourses} from "../../store/reducers/courseSlice.ts";
import InputWithIcon from "../../components/InputWithIcon.tsx";
import CoursesSidebar from "../../components/admin/CoursesSidebar.tsx";

const CoursesPageAdmin = () => {
    const courses = useAppSelector(state => selectCourses(state))
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
    const [courseId, setCourseId] = useState<number>(0)
    const {status: coursesFetchStatus} = useAppSelector(state => state.courseReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (coursesFetchStatus === 'idle') {
            dispatch(fetchCourses());
        }
    }, []);

    const handleCreateCourse = () => {
        setSidebarOpen(true);
        setCourseId(0)
    }

    return (
        <div className="main-wrapper flex flex-col gap-7">
            <CoursesSidebar courseId={courseId} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/>
            <div className="flex justify-between items-center">
                <h1>Курсы</h1>
                <p className="text-blue-600 cursor-pointer" onClick={handleCreateCourse}>Добавить курс</p>
            </div>

            <InputWithIcon Icon={MagnifyingGlassIcon} type={"text"} placeholder={"Поиск"}/>
            <div className="flex flex-col gap-x-4 gap-y-7">
                {courses.map(({id, name, sectionsQuantity}) =>
                    <div key={id}
                         className="w-full flex flex-col gap-2.5 p-2.5 border border-black border-opacity-50 rounded-md cursor-pointer"
                         onClick={() => {
                             setSidebarOpen(true);
                             setCourseId(id);
                         }}
                    >
                        <div className="flex justify-between items-center">
                            <h2>{name}</h2>
                            <PlusIcon className="size-6"/>
                        </div>
                        <p>В курс входят {sectionsQuantity} тем, из них 1 скрыта</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoursesPageAdmin;