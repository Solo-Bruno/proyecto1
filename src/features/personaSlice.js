import { createSlice } from "@reduxjs/toolkit/dist";


const initialState = {
    listaPersonas: []
}

export const personaSlice = createSlice({
    name: "personas",
    initialState,
    reducers: {
        guardarPersona: (state, action) => {
            state.listaPersonas = action.payload
        },
        agregarPersona: (state, action) => {
            state.listaPersonas.push(action.payload)
        },
        quitarPersona: (state, action) => {
           state.listaPersonas = state.listaPersonas.filter(p => p.id !== action.payload)
        }
    }
})

export const {guardarPersona, agregarPersona, quitarPersona} = personaSlice.actions;

export default personaSlice.reducer;