import {createSlice} from "@reduxjs/toolkit";


const initialState: {open: boolean, content: string, className: string} = {
    open: false,
    content: '',
    className: ''
}

const alertSlice = createSlice({
    name: 'alertSlice',
    initialState,
    reducers: (create) => ({
        setAlertOpen: create.reducer((state) => {
            state.open = true
        }),
        setAlertClose: create.reducer((state) => {
            state.open = false
        }),
        setAlertContent: create.reducer<string>((state, action) => {
            state.content = action.payload
        }),
        setAlertClassName: create.reducer<string>((state, action) => {
            state.className = action.payload
        })
    })
})

export default alertSlice.reducer;

export const {setAlertOpen, setAlertClose, setAlertContent, setAlertClassName} = alertSlice.actions