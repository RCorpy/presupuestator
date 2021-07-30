import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import capasDictionary from "../formats/capasDictionary"

export default function Main({setMainData, mainData}) {

    const handleSetMainData = (key, value) => {
        setMainData((prevData)=>{
            let returnValue = {...prevData}
            returnValue[key] = value
            return returnValue
        })
    }

    return (
        <div>
            <Dropdown>
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
            <input type="number" onChange={()=>console.log("change")} value={mainData.m2}/>
            <Dropdown>
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
            color
        </div>
    )
}
