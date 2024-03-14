import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CourseBlock from "../CourseBlock.tsx";
import { ICourse } from "../../utils/types.ts";

interface PropTypes extends React.ComponentPropsWithoutRef<"div"> {
  name: string;
  setModalOpen: (open: boolean) => void;
  courses: ICourse[];
  setProgressType: (type: string, id: number) => void;
}

const AllCoursesProgress = ({
  name,
  className,
  setModalOpen,
  courses,
  setProgressType,
}: PropTypes) => {
  return (
    <div
      className={
        "flex flex-col gap-7 bg-white rounded w-full h-full p-7 " + className
      }
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
            onClick={() => setProgressType("sections", id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AllCoursesProgress;
