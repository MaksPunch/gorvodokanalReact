import React, { useEffect, useRef, useState } from "react";
import { classNames } from "../../utils/classNames.ts";
import { useClickOutside } from "../../hooks/useClickOutside.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import {
  fetchCourses,
  selectCourses,
} from "../../store/reducers/courseSlice.ts";
import AllCoursesProgress from "./AllCoursesProgress.tsx";
import CourseProgress from "./CourseProgress.tsx";
import TestProgressModal from "./TestProgressModal.tsx";

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

  const [progressType, setProgressType] = useState<string>("courses");
  const [courseId, setCourseId] = useState<number>(0);
  const [testId, setTestId] = useState<number>(0);
  const [sectionId, setSectionId] = useState<number>(0);

  useEffect(() => {
    if (courseStatus === "idle") {
      dispatch(fetchCourses());
    }
  }, [dispatch, courseStatus]);

  useEffect(() => {
    setProgressType("courses");
  }, [modalOpen]);

  const handleChangeType = (
    type: string,
    id: number = 0,
    sectionId: number = 0,
  ) => {
    setProgressType(type);
    if (type === "sections") {
      setCourseId(id);
    }
    if (type === "tests") {
      setTestId(id);
      setSectionId(sectionId);
    }
  };

  return (
    <div
      className={classNames(
        "fixed w-full h-full bg-black bg-opacity-50 flex items-center justify-center top-0 left-0 z-50",
        modalOpen ? "flex" : "hidden",
      )}
    >
      <div className="bg-white rounded w-3/4 h-5/6 max-h-5/6" ref={modalRef}>
        {progressType === "courses" ? (
          <AllCoursesProgress
            name={name}
            setModalOpen={setModalOpen}
            courses={courses}
            setProgressType={handleChangeType}
          />
        ) : (
          ""
        )}
        {progressType === "sections" ? (
          <CourseProgress
            name={name}
            setModalOpen={setModalOpen}
            courseName={courses[0].name}
            changeProgressType={handleChangeType}
            courseId={courseId}
          />
        ) : (
          ""
        )}
        {progressType === "tests" ? (
          <TestProgressModal
            testId={testId}
            changeProgressType={handleChangeType}
            setModalOpen={setModalOpen}
            courseName={courses[0].name}
            name={name}
            courseId={courseId}
            sectionId={sectionId}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AdditionalProgressModal;
