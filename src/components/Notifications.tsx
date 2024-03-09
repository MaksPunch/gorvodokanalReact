import { classNames } from "../utils/classNames.ts";
import {
  BellIcon,
  EnvelopeOpenIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

const Notifications = () => {
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [notificationsRef]);
  return (
    <div className="relative" ref={notificationsRef}>
      <div
        className={classNames(
          "menu-item flex items-center gap-2 px-2 cursor-pointer",
        )}
        onClick={() => setNotificationsOpen(!notificationsOpen)}
      >
        <BellIcon className="size-6 text-gray-700" />
      </div>
      <div
        className={classNames(
          "flex flex-col absolute gap-2 shadow-[0_0_50px_-10px_rgb(0,0,0,0.15)] py-3 px-3 bg-white w-80 h-80 top-12 left-1/2 -translate-x-1/2 transition-opacity z-20 rounded",
          notificationsOpen ? "opacity-100" : "opacity-0 -translate-y-96",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-2">
          <h2>Уведомления</h2>
          <div className="flex gap-2 items-center">
            <EnvelopeOpenIcon className="size-7 box-border cursor-pointer hover:bg-blue-300 rounded p-0.5 transition-colors" />
            <XMarkIcon
              className="size-7 cursor-pointer hover:bg-blue-300 rounded transition-colors"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            />
          </div>
        </div>
        <p className="self-center">Пока что здесь пусто!</p>
      </div>
    </div>
  );
};

export default Notifications;
