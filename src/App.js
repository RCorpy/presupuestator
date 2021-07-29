

import React, {useState, useEffect} from "react";

import MainData from "./components/MainData"
import Collapsable from "./components/Collapsable"
import CreatePanel from "./components/CreatePanel"
import Identifyers from "./components/Identifyers"
import Invoice from "./components/Invoice"
import axios from "axios";
import "./styles.css";

import importedPriceObject from "./formats/priceObject"
import importedMainData from "./formats/importedMainData"
import importedCollapsableData from "./formats/importedCollapsableData"
import importedIdentifyerData from "./formats/importedIdentifyersData"
import importedResultData from "./formats/importedResultData"

function App() {

  const [priceObject, setPriceObject] = useState(importedPriceObject)

  const [mainData, setMainData] = useState(importedMainData)
  const [collapsableData, setCollapsableData] = useState(importedCollapsableData)
  const [identifyersData, setIdentifyersData] = useState(importedIdentifyerData)

  const [resultData, setResultData] = useState(importedResultData)

  return (
    <React.StrictMode>
      <MainData setMainData={setMainData}/>
      <Collapsable setCollapsableData={setCollapsableData}/>
      <Identifyers setIdentifyersData={setIdentifyersData}/>
      <CreatePanel pricePerM={1} total={2}/>
      <Invoice />
    </React.StrictMode>
  );
}

export default App;

