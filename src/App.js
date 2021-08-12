

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

import {getArticulosTable, getAuth} from './formats/apiRequests'

import {getResultData} from './formats/getResultData'

import logo from './formats/teklackelogo.png'

function App() {

  const [priceObject, setPriceObject] = useState(importedPriceObject)
  const [auth, setAuth] = useState("")


  const [mainData, setMainData] = useState(importedMainData)
  const [collapsableData, setCollapsableData] = useState(importedCollapsableData)
  const [identifyersData, setIdentifyersData] = useState(importedIdentifyerData)

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
      portes: collapsableData.portes,
      descuento: collapsableData.descuento,
      herramientas: collapsableData.herramientas,
      kgs: 10,
      priceObject: {
        imprimacion: priceObject[mainData.resina]["Transparente"],
        capas: priceObject[mainData.resina][mainData.color]
      },
      resultData: resultData
    }
  }

  useEffect(()=>{
    setTotalPricePerM2(totalPrice/mainData.m2)
  },[priceObject, totalPrice, mainData])

  useEffect(()=>{
    getResultData(setResultData, mainData, collapsableData)
  }, [priceObject, mainData])

  useEffect(()=>{
    getAuth(setAuth)
  },[])

  useEffect(()=>{
    if(auth){
      getArticulosTable(auth, setPriceObject)

    }
  }, [auth])



  return (
    <React.StrictMode>
      <div className="fullscreen">
        <div className="top">
          <div className="leftside">
            <div className="imgcontainer">
              <img src={logo} alt="teklacke logo"></img>
            </div>
            <MainData setMainData={setMainData} mainData={mainData}/>
            <Collapsable setCollapsableData={setCollapsableData} collapsableData={collapsableData}/>
            <Identifyers setIdentifyersData={setIdentifyersData} identifyersData={identifyersData}/>
          </div>
          <div className="rightside">
            <Invoice setTotalPrice={setTotalPrice} mainData={mainData} collapsableData={collapsableData} resultData={resultData} setResultData={setResultData} priceObject={priceObject}/>
          </div>
        </div>
        <CreatePanel gatherUsefulData={gatherUsefulData} mainData={mainData} collapsableData={collapsableData} identifyersData={identifyersData} resultData={resultData} totalPrice={totalPrice} totalPricePerM2={totalPricePerM2} gm2Imprimacion={resultData.gPerM2.imprimacion} gm2Capas={resultData.gPerM2.capas}/>
      </div>
    </React.StrictMode>
  );
}

export default App;

