import SeccionPersona from './SeccionPersona'
import SeccionDatosCenso from './SeccionDatosCenso'
import SeccionGraficos from './SeccionGraficos'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { guardarDepartamentos } from '../features/departamentoSlice';
import { guardarOcupacion } from '../features/ocupacionSlice';
import { guardarPersona } from '../features/personaSlice';
import { guardarCiudadesTotal } from '../features/ciudadesSlice';
import SeccionPorcentaje from './SeccionPorcentaje';
import { guardarTotal } from '../features/totalCensadoSlice';
import SeccionCronometro from './SeccionCronometro';
import SeccionMapa from './SeccionMapa';

const SeccionDash = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const desLogin = () => {
    localStorage.clear()
    navigate("/")
  }

  useEffect(() => {
    if (localStorage.getItem('apikey') === null) {
      navigate("/")
    } else {
      fetch('https://censo.develotion.com/departamentos.php', {
        headers: {
          'Content-Type': 'application/json',
          'iduser': localStorage.getItem("userId"),
          'apikey': localStorage.getItem("apikey")

        },
      })
        .then(response => response.json())
        .then(datos => {
          console.log(datos)
          dispatch(guardarDepartamentos(datos.departamentos))
        })

      fetch('https://censo.develotion.com/ocupaciones.php', {
        headers: {
          'Content-Type': 'application/json',
          'iduser': localStorage.getItem("userId"),
          'apikey': localStorage.getItem("apikey")
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          dispatch(guardarOcupacion(data.ocupaciones))
        })

      fetch(`https://censo.develotion.com/personas.php?idUsuario=${localStorage.getItem("userId")}`, {
        headers: {
          'Content-Type': 'application/json',
          'iduser': localStorage.getItem("userId"),
          'apikey': localStorage.getItem("apikey")
        },
      })
        .then(response => response.json())
        .then(datos => {
          console.log(datos);
          dispatch(guardarPersona(datos.personas))
        })

        fetch('https://censo.develotion.com/ciudades.php', {
          headers:{
              'Content-Type': 'application/json',
              'iduser': localStorage.getItem("userId"),
              'apikey': localStorage.getItem("apikey")
          },
      })
      .then(response => response.json())
      .then(datos => {
          console.log(datos);
          dispatch(guardarCiudadesTotal(datos.ciudades))
      })


      fetch('https://censo.develotion.com/totalCensados.php', {
        headers: {
          'Content-Type': 'application/json',
          'iduser': localStorage.getItem("userId"),
          'apikey': localStorage.getItem("apikey")
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          dispatch(guardarTotal(data.total))
         
        })

    }

  }, [])

  return (
    <section>
      <SeccionPersona />
      <SeccionDatosCenso />
      <SeccionGraficos />
      <SeccionMapa/>
      <SeccionPorcentaje/>
      <SeccionCronometro/>
      <input type='button' className='btnSalir' value="Salir" onClick={desLogin} />
    </section>
  )
}

export default SeccionDash