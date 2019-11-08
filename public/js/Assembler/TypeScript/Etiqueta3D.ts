declare function addMensajeError(tipo, mensaje, linea, columna);
class Etiqueta3D{
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


    /**
     * METODO DE LA CLASE PADRE
     * @param ambito 
     */
    ejecutar(ambito:Ambito3D){
        let nodo:Nodo3D = new Nodo3D("\n" + this.etiqueta + ":",null);
        nodo.$resultado = "";
        return nodo;
    }

    /**
     * SE EJECUTARA EN LA PRIMERA PASADA
     * @param ambito 
     */
    ejecutarFirst(ambito:Ambito3D){
        let existe = ambito.buscarEtiqueta(this.etiqueta);
        if(existe != null){
            addMensajeError("Semantico","La etiqueta: " + this.etiqueta + " ya existe",this.l,this.c);
            return new Error3D();
        }
        ambito.agregarEtiqueta(this.etiqueta);
        return -1;
    }


}