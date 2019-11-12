declare function addMensajeError(tipo, mensaje, linea, columna);
class CallFuncion3D{
    nombre:String;
    l:number;
    c:number;


    /**
     * CONSTRUCTOR DE LA CLASE
     * @param nombre 
     * @param l 
     * @param c 
     */
    constructor(nombre:String,l:number,c:number){
        this.nombre = nombre;
        this.l = l;
        this.c = c;
    }

    /**
     * METODO DE LA CLASE PADRE
     * @param ambito 
     */
    ejecutar(ambito:Ambito3D){
        let existe = ambito.buscarFuncion(this.nombre.toLowerCase());
        if(existe === null){
            addMensajeError("Semantico","La funcion: " + this.nombre + " no existe",this.l,this.c);
            return new Error3D();
        }

        let codigo:String = "CALL " + this.nombre;
        return new Nodo3D(codigo,null);
    }
}