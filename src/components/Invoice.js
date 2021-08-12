import React, {useState, useEffect} from 'react'
import "../formats/invoiceStyles.css"
import Botonera from './Botonera'


export default function Invoice({setTotalPrice, mainData, collapsableData, resultData, setResultData, priceObject}) {

    const [imprimacionPrice, setImprimacionPrice] = useState(0)
    const [capasPrice, setCapasPrice] = useState(0)
    const [disolventePrice, setDisolventePrice] = useState(0)

    useEffect(()=>{
        let toReturnPrice = 0

        setImprimacionPrice(()=>{
            toReturnPrice = 0
            for(let i = 0 ; i < 5; i++){
                toReturnPrice = toReturnPrice + resultData.imprimacion.amountOfKits[i] * priceObject[mainData.resina]["Transparente"][resultData.imprimacion.sizeOfKits[i]]
            }
            return toReturnPrice
        })

        setCapasPrice(()=>{
            toReturnPrice = 0
            for(let i = 0 ; i < 5; i++){
                toReturnPrice = toReturnPrice + resultData.capas.amountOfKits[i] * priceObject[mainData.resina][mainData.color][resultData.capas.sizeOfKits[i]]
            }
            return toReturnPrice
        })

        setDisolventePrice(()=>{
            return resultData.disolvente * 10 //cambiar por precio de disolvente
        })

    }, [resultData])

    useEffect(()=>{
        setTotalPrice(imprimacionPrice+capasPrice+disolventePrice)
    }, [imprimacionPrice,capasPrice,disolventePrice])

    const getThisPrice = (layer, thisIndex)=>{
        if(layer!="disolvente"){
            return priceObject[mainData.resina][layer=="capas" ? mainData.color : "Transparente"][resultData.capas.sizeOfKits[thisIndex]]
        }
        else{
            return 10
        }
    }

    const crearRows = (layer)=>{
        let returnRows = []
        for(let i=0; i<5; i++){
            returnRows.push([`Kits de ${resultData[layer].sizeOfKits[i]}`, resultData[layer].amountOfKits[i]])
        }



        return returnRows.map((element, i) => (
            <li key={`${layer}${i}`}>
                <div className="listitem">{element[0]} : {element[1]}</div> <Botonera index={i} setResultData={setResultData} layer={layer} mainData={mainData} thisPrice={getThisPrice(layer, i)} amount={element[1]}/>
            </li>
            )
        )
    }

    return (
        <div className="invoice">
            <div className="titulo">Presupuesto</div>
            <div className="imprimacion">
                <div style={{color: "#20c7c1"}}>Imprimación:</div>
                <ul>
                    {crearRows("imprimacion")}
                </ul>
            </div>
            <div className="capas">
                <div style={{color: "#eb8f34"}}>Capas:</div>
                <ul>
                    {crearRows("capas")}
                </ul>
            </div>
            <div className="disolvente">
                <div style={{marginRight: "2vh"}}>Disolvente: {resultData.disolvente} </div>
                <Botonera index={0} setResultData={setResultData} layer={"disolvente"} mainData={mainData} thisPrice={getThisPrice("disolvente", 0)} amount={resultData.disolvente}/>
            </div>
            <div>{imprimacionPrice.toFixed(2)} </div>
            <div>{capasPrice.toFixed(2)} </div>
            <div>{disolventePrice.toFixed(2)}</div>
        </div>
        
    )
}
