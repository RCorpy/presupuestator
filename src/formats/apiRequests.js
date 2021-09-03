import axios from "axios";
import connectionInfo from '../connectionInfo'
import makePriceObject from "./makePriceObject";

const PRECIO_PORTES_POR_KG = 0.33

const authHeader = (auth) => {
  return {
    headers: {
      Authorization:`Bearer ${auth}`
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

export const getArticulosTable = (auth, setArticulosTable) =>{
  axios.post("https://api.sdelsol.com/admin/LanzarConsulta", {
    ejercicio: "2021",
    consulta: "SELECT * FROM F_ART"
  },authHeader(auth)).then((response) => {
    setArticulosTable(makePriceObject(response.data.resultado))
}, (error) => {
  console.log(error);
})
}

export const crearPresupuesto = async (auth, codigo, fileRef, totalPrice, totalPeso, telefono) =>{

  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; 
  let yyyy = today.getFullYear();
  if(dd<10) {
      dd='0'+dd;
  } 
  if(mm<10) {
      mm='0'+mm;
  } 
  today = yyyy+'-'+mm+'-'+dd;

  console.log("prices", ((totalPrice+(totalPeso*PRECIO_PORTES_POR_KG<17 ? 17 : totalPeso*PRECIO_PORTES_POR_KG ))*1.21), (totalPeso*PRECIO_PORTES_POR_KG<17 ? 17 : totalPeso*PRECIO_PORTES_POR_KG ))

  return new Promise((resolve, reject)=>{
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
          "dato": today
      },
      {
          "columna": "CODPRE",
          "dato": codigo
      },
        {
          "columna": "REFPRE",
          "dato": fileRef
      },
        {//descuento
          "columna": "PDTO1PRE",
          "dato": 50
      },
        {//portes
          "columna": "IPOR1PRE",
          "dato": totalPeso*PRECIO_PORTES_POR_KG<17 ? 17 : totalPeso*PRECIO_PORTES_POR_KG 
      },
        {//total
          "columna": "TOTPRE",
          "dato": ((totalPrice+(totalPeso*PRECIO_PORTES_POR_KG<17 ? 17 : totalPeso*PRECIO_PORTES_POR_KG ))*1.21).toFixed(2)
      },
        {//comentario-telefono
          "columna": "COMPRE",
          "dato": telefono
      },


    ]
  },
    authHeader(auth)).then((response) => {
      resolve(response.data);
    }, (error) => {
      reject(error);
    })
  })
}

export const getNuevoCodigo = async (auth) =>{
  return new Promise((resolve, reject)=>{
    axios.post("https://api.sdelsol.com/admin/LanzarConsulta",{
      ejercicio: "2021",
      consulta: "SELECT * FROM F_PRE"
    },authHeader(auth))
    .then((response)=>{
      resolve(response.data.resultado[response.data.resultado.length-1][1].dato + 1)
    })
  })
}


export const crearArticulo = async (auth, codigo, index, codigoArticulo, qty, price, description) =>{

  return new Promise((resolve, reject)=>{
    axios.post("https://api.sdelsol.com/admin/EscribirRegistro",{
    ejercicio: "2021",
    tabla: "F_LPS",
    registro: [
      {
          "columna": "TIPLPS",
          "dato": 2
      },
      {
          "columna": "CODLPS",
          "dato": codigo
      },
        {
          "columna": "POSLPS",
          "dato": index+1
      },
        {
          "columna": "ARTLPS",
          "dato": codigoArticulo
      },
        {
          "columna": "CANLPS",
          "dato": qty
      },
        {
          "columna": "PRELPS",
          "dato": price
      },
        {
          "columna": "DESLPS",
          "dato": description
      },
        {
          "columna": "TOTLPS",
          "dato": (qty*price)
      },
    ]
  },
    authHeader(auth)).then((response) => {
      resolve(response);
    }, (error) => {
      reject(error);
    })
  })
}

export const buscarArticuloConCodigo = async (auth, codigo) =>{
  return new Promise((resolve, reject)=>{
    axios.post("https://api.sdelsol.com/admin/LanzarConsulta", {
      ejercicio: "2021",
      consulta: `SELECT * FROM F_ART WHERE CODART = '${codigo}'`
    },authHeader(auth))
    .then((response) => {
        resolve(response.data.resultado)
    })
  })
}
