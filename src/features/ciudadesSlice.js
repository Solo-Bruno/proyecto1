import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todasLasCiudades: []
}


export const ciudadesSlice = createSlice({
    name: "ciudades",
    initialState,
    reducers:{
        guardarCiudadesTotal: (state, action) => {
            state.todasLasCiudades = action.payload
        }
    }
})

export const { guardarCiudadesTotal} = ciudadesSlice.actions;

export default ciudadesSlice.reducer;