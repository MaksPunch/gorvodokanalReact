import {classNames} from "../utils/classNames.ts";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {setAlertClose} from "../store/reducers/alertSlice.ts";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {useEffect} from "react";

const Alert = () => {
    const {open, content, className} = useAppSelector(state => state.alertReducer);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                dispatch(setAlertClose())
            }, 2000)
        }
    }, [open]);
    return (
        <div
            className={classNames(
                "fixed right-80 top-24 w-fit h-12 px-4 rounded-md flex items-center justify-center gap-2 text-center border border-gray-300 border-opacity-50 cursor-pointer transition-opacity hover:bg-opacity-90 hover:transition-colors z-20",
                className,
                open ? "opacity-100" : "-translate-x-96 left-0 opacity-0"
            )}
            onClick={() => dispatch(setAlertClose())}
        >
            {content} <XMarkIcon className="size-6"/>
        </div>
    );
};

export default Alert;