import { IDepartment } from "./types.ts";

export const LOGIN_ROUTE: string = "/login";
export const HOME_ROUTE: string = "/";
export const SECTION_PAGE_ROUTE: string = "/section";
export const SECTION_PAGE_ADMIN_ROUTE: string = "/admin/section";
export const TEST_PAGE_ROUTE: string = "/test";
export const TEST_PAGE_ADMIN_ROUTE: string = "/admin/test";
export const COURSES_PAGE_ROUTE: string = "/courses";
export const COURSE_PAGE_ROUTE: string = "/course";
export const COURSES_PAGE_ADMIN_ROUTE: string = "/admin/courses";
export const PROFILE_EDIT_PAGE_ROUTE: string = "/profile_edit";
export const COURSE_PAGE_ADMIN_ROUTE: string = "/admin/course";
export const NOT_FOUND_ROUTE: string = "/not_found";
export const USER_EDIT_ADMIN_ROUTE: string = "/admin/user_edit";
export const USER_PROGRESS_ADMIN_ROUTE: string = "/admin/user_progress";
export const DEPARTMENT_EDIT_ADMIN_ROUTE: string = "/admin/department_edit";
export const TESTS_PAGE_ADMIN_ROUTE: string = "/admin/tests";

export const DepartmentList: IDepartment[] = [
  {
    id: 1,
    name: "Строительный отдел",
  },
  {
    id: 2,
    name: "Информационный отдел",
  },
];
