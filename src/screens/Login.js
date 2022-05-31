import React, {useState} from 'react'
import firebaseApp from '../firebase/credenciales'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore, doc , setDoc} from "firebase/firestore"
import {} from "firebase/firestore"
import {Formik, Form,Field,ErrorMessage} from "formik";
import "./index.css"
import md5 from 'md5'
 
const auth = getAuth(firebaseApp)

export default function Login() {
  //obtenemos la conexion
  const firestore = getFirestore(firebaseApp)
  //Verificamos si el usuario está o nó registrado [estado del usuario] 
  const[isRegistrando,setisRegistrando] = useState(false)

  //Validando el formulario [comprobar si existen cambios de estado, inicialmente el formulario estará vació] por lo que el estado inicial es false
  const [formularioEnviado,cambioAlEnviarForm] = useState(false);

  //Este método espera que los campos del formularios estén correstos y Crea un registro en la BD
  async function registrarUsuario(email,password){
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
      ).then((usuarioFirebase) => {
        return usuarioFirebase
      });

      //Establezco la conexion con la tabla usuarios a fin de poder insertar información
      const docuRef = await doc(firestore,`usuarios/${infoUsuario.
        user.uid}`)

        //Añado el email y la contraseña al docuemento o BD cifrando la contraseña
        setDoc(docuRef,{correo: email,password:md5(password)})
  }

  /*Metodo que recibe la información del formulario y comprueba si el usuario está registrado o no 
  En función a eso realiza o el registro o el login*/
  function submitHandler(e){
    e.preventDefault()

    //recupero los datos del usuario 
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value

    //Comprobamos la acciónn del usuario, si el usuarios se está registrando o si se está logenado
    if(isRegistrando){
      //permitirle registrarse
      registrarUsuario(email,password)
    }else{
      //permitirle logearse
      signInWithEmailAndPassword(auth,email,password)
    }
  }

  return (
    <>
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validate={(valores) => {
                let errores = {};
                //Usando Regx para validar el campo email y correo
                if(!valores.email){
                    errores.email = "ingrese un email"
                }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(valores.email)){
                    errores.email = "Ejemolo:  Wellycode@gmail.com"
                }
                if(!valores.password){
                    errores.password= "Ingrese contraseña"
                }else if(!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(valores.password)){
                    errores.password = "La contraseña debe contener 8 dígitos [números, minusculas y mayusculas]"
                }
                return errores;
            }}
            onSubmit={(valores,{resetForm}) => {
                resetForm();
                console.log('formulario enviado')
                console.log("usuario: "+valores.email+ "contraseña: "+valores.password)

                //Modificamos estado del formulario a true 
                cambioAlEnviarForm(true);
                //Trascurido un tiempo reseteo el formulario 
                setTimeout(() => cambioAlEnviarForm(false),5000);
            }}
        >
            {({errors}) => (
                 <Form className="formulario" onSubmit={submitHandler}>
                     <h1>
                        {isRegistrando ? "Regístrate" 
                        : "Login"}
                     </h1>
                    <div>
                        <label htmlFor="email">Correo electrónico</label>
                        <Field 
                            type="text" 
                            id="email" 
                            name="email" 
                            placeholder="Wellycode@gmail.com" 
                            />
                            <ErrorMessage name="email" component={() => (
                                <div className="error">{errors.email}</div>
                            )}/>
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña</label>
                        <Field
                            type="text" 
                            id="password" 
                            name="password" 
                            placeholder="Wellycode123" 
                            />
                            <ErrorMessage name="password" component={() => (
                                <div className="error">{errors.password}</div>
                            )}/>
                    </div>
                    <input  type="submit"
                      value={isRegistrando ? "Registrar"
                      : "Iniciar   sesión"} >
                    </input>
                    {formularioEnviado && <p className="exito">Formulario enviado con exito!</p>}
                    <button onClick={()=> setisRegistrando(!isRegistrando)}>
                    {isRegistrando ? "Ya tengo cuenta" : "Quiero registrarme"}
                  </button>
             </Form>
            )}
        </Formik>
    </>
  )
}

/*

import React, {useState} from 'react'

import Home from "./Home"
import firebaseApp from '../firebase/credenciales'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore, doc , setDoc} from "firebase/firestore"
import {} from "firebase/firestore"
import {Formik, Form,Field,ErrorMessage} from "formik";
 
const auth = getAuth(firebaseApp)

export default function Login() {
  const firestore = getFirestore(firebaseApp)
  //controlamos el estado de registro de usuario 
  const[isRegistrando,setisRegistrando] = useState(false)

  //Función asincrona registrar usuario [importamos las credenciales de firebase]
  async function registrarUsuario(email,password,role){
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
      ).then((usuarioFirebase) => {
        return usuarioFirebase
      });

      console.log(infoUsuario.user.uid)

      const docuRef = await doc(firestore,`usuarios/${infoUsuario.
        user.uid}`)

        setDoc(docuRef,{correo: email, role:role})

    
    //Queremos guardar todoa la info en una bd para llevar el control de roles del usuario 
  }

  //cuando el usuario pulse el submit
  function submitHandler(e){
    e.preventDefault()

    //recupero los datos del usuario 
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value
    const role = e.target.elements.role.value
    console.log("submit", email,password,role)

    //Comprobamos la acciónn del usuario, si el usuarios se está registrando o si se está logenado
    if(isRegistrando){
      //permitirle registrarse
      registrarUsuario(email,password,role)
    }else{
      //permitirle logearse
      signInWithEmailAndPassword(auth,email,password)
    }
  }
  return (
    <div>
      <h1>
          {isRegistrando ? "Registate" 
        : "Inicia session"}
      </h1>
    <form onSubmit={submitHandler}>
      <label>
        correo electrónico:
        <input  id='email' type="email"/>
      </label>
      <label>
        contraseña:
        <input id='password' type="password"/>
      </label>
      <label>
        Role: 
        <select  id='role'>
          <option value="admin">Admin</option>
          <option value="usuario">Usuario</option>
        </select>
      </label>
      <input type="submit"
        value={isRegistrando ? "Registrando"
        : "Inicia sessión"} >
      </input>
    </form>
    <button onClick={()=> setisRegistrando(!isRegistrando)}>
      {isRegistrando ? "Ya tengo cuenta" : "Quiero registrarme"}
    </button>
    </div>
  )
}

*/