import Homepage from "./pages/Homepage.tsx";
import TestPageAdmin from "./pages/admin/TestPageAdmin.tsx";
import SectionPageAdmin from "./pages/admin/SectionPageAdmin.tsx";
import CoursePageAdmin from "./pages/admin/CoursePageAdmin.tsx";
import SectionPage from "./pages/SectionPage.tsx";
import Login from "./pages/Login.tsx";
import CoursePage from "./pages/CoursePage.tsx";
import TestPage from "./pages/TestPage.tsx";
import {
    COURSE_PAGE_ADMIN_ROUTE, COURSE_PAGE_ROUTE,
    HOME_ROUTE, LOGIN_ROUTE,
    SECTION_PAGE_ADMIN_ROUTE,
    SECTION_PAGE_ROUTE,
    TEST_PAGE_ADMIN_ROUTE, TEST_PAGE_ROUTE
} from "./utils/consts.ts";

export const adminRoutes = [
    {
        path: TEST_PAGE_ADMIN_ROUTE + ":id",
        element: TestPageAdmin
    },
    {
        path: SECTION_PAGE_ADMIN_ROUTE + ":id",
        element: SectionPageAdmin
    },
    {
        path: COURSE_PAGE_ADMIN_ROUTE + ":id",
        element: CoursePageAdmin
    },
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        element: Homepage
    },
    {
        path: SECTION_PAGE_ROUTE + ":id",
        element: SectionPage
    },
    {
        path: LOGIN_ROUTE,
        element: Login
    },
    {
        path: COURSE_PAGE_ROUTE + ":id",
        element: CoursePage
    },
    {
        path: TEST_PAGE_ROUTE + ":id",
        element: TestPage
    }
]