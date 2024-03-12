import { classNames } from "../../utils/classNames.ts";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import MySelect from "../MySelect.tsx";
import { IDepartment } from "../../utils/types.ts";
import InputWithIcon from "../InputWithIcon.tsx";
import userImg from "../../public/img/userAvatars/1.jpg";
import { PlusIcon } from "@heroicons/react/24/outline";
import Pagination from "../Pagination.tsx";
import MyButton from "../MyButton.tsx";
import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside.ts";

const filterOptions: IDepartment[] = [
  {
    id: 1,
    name: "Показать всё",
  },
  {
    id: 2,
    name: "Строительный отдел",
  },
  {
    id: 3,
    name: "Информационный отдел",
  },
];

const UserEditSidebar = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  useClickOutside(sidebarRef, setSidebarOpen);

  return (
    <div
      ref={sidebarRef}
      className={classNames(
        "fixed left-0 top-0 h-svh w-[28rem] bg-white sidebar text-black z-10 flex flex-col gap-2.5 px-4 py-6 overflow-y-scroll",
        sidebarOpen ? "" : "-translate-x-[30rem]",
      )}
    >
      <div className="flex gap-4 justify-between">
        <p className="text-2xl font-bold line-clamp-2">Пользователи</p>
        <XMarkIcon
          className="min-w-6 max-h-6 mt-1.5 cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        />
      </div>
      <MySelect
        name="departmentFilter"
        label="Фильтр по отделу"
        items={filterOptions}
      />
      <div className="flex flex-col gap-2">
        <label htmlFor="search" className="text-sm">
          Поиск
        </label>
        <InputWithIcon
          Icon={MagnifyingGlassIcon}
          placeholder="Поиск"
          type="search"
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-4 mt-7">
        <div className="flex justify-between items-center rounded border border-black border-opacity-50 p-2.5">
          <div className="flex gap-7 items-center">
            <img
              src={userImg}
              alt="Иван Иванов"
              className="size-11 rounded-full"
            />
            <div className="flex flex-col gap-1 font-medium">
              <p className="text-xl">Иванов И.И.</p>
              <p className="text-sm">Строительный отдел</p>
            </div>
          </div>
          <PlusIcon className="size-6" />
        </div>
        <div className="flex justify-between items-center rounded border border-black border-opacity-50 p-2.5">
          <div className="flex gap-7 items-center">
            <img
              src={userImg}
              alt="Иван Иванов"
              className="size-11 rounded-full"
            />
            <div className="flex flex-col gap-1 font-medium">
              <p className="text-xl">Иванов И.И.</p>
              <p className="text-sm">Строительный отдел</p>
            </div>
          </div>
          <PlusIcon className="size-6" />
        </div>
        <div className="flex justify-between items-center rounded border border-black border-opacity-50 p-2.5">
          <div className="flex gap-7 items-center">
            <img
              src={userImg}
              alt="Иван Иванов"
              className="size-11 rounded-full"
            />
            <div className="flex flex-col gap-1 font-medium">
              <p className="text-xl">Иванов И.И.</p>
              <p className="text-sm">Строительный отдел</p>
            </div>
          </div>
          <PlusIcon className="size-6" />
        </div>
        <div className="flex justify-between items-center rounded border border-black border-opacity-50 p-2.5">
          <div className="flex gap-7 items-center">
            <img
              src={userImg}
              alt="Иван Иванов"
              className="size-11 rounded-full"
            />
            <div className="flex flex-col gap-1 font-medium">
              <p className="text-xl">Иванов И.И.</p>
              <p className="text-sm">Строительный отдел</p>
            </div>
          </div>
          <PlusIcon className="size-6" />
        </div>
        <div className="flex justify-between items-center rounded border border-black border-opacity-50 p-2.5">
          <div className="flex gap-7 items-center">
            <img
              src={userImg}
              alt="Иван Иванов"
              className="size-11 rounded-full"
            />
            <div className="flex flex-col gap-1 font-medium">
              <p className="text-xl">Иванов И.И.</p>
              <p className="text-sm">Строительный отдел</p>
            </div>
          </div>
          <PlusIcon className="size-6" />
        </div>
      </div>
      <Pagination />
      <MyButton>Создать пользователя</MyButton>
    </div>
  );
};

export default UserEditSidebar;
