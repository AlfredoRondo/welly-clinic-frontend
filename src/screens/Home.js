import React from 'react'
import firebaseApp from '../firebase/credenciales'
import { getAuth,signOut } from 'firebase/auth'
import Admin from '../componentes/Admin'
import Usuario from '../componentes/Usuario'
const auth = getAuth(firebaseApp)

export default function Home(user) {
  return (
    <div>
      Home <br></br>
      <button onClick={()=>signOut(auth)}>Cerrar sessión</button>
      {user.rol === "administrador" ? <Admin/>: <Usuario/>}
    </div>
  )
}
