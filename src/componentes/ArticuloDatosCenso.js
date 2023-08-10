import { useSelector } from "react-redux"
import {  useEffect, useState } from "react"

const ArticuloDatosCenso = () => {

  const personas = useSelector(state => state.personas.listaPersonas)

  const [totalP, setTotalP] = useState(0);
  const [montCan, setMontCan] = useState(0);
  const [intCant, setIntCant] = useState(0);


  useEffect(() => {

    setTotalP(personas.length);
    setMontCan(personas.filter(p => p.departamento === 3218 ).length)
    setIntCant(personas.filter(p => p.departamento !== 3218 ).length)
    
    
  }, [personas])
  
 
  return (
    <article className="col-10 row datoscenso">
    <h2 className="col-12">Numero de Censados Realizados</h2>
    <p className="col-12 col-md-4">Total: {totalP} personas</p>
    <p className="col-12 col-md-4">Montevideo: {montCan} personas</p>
    <p className="col-12 col-md-4">Interior: {intCant} personas</p>
   </article>
  )
}

export default ArticuloDatosCenso