import React from 'react'
import "../formats/invoiceStyles.css"

export default function Invoice({mainData, collapsableData, resultData}) {
    const crearRows = (layer)=>{
        let returnRows = []
        for(let i=0; i<5; i++){
            if(resultData[layer].amountOfKits[i]){
                returnRows.push([`Kits de ${resultData[layer].sizeOfKits[i]}`, resultData[layer].amountOfKits[i]])
            }
        }

        return returnRows.map(element => (
            <div>
                {element[0]} : {element[1]}
            </div>
            )
        )
    }

    return (
        <div className="invoice">
            <div className="titulo">Presupuesto</div>
            Imprimación:
            {crearRows("imprimacion")}
            Capas:
            {crearRows("capas")}
        </div>
        
    )
}
