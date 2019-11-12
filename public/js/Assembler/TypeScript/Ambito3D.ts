class Ambito3D{
    listaTemporales:any;
    listaEtiquetas:Array<String>;
    listaFunciones:Array<String>;

    constructor(){
        this.listaTemporales = [];
        this.listaEtiquetas = [];
        this.listaFunciones = [];
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

    /**
     * AGREGAMOS UN TEMPORAL AL AMBITO
     * @param nombre 
     * @param tipo 
     */
    agregarTemporal(nombre:String,tipo:Tipo){
        if(this.buscarTemporal(nombre) === null){
            this.listaTemporales.push({nombre:nombre,tipo:tipo});
        }
    }
    

    /**
     * Agregamos una etiqueta
     * @param etiqueta 
     */
    agregarEtiqueta(etiqueta:String){
        this.listaEtiquetas.push(etiqueta);
    }

    /**
     * BUSCAMOS UNA ETIQUETA
     * @param etiqueta 
     */
    buscarEtiqueta(etiqueta:String){
        let retorno = null;
        for(let i = 0; i < this.listaEtiquetas.length; i++){
            if(this.listaEtiquetas[i] === etiqueta) retorno = etiqueta;
        }
        return retorno;
    }

    /**
     * METODO QUE BUSCA FUNCIONES
     * @param nombre 
     */
    buscarFuncion(nombre:String){
        for(let i = 0; i < this.listaFunciones.length; i++){
            if(this.listaFunciones[i] === nombre) return this.listaFunciones[i];
        }
        return null;
    }

    /**
     * AGREGO UNA FUNCION
     * @param nombre 
     */
    agregarFuncion(nombre:String){
        this.listaFunciones.push(nombre);
    }
    
    /**
     * OBTENGO LOS TEMPORALES
     */
    getTemporales(){
        return this.listaTemporales;
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