import React from 'react'
import ArticuloGraficaPerDepa from './ArticuloGraficaPerDepa'
import ArticuloGraficaPerOcupa from './ArticuloGraficaPerOcupa'

const DivGraficos = () => {
  return (
    <div  className="row justify-content-center">
        <ArticuloGraficaPerDepa />
        <ArticuloGraficaPerOcupa/>
    </div>
  )
}

export default DivGraficos