import logo_login from '../public/img/logo_login.png'
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {HOME_ROUTE} from "../utils/consts.ts";
import {useAppDispatch} from "../hooks/redux.ts";
import {changeUser} from "../store/reducers/UserSlice.ts";

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailMessage, setEmailMessage] = useState<string>('');
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    function handleLogin() {
        if (email !== 'ivan@gmail.com') {
            return setEmailMessage('Неверная почта');
        } else {
            setEmailMessage('');
        }

        if (password !== '123456') {
            return setPasswordMessage('Неверный пароль');
        } else {
            setPasswordMessage('');
        }

        dispatch(changeUser(1));
        navigate(HOME_ROUTE);
    }

    return (
        <div className="main-wrapper">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto"
                        src={logo_login}
                        alt="Горводоканал"
                    />
                    <h2 className="mt-4 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
                        Вход в аккаунт
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST"
                          onSubmit={(e) => {
                              e.preventDefault();
                              handleLogin();
                          }}
                    >
                        <div>
                            <label htmlFor="email" className="text-sm font-medium leading-6 text-gray-900 block">
                                Адрес электронной почты
                            </label>
                            <div className="mt-2 flex flex-col gap-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                                {emailMessage ? <p className="text-red-500 text-xs">{emailMessage}</p> : ""}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Пароль
                                </label>
                                <div className="text-sm">
                                    <Link to={HOME_ROUTE} className="font-semibold text-blue-600 hover:text-indigo-500">
                                        Забыли пароль?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2 flex flex-col gap-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                                {passwordMessage ? <p className="text-red-500 text-xs">{passwordMessage}</p> : ""}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                            >
                                Войти
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;