import React from 'react';
import {Row, Col} from 'react-bootstrap';

export default class AfisareMatrix extends React.Component{

    constructor(props){
        super(props);

        this.afisare = this.afisare.bind(this);
    }

    handleChange = (i,j, event)=> {
        event.preventDefault();
        let x = event.target.value;
        this.props.hatz(i,j,x);
    }

    afisare(){
        let valori = [];
        for(let i=0;i<this.props.arraySize;i++){
            let valori2 = [];
            for(let j=0;j<this.props.arraySize;j++){
                valori2.push(
                    <span style={{marginRight: '20px', marginBottom: '20px'}} key={j}>
                        <input
                            type='text'
                            placeholder={this.props.matrice.getValue(i,j)}
                            /*placeholder='0'*/
                            onChange={this.handleChange.bind(this, i, j)}
                            key={j}
                            style={{width: '50px'}}
                            className="text-center"
                        />
                    </span>
                )
            }
            valori.push(<Row key={i} className="justify-content-center">{valori2}</Row>);
        }
        return valori;
    }

    render(){
        return(
            <div>
                <form>
                    <Row>
                        <Col>
                            {this.afisare()}
                        </Col>
                    </Row>
                </form>
            </div>
        )
    }
}