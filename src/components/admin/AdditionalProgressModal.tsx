import React, { useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../utils/classNames.ts";
import CourseBlock from "../CourseBlock.tsx";
import { useClickOutside } from "../../hooks/useClickOutside.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import {
  fetchCourses,
  selectCourses,
} from "../../store/reducers/courseSlice.ts";

interface PropTypes extends React.ComponentPropsWithoutRef<"div"> {
  name: string;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  userId: number;
}

const AdditionalProgressModal = ({
  name,
  modalOpen,
  setModalOpen,
}: PropTypes) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, setModalOpen);
  const { status: courseStatus } = useAppSelector(
    (state) => state.courseReducer,
  );
  const dispatch = useAppDispatch();
  const courses = useAppSelector((state) => selectCourses(state));

  useEffect(() => {
    if (courseStatus === "idle") {
      dispatch(fetchCourses());
    }
  }, [dispatch, courseStatus]);

  return (
    <div
      className={classNames(
        "fixed w-full h-full bg-black bg-opacity-50 flex items-center justify-center top-0 left-0 z-50",
        modalOpen ? "flex" : "hidden",
      )}
    >
      <div
        className="flex flex-col gap-7 bg-white rounded w-3/4 p-7"
        ref={modalRef}
      >
        <div className="flex gap-4 justify-between items-center">
          <p className="text-2xl font-bold line-clamp-2">Прогресс {name}</p>
          <XMarkIcon
            className="min-w-6 max-h-6 mt-1.5 cursor-pointer"
            onClick={() => setModalOpen(false)}
          />
        </div>
        <div className="flex flex-wrap gap-7">
          {courses.map(({ id, name }) => (
            <CourseBlock
              key={id}
              courseId={id}
              name={name}
              progress={80}
              className="w-[calc(50%_-_0.875rem)] gap-[.5rem] py-[1rem] cursor-pointer"
              noLink={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdditionalProgressModal;
