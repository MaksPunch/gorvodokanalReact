import './App.css'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter.tsx";
import Header from "./components/Header.tsx";
import SidebarWithSections from "./components/SidebarWithSections.tsx";
import OpenSidebarButton from "./components/OpenSidebarButton.tsx";

function App() {

  return (
      <BrowserRouter>
          <Header/>
          <SidebarWithSections/>
          <OpenSidebarButton/>
          <AppRouter/>
      </BrowserRouter>
  )
}

export default App
