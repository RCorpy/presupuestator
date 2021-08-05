import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import {getAuth, getArticulosTable, prueba} from '../formats/apiRequests'

export default function CreatePanel({pricePerM, total}) {

    const [auth, setAuth] = useState("")

    return (
        <div className="inputrow">
            <Badge pill bg="primary" className="pillBadge" onClick={()=>prueba(auth)}>{pricePerM} €/m²</Badge>
            <Button variant="danger" onClick={()=>getAuth(setAuth)}>CREAR</Button>
            <Badge pill bg="dark" className="pillBadge" onClick={()=>getArticulosTable(auth)}>{total} €</Badge>
        </div>
    )
}
