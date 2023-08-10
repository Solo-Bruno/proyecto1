import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { guardarCiudades } from "../features/ciudadesXDepaSlice"
import { agregarPersona } from "../features/personaSlice"


const FormPersona = () => {

  const selectR = useRef(null)
  const dateR = useRef(null)
  const nomR = useRef(null)
  const selectCiuR = useRef(null)
  const selectOcupR = useRef(null)

  const depa = useSelector(state => state.departamento.departamentos)

  const ocupas = useSelector(state => state.ocupaciones.ocup)

  const dispatch = useDispatch()

  const ciudadesStore = useSelector(state => state.ciudades.lasCiudades)

  const [esMayor, setEsMayor] = useState(false)
  const [msg, setMsg] = useState("")

  const calcularEdad = () => {
    const edadInput = dateR.current.value
    const edad = new Date(edadInput)
    const fechaActual = new Date()
    const diferenciaMilise = fechaActual - edad;
    const milisegundosEnUnAnio = 1000 * 60 * 60 * 24 * 365.25;
    const edadActual = Math.floor(diferenciaMilise / milisegundosEnUnAnio)
    if (edadActual > 18) {
      setEsMayor(true)
    } else {
      setEsMayor(false)
    }

  }




  const buscarCiudad = () => {
    const idDepa = selectR.current.value;

    fetch(`https://censo.develotion.com/ciudades.php?idDepartamento=${idDepa}`, {
      headers: {
        'Content-Type': 'application/json',
        'iduser': localStorage.getItem("userId"),
        'apikey': localStorage.getItem("apikey")

      },
    })
      .then(response => response.json())
      .then(datos => {
        dispatch(guardarCiudades(datos.ciudades))
      })


  }

  const crearPersona = () => {
    const nom = nomR.current.value
    const depa = selectR.current.value
    const ciu = selectCiuR.current.value
    const fech = dateR.current.value
    const ocup = selectOcupR.current.value
    const bodyPersona = {
      idUsuario: localStorage.getItem("userId"),
      nombre: nom,
      departamento: depa,
      ciudad: ciu,
      fechaNacimiento: fech,
      ocupacion: ocup
    }


    fetch('https://censo.develotion.com/personas.php', {
      headers: {
        'Content-Type': 'application/json',
        'iduser': localStorage.getItem("userId"),
        'apikey': localStorage.getItem("apikey")
      },

      method: 'POST',

      body: JSON.stringify(bodyPersona)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setMsg(data.mensaje)
        if (data.codigo === 200) {
          const bodyCenso = {
            id: data.idCenso,
            idUsuario: localStorage.getItem("userId"),
            nombre: nom,
            departamento: parseInt(depa),
            ciudad: parseInt(ciu),
            fechaNacimiento: fech,
            ocupacion: parseInt(ocup)
          }

         

          console.log(bodyCenso)
          dispatch(agregarPersona(bodyCenso))

        }
      })

  }

  return (
    <form action="" className="justify-content-center row">
      <fieldset className="col-12">
        <label htmlFor="txtNombrePers">Nombre</label>
        <input type="text" id="txtNombrePers" ref={nomR} />
      </fieldset>

      <fieldset className="col-12">
        <label htmlFor="selectId">Departamentos</label>
        <select name="" id="selectId" ref={selectR} onClick={buscarCiudad} >
          {depa.map(d => <option key={d.id} value={d.id}  >{d.nombre}   </option>)}
        </select>
      </fieldset>

      <fieldset className="col-12">
        <label htmlFor="selectCiu">Ciudad</label>
        <select name="" id="selectCiu" ref={selectCiuR}>
          {ciudadesStore.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
      </fieldset>

      <fieldset className="col-12">
        <label htmlFor="datePersona">Fecha de Nacimiento</label>
        <input type="date" name="" id="datePersona" ref={dateR} onChange={calcularEdad} />
      </fieldset>

      <fieldset className="col-12">
        <label htmlFor="selectOcup">Ocupaction</label>
        <select name="" id="selectOcup" ref={selectOcupR}>
          {esMayor ? ocupas.map(o => <option key={o.id} value={o.id}>{o.ocupacion}</option>) : <option key={5} value={5}>Estudiante</option>}
        </select>
      </fieldset>

      <fieldset className="col-4">
        <input type="button" value="Crear" id="" onClick={crearPersona} />
      </fieldset>
      <p>{msg}</p>
    </form>

  )
}

export default FormPersona