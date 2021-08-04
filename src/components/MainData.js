import React, {useState} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import Form from "react-bootstrap/Form"

import capasDictionary from "../formats/capasDictionary"
import colorChoices from "../formats/colorChoices"



export default function Main({setMainData, mainData}) {

    const [colorFieldBackgroundColor, setColorFieldBackgroundColor] = useState("#a3a2a2") 

    const handleSetMainData = (key, value) => {
        setMainData((prevData)=>{
            let returnValue = {...prevData}
            returnValue[key] = value
            return returnValue
        })
    }

    return (
        <div className="inputrow">
            <Dropdown className="inputgroup2">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {mainData.resina}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>{handleSetMainData("resina", "epoxy brillo"); console.log(mainData)}}>Epoxy brillo</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{handleSetMainData("resina", "epoxy mate"); console.log(mainData)}}>Epoxy mate</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{handleSetMainData("resina", "acrilica"); console.log(mainData)}}>acrilica</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{handleSetMainData("resina", "politop"); console.log(mainData)}}>politop</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div className="inputgroup">
                <input type="number" id="m²" name="m²" className="inputbody" placeholder="m²" onChange={(event)=>handleSetMainData("m2", event.target.value)} value={mainData.m2}/>
                <label class="inputlabel" for="m²"> m² </label>
            </div>
            
            <Dropdown className="inputgroup2">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {capasDictionary[mainData.capas]}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>{handleSetMainData("capas", "12"); console.log(mainData)}}>Imprimación y 2 manos</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{handleSetMainData("capas", "02"); console.log(mainData)}}>2 manos</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{handleSetMainData("capas", "01"); console.log(mainData)}}>1 mano</Dropdown.Item>
                    <Dropdown.Item onClick={()=>{handleSetMainData("capas", "10"); console.log(mainData)}}>Imprimación</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Form.Select className="inputgroup2" value={mainData.color} onChange={(event)=>{
                let value = event.target.value
                handleSetMainData("color", value)
                setColorFieldBackgroundColor(colorChoices.filter(element=>element[0]==value)[0][1])
                }}
                style={
                    {
                        backgroundColor:colorFieldBackgroundColor,
                        color: colorFieldBackgroundColor == "#000000" || colorFieldBackgroundColor =="#383E42" ? "white" : "black",
                        width: "30%",
                        
                    }
                }
                >
                {colorChoices.map((choice)=>(<option value={choice[0]} key={choice[1]} style={
                    {
                        backgroundColor: choice[1],
                        color: choice[1] == "#000000" || choice[1] =="#383E42" ? "white" : "black"
                    }
                    } >{choice[0]}</option>))}
            </Form.Select>
        </div>
    )
}
