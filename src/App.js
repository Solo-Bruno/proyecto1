import './App.css';
import './bootstrap.css';
import './bootstrap.css.map';
import SeccionLogin from './componentes/SeccionLogin';
import { Provider } from 'react-redux';
import { store } from './store/store';
import SeccionDash from './componentes/SeccionDash';
import SeccionRegistro from './componentes/SeccionRegistro';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import ErrorPage from './componentes/ErrorPage';



let App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SeccionLogin/>}/>
          <Route path='/registro' element={<SeccionRegistro/>}/>
          <Route path='/panel' element={<SeccionDash/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </ Provider>
  );
}

export default App;
