import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lasCiudades: []
}

export const ciudadesSlice = createSlice({
    name: "ciudadesDeUnDepartamento",
    initialState,
    reducers:{
        guardarCiudades: (state, action) => {
            state.lasCiudades = action.payload
        }
    }
})

export const {guardarCiudades} = ciudadesSlice.actions;

export default ciudadesSlice.reducer;