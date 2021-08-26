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
    setArticulosTable(makePriceObject(response.data.resultado))
}, (error) => {
  console.log(error);
})
}

export const pruebaPresupuesto = (token) =>{

  axios.post("https://api.sdelsol.com/admin/EscribirRegistro",{
    ejercicio: "2021",
    tabla: "F_PRE",
    registro: [
      {
          "columna": "TIPPRE",
          "dato": 2
      },
      {
          "columna": "FECPRE",
          "dato": "" // lol
      },
      {
          "columna": "CODPRE",
          "dato": 8 //lol
      },
        {
          "columna": "REFPRE",
          "dato": "REFERENCIA"
      },
        {//descuento
          "columna": "PDTO1PRE",
          "dato": 50
      },
        {//portes
          "columna": "IPOR1PRE",
          "dato": 20
      }
    ]
  },
  authHeader(token)).then((response) => {
    console.log("pruebaPresupuesto", response.data);
}, (error) => {
  console.log("prueba presupuesto error",error);
})
}