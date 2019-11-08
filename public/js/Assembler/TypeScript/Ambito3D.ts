class Ambito3D{
    listaTemporales:any;

    constructor(){
        this.listaTemporales = [];
    }


    /**
     * 
     * @param nombre 
     */
    buscarTemporal(nombre:String):any {
        let retorno = null;
        for(let i = 0; i < this.listaTemporales.length; i++){
            if(this.listaTemporales[i].nombre === nombre) {
                retorno = this.listaTemporales[i];
                break;
            }
        }
        return retorno;
    }

    agregarTemporal(nombre:String,tipo:Tipo){
        if(this.buscarTemporal(nombre) === null){
            this.listaTemporales.push({nombre:nombre,tipo:tipo});
        }
    }
    
}

/**
 * MODELO DE UN TEMPORAL
 * NOMBRE
 * TIPO
 */



enum Tipo{
    INT,
    DOUBLE       
}

enum Operacion{
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    MODULO,
    IGUAL,
    POTENCIA
}