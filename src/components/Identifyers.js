import React from 'react'

export default function Main({setIdentifyersData, identifyersData}) {

    const handleSetIdentifyerData =  (key, value) => {
        setIdentifyersData((prevData)=>{
            let returnValue = {...prevData}
            returnValue[key] = value.split(" ").join("")
            return returnValue
        })
    }

    return (
        <div className="inputrow">
            <div className="inputgroup">
                <input type="text" id="concepto" name="concepto" className="inputbody" placeholder="concepto" value={identifyersData.concepto} onChange={(event)=>{handleSetIdentifyerData("concepto", event.target.value)}}></input>
                <label className="inputlabel" htmlFor="concepto"> Concepto </label>
            </div>
            
            <div className="inputgroup">
                <input type="text" id="nombre" name="nombre" className="inputbody" placeholder="nombre" value={identifyersData.nombre} onChange={(event)=>{handleSetIdentifyerData("nombre", event.target.value)}}></input>
                <label className="inputlabel" htmlFor="nombre"> Nombre </label>
            </div>

            <div className="inputgroup">
                <input type="text" id="telefono" name="telefono" className="inputbody" placeholder="telefono" value={identifyersData.telefono} onChange={(event)=>{handleSetIdentifyerData("telefono", event.target.value)}}></input>
                <label className="inputlabel" htmlFor="telefono"> Telefono </label>
            </div>
        </div>
    )
}
