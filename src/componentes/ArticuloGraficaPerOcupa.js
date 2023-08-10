import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  import { Bar } from 'react-chartjs-2';
  
  import { useSelector } from 'react-redux';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Personas por Ocupacion',
      },
    },
  };
  
  const ArticuloGraficaPerOcupa = () => {
  
    
    const ocup = useSelector(state => state.ocupaciones.ocup)
    const personas = useSelector(state => state.personas.listaPersonas)
  


    const y = []
  
 
    for (let index = 0; index < ocup.length; index++) {
      const d = ocup[index];
    
      y.push(personas.filter(p => p.ocupacion === d.id))
       
    }   
    console.log(y)
   
 
    return (
      
      <article className='col-10'>
        <h3>Gráfico de personas por ocupación:</h3>
           <Bar options={options} data={{
    labels: ocup.map(x => x.ocupacion),
    datasets: [
      {
        label: 'Personas',
        data:  y.map(d => d.length),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
     
    ],
  }} />
      </article>
    )
  }
  
  export default ArticuloGraficaPerOcupa