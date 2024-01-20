import './App.css'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter.tsx";
import Menu from "./components/Menu.tsx";

function App() {

  return (
      <BrowserRouter>
          <Menu/>
          <AppRouter/>
      </BrowserRouter>
  )
}

export default App
