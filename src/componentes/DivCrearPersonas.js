import ArticuloCrearPesona from './ArticuloCrearPesona'
import TablaDePersonas from './TablaDePersonas'

const DivCrearPersonas = () => {
  return (
    <div className="row justify-content-around">
        <ArticuloCrearPesona/>
        <TablaDePersonas/>
    </div>
  )
}

export default DivCrearPersonas