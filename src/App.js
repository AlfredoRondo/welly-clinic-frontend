import React, {useState} from "react";
//Importamos la aplicación/credenciales
import firebaseApp from "./firebase/credenciales";
import Login from "./screens/Login"
import Home from "./screens/Home"

//Obtenemos el inicio de session y nos mantenemos a la escucha por si hay un cambio de session
import {getAuth,onAuthStateChanged} from "firebase/auth"
import {getFirestore, doc , setDoc, getDoc} from "firebase/firestore"

const firestore = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

function App() {
  //seguimiento de si el usuario ha iniciado session o no 
  const [user, setUser] = useState(null);

  async function getRol(uid){
    //creamos una referencia al documento
    const docuRef = doc(firestore, `usuarios/${uid}`)
    const docuCifrada = await getDoc(docuRef)
    const infoFinal = docuCifrada.data().email
    return infoFinal
  }

  function setUserWithFirebaseAndRol(usuarioFirebase){
    getRol(usuarioFirebase.uid).then((password) =>{
      const userData = {//Guardamos el inicio de session en el objeto
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        password: password
      }
      setUser(userData)
      console.log("userData final",userData)
    });
  }

  onAuthStateChanged(auth,(usuarioFirebase) => {//detectamos que hay inicio de session
    if(usuarioFirebase){//si ha iniciado sessión
     if(!user){
       setUserWithFirebaseAndRol(usuarioFirebase)
     }
    }else{
      setUser(null)
    }
  })
  return <>{user ? <Home user={user}/>: <Login/>}</>
}

export default App;
