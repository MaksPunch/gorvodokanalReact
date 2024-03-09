import MyInput from "../../components/MyInput.tsx";
import MySelect from "../../components/MySelect.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import {
  fetchCourses,
  selectCourses,
} from "../../store/reducers/courseSlice.ts";
import { useEffect, useState } from "react";
import {
  COURSES_PAGE_ADMIN_ROUTE,
  DEPARTMENT_EDIT_ADMIN_ROUTE,
  DepartmentList,
} from "../../utils/consts.ts";
import { XCircleIcon } from "@heroicons/react/24/outline";
import MyButton from "../../components/MyButton.tsx";
import { classNames } from "../../utils/classNames.ts";
import UserEditSidebar from "../../components/admin/UserEditSidebar.tsx";
import OpenAdminSidebar from "../../components/admin/OpenAdminSidebar.tsx";
import AllCoursesModal from "../../components/admin/AllCoursesModal.tsx";

const UserEdit = () => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector((state) => selectCourses(state));
  const { status: courseStatus } = useAppSelector(
    (state) => state.courseReducer,
  );
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(true);

  useEffect(() => {
    if (courseStatus === "idle") {
      dispatch(fetchCourses());
    }
  }, [dispatch, courseStatus]);

  useEffect(() => {
    document.title =
      "Редактирование пользователей | Система дистанцинного обучения ВологдаГорВодоканал";
  }, []);

  return (
    <div className="main-wrapper pb-5">
      <OpenAdminSidebar setSidebarOpen={setSidebarOpen} />
      <UserEditSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <AllCoursesModal
        editHeader={"Иванова"}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
      <h1>Редактирование пользователя</h1>
      <div className="flex flex-col gap-3.5">
        <div className="flex gap-5">
          <MyInput
            className="w-full"
            name="surname"
            type="text"
            label="Фамилия"
          />
          <MyInput className="w-full" name="name" type="text" label="Имя" />
          <MyInput
            className="w-full"
            name="patronymic"
            type="text"
            label="Отчество"
          />
        </div>
        <div className="flex gap-5">
          <MyInput
            className="w-full"
            name="email"
            type="text"
            label="Адрес электронной почты"
          />
          <MyInput
            className="w-full"
            name="phone"
            type="text"
            label="Номер телефона"
          />
        </div>
        <MyInput
          className="w-full"
          name="password"
          type="password"
          label="Пароль"
        />
        <hr />
        <div className="flex gap-5">
          <MySelect
            name="department"
            label="Отдел"
            items={DepartmentList}
            createText="отдел"
            createLink={DEPARTMENT_EDIT_ADMIN_ROUTE}
            className="w-full"
          />
          <MySelect
            name="course"
            label="Прикрепить к курсу"
            items={courses}
            createText="курс"
            createLink={COURSES_PAGE_ADMIN_ROUTE}
            className="w-full"
          />
        </div>
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
        <div className="flex justify-between">
          <button className="border border-opacity-50 px-3.5 py-1.5 border-black rounded self-center cursor-pointer">
            <p>Отправить данные на почту</p>
          </button>
          <div className="flex gap-7 items-center">
            <MyButton>Сохранить</MyButton>
            <button className="bg-red-600 px-5 py-2 text-white rounded hover:bg-red-700 transition-colors">
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
