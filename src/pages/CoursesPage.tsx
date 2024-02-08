import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";
import CourseBlock from "../components/CourseBlock.tsx";
import InputWithIcon from "../components/InputWithIcon.tsx";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { fetchCourses, selectCourses } from "../store/reducers/courseSlice.ts";
import { useEffect } from "react";

const CoursesPage = () => {
  const courses = useAppSelector((state) => selectCourses(state));
  const dispatch = useAppDispatch();
  const { status: courseStatus } = useAppSelector(
    (state) => state.courseReducer,
  );
  useEffect(() => {
    if (courseStatus === "idle") {
      dispatch(fetchCourses());
    }
  }, [dispatch, courseStatus]);
  return (
    <div className="main-wrapper flex flex-col gap-7">
      <h1>Мои курсы</h1>

      <InputWithIcon
        Icon={MagnifyingGlassIcon}
        type={"text"}
        placeholder={"Поиск"}
      />
      <div className="flex flex-wrap gap-x-4 gap-y-7">
        {courses.map(({ id, name }) => (
          <CourseBlock
            key={id}
            id={id}
            name={name}
            className="courses-page-course"
          />
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
