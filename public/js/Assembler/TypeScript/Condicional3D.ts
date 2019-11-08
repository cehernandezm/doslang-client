declare function addMensajeError(tipo, mensaje, linea, columna);
class Condicional3D{
    operador:String;
    izq : Valor3D;
    der : Valor3D;
    etiqueta:String;
    l:number;
    c:number;

    /**
     * CONSTRUCTOR DE LA CLASE
     * @param operador 
     * @param etiqueta 
     * @param l 
     * @param c 
     */
    constructor(operador:String,izq:Valor3D,der:Valor3D,etiqueta:String,l:number,c:number){
        this.operador = operador;
        this.izq = izq;
        this.der = der;
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

        let nodoIzq = this.izq.ejecutar(ambito);
        let nodoDer = this.der.ejecutar(ambito);
        if(nodoIzq instanceof Error3D || nodoDer instanceof Error3D) return new Error3D();

        let codigo:String = nodoIzq.getcodigo();
        codigo += "\n" + nodoDer.getcodigo();
        codigo += Generador.comparador(nodoIzq.getResultado(),nodoDer.getResultado(),"Comparamos : " + nodoIzq.getResultado() + " con: " + nodoDer.getResultado());
        codigo += Generador.tipoComparacion(this.operador,this.etiqueta,"Saltamos hacia la etiqueta: " + this.etiqueta + " si se cumple");

        
        let nodo = new Nodo3D(codigo,null);
        return nodo;
    }

}