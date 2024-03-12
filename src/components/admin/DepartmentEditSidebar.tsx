import {classNames} from "../../utils/classNames.ts";
import {MagnifyingGlassIcon, PlusIcon, XMarkIcon} from "@heroicons/react/24/outline";
import InputWithIcon from "../InputWithIcon.tsx";
import Pagination from "../Pagination.tsx";
import MyButton from "../MyButton.tsx";

const DepartmentEditSidebar = ({sidebarOpen, setSidebarOpen}: {
    sidebarOpen: boolean,
    setSidebarOpen: ((open: boolean) => void)
}) => {
    return (
        <div
            className={classNames(
                "fixed left-0 top-0 h-svh w-[28rem] bg-white sidebar text-black z-10 flex flex-col gap-2.5 px-4 py-6",
                sidebarOpen ? "" : "-translate-x-[30rem]",
            )}
        >
            <div className="flex gap-4 justify-between">
                <p className="text-2xl font-bold line-clamp-2">
                    Отделы
                </p>
                <XMarkIcon
                    className="min-w-6 max-h-6 mt-1.5 cursor-pointer"
                    onClick={() => setSidebarOpen(false)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="search" className="text-sm">Поиск</label>
                <InputWithIcon
                    Icon={MagnifyingGlassIcon}
                    placeholder="Поиск"
                    type="search"
                    className="w-full"
                />
            </div>
            <div className="flex flex-col gap-4 mt-7">
                <div
                    className="flex justify-between items-center rounded border border-black border-opacity-50 p-2.5">
                    <div className="flex gap-7 items-center">
                        <div className="flex flex-col gap-1 font-medium">
                            <p className="text-xl">Строительный отдел</p>
                            <p className="text-sm">28 человек, прикреплено 30 курсов</p>
                        </div>
                    </div>
                    <PlusIcon className="size-6"/>
                </div>
                <div
                    className="flex justify-between items-center rounded border border-black border-opacity-50 p-2.5">
                    <div className="flex gap-7 items-center">
                        <div className="flex flex-col gap-1 font-medium">
                            <p className="text-xl">Строительный отдел</p>
                            <p className="text-sm">28 человек, прикреплено 30 курсов</p>
                        </div>
                    </div>
                    <PlusIcon className="size-6"/>
                </div>
                <div
                    className="flex justify-between items-center rounded border border-black border-opacity-50 p-2.5">
                    <div className="flex gap-7 items-center">
                        <div className="flex flex-col gap-1 font-medium">
                            <p className="text-xl">Строительный отдел</p>
                            <p className="text-sm">28 человек, прикреплено 30 курсов</p>
                        </div>
                    </div>
                    <PlusIcon className="size-6"/>
                </div>
                <div
                    className="flex justify-between items-center rounded border border-black border-opacity-50  p-2.5">
                    <div className="flex gap-7 items-center">
                        <div className="flex flex-col gap-1 font-medium">
                            <p className="text-xl">Строительный отдел</p>
                            <p className="text-sm">28 человек, прикреплено 30 курсов</p>
                        </div>
                    </div>
                    <PlusIcon className="size-6"/>
                </div>
                <div
                    className="flex justify-between items-center rounded border border-black border-opacity-50 p-2.5">
                    <div className="flex gap-7 items-center">
                        <div className="flex flex-col gap-1 font-medium">
                            <p className="text-xl">Строительный отдел</p>
                            <p className="text-sm">28 человек, прикреплено 30 курсов</p>
                        </div>
                    </div>
                    <PlusIcon className="size-6"/>
                </div>
            </div>
            <Pagination/>
            <MyButton>Создать отдел</MyButton>
        </div>
    );
};

export default DepartmentEditSidebar;