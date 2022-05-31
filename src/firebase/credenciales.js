// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig =  {
    apiKey: "AIzaSyCwCe-Sh6Ro2BkKwu82WVxYY1oY9xG2wPI",
    authDomain: "loginformit.firebaseapp.com",
    databaseURL: "https://loginformit-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "loginformit",
    storageBucket: "loginformit.appspot.com",
    messagingSenderId: "1017127169291",
    appId: "1:1017127169291:web:6f8ce224be3fe1d952860e"
  };

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;

// databaseURL: "https://loginformit-default-rtdb.europe-west1.firebasedatabase.app",;

