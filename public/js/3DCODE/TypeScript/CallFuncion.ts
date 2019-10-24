declare function buscarFuncion(nombre:String):any;

class CallFuncion{
    id : String;
    l : number;
    c : number;
    posicion : number;

    /**
     * CONSTRUCTOR DE LA CLASE
     * @param id 
     * @param l 
     * @param c 
     * @param posicion 
     */
    constructor(id:String,l:number, c: number, posicion : number){
        this.id = id;
        this.l = l;
        this.c = c;
        this.posicion = posicion;
    }


    ejecutar(ambito:Ambito){
        
        let nuevoAmbito : Ambito = new Ambito();
        nuevoAmbito.Stack = ambito.getAllStack();
        nuevoAmbito.Heap = ambito.getAllHeap();
        nuevoAmbito.Temporales = this.llenarTemporales(ambito.getAllTemporales());

        let funcion : Funcion = buscarFuncion(this.id);
        if(funcion === null) listaSalida.push(new MensajeError("Semantico", "La funcion: " + this.id + " no existe",this.l,this.c));
        else funcion.ejecutar(nuevoAmbito);
        return -1;

    }


    /**
     * FUNCION ENCARGADA DE LLENAR LA NUEVA LISTA CON LOS TEMPORALES ANTERIORES
     * @param temporales 
     */
    llenarTemporales(temporales:any){
        let newTemporales = [];
        for(let i = 0; i < temporales.length; i++) newTemporales.push(temporales[i]);
        return newTemporales;
    }

 


}