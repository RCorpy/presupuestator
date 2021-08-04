import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import {getAuth} from '../formats/apiRequests'

export default function Main({pricePerM, total}) {

    const [auth, setAuth] = useState("noauth")

    return (
        <div>
            <Badge pill bg="primary">{pricePerM} €/m²</Badge>
            <Button variant="danger" onClick={()=>getAuth(setAuth)}>CREAR</Button>
            <Badge pill bg="dark">{total} €</Badge>
            {auth}
        </div>
    )
}
