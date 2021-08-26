import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import {expressFunc} from '../formats/expressRequests'

export default function CreatePanel({pruebaPresupuesto, gatherUsefulData, totalPricePerM2, totalPrice, gm2Imprimacion, gm2Capas}) {

    const handleCreate = () =>{
        expressFunc(gatherUsefulData())
        pruebaPresupuesto()
        
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
