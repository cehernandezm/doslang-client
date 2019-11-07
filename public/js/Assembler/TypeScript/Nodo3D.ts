class Nodo3D{
    codigo:String;
    tipo:Tipo;
    resultado:String;

    constructor(codigo:String,tipo:Tipo){
        this.codigo = codigo;
        this.tipo = tipo;
    }


    public setResultado(resultado:String){
        this.resultado = resultado;
    }

    public getResultado():String{
        return this.resultado;
    }
}