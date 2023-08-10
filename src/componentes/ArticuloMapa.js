import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from "react-redux"
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;


L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const ArticuloMapa = () => {


    const personas = useSelector(state => state.personas.listaPersonas)
    const depa = useSelector(state => state.departamento.departamentos)

    let info = { cant: 0, id: 0, nombre:"" }

    const y = []


    for (let index = 0; index < depa.length; index++) {
        const d = depa[index];
        info = {
            cant: (personas.filter(p => p.departamento === d.id).length),
            id: d.id,
            nombre: d.nombre
        }
        y.push(info)

    }





    return (
        <div className='col-10'>
            <MapContainer center={[-33, -56]} zoom={6} scrollWheelZoom={false} style={{ height: "400px", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {depa.map(valor => <Marker position={[valor.latitud, valor.longitud]}>
                    <Popup>{y.find(h => h.nombre === valor.nombre).nombre}
                    <br />
                    Personas censadas por departamento : {y.find(h => h.id === valor.id).cant} <br /> 
                    </Popup>

                </Marker>)}

            </MapContainer>

        </div>

    )

}

export default ArticuloMapa