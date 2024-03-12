import MyInput from "../../components/MyInput.tsx";
import MySelect from "../../components/MySelect.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import {
  fetchCourses,
  selectCourses,
} from "../../store/reducers/courseSlice.ts";
import { useEffect, useState } from "react";
import { COURSES_PAGE_ADMIN_ROUTE } from "../../utils/consts.ts";
import { XCircleIcon } from "@heroicons/react/24/outline";
import MyButton from "../../components/MyButton.tsx";
import { classNames } from "../../utils/classNames.ts";
import OpenAdminSidebar from "../../components/admin/OpenAdminSidebar.tsx";
import AllCoursesModal from "../../components/admin/AllCoursesModal.tsx";
import DepartmentEditSidebar from "../../components/admin/DepartmentEditSidebar.tsx";

const DepartmentEdit = () => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector((state) => selectCourses(state));
  const { status: courseStatus } = useAppSelector(
    (state) => state.courseReducer,
  );
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (courseStatus === "idle") {
      dispatch(fetchCourses());
    }
  }, [dispatch, courseStatus]);

  useEffect(() => {
    document.title =
      "Редактирование отделов | Система дистанцинного обучения ВологдаГорВодоканал";
  }, []);

  return (
    <div className="main-wrapper pb-5">
      <OpenAdminSidebar setSidebarOpen={setSidebarOpen} />
      <DepartmentEditSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <AllCoursesModal
        editHeader={"Иванова"}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
      <h1>Редактирование отдела</h1>
      <div className="flex flex-col gap-3.5">
        <MyInput
          className="w-1/2"
          name="name"
          type="text"
          label="Название отдела"
        />
        <MySelect
          name="course"
          label="Прикрепить к курсу"
          items={courses}
          createText="курс"
          createLink={COURSES_PAGE_ADMIN_ROUTE}
          className="w-1/2"
        />
        <h2>Прикреплённые курсы</h2>
        <div
          className={classNames(
            "flex gap-9 flex-wrap text-sm gap-y-3",
            courses?.length > 3 ? "justify-between" : "",
          )}
        >
          {courses.map(({ id, name }) => (
            <div
              key={id}
              className="border border-opacity-50 px-2 py-1.5 flex items-center justify-between gap-7 border-black rounded"
            >
              <p>{name}</p>
              <XCircleIcon className="min-w-6 max-h-6 text-red-500 cursor-pointer" />
            </div>
          ))}
        </div>
        {courses.length > 6 ? (
          <button
            className="border border-opacity-50 px-3.5 py-1.5 border-black rounded self-center cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            <p>Показать всё</p>
          </button>
        ) : (
          ""
        )}
        <hr />
        <div className="flex gap-7 items-center justify-end">
          <MyButton>Сохранить</MyButton>
          <button className="bg-red-600 px-5 py-2 text-white rounded hover:bg-red-700 transition-colors">
            Удалить отдел
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentEdit;
