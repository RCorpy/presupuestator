import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import {getAuth} from '../formats/apiRequests'

export default function Main({pricePerM, total}) {

    const [auth, setAuth] = useState("noauth")

    return (
        <div className="inputrow">
            <Badge pill bg="primary" className="pillBadge">{pricePerM} €/m²</Badge>
            <Button variant="danger" onClick={()=>getAuth(setAuth)}>CREAR</Button>
            <Badge pill bg="dark" className="pillBadge">{total} €</Badge>
            {auth}
        </div>
    )
}
