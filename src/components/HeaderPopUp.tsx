import {classNames} from "../utils/classNames.ts";
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

interface LinkItem {
    to: string;
    label: string;
}

const HeaderPopUp = ({linkList, children}: { linkList: LinkItem[], children: string }) => {
    const [popUpOpen, setPopUpOpen] = useState<boolean>(false);
    const popUpRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (popUpRef.current && !popUpRef.current.contains(event.target as Node)) {
                setPopUpOpen(false);
            }
        };

        document.addEventListener("click", handleClick, true);

        return () => {
            document.removeEventListener("click", handleClick, true);
        };
    }, [popUpRef]);

    return (
        <div className="relative" ref={popUpRef}>
            <div
                className={classNames("menu-item flex items-center gap-2 px-2 cursor-pointer")}
                onClick={() => setPopUpOpen(!popUpOpen)}
            >
                {children}<ChevronRightIcon
                className={classNames("w-3 stroke-[2.5px] transition-transform", popUpOpen ? "rotate-90" : "")}/>
            </div>
            <div
                className={classNames("flex flex-col absolute gap-2 shadow-[0_0_50px_-10px_rgb(0,0,0,0.15)] py-3 px-3 bg-white w-fit top-12 left-1/2 -translate-x-1/2 transition-opacity z-20 rounded", popUpOpen ? "opacity-100" : "opacity-0 -translate-y-96")}
                onClick={(e) => e.stopPropagation()}
            >
                {linkList.map(({to, label}) =>
                    <Link
                        className={classNames("menu-item flex items-center gap-2 px-2 w-max")}
                        to={to}
                        key={to}
                        onClick={() => setPopUpOpen(false)}
                    >
                        {label}
                    </Link>
                )}
            </div>
        </div>
    );
};

export default HeaderPopUp;