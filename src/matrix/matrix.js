import React from 'react';

export default class Matrix extends React.Component{

    constructor(rows, cols, index, props){
        super(props);

        this.matrice = [];

        for(let i=0;i<rows;i++){
            this.matrice[i]= [];
            for(let j=0;j<cols;j++){
                this.matrice[i][j]=0;
            }
        }

        this.index = index;

        if(rows === cols){
            this.size = rows;
        }

        this.rows = rows;
        this.cols = cols;

        //console.log(this.rows, this.cols);

    }

    definireMatriceCuOColoana(){
        for(let i=0;i<this.size;i++){
            this.matrice[i].length=1;
        }
    }

    schimbareColoana(matricus, j){
        for(let i=0;i<this.size;i++){
            this.matrice[i][j] = matricus[i][0]
        }
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

    copiereMatrice(aux){
        //console.log(aux);
        this.size = aux.length;
        for(let i=0;i<this.size;i++){
            for(let j=0;j<aux[i].length;j++){
                this.matrice[i][j] = aux[i][j];
            }
        }
        //console.log(this.matrice);
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
            let matrice3 = new Matrix(this.size, this.size, 3);

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
            let matrice3 = new Matrix(this.size, this.size, 3);

            for(let i=0;i<this.size;i++){
                for(let j=0;j<this.size;j++){
                    let x = Number(this.getValue(i,j)) - Number(aux.getValue(i,j));
                    matrice3.setValoare(i, j, x.toFixed(2));
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
            let matrice3 = new Matrix(this.size, this.size, 3);

            for(let i=0;i<this.size;i++){
                for(let j=0;j<this.size;j++){
                    let x = Number(this.getValue(i,j)) * Number(aux.getValue(i,j));
                    matrice3.setValoare(i, j, x.toFixed(2));
                }
            }

            return matrice3;

        }
        else{
            return 0
        }
    }

    inmultireCuAlfa(alfa){
        let matrice3 = new Matrix(this.size, this.size, 3);

        for(let i=0;i<this.size;i++){
            for(let j=0;j<this.size;j++){
                var x = Number(this.getValue(i,j)) * Number(alfa);
                matrice3.setValoare(i, j, x.toFixed(2));
            }
        }
        return matrice3;
    }

    impartire(aux){
        if(aux.getLungime() === this.size){
            let matrice3 = new Matrix(this.size, this.size, 3);

            for(let i=0;i<this.size;i++){
                for(let j=0;j<this.size;j++){
                    let x = Number(this.getValue(i,j)) / Number(aux.getValue(i,j));
                    matrice3.setValoare(i, j, x.toFixed(2));
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

        var sign = 1;

        for(let f=0;f<n;f++){
            this.getCoFactor(matrice, temp, 0, f, n);
            Determinant += sign * matrice[0][f] * this.calculareDeterminant(temp, (n-1));
            sign = -sign;
        }
        return Determinant;
    }

    calcDeterminant(){
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

        matrice3 = new Matrix(this.size, this.size, 3);

        for(let i=0;i<this.size;i++){
            for(let j=0;j<this.size;j++){
                var hatz = Number(adj[i][j])/Number(det);
                matrice3.setValoare(i,j,hatz.toFixed(2));
            }
        }

        return matrice3;

    }

    swap(matrice, row1, row2, col){
        for(let i=0;i<col;i++){
            let temp = matrice[row1][i];
            matrice[row1][i] = matrice[row2][i];
            matrice[row2][i] = temp;
        }
    }

    // calcRang() {

    //     //console.log(this.rows, this.cols);

    //     var rang = this.cols;

    //     let matriceAux = new Array(this.rows);

    //     for(let i=0;i<this.rows;i++){
    //         matriceAux[i] = [];
    //         for(let j=0;j<this.cols;j++){
    //             matriceAux[i][j] = this.matrice[i][j];
    //         }
    //     }

    //     for(let row=0; row < rang; row++){
    //         if(matriceAux[row][row]){
    //             for(let col=0; col < this.rows; col++){
    //                 if(col!==row){
    //                     var mult = Number(matriceAux[col][row]) / Number(matriceAux[row][row]);
    //                     for(let i=0;i<rang;i++){
    //                         matriceAux[col][i] -= mult * matriceAux[row][i];
    //                     }
    //                 }
    //             }
    //         }
    //         else{
    //             var reduce = true;
    //             for(let i=row+1; i<this.rows; i++){
    //                 if(matriceAux[i][row]){
    //                     this.swap(matriceAux, row, i, rang);
    //                     reduce = false;
    //                     break;
    //                 }
    //             }
    //             if(reduce){
    //                 rang--;
    //                 for(let i=0; i<this.rows; i++){
    //                     matriceAux[i][row] = matriceAux[i][rang];
    //                 }
    //             }
    //             row--;
    //         }
    //     }
    //     return rang;
    // }

    calculareRang = (matrice) => {

        let n = this.rows;
        let m = this.cols;

        var rank = 0;
        var row_selected = new Array(50).fill(false);

        for(let i=0;i < m; i++){
            let j;
            for(j=0;j<n;j++){
                var x = matrice[j][i];
                if(x<0)
                    x *= -1;
                if(!row_selected[j] && (x > 0.000001))
                    break;
            }

            if(j!==n){
                rank++;
                row_selected[j] = true;
                for(let p=i+1; p < m; p++){
                    matrice[j][p] /= matrice[j][i];
                }
                for(let k=0; k < n; k++){
                    var x = matrice[k][i];
                    if(x < 0)
                        x*=-1;
                    if(k!==j && x > 0.000001){
                        for(let p=i+1; p<m; p++){
                            matrice[k][p] -= matrice[j][p] * matrice[k][i];
                        }
                    }
                }
            }
        }
        return rank;
    }

    swapMatrice(matriceAux){
        matriceAux.length = this.matrice.length;
        for(let i=0;i<this.matrice.length;i++){
            matriceAux[i] = [];
            for(let j=0;j<this.matrice[i].length;j++){
                matriceAux[i][j] = this.matrice[i][j];
            }
        }
    }

    calcRang = () => {
        let matrice2 = [];
        this.swapMatrice(matrice2);
        var x = this.calculareRang(matrice2);
        return x;
    }

}