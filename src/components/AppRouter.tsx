import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {publicRoutes} from "../routes.ts";
import {COURSE_PAGE_ROUTE, SECTION_PAGE_ROUTE} from "../utils/consts.ts";
import {useEffect} from "react";
import {useAppDispatch} from "../hooks/redux.ts";
import {changeCourse} from "../store/reducers/courseSlice.ts";
import {changeSection} from "../store/reducers/sectionSlice.ts";

const AppRouter = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!location.pathname.startsWith(COURSE_PAGE_ROUTE + "/") && !location.pathname.startsWith(SECTION_PAGE_ROUTE + '/')) {
            dispatch(changeCourse(0));
            dispatch(changeSection(0));
        }
    }, [location]);
    return (
        <Routes>
            {publicRoutes.map(({path, element}) =>
                <Route key={path} path={path} Component={element}/>
            )}
            <Route path="*" Component={() => <Navigate to={'/'}/>}/>
        </Routes>
    );
};

export default AppRouter;