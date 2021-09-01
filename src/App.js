

import React, {useState, useEffect} from "react";

import MainData from "./components/MainData"
import Collapsable from "./components/Collapsable"
import CreatePanel from "./components/CreatePanel"
import Identifyers from "./components/Identifyers"
import Invoice from "./components/Invoice"
import "./styles.css";

import importedPriceObject from "./formats/priceObject"
import importedMainData from "./formats/importedMainData"
import importedCollapsableData from "./formats/importedCollapsableData"
import importedIdentifyerData from "./formats/importedIdentifyersData"
import importedResultData from "./formats/importedResultData"
import multiplicadorObject from "./multiplicador"

import {getArticulosTable, getAuth, pruebaPresupuesto} from './formats/apiRequests'

import {getResultData} from './formats/getResultData'


import logo from './formats/teklackelogo.png'

function App() {

  const [priceObject, setPriceObject] = useState(importedPriceObject)
  const [finalPrices, setFinalPrices] = useState({
    imprimacion: [0,0,0,0,0],
    capas: [0,0,0,0,0],
    disolvente: 0
  })
  const [auth, setAuth] = useState("")


  const [mainData, setMainData] = useState(importedMainData)
  const [collapsableData, setCollapsableData] = useState(importedCollapsableData)
  const [identifyersData, setIdentifyersData] = useState(importedIdentifyerData)

  const [kgsData, setKgsData] = useState({
    kgsImprimacion:6,
    kgsCapas: 6,
    minKitSize: 6
  })

  const [resultData, setResultData] = useState(importedResultData)

  const [totalPrice, setTotalPrice] = useState(0)
  const [totalPricePerM2, setTotalPricePerM2] = useState(0)

  const gatherUsefulData = ()=>{

    return {
      resina: mainData.resina,
      m2:mainData.m2,
      imprimacion: parseInt(mainData.capas.split("")[0]),
      capas: parseInt(mainData.capas.split("")[1]),
      color: mainData.color,
      concepto: identifyersData.concepto,
      nombre: identifyersData.nombre,
      kgsImprimacion: kgsData.kgsImprimacion,
      kgsCapas: kgsData.kgsCapas,
      disolventePrice: finalPrices.disolvente,
      descuento: collapsableData.descuento,
      herramientas: collapsableData.herramientas,
      multiplicador: 2 * multiplicadorObject[mainData.resina],
      priceObject: makeFinalPriceObject(finalPrices),
      resultData: resultData
    }
  }

  const makeFinalPriceObject = (myFinalPrices) => {

    let returnObject = {
      imprimacion: {},
      capas: {}
    }

    for(let i=1; i<6 ; i++){
      returnObject.imprimacion[i*kgsData.minKitSize] = myFinalPrices.imprimacion[i-1]
      returnObject.capas[i*kgsData.minKitSize] = myFinalPrices.capas[i-1]
    }

    return returnObject

  }

  useEffect(()=>{
    getAuth(setAuth)
  },[])

  useEffect(()=>{
    if(auth){
      getArticulosTable(auth, setPriceObject)
    }
  }, [auth])
  


  useEffect(()=>{
    getResultData(setResultData, setKgsData, mainData, collapsableData, kgsData, resultData, true)
  }, [priceObject, mainData])


  /*useEffect(()=>{
    setTotalPricePerM2(totalPrice/mainData.m2)
  },[priceObject, totalPrice, mainData])*/

  useEffect(()=>{
    let badgeTotalPrice = parseFloat(finalPrices.imprimacion.reduce((acc,ele)=>(acc+ele)))+parseFloat(finalPrices.capas.reduce((acc,ele)=>(acc+ele)))+parseFloat(finalPrices.disolvente)
    setTotalPrice(badgeTotalPrice)
    setTotalPricePerM2(badgeTotalPrice/mainData.m2)
  },[finalPrices])

  return (
    <React.StrictMode>
      <div className="fullscreen">
        <div className="top">
          <div className="leftside">
            <div className="imgcontainer">
              <img src={logo} alt="teklacke logo"></img>
            </div>
            <MainData setMainData={setMainData} mainData={mainData}/>
            <Collapsable setResultData={setResultData} resultData={resultData} mainData={mainData} getResultData={getResultData} setCollapsableData={setCollapsableData} collapsableData={collapsableData} kgsData={kgsData} setKgsData={setKgsData}/>
            <Identifyers setIdentifyersData={setIdentifyersData} identifyersData={identifyersData}/>
          </div>
          <div className="rightside">
            <Invoice finalPrices={finalPrices} setFinalPrices={setFinalPrices} setKgsData={setKgsData} setTotalPrice={setTotalPrice} mainData={mainData}  resultData={resultData} setResultData={setResultData} priceObject={priceObject}/>
          </div>
        </div>
        <CreatePanel pruebaPresupuesto={()=>pruebaPresupuesto(auth)} gatherUsefulData={gatherUsefulData} mainData={mainData} identifyersData={identifyersData} resultData={resultData} totalPrice={totalPrice} totalPricePerM2={totalPricePerM2} gm2Imprimacion={resultData.gPerM2.imprimacion} gm2Capas={resultData.gPerM2.capas}/>
      </div>
    </React.StrictMode>
  );
}

export default App;

