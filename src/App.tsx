import './App.css'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter.tsx";
import Header from "./components/Header.tsx";
import SidebarWithSections from "./components/SidebarWithSections.tsx";
import OpenSidebarButton from "./components/OpenSidebarButton.tsx";
import {useAppSelector} from "./hooks/redux.ts";

function App() {
    const {courseId} = useAppSelector(state => state.courseReducer);
    const {userId} = useAppSelector(state => state.userReducer);
    return (
        <BrowserRouter>
            {userId ? <Header/> : ""}
            {
                courseId ? <div>
                    <OpenSidebarButton/>
                    <SidebarWithSections/>
                </div> : ""
            }

            <AppRouter/>
        </BrowserRouter>
    )
}

export default App
