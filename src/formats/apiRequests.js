import axios from "axios";
import connectionInfo from '../connectionInfo'
import makePriceObject from "./makePriceObject";

const authHeader = (token) => {
  return {
    headers: {
      Authorization:`Bearer ${token}`
    }
  }
}

export const getAuth = (setAuth) => {
    console.log("gotten auth at https://api.sdelsol.com/login/Autenticar")
    axios.post("https://api.sdelsol.com/login/Autenticar",{
        codigoFabricante: connectionInfo.codigoFabricante,
        codigoCliente: connectionInfo.codigoCliente,
        baseDatosCliente:connectionInfo.baseDatosCliente,
        password: connectionInfo.password
    }).then((response) => {
        //console.log("apirequests", response);
        setAuth(response.data.resultado)
      }, (error) => {
        console.log(error);
      });
}

export const getArticulosTable = (token, setArticulosTable) =>{
  axios.post("https://api.sdelsol.com/admin/LanzarConsulta", {
    ejercicio: "2021",
    consulta: "SELECT * FROM F_ART"
  },authHeader(token)).then((response) => {
    //console.log("getArticulosTable", response.data.resultado[0][10].dato);
    setArticulosTable(makePriceObject(response.data.resultado))
}, (error) => {
  console.log(error);
})
}

export const prueba = (token) =>{
  axios.get("https://api.sdelsol.com/admin/LeerRegistro/2021/F_CLI/CODCLI=*",
  authHeader(token)).then((response) => {
    //console.log("prueba", response.data);
}, (error) => {
  console.log(error);
})
}