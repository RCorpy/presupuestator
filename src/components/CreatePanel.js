import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import {expressFunc} from '../formats/expressRequests'
import { crearPresupuesto, getNuevoCodigo, crearArticulo, buscarArticuloConCodigo } from '../formats/apiRequests';
import { CODES } from '../formats/delsolCodes'

const resinasDictionary = {
    "epoxy brillo": "epoxiBrillo",
    "epoxi mate": "epoxiMate",
    "acrilica": "acrilica",
    "politop": "politop"
}

export default function CreatePanel({auth, gatherUsefulData, totalPricePerM2, totalPrice, gm2Imprimacion, gm2Capas}) {

    const handleCreate = async () =>{
        const thisFileRef = Date.now().toString().substring(2).slice(0,-3)
        const usefulData = gatherUsefulData(thisFileRef)
        expressFunc(usefulData)

        const codigoPresupuesto = await getNuevoCodigo(auth)
        const presupuesto = await crearPresupuesto(auth, codigoPresupuesto, thisFileRef, usefulData.totalPrice, (usefulData.kgsCapas+usefulData.kgsImprimacion+usefulData.resultData.disolvente))
        
        const codesImprimacion = CODES[resinasDictionary[usefulData.resina]]["Transparente"]

        const codesCapas = CODES[resinasDictionary[usefulData.resina]][usefulData.color]
        const codeDisolvente = resinasDictionary[usefulData.resina] == "politop" ? 10050 : 10051

        // cargar lineas de imprimacion

        let amountOfKits = usefulData.resultData.imprimacion.amountOfKits
        let orderArticulos = 0

        for(let i=0; i<amountOfKits.length; i++){
            if(amountOfKits[i]){
                const sizeOfKit = usefulData.resultData.imprimacion.sizeOfKits[i]
                const codeArticulo = codesImprimacion[sizeOfKit]
                const articulo = await buscarArticuloConCodigo(auth, codeArticulo)
                const articuloCreado = await crearArticulo(auth, codigoPresupuesto, orderArticulos, codeArticulo, amountOfKits[i], usefulData.priceObject.imprimacion[sizeOfKit], articulo[0][5].dato)
                orderArticulos++            }  
        }

        //capas
        amountOfKits = usefulData.resultData.capas.amountOfKits

        for(let i=0; i<amountOfKits.length; i++){
            if(amountOfKits[i]){
                const sizeOfKit = usefulData.resultData.capas.sizeOfKits[i]
                const codeArticulo = codesCapas[sizeOfKit]
                const articulo = await buscarArticuloConCodigo(auth, codeArticulo)
                const articuloCreado = await crearArticulo(auth, codigoPresupuesto, orderArticulos, codeArticulo, amountOfKits[i], usefulData.priceObject.capas[sizeOfKit], articulo[0][5].dato)
                orderArticulos++
            }  
        }
        //disolvente
        if(usefulData.resultData.disolvente){
            const articulo = await buscarArticuloConCodigo(auth, codeDisolvente)
            const articuloCreado = await crearArticulo(auth, codigoPresupuesto, orderArticulos, codeDisolvente, usefulData.resultData.disolvente, usefulData.disolventePrice, articulo[0][5].dato)
            orderArticulos++
        }
        //herramientas
        if(usefulData.herramientas.basculas){
            const articuloCreado = await crearArticulo(auth, codigoPresupuesto, orderArticulos, 10045, usefulData.herramientas.basculas, 0, "BALANZA 2G A 5KGS")
            orderArticulos++
        }
        if(usefulData.herramientas.cubos){
            const articuloCreado = await crearArticulo(auth, codigoPresupuesto, orderArticulos, 10046, usefulData.herramientas.cubos, 0, "CUBOS DE MEZCLA")
            orderArticulos++
        }
        if(usefulData.herramientas.rodillos){
            const articuloCreado = await crearArticulo(auth, codigoPresupuesto, orderArticulos, 10047, usefulData.herramientas.rodillos, 0, "RODILLOS 220mm")
            orderArticulos++
        }
///////////////


        


        
/////////////////
    }

    return (
        <div className="inputrow">
            <Badge pill bg="primary" className="pillBadge" >{totalPricePerM2.toFixed(2)} €/m²</Badge>
            
            <Badge pill bg="dark" className="pillBadge" >{totalPrice.toFixed(2)} €</Badge>

            <Badge pill bg="info" className="pillBadge" >{Math.round(gm2Imprimacion)} g/m² </Badge>

            <Badge pill bg="warning" style={{color: "black"}} className="pillBadge">{Math.round(gm2Capas)} g/m² </Badge>

            <Button variant="danger" onClick={()=>handleCreate()}>CREAR</Button>
        </div>
    )
}
