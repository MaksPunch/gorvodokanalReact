import {Route, Routes, useLocation} from "react-router-dom";
import {adminRoutes, publicRoutes, userRoutes} from "../routes.ts";
import {COURSE_PAGE_ROUTE, SECTION_PAGE_ROUTE} from "../utils/consts.ts";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {changeCourse} from "../store/reducers/courseSlice.ts";
import {changeSection} from "../store/reducers/sectionSlice.ts";
import NotFoundPage from "../pages/NotFoundPage.tsx";

const AppRouter = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {userId, role} = useAppSelector(state => state.userReducer);
    useEffect(() => {
        if (!location.pathname.startsWith(COURSE_PAGE_ROUTE + "/") && !location.pathname.startsWith(SECTION_PAGE_ROUTE + '/')) {
            dispatch(changeCourse(0));
            dispatch(changeSection(0));
        }
    }, [location]);
    return (
        <Routes>
            {!userId ? publicRoutes.map(({path, element}) =>
                <Route key={path} path={path} Component={element}/>
            ) : ""}
            {userId ? userRoutes.map(({path, element}) =>
                <Route key={path} path={path} Component={element}/>
            ) : ""}
            {role ==='ADMIN' ? adminRoutes.map(({path, element}) =>
                <Route key={path} path={path} Component={element}/>
            ) : ""}
            <Route path="*" Component={NotFoundPage}/>
        </Routes>
    );
};

export default AppRouter;