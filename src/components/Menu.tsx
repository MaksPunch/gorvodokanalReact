import {Link} from "react-router-dom";
import {COURSE_PAGE_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SECTION_PAGE_ROUTE, TEST_PAGE_ROUTE} from "../utils/consts.ts";

const Menu = () => {
    return (
        <div className="flex items-center justify-center gap-11 pt-3 px-10 relative">
            <Link to={SECTION_PAGE_ROUTE}>Темы</Link>
            <Link to={HOME_ROUTE}><img src="https://placehold.co/50x50" alt="logo"/></Link>
            <Link to={COURSE_PAGE_ROUTE}>Курсы</Link>
            <Link className="absolute right-10" to={LOGIN_ROUTE}>Вход</Link>
        </div>
    );
};

export default Menu;