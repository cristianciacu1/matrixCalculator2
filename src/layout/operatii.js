import React from 'react';
import AfisareRezultat from './afisareRezultat';

import '../putinCSS/css.css';

import {Link} from 'react-router-dom';

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
                        <input onChange={this.props.setAlfa} className="col-md-1 col-sm-5" type="text" placeholder={this.props.getPlaceHolder()} />
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
                <div className="operatiiPremium" style={{marginTop: '30px'}}>
                    <h3 style={{marginBottom: '20px'}}>Operatii PREMIUM</h3>
                    <Button variant="light" style={{marginBottom: '5px'}}><Link to="sisteme" style={{color: "black"}}>Cramer</Link></Button>
                    <br />
                    <Button variant="light" onClick={this.props.handleRangA} style={{marginBottom: '5px'}}>Rang A</Button>{' '}
                    <Button variant="light" onClick={this.props.handleRangB} style={{marginBottom: '5px'}}>Rang B</Button>
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
                    {this.props.rezultate.map((item, index) => {
                        if(item.semn === '+' || item.semn === '-' || item.semn === '*' || item.semn === '/'){
                            return(
                                <Row className="justify-content-center" key={index} style={{borderBottom: '1px solid black', marginTop: '20px'}}>
                                    <Col md={3} sm={4} className="marginBottom">
                                        <AfisareRezultat matrice={item.matricea} />
                                    </Col>
                                    <Col md={3} sm={4} className="marginBottom">
                                        <Row className="justify-content-center">
                                            <span>{item.semn}</span>
                                        </Row>
                                    </Col>
                                    <Col md={3} sm={4} className="marginBottom">
                                        <AfisareRezultat matrice={item.matriceb} />
                                    </Col>
                                    <Col md={3} sm={4} className="marginBottom">
                                        <AfisareRezultat matrice={item.matricec} />
                                    </Col>
                                </Row>
                            )
                        }
                        if(item.semn === 'inmultire cu alfa' || item.semn === 'determinant' || item.semn === 'inversa' || item.semn === 'rang'){
                            if(item.semn === 'inmultire cu alfa' || item.semn === 'inversa'){
                                return(
                                    <Row className="justify-content-center" key={index} style={{borderBottom: '1px solid black', marginTop: '20px'}}>
                                        <Col md={3} sm={4} className="marginBottom">
                                            <AfisareRezultat matrice={item.matricea} />
                                        </Col>
                                        <Col md={3} sm={4} className="marginBottom">
                                            <Row className="justify-content-center">
                                                <span>{item.semn}</span>
                                            </Row>
                                        </Col>
                                        <Col md={3} sm={4} className="marginBottom">
                                        <Row className="justify-content-center">
                                                <span>{item.matriceb}</span>
                                            </Row>
                                        </Col>
                                        <Col md={3} sm={4} className="marginBottom">
                                            <AfisareRezultat matrice={item.matricec} />
                                        </Col>
                                    </Row>
                                )
                            }
                            else{
                                return(
                                    <Row className="justify-content-center" key={index} style={{borderBottom: '1px solid black', marginTop: '20px'}}>
                                        <Col md={3} sm={4} className="marginBottom">
                                            <AfisareRezultat matrice={item.matricea} />
                                        </Col>
                                        <Col md={3} sm={4} className="marginBottom">
                                            <Row className="justify-content-center">
                                                <span>{item.semn}</span>
                                            </Row>
                                        </Col>
                                        <Col md={3} sm={4} className="marginBottom">
                                            <Row className="justify-content-center">
                                                <span>{item.matriceb}</span>
                                            </Row>
                                        </Col>
                                        <Col md={3} sm={4} className="marginBottom">
                                            <Row className="justify-content-center">
                                                    <span>{item.matricec}</span>
                                            </Row>
                                        </Col>
                                    </Row>
                                )
                            }
                            
                        }
                    })}
                </div>
            </div>
        )
    }
}