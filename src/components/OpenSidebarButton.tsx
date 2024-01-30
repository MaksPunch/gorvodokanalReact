import {useAppDispatch} from "../hooks/redux.ts";
import {toggleSidebar} from "../store/reducers/courseSlice.ts";

const OpenSidebarButton = () => {
    const dispatch = useAppDispatch();
    return (
        <div
            className="w-12 h-12 px-2.5 py-4 bg-blue-100 rounded shadow flex-col justify-center items-center gap-1.5 inline-flex fixed left-14 top-32 cursor-pointer"
            onClick={() => dispatch(toggleSidebar())}
        >
            <div className="w-6 h-px border border-black"></div>
            <div className="w-6 h-px border border-black"></div>
            <div className="w-6 h-px border border-black"></div>
        </div>
    );
};

export default OpenSidebarButton;