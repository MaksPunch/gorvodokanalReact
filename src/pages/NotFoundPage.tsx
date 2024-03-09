import MyButton from "../components/MyButton.tsx";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE } from "../utils/consts.ts";
import { useAppSelector } from "../hooks/redux.ts";
import { useEffect } from "react";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { userId } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    document.title =
      "Страница не найдена | Система дистанцинного обучения ВологдаГорВодоканал";
  }, []);
  return (
    <div className="main-wrapper text-center">
      <h1 className="text-blue-500 font-bold text-[200px] mb-4">404</h1>
      <h2 className="text-4xl font-semibold mb-2.5">Страница не найдена</h2>
      <p className="text-stone-500 font-medium text-2xl mb-10">
        К сожалению, такой страницы нет!
      </p>
      <MyButton onClick={() => navigate(userId ? HOME_ROUTE : LOGIN_ROUTE)}>
        Вернуться на главную
      </MyButton>
    </div>
  );
};

export default NotFoundPage;
