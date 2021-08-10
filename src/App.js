

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

import {getResultData, modifyResultData} from './formats/getResultData'

import logo from './formats/teklackelogo.png'

function App() {

  const [priceObject, setPriceObject] = useState(importedPriceObject)
  const [auth, setAuth] = useState("")


  const [mainData, setMainData] = useState(importedMainData)
  const [collapsableData, setCollapsableData] = useState(importedCollapsableData)
  const [identifyersData, setIdentifyersData] = useState(importedIdentifyerData)

  const [resultData, setResultData] = useState(importedResultData)

  useEffect(()=>{
    getResultData(setResultData, mainData, collapsableData)
  }, [mainData])

  useEffect(()=>{
    modifyResultData(resultData, collapsableData)
  }, [mainData, collapsableData])

  useEffect(()=>{
    getAuth(setAuth)
  },[])

  useEffect(()=>{
    if(auth){
      getArticulosTable(auth, setPriceObject)
      console.log(priceObject)
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
            <Invoice mainData={mainData} collapsableData={collapsableData} resultData={resultData} setResultData={setResultData} priceObject={priceObject}/>
          </div>
        </div>
        <CreatePanel pricePerM={1} total={2} gm2Imprimacion={resultData.gPerM2.imprimacion} gm2Capas={resultData.gPerM2.capas}/>
      </div>
    </React.StrictMode>
  );
}

export default App;

