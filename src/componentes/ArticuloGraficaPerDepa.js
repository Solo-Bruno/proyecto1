import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
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
      text: 'Personas por Departamento',
    },
  },
};

const ArticuloGraficaPerDepa = () => {

  const depa = useSelector(state => state.departamento.departamentos)

  const personas = useSelector(state => state.personas.listaPersonas)

  const [depaFil, setDepaFil] = useState([])
  const x = []
  const y = []
  
  useEffect(() => {
    setDepaFil(personas.map(p => p.departamento))
  }, [personas])
  const depaUnique = [...new Set(depaFil)];


  for (let index = 0; index < depaUnique.length; index++) {
    const dep = depaUnique[index];
    x.push(depa.find(d => d.id === dep))
  }

  for (let index = 0; index < depaUnique.length; index++) {
    const d = depaUnique[index];
    y.push(personas.filter(p => p.departamento === d))
    
  }

  

  return (
    <article className='col-10 graficoPers'>
      <h3>Gráfico de personas por departamento:</h3>
         <Bar options={options} data={{
  labels:(x.length > 0 && x.map(x => x.nombre) ) ,
  datasets: [
    {
      label: 'Personas',
      data: y.map(d => d.length),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
   
  ],
}} />
    </article>
  )
}

export default ArticuloGraficaPerDepa