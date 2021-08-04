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
            <div className="inputgroup">
                <input type="number" id="portes" name="portes" className="inputbody" placeholder="portes" onChange={(event)=>handleSetCollapsableData("portes", event.target.value)} value={collapsableData.portes}/>
                <label class="inputlabel" for="portes"> Portes </label>
            </div>
            

            <div className="inputgroup">
                <input type="number" id="descuento" name="descuento" className="inputbody" placeholder="descuento" onChange={(event)=>handleSetCollapsableData("descuento", event.target.value/100)} value={collapsableData.descuento*100}/>
                <label class="inputlabel" for="descuento"> Descuento </label>
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
                <label class="inputlabelherramientas" for="rodillos"> Rodillos </label>
            </div>

            <div className="inputgroup">
                <input type="number" id="basculas" name="basculas" className="inputbodyherramientas" placeholder="basculas" onChange={(event)=>handleHerramientasData("basculas", event.target.value)} value={collapsableData.herramientas.basculas}/>
                <label class="inputlabelherramientas" for="basculas"> Básculas </label>
            </div>

            <div className="inputgroup">
                <input type="number" id="cubos" name="cubos" className="inputbodyherramientas" placeholder="cubos" onChange={(event)=>handleHerramientasData("cubos", event.target.value)} value={collapsableData.herramientas.cubos}/>
                <label class="inputlabelherramientas" for="cubos"> Cubos </label>
            </div>
                
            </div>
        </div>
    )
}
