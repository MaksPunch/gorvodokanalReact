import InputWithIcon from "../components/InputWithIcon.tsx";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline"
import {BookOpenIcon} from "@heroicons/react/24/outline"
import {Link} from "react-router-dom";
import {SECTION_PAGE_ROUTE} from "../utils/consts.ts";
import MyButton from "../components/MyButton.tsx";

const Homepage = () => {
    return (
        <div className="main-wrapper">
            <h1 className="text-3xl font-medium">Главная страница</h1>
            <div className="task-feed p-6 flex flex-col gap-7 rounded-md mt-7">
                <div className="task-feed-header flex flex-col gap-5">
                    <h1>Лента заданий</h1>
                    <InputWithIcon Icon={MagnifyingGlassIcon}  placeholder="Поиск" type="search"/>
                    <span className="block h-px w-full bg-black bg-opacity-30"/>
                </div>
                <div className="task-feed-sections flex flex-col gap-7">
                    <div className="feed-course-wrapper flex flex-col gap-4">
                        <h2>Информационная безопасность</h2>
                        <div className="feed-date-wrapper flex flex-col gap-4">
                            <p className="text-sm">Среда 20 января 2024</p>
                            <div className="feed-section-wrapper flex flex-col gap-3">
                                <div className="feed-section flex items-center gap-4">
                                    <p className="text-xs text-gray-400">12:00</p>
                                    <div className="feed-section-name flex items-center gap-2">
                                        <BookOpenIcon className="size-6"/>
                                        <Link to={SECTION_PAGE_ROUTE} className="text-sm font-light">Цифровая безопасность</Link>
                                    </div>
                                </div>
                                <span className="block h-px w-full bg-black bg-opacity-30"/>
                            </div>
                            <div className="feed-section-wrapper flex flex-col gap-3">
                                <div className="feed-section flex items-center gap-4">
                                    <p className="text-xs text-gray-400">12:00</p>
                                    <div className="feed-section-name flex items-center gap-2">
                                        <BookOpenIcon className="size-6"/>
                                        <Link to={SECTION_PAGE_ROUTE} className="text-sm font-light">Цифровая безопасность</Link>
                                    </div>
                                </div>
                                <span className="block h-px w-full bg-black bg-opacity-30"/>
                            </div>
                        </div>
                    </div>
                    <div className="feed-course-wrapper flex flex-col gap-4">
                        <h2>Информационная безопасность</h2>
                        <div className="feed-date-wrapper flex flex-col gap-4">
                            <p className="text-sm">Среда 20 января 2024</p>
                            <div className="feed-section-wrapper flex flex-col gap-3">
                                <div className="feed-section flex items-center gap-4">
                                    <p className="text-xs text-gray-400">12:00</p>
                                    <div className="feed-section-name flex items-center gap-2">
                                        <BookOpenIcon className="size-6"/>
                                        <Link to={SECTION_PAGE_ROUTE} className="text-sm font-light">Цифровая безопасность</Link>
                                    </div>
                                </div>
                                <span className="block h-px w-full bg-black bg-opacity-30"/>
                            </div>
                        </div>
                    </div>
                    <MyButton>Показать больше</MyButton>
                </div>
            </div>
        </div>
    );
};

export default Homepage;