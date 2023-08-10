
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { quitarPersona } from "../features/personaSlice";

const TablaDePersonas = () => {

  const selectOc = useRef(null);
  const dispatch = useDispatch();

  const [listaPersonas, setListaPersonas] = useState([]);

  
  const personas = useSelector(state => state.personas.listaPersonas)
  //const departamentos= useSelector(state => state.departamento.departamentos)
  //const ciudades = useSelector(state => state.totalCiudades.todasLasCiudades)
  const ocupacion = useSelector(state => state.ocupaciones.ocup)

  useEffect(() => {
    setListaPersonas(personas)
  }, [personas])

  const filtarTabla = () => {
    const ocupId = selectOc.current.value
    if(parseInt(ocupId) === 0){
      setListaPersonas(personas)
    }else{
      setListaPersonas(personas.filter(p => p.ocupacion === parseInt(ocupId)))
    }

  }

  const eliminarP = (id) => {

    
    //const id = num.substring(num.lastIndexOf(" "), num.length)
    const personaBuscada = personas.find(p => p.id === id)
    console.log(personaBuscada)
  
    console.log(id)
    fetch(`https://censo.develotion.com/personas.php?idCenso=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'iduser': localStorage.getItem("userId"),
        'apikey': localStorage.getItem("apikey")
      },

      method: 'DELETE',


    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.codigo === 200) {
          
          dispatch(quitarPersona(personaBuscada.id))

        }

      })
  }

  return (

    <article className="col-12 col-lg-8">
      <fieldset>
        <label htmlFor="selectOcupacion">Filtar por Ocupaction</label>
        <select name="" id="selectOcupacion" onChange={filtarTabla} ref={selectOc}>
          <option value={0}>Todos</option>
          {ocupacion.map(o => <option key={o.id} value={o.id}>{o.ocupacion}</option>)}
        </select>
      </fieldset>

      <table className="tableMia">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Fecha de Nacimiento</th>
            <th>Ocupacion</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>

          {ocupacion.length > 0 && listaPersonas.map(p => <tr key={p.id + p.ciudad}>
            <td key={p.id + p.id}>{p.id}</td>
            <td key={p.id + p.nombre}>{p.nombre}</td>
            <td key={p.id + p.fechaNacimiento}>{p.fechaNacimiento}</td>
            <td key={p.id + p.ocupacion}>{ocupacion.find(o => p.ocupacion === o.id).ocupacion}</td>
            <td key={p.id + p.departamento}>  <input key={p.id} type="button" value={"Eliminar"} onClick={() => eliminarP(p.id)}/></td>
          </tr>)}

        </tbody>
      </table>
    </article>
  )
}

export default TablaDePersonas