import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const FormLogin = () => {

  const userL = useRef(null);
  const passL = useRef(null);

  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const [nombre, setNom] = useState("");
  const [passUsuario, setPass] = useState("");
  const [estado, setEstado] = useState(false)
 
  let navigate = useNavigate();
  const ingresar = () => {
    const nomUser = userL.current.value;
    const passUser = passL.current.value;
    
    let usuarioBody = {
      usuario: nomUser,
      password: passUser
    }


    fetch('https://censo.develotion.com/login.php', {
      headers: {
        'Content-Type': 'application/json'
      },

      method: 'POST',

      body: JSON.stringify(usuarioBody)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)

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

 const btnDisabled = () => {
  setNom(userL.current.value)
  setPass(passL.current.value)
  if(nombre !== "" && passUsuario !== ""){
    setEstado(true);
  }
 }

  return (
    <form action="" className="row justify-content-center">
      <fieldset className="col-12">
        <label htmlFor="" id="txtUserLogin">Usuario</label>
        <input type="text" id="txtUserLogin" ref={userL} onChange={btnDisabled}/>
      </fieldset>
      <fieldset className="col-12">
        <label htmlFor="" id="txtPassLogin">Contraseña</label>
        <input type="password" name="" id="txtPassLogin" ref={passL} onChange={btnDisabled} />
      </fieldset>
      <fieldset className="col-4">
       {estado ? <input type="button" value="Enviar" onClick={ingresar} id="btnLogin"/> : <input type="button" value="Enviar" onClick={ingresar} id="btnLogin" disabled/>}
      </fieldset>
      <Link to="/registro" className="linkM">Registrarse</Link>
      {error && <p>{msg}</p>}
    </form>
  )
}

export default FormLogin