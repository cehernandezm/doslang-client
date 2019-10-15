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
        let newAmbito : Ambito = new Ambito();
        newAmbito.Heap = newAmbito.Heap.concat(ambito.Heap);
        newAmbito.Stack = this.llenarStack(ambito.getAllStack());
        newAmbito.Temporales = newAmbito.Temporales.concat(ambito.Temporales);

        let funcion : Funcion = buscarFuncion(this.id);
        if(funcion === null) listaSalida.push(new MensajeError("Semantico", "La funcion: " + this.id + " no existe",this.l,this.c));
        else funcion.ejecutar(newAmbito);
        return -1;

    }

    llenarStack(stack:any){
        let newStack:any = [];
        for(let i = 0; i < stack.length; i++ ) newStack.push(stack[i]);
        return newStack;
    }

}