import React from 'react';
import { Row, Col } from 'react-bootstrap';

function Afisare(props){

    let valori = [];
        
    for(var i=0;i<props.lungime;i++){
        let valori2 = [];
        for(var j=0;j<props.matrice[i].length;j++){
            valori2.push(
                <Col md={1} sm={1} key={j}>
                    <span key={j}>
                        {props.matrice[i][j]}
                    </span> 
                </Col>
            )
        }
        valori.push(<Row className="justify-content-center" key={i}>{valori2}</Row>)
    }

    return(
        valori
    )
}

export default Afisare;