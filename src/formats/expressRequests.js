import axios from "axios";

const myHost = "http://localhost:5000"

export const expressFuncCreate = (token) =>{
    console.log("making the post requestu!",`${myHost}/createexcel` )
    axios.post(`${myHost}/createexcel`,{
        token: token
    })
    .then((response) => {
      //console.log("prueba", response.data);
    }, (error) => {
    console.log(error);
  })
  }

  export const expressFuncListado = async (token) =>{

    const AMOUNT_OF_DAYS_PRIOR = 15

    const authHeader = (token) => {
      return {
        headers: {
          Authorization:`Bearer ${token}`
        }
      }
    }

    let day = new Date();
    day.setDate(day.getDate() - AMOUNT_OF_DAYS_PRIOR);

    let dd = day.getDate();
    let mm = day.getMonth()+1; 
    let yyyy = day.getFullYear();
    if(dd<10) {
        dd='0'+dd;
    } 
    if(mm<10) {
        mm='0'+mm;
    } 
    day = yyyy+'-'+mm+'-'+dd;

    const getPresupuestos = async (auth) =>{
      return new Promise((resolve, reject)=>{
        axios.post("https://api.sdelsol.com/admin/LanzarConsulta",{
          ejercicio: "2021",
          consulta: `SELECT * FROM F_PRE WHERE FECPRE > CAST('${day}' AS date)`
        },authHeader(auth))
        .then((response)=>{
          resolve(response.data.resultado)
        })
      })
    }
  
    const getPedidos = async (auth) =>{
      return new Promise((resolve, reject)=>{
        axios.post("https://api.sdelsol.com/admin/LanzarConsulta",{
          ejercicio: "2021",
          consulta: `SELECT * FROM F_PCL WHERE FECPCL > CAST('${day}' AS date)`
        },authHeader(auth))
        .then((response)=>{
          resolve(response.data.resultado)
        })
      })
    }

    const getClientes = async (auth) =>{
      return new Promise((resolve, reject)=>{
        axios.post("https://api.sdelsol.com/admin/LanzarConsulta",{
          ejercicio: "2021",
          consulta: `SELECT * FROM F_CLI`
        },authHeader(auth))
        .then((response)=>{
          let clienteObject = {}
          response.data.resultado.map(element =>{
            if(element[9].dato){
              clienteObject[element[0].dato]= element[9].dato
            }
          })
          resolve(clienteObject)
        })
      })
    }

    const pedidos = await getPedidos(token)
    const presupuestos = await getPresupuestos(token)
    const clientes = await getClientes(token)

    console.log("presupuestos", presupuestos)
    console.log("pedidos", pedidos)
    console.log("clientes", clientes)

    console.log("making the post requestu!",`${myHost}/listadotelefonos` )
    axios.post(`${myHost}/listadotelefonos`,{
        token: token,
        pedidos: pedidos,
        presupuestos: presupuestos,
        clientes: clientes
    })
    .then((response) => {
      //console.log("prueba", response.data);
    }, (error) => {
    console.log(error);
  })
  }