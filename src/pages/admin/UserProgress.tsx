import MySelect from "../../components/MySelect.tsx";
import { DepartmentList } from "../../utils/consts.ts";
import InputWithIcon from "../../components/InputWithIcon.tsx";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import userImg from "../../public/img/userAvatars/1.jpg";
import Pagination from "../../components/Pagination.tsx";
import { useState } from "react";
import AdditionalProgressModal from "../../components/admin/AdditionalProgressModal.tsx";

const SortOptions = [
  {
    id: 1,
    name: "По умолчанию",
  },
  {
    id: 2,
    name: "По убыванию",
  },
  {
    id: 3,
    name: "По возрастанию",
  },
];

const UserProgress = () => {
  const [id, setId] = useState<number>(1);
  const [additionalProgressModalOpen, setAdditionalProgressModalOpen] =
    useState(true);

  function enhanceProgress() {
    setId(1);
    setAdditionalProgressModalOpen(true);
  }

  return (
    <div className="main-wrapper pt-5">
      <AdditionalProgressModal
        userId={id}
        setModalOpen={setAdditionalProgressModalOpen}
        modalOpen={additionalProgressModalOpen}
        name={"Иванова"}
      />
      <h1 className="mb-7">Прогресс пользователей</h1>
      <div className="flex items-center gap-7">
        <MySelect
          name="departmentFilter"
          label="Фильтр по отделу"
          items={DepartmentList}
          className="min-w-[calc(25%_-_0.875rem)]"
        />
        <MySelect
          name="markSort"
          label="Сортировка по баллу"
          items={SortOptions}
          className="min-w-[calc(25%_-_0.875rem)]"
        />
        <div className="flex flex-col gap-2 w-full">
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
      </div>
      <div className="flex flex-col gap-7 mt-7 pb-7">
        <div
          className="flex justify-between items-center rounded border border-black border-opacity-50 p-2.5 cursor-pointer"
          onClick={() => enhanceProgress()}
        >
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
            <div className="flex flex-col gap-1 font-medium justify-between">
              <p>
                Пройдено <b>20</b> тем из <b>25</b>
              </p>
              <p>
                Получено <b>80</b> баллов <b>100</b>
              </p>
            </div>
            <div className="progress-bar-wrapper flex flex-col gap-1.5">
              <p className="text-sm">80% выполнено</p>
              <div className="progress-bar relative">
                <span className="block absolute rounded-full h-full progress w-[80%]"></span>
                <span className="block h-full w-full rounded-full progress-bar-full"></span>
              </div>
            </div>
          </div>
          <PlusIcon className="size-6" />
        </div>

        <Pagination />
      </div>
    </div>
  );
};

export default UserProgress;
