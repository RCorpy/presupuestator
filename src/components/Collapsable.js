import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';


export default function Main({setCollapsableData, collapsableData}) {

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

    return (
        <div className="inputrow" style={{marginBottom: "8vh"}}>
            <input type="number" onChange={(event)=>handleSetCollapsableData("portes", event.target.value)} value={collapsableData.portes}/>
            <input type="number" onChange={(event)=>handleSetCollapsableData("descuento", event.target.value/100)} value={collapsableData.descuento*100}/>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {collapsableData.disolvente ? "Con disolvente" : "Sin disolvente"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>{handleSetCollapsableData("disolvente", true)}}>Con disolvente</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{handleSetCollapsableData("disolvente", false)}}>Sin disolvente</Dropdown.Item>
                    
                </Dropdown.Menu>
            </Dropdown>
            <div className="herramientas">
                <input type="number" onChange={(event)=>handleHerramientasData("rodillos", event.target.value)} value={collapsableData.herramientas.rodillos}/>
                <input type="number" onChange={(event)=>handleHerramientasData("basculas", event.target.value)} value={collapsableData.herramientas.basculas}/>
                <input type="number" onChange={(event)=>handleHerramientasData("cubos", event.target.value)} value={collapsableData.herramientas.cubos}/>
            </div>
        </div>
    )
}
