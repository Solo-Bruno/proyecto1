import { useEffect, useRef, useState } from "react"

const DivCronometro = () => {

    const [contadorDias, setContadorDias] = useState('00')
    const [contadorHoras, setContadorHoras] = useState('00')
    const [contadorMinutos, setContadorMinutos] = useState('00')
    const [contadorSegundos, setContadorSegundos] = useState('00')

    let intervalo = useRef();
  
    const comenzarContador = () => {
        const fechaFinal = new Date('08/31/2023 00:00:00').getTime()

        intervalo = setInterval(() => {
            const ahora = new Date().getTime()
            const distancia = fechaFinal - ahora

            const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((distancia % (1000 * 60 * 60 * 24) / (1000 * 60 * 60 )));
            const minuto = Math.floor((distancia % (1000 * 60 * 60 )) / (1000 * 60));
            const segundos = Math.floor((distancia % (1000 * 60 )) / 1000);

            if(distancia < 0){
                clearInterval(intervalo.current);
            }else{
                setContadorDias(dias);
                setContadorHoras(horas);
                setContadorMinutos(minuto);
                setContadorSegundos(segundos);
            }

        }, 1000)
    }

    useEffect(() => {
        comenzarContador();
    
      return () => {
        clearInterval(intervalo.current)
      }
    })
    

  return (
    <div  className="row justify-content-center cronometro">
        <h2>Tiempo restante para que finalice el censo</h2>
        <article className="col-3">
            <h5>Dias</h5>
            <p>{contadorDias}</p>
        </article> 
        <article className="col-3">
            <h5>Horas</h5>
            <p>{contadorHoras}</p>
        </article>
        <article className="col-3">
            <h5>Minutos</h5>
            <p>{contadorMinutos}</p>
        </article>
        <article className="col-3">
            <h5>Segundos</h5>
            <p>{contadorSegundos}</p>
        </article>
    </div>
  )
}

export default DivCronometro