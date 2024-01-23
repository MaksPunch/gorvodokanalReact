import './App.css'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter.tsx";
import Header from "./components/Header.tsx";

function App() {

  return (
      <BrowserRouter>
          <Header/>
          <AppRouter/>
      </BrowserRouter>
  )
}

export default App
