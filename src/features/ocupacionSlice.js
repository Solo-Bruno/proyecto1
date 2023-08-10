import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ocup: []
}

export const ocupacionSlice = createSlice({
    name: "ocupaciones",
    initialState,
    reducers: {
        guardarOcupacion: (state, action) => {
            state.ocup = action.payload
        }
    }
})

export const {guardarOcupacion} = ocupacionSlice.actions;

export default ocupacionSlice.reducer;