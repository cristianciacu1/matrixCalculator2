import React from 'react';

export default class Matrix extends React.Component{

    constructor(arraySize, index, props){
        super(props);

        this.matrice = [];

        for(let i=0;i<arraySize;i++){
            this.matrice[i]= [];
            for(let j=0;j<arraySize;j++){
                this.matrice[i][j]=0;
            }
        }

        this.index = index;

        this.size = arraySize;
    }

    setValoare(i, j, valoare){
        this.matrice[i][j]=valoare;
    }

    getLungime(){
        return this.size;
    }

    afisareConsola(){
        console.log(this.matrice);
    }

    getIndex(){
        return this.index;
    }

    getValue(i,j){
        if(i>=this.size || j>=this.size)
            return '0'
        return this.matrice[i][j];
    }

    afisareLungime(){
        return console.log(this.size);
    }
    
    add(){

        this.size = this.size + 1;
        this.matrice.length = this.size;
        this.matrice[this.size-1] = []

        for(let i=0;i<this.size;i++){
            this.matrice[i][this.size-1]=0;
            this.matrice[this.size-1][i]=0;
        }
    }

    delete(){
        this.size = this.size-1;
        this.matrice.length = this.size;
    }

    copiere(aux){
        if(aux.getLungime() === this.size){
            for(let i=0;i<this.size;i++){
                for(let j=0;j<this.size;j++){
                    this.matrice[i][j]=aux.getValue(i,j);
                }
            }
        }
        else{
            return(
                alert('nu se pot interschimba')
            )
        }

    }

    adunare(aux){
        if(aux.getLungime() === this.size){
            let matrice3 = new Matrix(this.size, 3);

            for(let i=0;i<this.size;i++){
                for(let j=0;j<this.size;j++){
                    let x = Number(this.getValue(i,j)) + Number(aux.getValue(i,j));
                    matrice3.setValoare(i, j, x);
                }
            }

            return matrice3;
        }
        else{
            return 0
        }
    }

    scadere(aux){
        if(aux.getLungime() === this.size){
            let matrice3 = new Matrix(this.size, 3);

            for(let i=0;i<this.size;i++){
                for(let j=0;j<this.size;j++){
                    let x = Number(this.getValue(i,j)) - Number(aux.getValue(i,j));
                    matrice3.setValoare(i, j, x);
                }
            }

            return matrice3;

        }
        else{
            return 0
        }
    }

    inmultire(aux){
        if(aux.getLungime() === this.size){
            let matrice3 = new Matrix(this.size, 3);

            for(let i=0;i<this.size;i++){
                for(let j=0;j<this.size;j++){
                    let x = Number(this.getValue(i,j)) * Number(aux.getValue(i,j));
                    matrice3.setValoare(i, j, x);
                }
            }

            return matrice3;

        }
        else{
            return 0
        }
    }

    inmultireCuAlfa(alfa){
        let matrice3 = new Matrix(this.size, 3);

        for(let i=0;i<this.size;i++){
            for(let j=0;j<this.size;j++){
                var x = Number(this.getValue(i,j)) * Number(alfa);
                matrice3.setValoare(i, j, x);
            }
        }
        return matrice3;
    }

    impartire(aux){
        if(aux.getLungime() === this.size){
            let matrice3 = new Matrix(this.size, 3);

            for(let i=0;i<this.size;i++){
                for(let j=0;j<this.size;j++){
                    let x = Number(this.getValue(i,j)) / Number(aux.getValue(i,j));
                    matrice3.setValoare(i, j, x);
                }
            }

            return matrice3;

        }
        else{
            return 0
        }
    }

    creareMatrice(matrix, size){
        matrix.length = size;
        for(let i=0;i<size;i++){
            matrix[i] = [];
            matrix[i].length = size;
        }
        //console.log(matrix);
    }

    getCoFactor(matrice, temp, p, q, n){
        var i=0;
        var j=0;
        for(let row = 0; row < n; row++){
            for(let col = 0; col < n; col++){
                if(row!==p && col!==q){
                    temp[i][j++] = matrice[row][col];
                    if(j===(n-1)){
                        j=0;
                        i++;
                    }
                }
            }
        }
    }

    calculareDeterminant(matrice, n){
        var Determinant = 0;
        
        if(n === 1){
            return matrice[0][0];
        }

        let temp = [];

        this.creareMatrice(temp, this.size);

        console.log(temp);

        var sign = 1;

        for(let f=0;f<n;f++){
            this.getCoFactor(matrice, temp, 0, f, n);
            Determinant += sign * matrice[0][f] * this.calculareDeterminant(temp, (n-1));
            sign = -sign;
        }
        return Determinant;
    }

    calcDeterminant(){
        console.log(this.size);
        let x = this.calculareDeterminant(this.matrice, this.size);
        return x;
    }

    adjoint(matrice, adj){
        if(this.size === 1){
            adj[0][0]=1;
            return;
        }

        var sign = 1;
        
        let temp = [];

        this.creareMatrice(temp, this.size);

        for(let i=0;i<this.size;i++){
            for(let j=0;j<this.size;j++){
                this.getCoFactor(matrice, temp, i, j, this.size);

                sign = ((i+j)%2===0) ? 1: -1;

                adj[j][i] = (sign)*(this.calculareDeterminant(temp, (this.size-1)))
            }
        }
    }

    calcInversa(){

        let matrice3;

        var det = this.calculareDeterminant(this.matrice, this.size);
        if(det===0){
            return 0;
        }

        let adj = [];
        this.creareMatrice(adj, this.size);
        
        this.adjoint(this.matrice, adj);

        matrice3 = new Matrix(this.size, 3);

        for(let i=0;i<this.size;i++){
            for(let j=0;j<this.size;j++){
                var hatz = Number(adj[i][j])/Number(det);
                matrice3.setValoare(i,j,hatz);
            }
        }

        return matrice3;

    }

}