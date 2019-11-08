declare function addMensajeError(tipo, mensaje, linea, columna);
class Incondicional3D {
    etiqueta:String;
    l:number;
    c:number;

    /**
     * CONSTRUCTOR DE LA CLASE
     * @param etiqueta 
     * @param l 
     * @param c 
     */
    constructor(etiqueta:String,l:number,c:number){
        this.etiqueta = etiqueta.toLowerCase();
        this.l = l;
        this.c = c;
    }


    ejecutar(ambito:Ambito3D){
        let existe = ambito.buscarEtiqueta(this.etiqueta);
        
        if(existe === null){
            addMensajeError("Semantico","La etiqueta: " + this.etiqueta + " no existe",this.l,this.c);
            return new Error3D();
        }
        let codigo:String = Generador.saltoIncondicional(this.etiqueta);
        let nodo = new Nodo3D(codigo,null);
        return nodo;

    }
}