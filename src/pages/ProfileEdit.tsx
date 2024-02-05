import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {fetchUsers, selectUserById} from "../store/reducers/UserSlice.ts";
import {useEffect} from "react";
import MyButton from "../components/MyButton.tsx";
import MyInput from "../components/MyInput.tsx";

const ProfileEdit = () => {
    const dispatch = useAppDispatch();
    const {userId} = useAppSelector(state => state.userReducer);
    const user = useAppSelector(state => selectUserById(state, userId));
    const {status: userStatus} = useAppSelector(state => state.userReducer)

    useEffect(() => {
        if (userStatus === 'idle') {
            dispatch(fetchUsers())
        }
    }, []);

    function getImgUrl(name: string) {
        return new URL(`${name}`, import.meta.url).href
    }


    return (
        <div className="main-wrapper">
            <h1 className="mb-6">Редактировать информацию</h1>
            <div className="flex flex-col gap-3.5">
                <h2>{user?.surname} {user?.name} {user?.patronymic}</h2>
                <div className="flex gap-7 items-center">
                    <img src={getImgUrl("../public/img/" + user?.avatar)} className="size-24 rounded object-cover"
                         alt={user?.name}/>
                    <div className="flex flex-col gap-2.5 items-start">
                        <MyButton>Поменять аватар</MyButton>
                        <p className="text-opacity-75 text-black text-xs font-medium">JPG, GIF или PNG. До 1Мбайта.</p>
                    </div>
                </div>
                <div className="flex gap-5">
                    <MyInput className="w-full" name="surname" type="text" label="Фамилия"/>
                    <MyInput className="w-full" name="name" type="text" label="Имя"/>
                    <MyInput className="w-full" name="patronymic" type="text" label="Отчество"/>
                </div>
                <div className="flex gap-5">
                    <MyInput className="w-full" name="email" type="text" label="Адрес электронной почты"/>
                    <MyInput className="w-full" name="phone" type="text" label="Номер телефона"/>
                </div>
                <hr/>
                <h2>Сменить пароль</h2>
                <div className="flex gap-5">
                    <MyInput className="w-full" name="oldPassword" type="password" label="Старый пароль"/>
                    <MyInput className="w-full" name="newPassword" type="password" label="Новый пароль"/>
                    <MyInput className="w-full" name="newPassword2" type="password" label="Подтвердить пароль"/>
                </div>
                <div className="flex gap-7 self-end">
                    <MyButton>Сохранить</MyButton>
                    <button className="px-2.5 py-2 bg-white rounded border border-black border-opacity-50 hover:bg-gray-100 transition-colors">Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;