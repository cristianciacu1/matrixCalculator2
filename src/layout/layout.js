import React from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";

import Matrix from '../matrix/matrix';
import AfisareMatrix from './afisareMatrix';
import AfisareRezultat from './afisareRezultat';
import Operatii from './operatii';

export default class Layout extends React.Component{

    constructor(props){
        super(props);

        let matrice1 = new Matrix(3, 1);
        let matrice2 = new Matrix(3, 2);

        this.state = {
            arraySizeA: 3,
            arraySizeB: 3,
            matriceA: matrice1,
            matriceB: matrice2,
            rezultate: [],
            determinant: 0,
            alfa: 2
        }

        this.handleClickPlus = this.handleClickPlus.bind(this);

    }

    handleClickPlus = (matrice) => {
        if(matrice.getIndex() === 1){
            this.setState({
                arraySizeA: this.state.arraySizeA+1
            }, function(){
                this.state.matriceA.add();
            });
        }
        else{
            if(matrice.getIndex() === 2){
                this.setState({
                    arraySizeB: this.state.arraySizeB+1
                }, function(){
                    this.state.matriceB.add();
                    this.state.matriceB.afisareConsola();
                });
            }
        }
    }

    handleClickMinus = (matrice) => {
        if(matrice.getIndex() === 1){
            this.setState({
                arraySizeA: this.state.arraySizeA-1
            }, function(){
                this.state.matriceA.delete();
            });
        }
        else{
            if(matrice.getIndex() === 2){
                this.setState({
                    arraySizeB: this.state.arraySizeB-1
                }, function(){
                    this.state.matriceB.delete();
                });
            }
        }
    }

    handleSetValue = (i, j, value) => {
        this.state.matriceA.setValoare(i, j, value);
        //this.state.matriceA.afisare();
    }

    handleSetValueB = (i, j, value) => {
        this.state.matriceB.setValoare(i, j, value);
    }

    handleSetValueC = (i, j, value) => {
        this.state.matriceC.setValoare(i, j, value);
    }

    handleSetAlfa = (alfa) => {

    }

    addRezultateAndState(matriceA, semn, matriceB, matriceC){
        let rezultateAux = [];

        rezultateAux.push(matriceA);
        rezultateAux.push(semn);
        rezultateAux.push(matriceB);
        rezultateAux.push(matriceC);

        this.setState({
            rezultate: [rezultateAux, ...this.state.rezultate]
        })
    }

    handleAdunare = () => {
        let matrice3;

        matrice3 = this.state.matriceA.adunare(this.state.matriceB);

        if(matrice3 === 0)
            return(
                alert('ha ha, nu merge')
            )

        this.addRezultateAndState(this.state.matriceA, '+', this.state.matriceB, matrice3);
    }

    handleScadere = () => {
        let matrice3;

        matrice3 = this.state.matriceA.scadere(this.state.matriceB);

        if(matrice3 === 0)
            return(
                alert('ha ha, nu merge')
            )

        this.addRezultateAndState(this.state.matriceA, '-', this.state.matriceB, matrice3);
    }

    handleInmultire = () => {
        let matrice3;

        matrice3 = this.state.matriceA.inmultire(this.state.matriceB);

        if(matrice3 === 0)
            return(
                alert('ha ha, nu merge')
            )

        this.addRezultateAndState(this.state.matriceA, '*', this.state.matriceB, matrice3);
    }

    handleImpartire = () => {
        let matrice3;

        matrice3 = this.state.matriceA.impartire(this.state.matriceB);

        if(matrice3 === 0)
            return(
                alert('ha ha, nu merge')
            )

        this.addRezultateAndState(this.state.matriceA, '/', this.state.matriceB, matrice3);
    }

    handleDeterminantA = () => {
        var x = this.state.matriceA.calcDeterminant();
        this.addRezultateAndState(this.state.matriceA, 'determinant', 0, x);
    }

    handleDeterminantB = () => {
        var x = this.state.matriceA.calcDeterminant();
        this.addRezultateAndState(this.state.matriceB, 'determinant', 0, x);
    }

    handleInversaA = () => {
        let matrice3;

        matrice3 = this.state.matriceA.calcInversa();

        if(matrice3 === 0){
            return(
                alert('Nu se poate calcula inversa deoarece determinantul este 0')
            )
        }
        this.addRezultateAndState(this.state.matriceA, 'inversa', 0, matrice3);
    }

    handleInversaB = () => {
        let matrice3;

        matrice3 = this.state.matriceB.calcInversa();

        if(matrice3 === 0){
            return(
                alert('Nu se poate calcula inversa deoarece determinantul este 0')
            )
        }
        this.addRezultateAndState(this.state.matriceB, 'inversa', 0, matrice3);
    }

    getPlaceHolder = () => {
        return this.state.alfa;
    }

    setAlfa = (event) => {
        event.preventDefault();
        let x = event.target.value;
        this.setState({
            alfa: x
        })
    }

    handleInmultireCuAlfaA = () => {
        let matrice3;

        matrice3 = this.state.matriceA.inmultireCuAlfa(this.state.alfa);

        let x = 'inmultire cu alfa'

        this.addRezultateAndState(this.state.matriceA, x, this.state.alfa, matrice3);

    }

    render(){

        return(
            <Container>
                
                <h1 className="text-center">Matematica pentru profesionisti</h1>
                <div style={{marginTop: '50px'}}>
                    <Row className="justify-content-center">
                        <Col md={6} style={{marginBottom: '40px'}}>
                            <h1 className="text-center">MATRICEA A</h1>
                            <AfisareMatrix arraySize={this.state.arraySizeA} matrice={this.state.matriceA} hatz={this.handleSetValue}/>
                            <div className="text-center">
                                <Button variant="light" onClick={() => this.handleClickPlus(this.state.matriceA)} style={{marginRight: '20px'}}>+</Button>
                                <Button variant="light" onClick={() => this.handleClickMinus(this.state.matriceA)}>-</Button>
                            </div>
                        </Col>
                        <Col md={6} className="justify-content-center" style={{marginBottom: '20px'}}>
                            <h1 className="text-center">MATRICEA B</h1>
                            <AfisareMatrix arraySize={this.state.arraySizeB} matrice={this.state.matriceB} hatz={this.handleSetValueB}/>
                            <div className="text-center">
                                <Button variant="light" onClick={() => this.handleClickPlus(this.state.matriceB)} style={{marginRight: '20px'}}>+</Button>
                                <Button variant="light" onClick={() => this.handleClickMinus(this.state.matriceB)}>-</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Operatii rezultate = {this.state.rezultate} handleAdunare={this.handleAdunare} 
                handleScadere={this.handleScadere} handleInmultire={this.handleInmultire}
                handleImpartire={this.handleImpartire} handleDeterminantA={this.handleDeterminantA}
                handleDeterminantB={this.handleDeterminantB} handleInversaA={this.handleInversaA}
                handleInversaB={this.handleInversaB} getPlaceHolder={this.getPlaceHolder}
                handleInmultireCuAlfaA={this.handleInmultireCuAlfaA} setAlfa={this.setAlfa}
                />
                
            </Container>
        )
    }

}