import React from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';


export default function Extras({setExtras}) {

    const [extraName, setExtraName] = useState("")
    const [valueOfExtra, setValueOfExtra] = useState("")
    const [amountOfExtra, setAmountOfExtra] = useState("")

    const handleExtras = () =>{
        setExtras((prev)=>{
            let isReplace = false
            let toReturn = [...prev]

            for(let i=0; i<prev.length; i++){
                if(prev[i].name == extraName){
                    isReplace = true
                    toReturn[i] = {
                        name: extraName,
                        value: valueOfExtra,
                        amount: amountOfExtra
                    }
                }
            }

            if(!isReplace && extraName && valueOfExtra && amountOfExtra){
                toReturn.push({
                    name: extraName,
                    value: valueOfExtra,
                    amount: amountOfExtra
                })
            }
            console.log(toReturn)
            return toReturn
        })

    }

    return (
        <div className="inputrow">
            <div className="inputgroup">
                <input type="text" id="extra" name="extra" className="inputbody" placeholder="extra" value={extraName} onChange={(e)=>{setExtraName(e.target.value.toLocaleLowerCase())}}></input>
                <label className="inputlabel" htmlFor="extra"> Extra </label>
            </div>
            <div className="inputgroup">
                <input type="number" id="amountOfExtra" name="amountOfExtra" className="inputbody" placeholder="amountOfExtra" value={amountOfExtra} onChange={(e)=>{setAmountOfExtra(e.target.value)}}></input>
                <label className="inputlabel" htmlFor="amountOfExtra"> Amount of extra </label>
            </div>
            <div className="inputgroup">
                <input type="number" id="valueOfExtra" name="valueOfExtra" className="inputbody" placeholder="valueOfExtra" value={valueOfExtra} onChange={(e)=>{setValueOfExtra(e.target.value)}}></input>
                <label className="inputlabel" htmlFor="valueOfExtra"> Value of extra </label>
            </div>

            <Button variant="secondary" onClick={()=>handleExtras()}>click me!</Button>
        </div>
    )
}
