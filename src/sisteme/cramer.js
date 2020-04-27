import React from 'react';

import Matrix from '../matrix/matrix';

import '../putinCSS/css.css';

export default class Cramer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            matriceSistem: new Array(props.numarNecunoscute),
            matriceElemLibere: new Array(props.numarNecunoscute),
            matriceExtinsa: new Matrix(this.props.numarNecunoscute, this.props.numarNecunoscute+1, 3),
            matriceSistem2: new Matrix(this.props.numarNecunoscute, this.props.numarNecunoscute, 3),
            size: props.numarNecunoscute,
            determinant: null,
            rezultate: [],
            necunoscute: [],
            esteCompatibil: false
        }

        for(let i=0;i<props.numarNecunoscute;i++){
            this.state.matriceSistem[i] = [];
            this.state.matriceElemLibere[i] = [];
        }

    }

    aflareNumar = (x) => {
        var numarFinal = 0;
        var p = 1; 
        var n = x.length;
        for(let i=x.length-1;i>0;i--){
            if(!isNaN(x[i])){ /// Daca e cifra
                numarFinal = numarFinal + x[i]*p;
                p*=10;
            }
        }
        if(isNaN(x[n-1])){
            this.state.necunoscute.push(x[n-1]);
        }
        if(x[0] === '-'){
            numarFinal = numarFinal*(-1);
        }
        if(x.length === 1)
            numarFinal = x[0];
        return numarFinal;
    }

    introducereInMatrice = (valoare, i) => {
        var x = this.aflareNumar(valoare);
        this.state.matriceSistem[i].push(x);
    }

    introducereInMatrice2 = (valoare, i) => {
        var x = this.aflareNumar(valoare);
        this.state.matriceElemLibere[i].push(x);
    }

    golireExpresieCurenta = (expresieCurenta) => {
        expresieCurenta.length = 0;
    }

    determinant = 0;

    creareMatrice = (ecuatii, numarNecunoscute) => {    

        for(let i=0;i<ecuatii.length;i++){
            let j=0;
            let expresieCurenta = [];
            while(j<ecuatii[i].length){
                if(j!==0){
                    if(ecuatii[i].charAt(j) === '+' || ecuatii[i].charAt(j) === '-' || ecuatii[i].charAt(j) === '='){
                        if(ecuatii[i].charAt(j) === '='){
                            this.introducereInMatrice(expresieCurenta, i);
                            this.golireExpresieCurenta(expresieCurenta);
                            j++;
                            while(j<ecuatii[i].length){
                                expresieCurenta.push(ecuatii[i].charAt(j));
                                j++;
                            }
                            this.introducereInMatrice2(expresieCurenta, i);
                            this.golireExpresieCurenta(expresieCurenta);
                        }
                        else{
                            this.introducereInMatrice(expresieCurenta, i);
                            this.golireExpresieCurenta(expresieCurenta);
                            expresieCurenta.push(ecuatii[i].charAt(j));
                            j++;
                        }
                    }
                    else{
                        expresieCurenta.push(ecuatii[i].charAt(j));
                        j++;
                    }
                }
                else{
                    expresieCurenta.push(ecuatii[i].charAt(j));
                    j++;
                }      
            }
        }

        let matriceSistem = new Matrix(ecuatii.length, ecuatii.length, 3);
        let matriceLibera = new Matrix(ecuatii.length, ecuatii.length, 3);
        matriceSistem.copiereMatrice(this.state.matriceSistem);
        matriceLibera.copiereMatrice(this.state.matriceElemLibere);
        matriceLibera.definireMatriceCuOColoana();

        let det = matriceSistem.calcDeterminant();
        this.determinant = det;
    }

    rezolvareSistemeNedeterminate = () => {
        let matriceSistemAux = new Matrix(this.state.size, this.state.size, 3);
        matriceSistemAux.copiereMatrice(this.state.matriceSistem);

        let n = this.state.size;

        // for(let nPrim=n-1; nPrim>=0; nPrim--){ /// Rangul

        // }

    }

    creareMatriceExtinsa = () => {
        for(let i=0;i<this.props.numarNecunoscute;i++){
            for(let j=0;j<this.props.numarNecunoscute;j++){
                this.state.matriceExtinsa.setValoare(i,j,Number(this.state.matriceSistem[i][j]));
                this.state.matriceSistem2.setValoare(i,j,Number(this.state.matriceSistem[i][j]));
            }
        }
        for(let i=0;i<this.props.numarNecunoscute;i++){
            this.state.matriceExtinsa.setValoare(i, this.props.numarNecunoscute, Number(this.state.matriceElemLibere[i][0]));
        }

        //this.state.matriceExtinsa.afisareConsola();
    }

    determinareCompatibilitate = () => {
        var rang2 = this.state.matriceSistem2.calcRang();
        //this.state.matriceSistem2.afisareConsola();
        var rang1 = this.state.matriceExtinsa.calcRang();
        //this.state.matriceExtinsa.afisareConsola();
        if(rang1 === rang2){
            return(
                <h2>Sistemul este compatibil nedeterminat</h2>
            )
        }
        else{
            return(
                <h2>Sistemul este incompatibil</h2>
            )
        }
    }

    functieCramer = () => {
        if(this.determinant!==0){ ///Sistem compatibil determinat
            for(let j=0;j<this.state.size;j++){
                let matriceAux = new Matrix(this.state.size, this.state.size, 3);
                matriceAux.copiereMatrice(this.state.matriceSistem);
                matriceAux.schimbareColoana(this.state.matriceElemLibere, j);
                //matriceAux.afisareConsola();
                let determinantAux = matriceAux.calcDeterminant();
                let rezultatFinal = Number(determinantAux) / Number(this.determinant);
                this.state.rezultate.push(rezultatFinal);
            }
            
                return(
                    <div>
                        <h2>Solutiile sunt: </h2><br />
                        {this.state.rezultate.map((item, index) => {
                            return(
                                <h4 key={index}>
                                    {this.state.necunoscute[index]}: {item}
                                </h4>
                            )
                        })}
                    </div>
                )
            
        }
        else{
            return(
                <div>
                    {this.creareMatriceExtinsa()}
                    {this.determinareCompatibilitate()}
                </div>

            )
        }
    }

    render(){
        if(this.props.tip === "solutii"){
            return(
            <div>
                {this.creareMatrice(this.props.ecuatii, this.props.numarNecunoscute)}
                {this.functieCramer()}
                
            </div>
        )}
    }
}