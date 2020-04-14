import React from 'react';
import { Row, Col } from 'react-bootstrap';

function AfisareRezultat(props){

    let valori = [];
        
    for(let i=0;i<props.matrice.getLungime();i++){
        let valori2 = [];
        for(let j=0;j<props.matrice.getLungime();j++){
            valori2.push(
                <Col md={1} sm={1} key={j}>
                    <span key={j}>
                        {props.matrice.getValue(i,j)}
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

export default AfisareRezultat;