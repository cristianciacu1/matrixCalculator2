import React from 'react';
import AfisareRezultat from './afisareRezultat';

import { Row, Col, Button} from 'react-bootstrap';

export default class Operatii extends React.Component{
    render(){
        return(
            <div className="operatii" style={{marginTop: '20px'}} className="text-center">
                <div>
                    <h3 style={{marginBottom: '20px'}}>Operatii BASIC</h3>
                    <Button variant="light" onClick={this.props.handleAdunare} style={{marginBottom: '5px'}}>Adunare</Button>{' '}
                    <Button variant="light" onClick={this.props.handleScadere} style={{marginBottom: '5px'}}>Scadere</Button>{' '}
                    <Button variant="light" onClick={this.props.handleInmultire} style={{marginBottom: '5px'}}>Inmultire</Button>{' '}
                    <Button variant="light" onClick={this.props.handleImpartire} style={{marginBottom: '5px'}}>Impartire</Button>
                    <br />
                    <div>
                        <Button variant="light" onClick={this.props.handleInmultireCuAlfaA} style={{marginBottom: '5px', marginRight: '10px'}}>Inmultire cu</Button>
                        <input onChange={this.props.setAlfa} className="col-md-1" type="text" placeholder={this.props.getPlaceHolder()} />
                    </div>
                </div>
                <div className="operatiiBasicPlus" style={{marginTop: '30px'}}>
                    <h3 style={{marginBottom: '20px'}}>Operatii BASIC PLUS</h3>
                    <Button variant="light" onClick={this.props.handleDeterminantA} style={{marginBottom: '5px'}}>Determinant A</Button>{' '}
                    <Button variant="light" onClick={this.props.handleDeterminantB} style={{marginBottom: '5px'}}>Determinant B</Button>
                    <br />
                    <Button variant="light" onClick={this.props.handleInversaA} style={{marginBottom: '5px'}}>Inversa A</Button>{' '}
                    <Button variant="light" onClick={this.props.handleInversaB} style={{marginBottom: '5px'}}>Inversa B</Button>
                </div>
                <div className="results" style={{marginTop: '30px'}}>
                    <Row className="justify-content-center">
                        <Col md={3} sm={4}>
                            <h4 className="text-center">A</h4>
                        </Col>
                        <Col md={3} sm={4}>
                            <h4 className="text-center">Operatie</h4>
                        </Col>
                        <Col md={3} sm={4}>
                            <h4 className="text-center">B</h4>
                        </Col>
                        <Col md={3} sm={4}>
                            <h4 className="text-center">C</h4>
                        </Col>
                    </Row>
                    {this.props.rezultate.map((item, index2) => 
                        <Row className="justify-content-center" key={index2} style={{borderBottom: '1px solid black', marginTop: '20px'}}>
                            {item.map((item2, index) => {
                                if(index===1){
                                    return(
                                        <Col md={3} sm={4} key={index} className="marginBottom">
                                            <Row className="justify-content-center">
                                                <span>{item2}</span>
                                            </Row>
                                        </Col>
                                    )
                                }
                                else{
                                    if(item[1] === 'determinant' || item[1] === 'inversa'){
                                        if(index===0){
                                            return(
                                                <Col md={3} sm={4} key={index} className="marginBottom">
                                                    <AfisareRezultat matrice={item2} />
                                                </Col>
                                            )
                                        }
                                        if(index===2){
                                            return(
                                                <Col md={3} sm={4} key={index} className="marginBottom">
                                                    <Row className="justify-content-center">
                                                        <span>Nu e nevoie</span>
                                                    </Row>
                                                </Col>
                                            )}
                                        else{
                                            if(item[1]==='inversa' && index===3){
                                                return(
                                                    <Col md={3} sm={4} key={index} className="marginBottom">
                                                    <AfisareRezultat matrice={item2} />
                                                </Col>
                                                )
                                            }
                                            else{
                                                return(
                                                    <Col md={3} sm={4} key={index} className="marginBottom">
                                                        <Row className="justify-content-center">
                                                            <span>{item2}</span>
                                                        </Row>
                                                    </Col> 
                                                )
                                            }
                                        }
                                    }
                                    if(item[1]==='inmultire cu alfa'){
                                        if(index===0 || index===3){
                                            return(
                                                <Col md={3} sm={4} key={index} className="marginBottom">
                                                    <AfisareRezultat matrice={item2} />
                                                </Col>
                                            )
                                        }
                                        if(index===2){
                                            return(
                                                <Col md={3} sm={4} key={index} className="marginBottom">
                                                    <Row className="justify-content-center">
                                                        <span>{item2}</span>
                                                    </Row>
                                                </Col>
                                            )
                                        }
                                    }
                                    else{
                                        return(
                                            <Col md={3} sm={4} key={index} className="marginBottom">
                                                <AfisareRezultat matrice={item2} />
                                            </Col>
                                        )}
                                }
                            
                            })}
                        </Row>
                    )}
                </div>
            </div>
        )
    }
}