import React from 'react'

const GRAMOS_EN_UN_KG = 1000

export default function Botonera({amount, thisPrice, setResultData ,index, layer, mainData}) {

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
                
            }
            return toReturn
        })
    }

    return (
        <>
            <div>
                <button onClick={()=>handleChange(1)}>+</button>
                <button onClick={()=>handleChange(-1)}>-</button>  
            </div>

            <div>{thisPrice} // </div>
            <div> {thisPrice*amount}</div>
        </>
    )
}
