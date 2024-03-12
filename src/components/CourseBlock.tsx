import { Link } from "react-router-dom";
import { COURSE_PAGE_ROUTE } from "../utils/consts.ts";
import React, { useEffect } from "react";
import {
  fetchSections,
  getSectionsQuantityFromCourse,
} from "../store/reducers/sectionSlice.ts";
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";

interface propTypes extends React.ComponentPropsWithoutRef<"div"> {
  name: string;
  progress?: number;
  sectionsQuantity?: number;
  courseId: number;
  className?: string;
  noLink?: true;
  showQuantity?: boolean;
}

const CourseBlock = ({
  name,
  progress,
  courseId,
  className,
  noLink,
  onClick,
  showQuantity = true,
}: propTypes) => {
  let sectionsEnding = "тем";
  const dispatch = useAppDispatch();
  const sectionsQuantity = useAppSelector(
    getSectionsQuantityFromCourse(courseId),
  );
  const { status: sectionStatus } = useAppSelector(
    (state) => state.sectionReducer,
  );
  useEffect(() => {
    if (sectionStatus === "idle") {
      dispatch(fetchSections());
    }
  }, [sectionStatus, dispatch]);
  if (sectionsQuantity) {
    if (sectionsQuantity % 10 === 1) {
      sectionsEnding = "тема";
    } else if (
      sectionsQuantity % 10 === 2 ||
      sectionsQuantity % 10 === 3 ||
      sectionsQuantity % 10 === 4
    ) {
      sectionsEnding = "темы";
    }
  }
  return (
    <div
      className={"course flex flex-col gap-3.5 px-7 py-5 rounded " + className}
      onClick={
        onClick
          ? onClick
          : () => {
              return;
            }
      }
    >
      <div className="flex flex-col">
        <p className="text-xs">Курс</p>
        {noLink ? (
          <h1 className="font-bold">{name}</h1>
        ) : (
          <Link to={COURSE_PAGE_ROUTE + `/${courseId}`}>
            <h1 className="font-bold">{name}</h1>
          </Link>
        )}
      </div>
      {progress ? (
        <div className="progress-bar-wrapper flex flex-col gap-1.5">
          <p className="text-sm">{progress}% выполнено</p>
          <div className="progress-bar relative">
            <span
              className={`block absolute rounded-full h-full progress w-[${progress}%]`}
            ></span>
            <span className="block h-full w-full rounded-full progress-bar-full"></span>
          </div>
        </div>
      ) : (
        ""
      )}
      {sectionsQuantity && showQuantity ? (
        <p className="text-xs">
          Доступно {sectionsQuantity} {sectionsEnding}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default CourseBlock;
