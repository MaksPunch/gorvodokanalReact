import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import {
  fetchSections,
  selectSectionsByCourseId,
} from "../../store/reducers/sectionSlice.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import Breadcrumb from "../Breadcrumb.tsx";

interface PropTypes extends React.ComponentPropsWithoutRef<"div"> {
  name: string;
  setModalOpen: (open: boolean) => void;
  courseName: string;
  changeProgressType: (type: string, id: number, sectionId?: number) => void;
  courseId: number;
}

const CourseProgress = ({
  name,
  className,
  setModalOpen,
  courseName,
  changeProgressType,
  courseId,
}: PropTypes) => {
  const dispatch = useAppDispatch();
  const { status: sectionStatus } = useAppSelector(
    (state) => state.sectionReducer,
  );
  const sections = useAppSelector(selectSectionsByCourseId(courseId));

  useEffect(() => {
    if (sectionStatus === "idle") {
      dispatch(fetchSections());
    }
  }, [dispatch, sectionStatus]);

  const breadcrumbList = [
    {
      name: "Курсы",
      onClick: () => {
        changeProgressType("courses", 0);
      },
      current: false,
    },
    {
      name: 'Курс "' + courseName + '"',
      onClick: () => {
        changeProgressType("sections", courseId);
      },
      current: true,
    },
  ];

  return (
    <div
      className={
        "flex flex-col bg-white rounded w-full h-full pb-7 px-7 overflow-auto " +
        className
      }
    >
      <div className="flex gap-5 flex-col items-start sticky top-0 bg-white pt-7 pb-3">
        <div className="flex gap-4 justify-between items-center w-full">
          <p className="text-2xl font-bold line-clamp-2">
            Прогресс {name} в курсе "{courseName}"
          </p>
          <XMarkIcon
            className="min-w-6 max-h-6 mt-1.5 cursor-pointer"
            onClick={() => setModalOpen(false)}
          />
        </div>
        <Breadcrumb pages={breadcrumbList} />
      </div>
      <div className="flex flex-wrap gap-7">
        {sections.map(({ id, name, testId }) => (
          <div
            className="flex gap-3 justify-between p-3 rounded border w-full"
            key={id}
          >
            <div className="flex flex-col gap-2 w-1/2">
              <p className="text-xs">Тема</p>
              <p className="text-lg font-bold">{name}</p>
              <p>Шагов пройдено: 0 из 4</p>
            </div>
            <div className="flex flex-col gap-2 w-1/2 items-start">
              <p className="text-xs">Тест</p>
              <p className="font-medium">Верных ответов: 0 из 10 вопросов</p>
              <button
                className="flex gap-px items-center text-blue-700 hover:text-blue-600 transition-colors"
                onClick={() => changeProgressType("tests", testId, id)}
              >
                <p className="text-lg">Подробнее</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseProgress;
