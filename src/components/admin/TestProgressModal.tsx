import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import { fetchTests, selectTestById } from "../../store/reducers/testSlice.ts";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Breadcrumb from "../Breadcrumb.tsx";

interface PropTypes extends React.ComponentPropsWithoutRef<"div"> {
  testId: number;
  name: string;
  setModalOpen: (open: boolean) => void;
  changeProgressType: (type: string, id: number, sectionId?: number) => void;
  courseName: string;
  sectionId: number;
  courseId: number;
}

const TestProgressModal = ({
  testId,
  className,
  name,
  setModalOpen,
  changeProgressType,
  courseName,
  sectionId,
  courseId,
}: PropTypes) => {
  const dispatch = useAppDispatch();
  const { status: testStatus } = useAppSelector((state) => state.testReducer);
  const test = useAppSelector((state) => selectTestById(state, testId));

  useEffect(() => {
    if (testStatus === "idle") {
      dispatch(fetchTests());
    }
  }, [dispatch, testStatus]);

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
      current: false,
    },
    {
      name: 'Тест по теме "' + sectionId + '"',
      onClick: () => {
        changeProgressType("tests", testId, sectionId);
      },
      current: true,
    },
  ];

  return (
    <div
      className={
        "flex flex-col bg-white rounded w-full h-full pb-7 px-7 overflow-scroll " +
        className
      }
    >
      <div className="flex gap-5 flex-col items-start sticky top-0 bg-white pt-7 pb-3">
        <div className="flex gap-4 justify-between items-center w-full">
          <p className="text-2xl font-bold line-clamp-2">
            Результаты {name} в тесте "{test?.name}"
          </p>
          <XMarkIcon
            className="min-w-6 max-h-6 mt-1.5 cursor-pointer"
            onClick={() => setModalOpen(false)}
          />
        </div>
        <Breadcrumb pages={breadcrumbList} />
      </div>
      <h1>{test?.name}</h1>
    </div>
  );
};

export default TestProgressModal;
