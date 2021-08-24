import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';



export default function Main({getResultData, setResultData, resultData, mainData, setCollapsableData, collapsableData, kgsData, setKgsData}) {

    

    const handleSetCollapsableData = (key, value) => {
        setCollapsableData((prevData)=>{
            let returnValue = {...prevData}
            returnValue[key] = value
            return returnValue
        })
    }

    const handleHerramientasData = (key, value) => {
        setCollapsableData((prevData)=>{
            let returnValue = {...prevData}
            returnValue["herramientas"][key] = value
            return returnValue
        })
    }

    const handleSetKgsData = (key, value) => {
        
        setKgsData((prevData)=>{
            let returnValue = {...prevData}
            returnValue[key] = value
            return returnValue
        })
    }

    return (
        <div className="inputrow" style={{marginBottom: "15vh"}}>
            <div className="inputgroup">
                <input type="number" id="kgsImprimacion" name="kgsImprimacion" className="inputbody" placeholder="kgsImprimacion" onChange={(event)=>{
                    handleSetKgsData("kgsImprimacion", event.target.value)
                    getResultData(setResultData, setKgsData, mainData, collapsableData, {
                        kgsImprimacion: event.target.value,
                        kgsCapas: kgsData.kgsCapas,
                        minKitSize: kgsData.minKitSize
                      }, resultData, false)
                    }} value={kgsData.kgsImprimacion} step={kgsData.minKitSize}/>
                <label className="inputlabel" htmlFor="kgsImprimacion"> kgsImprimacion </label>
            </div>

            <div className="inputgroup">
                <input type="number" id="kgsCapas" name="kgsCapas" className="inputbody" placeholder="kgsCapas" onChange={(event)=>{
                    handleSetKgsData("kgsCapas", event.target.value)
                    getResultData(setResultData, setKgsData, mainData, collapsableData, {
                        kgsImprimacion: kgsData.kgsImprimacion,
                        kgsCapas: event.target.value,
                        minKitSize: kgsData.minKitSize
                      }, resultData, false)
                    }} value={kgsData.kgsCapas} step={kgsData.minKitSize}/>
                <label className="inputlabel" htmlFor="kgsCapas"> kgsCapas </label>
            </div>
            

            <div className="inputgroup">
                <input type="number" id="descuento" name="descuento" className="inputbody" placeholder="descuento" onChange={(event)=>handleSetCollapsableData("descuento", event.target.value/100)} value={collapsableData.descuento*100}/>
                <label className="inputlabel" htmlFor="descuento"> Descuento </label>
            </div>
            
            <Dropdown className="inputgroup2">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {collapsableData.disolvente ? "Con disolvente" : "Sin disolvente"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>{handleSetCollapsableData("disolvente", true)}}>Con disolvente</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{handleSetCollapsableData("disolvente", false)}}>Sin disolvente</Dropdown.Item>
                    
                </Dropdown.Menu>
            </Dropdown>
            <div className="herramientas">

            <div className="inputgroup">
                <input type="number" id="rodillos" name="rodillos" className="inputbodyherramientas" placeholder="rodillos" onChange={(event)=>handleHerramientasData("rodillos", event.target.value)} value={collapsableData.herramientas.rodillos}/>
                <label className="inputlabelherramientas" htmlFor="rodillos"> Rodillos </label>
            </div>

            <div className="inputgroup">
                <input type="number" id="basculas" name="basculas" className="inputbodyherramientas" placeholder="basculas" onChange={(event)=>handleHerramientasData("basculas", event.target.value)} value={collapsableData.herramientas.basculas}/>
                <label className="inputlabelherramientas" htmlFor="basculas"> Básculas </label>
            </div>

            <div className="inputgroup">
                <input type="number" id="cubos" name="cubos" className="inputbodyherramientas" placeholder="cubos" onChange={(event)=>handleHerramientasData("cubos", event.target.value)} value={collapsableData.herramientas.cubos}/>
                <label className="inputlabelherramientas" htmlFor="cubos"> Cubos </label>
            </div>
                
            </div>
        </div>
    )
}
