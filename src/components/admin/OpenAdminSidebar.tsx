import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";

const OpenAdminSidebar = ({setSidebarOpen}: {setSidebarOpen: ((open: boolean) => void)}) => {
    return (
        <div
            className="w-12 h-12 px-3.5 py-3.5 bg-blue-100 rounded shadow flex-col justify-center items-center gap-1.5 inline-flex fixed left-14 top-32 cursor-pointer"
            onClick={() => setSidebarOpen(true)}
        >
            <MagnifyingGlassIcon className="size-12"/>
        </div>
    );
};

export default OpenAdminSidebar;