import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {IUser} from "../../utils/types.ts";
import {RootState} from "../store.ts";


const userAdapter = createEntityAdapter<IUser>();

const initialState = userAdapter.getInitialState<{ status: string, entities: IUser[], userId: number }>({
    status: 'idle',
    entities: [],
    userId: 1
})

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        return [
            {
                id: 1,
                email: 'ivan@gmail.com',
                avatar: "userAvatars/1.jpg",
                phone: "+79999999999",
                name: "Иван",
                surname: "Иванов",
                patronymic: "Иванович"
            }
        ] as IUser[]
    }
)

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: (create) => ({
        changeUser: create.reducer<number>((state, action) => {
            state.userId = action.payload;
        })
    }),
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                userAdapter.setAll(state, action.payload)
                state.status = 'idle'
            })
    }
})

export const {changeUser} = userSlice.actions;

export default userSlice.reducer;
export const {selectAll: selectUsers, selectById: selectUserById} =
    userAdapter.getSelectors((state: RootState) => state.userReducer)

