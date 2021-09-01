import React from 'react'
import { useEffect } from 'react'
import multiplicadorObject from "../multiplicador"

const GRAMOS_EN_UN_KG = 1000

export default function Botonera({setKgsData, amount, thisPrice, setResultData ,index, layer, mainData, finalPrices, setFinalPrices}) {

    //getResultData(setResultData, setKgsData, mainData, collapsableData, kgsData, false)

    useEffect(()=>{
        updateFinalPrices()
    },[amount, thisPrice])

    const updateFinalPrices = () => {
        
        setFinalPrices((prev)=>{
            let newFinalPrices = {...prev}
            if(layer=="disolvente"){
                newFinalPrices[layer] = thisPrice*amount*multiplicadorObject[mainData.resina]*2
            }
            else{
                newFinalPrices[layer][index] = thisPrice*amount*multiplicadorObject[mainData.resina]*2
            }
            return newFinalPrices
        })
    }

    const handleFinalPrices = (e) =>{
        setFinalPrices((prev)=>{
            let newFinalPrices = {...prev}
            if(layer=="disolvente"){
                newFinalPrices[layer] = parseFloat(e.target.value)
            }
            else{
                newFinalPrices[layer][index] = parseFloat(e.target.value)
            }
            return newFinalPrices
        })
        
    }

    const handleChange = (value)=>{
        setResultData((prev)=>{
            let toReturn = {...prev}
            if(layer=="disolvente"){
                if(prev.disolvente>0 || value >0){
                    toReturn.disolvente = prev.disolvente + value
                }
            }
            else if(prev[layer].amountOfKits[index]>0 || value>0){
                toReturn[layer].amountOfKits[index] = prev[layer].amountOfKits[index] + value
                
                let thisKgs = prev[layer].amountOfKits.reduce((acc, value, index)=>{
                    return acc+(value*prev[layer].sizeOfKits[index])
                })

                const auxObject = {
                    imprimacion: mainData.capas.split("")[0],
                    capas: mainData.capas.split("")[1]
                }

                toReturn.gPerM2[layer] = thisKgs/mainData.m2 * GRAMOS_EN_UN_KG * (auxObject[layer] ? 1/ auxObject[layer] : 1)
                
                let kgsLayer = "kgs" +layer.charAt(0).toUpperCase() + layer.slice(1)
                setKgsData((prevKgs)=>{
                    let kgsToReturn = {...prevKgs}
                    kgsToReturn[kgsLayer] = prev[layer].amountOfKits.reduce((acc, element, index)=>{
                        return acc + element*prev[layer].sizeOfKits[index]
                    },0)
                    return kgsToReturn
                })
            }
            return toReturn
        })
        updateFinalPrices()
    }

    return (
        <>
            <div>
                <button onClick={()=>handleChange(1)}>+</button>
                <button onClick={()=>handleChange(-1)}>-</button>  
            </div>
            <input type="number" value={layer=="disolvente" ? finalPrices[layer] : finalPrices[layer][index]} onChange={(e)=>handleFinalPrices(e)}></input>
            <div> {((thisPrice*amount).toFixed(2))}</div>
        </>
    )
}
