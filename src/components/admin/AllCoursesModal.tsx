import React, { useRef } from "react";
import { PlusIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Pagination from "../Pagination.tsx";
import MyButton from "../MyButton.tsx";
import { classNames } from "../../utils/classNames.ts";
import { useClickOutside } from "../../hooks/useClickOutside.ts";

interface PropTypes extends React.ComponentPropsWithoutRef<"div"> {
  editHeader: string;
  setModalOpen: (open: boolean) => void;
  modalOpen: boolean;
}

const AllCoursesModal = ({
  editHeader,
  setModalOpen,
  modalOpen,
}: PropTypes) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, setModalOpen);
  return (
    <div
      className={classNames(
        "fixed w-full h-full bg-black bg-opacity-50 flex items-center justify-center top-0 left-0 z-50",
        modalOpen ? "flex" : "hidden",
      )}
    >
      <div className="bg-white w-3/4 p-7 rounded" ref={modalRef}>
        <div className="flex justify-between items-center">
          <span className="text-xl font-medium">
            Редактирование курсов {editHeader}
          </span>
          <XMarkIcon
            className="min-w-7 max-h-7 cursor-pointer"
            onClick={() => setModalOpen(false)}
          />
        </div>
        <div className="flex gap-8 gap-y-7 flex-wrap text-lg mt-7">
          <div className="flex justify-between items-center w-[calc(50%_-_1rem)] border border-black border-opacity-50 py-1 px-3.5 rounded">
            <p>Информационная безопастность</p>
            <XCircleIcon className="min-w-6 max-h-6 text-red-500 cursor-pointer" />
          </div>
          <div className="flex justify-between items-center w-[calc(50%_-_1rem)] border border-black border-opacity-50 py-1 px-3.5 rounded">
            <p>Информационная безопастность</p>
            <XCircleIcon className="min-w-6 max-h-6 text-red-500 cursor-pointer" />
          </div>
          <div className="flex justify-between items-center w-[calc(50%_-_1rem)] border border-black border-opacity-50 py-1 px-3.5 rounded">
            <p>Информационная безопастность</p>
            <XCircleIcon className="min-w-6 max-h-6 text-red-500 cursor-pointer" />
          </div>
          <div className="flex justify-between items-center w-[calc(50%_-_1rem)] border border-black border-opacity-50 py-1 px-3.5 rounded">
            <p>Информационная безопастность</p>
            <XCircleIcon className="min-w-6 max-h-6 text-red-500 cursor-pointer" />
          </div>
          <div className="flex justify-between items-center w-[calc(50%_-_1rem)] border border-black border-opacity-50 py-1 px-3.5 rounded">
            <p>Информационная безопастность</p>
            <XCircleIcon className="min-w-6 max-h-6 text-red-500 cursor-pointer" />
          </div>
          <div className="flex justify-between items-center w-[calc(50%_-_1rem)] border border-black border-opacity-50 py-1 px-3.5 rounded">
            <p>Информационная безопастность</p>
            <XCircleIcon className="min-w-6 max-h-6 text-red-500 cursor-pointer" />
          </div>
          <div className="flex justify-between items-center w-[calc(50%_-_1rem)] border border-black border-opacity-50 py-1 px-3.5 rounded">
            <p>Информационная безопастность</p>
            <XCircleIcon className="min-w-6 max-h-6 text-red-500 cursor-pointer" />
          </div>
          <div className="flex justify-between items-center w-[calc(50%_-_1rem)] border border-black border-opacity-50 py-1 px-3.5 rounded">
            <p>Информационная безопастность</p>
            <XCircleIcon className="min-w-6 max-h-6 text-red-500 cursor-pointer" />
          </div>
          <div className="flex justify-between items-center w-[calc(50%_-_1rem)] border border-black border-opacity-50 py-1 px-3.5 rounded">
            <p>Информационная безопастность</p>
            <XCircleIcon className="min-w-6 max-h-6 text-red-500 cursor-pointer" />
          </div>
          <div className="flex justify-between items-center w-[calc(50%_-_1rem)] border border-black border-opacity-50 py-1 px-3.5 rounded">
            <p>Информационная безопастность</p>
            <XCircleIcon className="min-w-6 max-h-6 text-red-500 cursor-pointer" />
          </div>
        </div>
        <div className="flex justify-between items-center mt-7">
          <Pagination />
          <div className="flex gap-12 items-center">
            <button className="border border-black border-opacity-50 rounded shadow-xl p-2">
              <PlusIcon className="size-5" />
            </button>
            <MyButton>Сохранить</MyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCoursesModal;
