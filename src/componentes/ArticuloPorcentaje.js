import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const ArticuloPorcentaje = () => {

    const totalDeCensos = useSelector(state => state.totalCensados.totalCen)
    const personas = useSelector(state => state.personas.listaPersonas)

    const personasCensadas = personas.length

    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
       
      setPorcentaje((personasCensadas * 100) / totalDeCensos)

    }, [personas])
    

  return (
    <article className='col-10 porcentaje'>
        <h2>Porcentaje de personas censadas</h2>
        <p>{porcentaje}%</p> 
    </article>
  )
}

export default ArticuloPorcentaje