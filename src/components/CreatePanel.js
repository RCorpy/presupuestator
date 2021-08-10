import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import {getAuth, getArticulosTable, prueba} from '../formats/apiRequests'

export default function CreatePanel({pricePerM, total, gm2Imprimacion, gm2Capas}) {

    const [auth, setAuth] = useState("")

    return (
        <div className="inputrow">
            <Badge pill bg="primary" className="pillBadge" onClick={()=>prueba(auth)}>{pricePerM} €/m²</Badge>
            
            <Badge pill bg="dark" className="pillBadge" onClick={()=>getArticulosTable(auth)}>{total} €</Badge>

            <Badge pill bg="info" className="pillBadge" onClick={()=>getArticulosTable(auth)}>{Math.round(gm2Imprimacion)} g/m² </Badge>

            <Badge pill bg="warning" style={{color: "black"}} className="pillBadge" onClick={()=>getArticulosTable(auth)}>{Math.round(gm2Capas)} g/m² </Badge>

            <Button variant="danger" onClick={()=>getAuth(setAuth)}>CREAR</Button>
        </div>
    )
}
