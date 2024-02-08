import MyInput from "../MyInput.tsx";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import {
  fetchSections,
  selectSectionsByCourseId,
} from "../../store/reducers/sectionSlice.ts";
import { XMarkIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../utils/classNames.ts";
import { Link } from "react-router-dom";
import { SECTION_PAGE_ADMIN_ROUTE } from "../../utils/consts.ts";
import {
  selectCourseById,
  setCourseName,
} from "../../store/reducers/courseSlice.ts";
import MyButton from "../MyButton.tsx";

const CoursesSidebar = ({
  courseId,
  setSidebarOpen,
  sidebarOpen,
}: {
  courseId: number;
  setSidebarOpen: (arg1: boolean) => void;
  sidebarOpen: boolean;
}) => {
  const courseNameValue =
    useAppSelector((state) => selectCourseById(state, courseId))?.name || "";
  const [name, setName] = useState<string>(courseNameValue);
  const sections = useAppSelector(selectSectionsByCourseId(courseId));
  const { status: sectionStatus } = useAppSelector(
    (state) => state.sectionReducer,
  );
  const sideBarRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (sectionStatus === "idle") {
      dispatch(fetchSections());
    }
    setName(courseNameValue);
  }, [courseId, sectionStatus, courseNameValue, dispatch]);

  function saveCourse() {
    dispatch(setCourseName({ courseId, name }));
  }

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [sideBarRef, setSidebarOpen]);

  return (
    <div
      ref={sideBarRef}
      className={classNames(
        "fixed right-0 top-0 h-svh w-96 bg-white sidebar text-black z-40 flex flex-col gap-2.5 px-4 py-6",
        sidebarOpen ? "" : "translate-x-96",
      )}
    >
      <div className="flex gap-4 justify-between">
        <h1>Редактирование курса</h1>
        <XMarkIcon
          className="min-w-6 max-h-6 mt-1.5 cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        />
      </div>
      <form
        action="#"
        method="POST"
        className={"flex flex-col gap-10"}
        onSubmit={(e) => e.preventDefault()}
      >
        <MyInput
          name={"course_name"}
          type={"text"}
          label={"Название курса"}
          value={name}
          onChangeHandle={(e) => setName(e.target.value)}
        />
        <div className="flex flex-col gap-7">
          <div className="flex justify-between">
            <h2>Темы в курсе</h2>
            <Link
              to={SECTION_PAGE_ADMIN_ROUTE}
              className="text-blue-600 text-lg font-medium"
            >
              Создать тему
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            {sections.map(({ name, id }) => (
              <div key={id} className="flex justify-between items-center">
                <Link
                  to={SECTION_PAGE_ADMIN_ROUTE + "/" + id}
                  className="text-sm font-medium"
                >
                  {name}
                </Link>
                <XCircleIcon className="min-w-5 max-h-5 text-red-500 cursor-pointer" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <MyButton className="text-sm" onClick={() => saveCourse()}>
            Сохранить
          </MyButton>
          <button className="bg-red-600 px-5 py-2 text-sm text-white rounded hover:bg-red-700 transition-colors">
            Удалить курс
          </button>
        </div>
      </form>
    </div>
  );
};

export default CoursesSidebar;
