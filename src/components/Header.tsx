import { Link, useLocation } from "react-router-dom";
import {
  COURSES_PAGE_ADMIN_ROUTE,
  COURSES_PAGE_ROUTE,
  // DEPARTMENT_EDIT_ADMIN_ROUTE,
  HOME_ROUTE,
  PROFILE_EDIT_PAGE_ROUTE,
  TESTS_PAGE_ADMIN_ROUTE,
  // USER_EDIT_ADMIN_ROUTE,
  // USER_PROGRESS_ADMIN_ROUTE,
} from "../utils/consts.ts";
import logo from "../public/img/logo.png";
import userIconImg from "../public/img/User.png";
import { classNames } from "../utils/classNames.ts";
import { useAppSelector } from "../hooks/redux.ts";
import HeaderPopUp from "./HeaderPopUp.tsx";
import Notifications from "./Notifications.tsx";

const coursesPopUp = [
  {
    to: COURSES_PAGE_ADMIN_ROUTE,
    label: "Редактирование курсов",
  },
  {
    to: TESTS_PAGE_ADMIN_ROUTE,
    label: "Редактирование тестов",
  },
];

// const usersPopUp = [
//   {
//     to: USER_EDIT_ADMIN_ROUTE,
//     label: "Редактирование пользователей",
//   },
//   {
//     to: USER_PROGRESS_ADMIN_ROUTE,
//     label: "Прогресс пользователей",
//   },
//   {
//     to: DEPARTMENT_EDIT_ADMIN_ROUTE,
//     label: "Редактирование отделов",
//   },
// ];

const Header = () => {
  const { pathname } = useLocation();
  const { role } = useAppSelector((state) => state.userReducer);

  return (
    <header className="py-4 sticky header top-0 z-10">
      <div className="header-wrapper flex items-center justify-between relative mx-auto">
        <div className="flex items-center justify-center gap-10">
          <Link to={HOME_ROUTE}>
            <img src={logo} alt="logo" />
          </Link>
          <Link
            className={classNames(
              "menu-item",
              pathname === HOME_ROUTE ? "active-page" : "",
            )}
            to={HOME_ROUTE}
            data-href={HOME_ROUTE}
          >
            Главная
          </Link>
          {pathname.startsWith("/admin") ? (
            <>
              <HeaderPopUp linkList={coursesPopUp}>Курсы</HeaderPopUp>
              {/*<HeaderPopUp linkList={usersPopUp}>Пользователи</HeaderPopUp>*/}
            </>
          ) : (
            <Link
              className={classNames(
                "menu-item",
                pathname === COURSES_PAGE_ROUTE ? "active-page" : "",
              )}
              to={COURSES_PAGE_ROUTE}
              data-href={COURSES_PAGE_ROUTE}
            >
              Мои курсы
            </Link>
          )}

          {role === "ADMIN" && !pathname.startsWith("/admin") ? (
            <Link
              className={classNames(
                "menu-item",
                pathname === COURSES_PAGE_ADMIN_ROUTE ? "active-page" : "",
              )}
              to={COURSES_PAGE_ADMIN_ROUTE}
              data-href={COURSES_PAGE_ADMIN_ROUTE}
            >
              Панель администратора
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="flex items-center gap-3">
          <Notifications/>
          <Link className="w-11" to={PROFILE_EDIT_PAGE_ROUTE}>
            <img src={userIconImg} alt="" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
