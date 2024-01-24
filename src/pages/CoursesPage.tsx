import {useAppSelector} from "../hooks/redux.ts";
import CourseBlock from "../components/CourseBlock.tsx";
import InputWithIcon from "../components/InputWithIcon.tsx";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";

const CoursesPage = () => {
    const courses = useAppSelector(state => state.courseReducer)
    return (
        <div className="main-wrapper flex flex-col gap-7">
            <h1>Мои курсы</h1>

            <InputWithIcon Icon={MagnifyingGlassIcon} type={"text"} placeholder={"Поиск"}/>
            <div className="flex flex-wrap gap-x-4 gap-y-7">
                {courses.map(({id, name, sections})=>
                    <CourseBlock key={id} id={id} name={name} sectionsQuantity={sections.length} className="courses-page-course"/>
                )}
                {courses.map(({id, name, sections})=>
                    <CourseBlock key={id} id={id} name={name} sectionsQuantity={sections.length} className="courses-page-course"/>
                )}
            </div>
        </div>
    );
};

export default CoursesPage;