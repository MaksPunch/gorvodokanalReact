import {Link} from "react-router-dom";
import {COURSE_PAGE_ROUTE, HOME_ROUTE, LOGIN_ROUTE} from "../utils/consts.ts";
import logo from '../public/logo.png'
import userIconImg from '../public/User.png'
import { BellIcon } from '@heroicons/react/24/outline'
import {useState} from "react";
import {classNames} from "../utils/classNames.ts";
import * as React from "react";

const Header = () => {
  const [activePage, setActivePage] = useState<String>(HOME_ROUTE)
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    const el = event.target as HTMLAnchorElement;
    if (!el.getAttribute('data-href')) return;
    // @ts-ignore
    setActivePage(el.getAttribute('data-href'));
  }
    return (
        <div className="flex items-center justify-center gap-96 py-4 relative header">
          <div className="flex items-center justify-center gap-10">
            <Link to={HOME_ROUTE}>
              <img src={logo} alt="logo"/>
            </Link>
            <Link
                className={classNames("menu-item", activePage === HOME_ROUTE ? "active-page" : "")}
                to={HOME_ROUTE}
                data-href={HOME_ROUTE}
                onClick={handleClick}
            >Главная</Link>
            <Link
                className={classNames("menu-item", activePage === COURSE_PAGE_ROUTE ? "active-page" : "")}
                to={COURSE_PAGE_ROUTE}
                data-href={COURSE_PAGE_ROUTE}
                onClick={handleClick}
            >Мои курсы</Link>
          </div>
          <div className="flex items-center gap-5">
            <BellIcon className="size-5 text-gray-700"/>
            <Link
                className="w-11" to={LOGIN_ROUTE}
                onClick={() => setActivePage('')}
            >
              <img src={userIconImg} alt=""/>
            </Link>
          </div>
        </div>
    );
};

export default Header;