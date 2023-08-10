import { configureStore } from "@reduxjs/toolkit";
import departamentoReducer from "../features/departamentoSlice"
import ocupacionesReducer from "../features/ocupacionSlice"
import ciudadesReducer from "../features/ciudadesXDepaSlice"
import personasReducer from "../features/personaSlice"
import ciudadesTotalReducer from "../features/ciudadesSlice"
import totalPersonasCensadas from "../features/totalCensadoSlice"

export const store = configureStore({
    reducer:{
        departamento: departamentoReducer,
        ocupaciones: ocupacionesReducer,
        ciudades: ciudadesReducer,
        personas: personasReducer,
        totalCiudades: ciudadesTotalReducer,
        totalCensados: totalPersonasCensadas

    }
})