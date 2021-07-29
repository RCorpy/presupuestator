import React from 'react'
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

export default function Main({pricePerM, total}) {
    return (
        <div>
            <Badge pill bg="primary">{pricePerM} €/m²</Badge>
            <Button variant="danger">CREAR</Button>
            <Badge pill bg="dark">{total} €</Badge>
        </div>
    )
}
