import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalCen: 0
}

export const totalCensadosSlice = createSlice({
    name: "total censados",
    initialState,
    reducers: {
        guardarTotal: (state, action) => {
            state.totalCen = action.payload
        }
    }
})

export const {guardarTotal} = totalCensadosSlice.actions;

export default totalCensadosSlice.reducer;