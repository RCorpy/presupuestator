import axios from "axios";

const myHost = "http://localhost:5000"

export const expressFunc = (token) =>{
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