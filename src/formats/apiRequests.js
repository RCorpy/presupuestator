import axios from "axios";
import connectionInfo from '../connectionInfo'

export const getAuth = (setAuth) => {
    console.log("gotten auth at https://api.sdelsol.com/login/Autenticar")
    axios.post("https://api.sdelsol.com/login/Autenticar",{
        JSON: connectionInfo
    }).then((response) => {
        console.log("apirquests", response.data.respuesta);
        setAuth(response.data.respuesta)
      }, (error) => {
        console.log(error);
      });
}

