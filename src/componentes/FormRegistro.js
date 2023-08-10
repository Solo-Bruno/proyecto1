import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const FormRegistro = () => {

  const userR = useRef(null);
  const passR = useRef(null);
  
  
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  let navigate = useNavigate();

  const registrase = () =>{
    const nomUser = userR.current.value;
    const passUser = passR.current.value;

    let usuarioBody = {
      usuario: nomUser,
      password: passUser
    }

    fetch('https://censo.develotion.com/usuarios.php', {
      headers:{
          'Content-Type': 'application/json'
      },

      method: 'POST',

      body: JSON.stringify(usuarioBody)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); 
    if (data.codigo === 200) {
      localStorage.setItem('apikey', data.apiKey)
      localStorage.setItem('userId', data.id)
      navigate('/panel');
    } else {
      setError(true);
      setMsg(data.mensaje);
      localStorage.clear();
    }
  })

  }
    
  return (
    <form action="" className="row justify-content-center">
      <fieldset className="col-12">
          <label htmlFor="" id="txtUserReg">Nombre</label>
          <input type="text" id="txtUserReg" ref={userR}/>
      </fieldset>

      <fieldset className="col-12">
        <label htmlFor="" id="passUserReg">Contraseña</label>
        <input type="password" name="" id="passUserReg" ref={passR}/>
     </fieldset> 

     <fieldset className="col-4">
      <input type="button" value="Enviar" onClick={registrase} />
     </fieldset>
     <Link to={"/"} className="linkM">Ingresar</Link>
     {error && <p>{msg}</p>}
   </form>
  )
}

export default FormRegistro