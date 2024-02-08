import Homepage from "./pages/Homepage.tsx";
import TestPageAdmin from "./pages/admin/TestPageAdmin.tsx";
import SectionPageAdmin from "./pages/admin/SectionPageAdmin.tsx";
import SectionPage from "./pages/SectionPage.tsx";
import Login from "./pages/Login.tsx";
import CoursePage from "./pages/CoursePage.tsx";
import TestPage from "./pages/TestPage.tsx";
import {
  COURSE_PAGE_ROUTE,
  COURSES_PAGE_ADMIN_ROUTE,
  COURSES_PAGE_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PROFILE_EDIT_PAGE_ROUTE,
  SECTION_PAGE_ADMIN_ROUTE,
  SECTION_PAGE_ROUTE,
  TEST_PAGE_ADMIN_ROUTE,
  TEST_PAGE_ROUTE,
  TESTS_PAGE_ADMIN_ROUTE,
} from "./utils/consts.ts";
import CoursesPage from "./pages/CoursesPage.tsx";
import ResultPage from "./pages/ResultPage.tsx";
import ProfileEdit from "./pages/ProfileEdit.tsx";
import CoursesPageAdmin from "./pages/admin/CoursesPageAdmin.tsx";
import TestsPageAdmin from "./pages/admin/TestsPageAdmin.tsx";

export const adminRoutes = [
  {
    path: TEST_PAGE_ADMIN_ROUTE + "/:testId",
    element: TestPageAdmin,
  },
  {
    path: SECTION_PAGE_ADMIN_ROUTE + "/:sectionId",
    element: SectionPageAdmin,
  },
  {
    path: COURSES_PAGE_ADMIN_ROUTE,
    element: CoursesPageAdmin,
  },
  {
    path: TESTS_PAGE_ADMIN_ROUTE,
    element: TestsPageAdmin,
  },
];

export const userRoutes = [
  {
    path: HOME_ROUTE,
    element: Homepage,
  },
  {
    path: SECTION_PAGE_ROUTE + "/:id",
    element: SectionPage,
  },
  {
    path: COURSE_PAGE_ROUTE + "/:courseId",
    element: CoursePage,
  },
  {
    path: COURSES_PAGE_ROUTE,
    element: CoursesPage,
  },
  {
    path: SECTION_PAGE_ROUTE + "/:sectionId" + TEST_PAGE_ROUTE + "/:questionId",
    element: TestPage,
  },
  {
    path: SECTION_PAGE_ROUTE + "/:sectionId" + TEST_PAGE_ROUTE + "/result",
    element: ResultPage,
  },
  {
    path: PROFILE_EDIT_PAGE_ROUTE,
    element: ProfileEdit,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    element: Login,
  },
];
