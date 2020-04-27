import React from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";

import Matrix from '../matrix/matrix';
import AfisareMatrix from './afisareMatrix';
import Operatii from './operatii';

import cloneDeep from 'lodash/cloneDeep';
var concat = require('lodash.concat');

export default class Layout extends React.Component{

    constructor(props){
        super(props);

        let matrice1 = new Matrix(3,3, 1);
        let matrice2 = new Matrix(3,3, 2);

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
        //this.state.matriceA.afisareConsola();
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

        let lista = {
            matricea: matriceA,
            semn: semn,
            matriceb: matriceB,
            matricec: matriceC
        }

        let copie = cloneDeep(this.state.rezultate);

        this.setState({
            rezultate: [lista, copie]
        })

    }

    handleAdunare = () => {
        let matrice3;

        matrice3 = this.state.matriceA.adunare(this.state.matriceB);

        if(matrice3 === 0)
            return(
                alert('ha ha, nu merge')
            )

        let matriceAAux = this.state.matriceA;
        let matriceAuxB = this.state.matriceB;

        this.addRezultateAndState(matriceAAux, '+', matriceAuxB, matrice3);
    }

    handleScadere = () => {
        let matrice3;

        matrice3 = this.state.matriceA.scadere(this.state.matriceB);

        if(matrice3 === 0)
            return(
                alert('ha ha, nu merge')
            )

            let matriceAAux = this.state.matriceA;
            let matriceBAux = this.state.matriceB;

        this.addRezultateAndState(matriceAAux, '-', matriceBAux, matrice3);
    }

    handleInmultire = () => {
        let matrice3;

        matrice3 = this.state.matriceA.inmultire(this.state.matriceB);

        if(matrice3 === 0)
            return(
                alert('ha ha, nu merge')
            )

            let matriceAAux = this.state.matriceA;
            let matriceBAux = this.state.matriceB;

        this.addRezultateAndState(matriceAAux, '*', matriceBAux, matrice3);

    }

    handleImpartire = () => {
        let matrice3;

        matrice3 = this.state.matriceA.impartire(this.state.matriceB);

        if(matrice3 === 0)
            return(
                alert('ha ha, nu merge')
            )

            let matriceAAux = this.state.matriceA;
            let matriceBAux = this.state.matriceB;

        this.addRezultateAndState(matriceAAux, '/', matriceBAux, matrice3);
    }

    handleDeterminantA = () => {
        var x = this.state.matriceA.calcDeterminant();

        let matriceAAux = this.state.matriceA;

        this.addRezultateAndState(matriceAAux, 'determinant', 'nu e nevoie', x);
    }

    handleDeterminantB = () => {
        var x = this.state.matriceB.calcDeterminant();

        let matriceBAux = this.state.matriceB;

        this.addRezultateAndState(matriceBAux, 'determinant', 'nu e nevoie', x);
    }

    handleRangA = () => {
        var x = this.state.matriceA.calcRang();

        let matriceAAux = this.state.matriceA;

        this.addRezultateAndState(matriceAAux, 'rang', 'nu e nevoie', x);
    }

    handleRangB = () => {
        var x = this.state.matriceB.calcRang();

        let matriceAAux = this.state.matriceB;

        this.addRezultateAndState(matriceAAux, 'rang', 'nu e nevoie', x);
    }

    handleInversaA = () => {
        let matrice3;

        matrice3 = this.state.matriceA.calcInversa();

        if(matrice3 === 0){
            return(
                alert('Nu se poate calcula inversa deoarece determinantul este 0')
            )
        }

        let matriceAAux = this.state.matriceA;

        this.addRezultateAndState(matriceAAux, 'inversa', 'nu e nevoie', matrice3);
    }

    handleInversaB = () => {
        let matrice3;

        matrice3 = this.state.matriceB.calcInversa();

        if(matrice3 === 0){
            return(
                alert('Nu se poate calcula inversa deoarece determinantul este 0')
            )
        }
        let matriceBAux = this.state.matriceB;

        this.addRezultateAndState(matriceBAux, 'inversa', 'nu e nevoie', matrice3);
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

        let matriceAAux = this.state.matriceA;

        this.addRezultateAndState(matriceAAux, x, this.state.alfa, matrice3);

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
                handleRangA={this.handleRangA} handleRangB={this.handleRangB}
                />
                
            </Container>
        )
    }

}