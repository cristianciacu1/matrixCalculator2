import React from 'react';

import {Container, Form, Button} from 'react-bootstrap';

import Cramer from './cramer';

export default class LayoutSisteme extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            ecuatieCurenta: 'Ecuatia ta',
            ecuatii: [],
            necunoscute: 1,
            isToggled: false,
            isToggled2: false,
            esteCompatibil: false
        }
    }

    alertaDeInceput(){
        return(
            alert('ATENTIE! Sunt lucruri complicate aici!')
        )
    }

    handleChange = (event) => {
        let x = event.target.value;
        this.setState({
            ecuatieCurenta: x
        })
    }

    formSubmit = e => {
        e.preventDefault();
        let x = this.state.ecuatieCurenta;
        this.setState({
            ecuatii: [...this.state.ecuatii, x],
            ecuatieCurenta: ' '
        })
    }

    handlePlus = () => {
        this.setState({
            necunoscute: this.state.necunoscute+1
        })
    }

    handleMinus = () => {
        this.setState({
            necunoscute: this.state.necunoscute-1
        })
    }

    vizibilitate = () => {
        this.setState({
            isToggled: true
        })
    }

    hatz = () => {
        //console.log("solutii");
        if(this.state.isToggled){
            return(
                <div>
                    <Cramer randare={this.state.isToggled} ecuatii={this.state.ecuatii} numarNecunoscute={this.state.necunoscute} tip="solutii"/>
                </div>
            )
        }
    }

    render(){
        return(
            <Container>
            {/* {this.alertaDeInceput()} */}
                <h1 className="text-center">Sisteme de ecuatii</h1>
                <div className="introducereEcuatii" style={{marginTop: '20px'}}>
                    <h3>Introduceti ecuatiile</h3>
                    <h3 className="d-inline">Numarul de necunoscute: {this.state.necunoscute}</h3>{' '}
                    <Button variant="light" onClick={this.handlePlus} className="d-inline" style={{marginTop: '-10px'}}>+</Button>{' '}
                    <Button variant="light" onClick={this.handleMinus} className="d-inline" style={{marginTop: '-10px'}}>-</Button>
                    <div style={{marginTop: '20px'}}>
                        <Form inline onSubmit={e=>this.formSubmit(e)}>
                            <Form.Control style={{marginRight: '10px'}} column sm="2" type="text" onChange={this.handleChange} placeholder='Ecuatia ta' />
                            <Button variant="light" onClick={e=>this.formSubmit(e)}>Adauga</Button>
                        </Form>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        {this.state.ecuatii.map((item, index) => {
                            return(
                                <div key={index}>
                                    <h4>{item}</h4>
                                </div>
                            )
                        })}
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <Button variant="light" onClick={this.vizibilitate}>Calculeaza necunoscutele</Button>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        {this.hatz()}
                    </div>
                </div>
            </Container>
        )
    }
}