class Ambito{
    public Temporales : any;
    public Stack : any;
    public Heap : any;

    /**
     * CONSTRUCTOR DE LA CLASEs
     * @param Temporales 
     * @param Stack 
     * @param Heap 
     */
    constructor(){
        this.Temporales = [];
        this.Stack = [];
        this.Heap = [{tipo: "number", valor:-11}];
        this.inicializarStack();
    }

   /*
    -------------------------------------------------------------------------------------------------------------------------------------------------------
    --------------------------------------------------------------- TEMPORALES ---------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------------------------------------------------------------------
    */

    /**
     * METODO QUE BUSCA EN LA LISTA DE TEMPORALES 
     * @param nombre 
     * @return Temporal | null
     */
    getTemporal(nombre:String){
        let retorno : any = null;   
        for(let i:number = this.Temporales.length - 1; i >= 0; i--){
            let temporal = this.Temporales[i];
            if(temporal.id === nombre) retorno = temporal;
        }
        return retorno;
    }


    /**
     * METODO QUE DEVUELVE TODOS LOS TEMPORALES DEL AMBITO
     */
    getAllTemporales(){
        return this.Temporales;
    }

     /**
     * METODO QUE AGREGA UN NUEVO TEMPORAL
     * @param dato 
     */
    agregarTemporal(dato:any){
        if(this.getTemporal(dato.id) != null) this.eliminarTemporal(dato.id);
        this.Temporales.push(dato);
        return -1;
    }

    /**
     * METODO QUE ELIMINA EL TEMPORAL ANTERIOR
     * @param nombre 
     */
    eliminarTemporal(nombre:String){
        for(let i = this.Temporales.length - 1; i >= 0; i--){
            let dato = this.Temporales[i];
            if(dato.id === nombre){
                this.Temporales.splice(i,1);
                break;
            }
        }
    }

     /*
    -------------------------------------------------------------------------------------------------------------------------------------------------------
    --------------------------------------------------------------- HEAP ---------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------------------------------------------------------------------
    */

    /**
     * METODO QUE DEVUELVE UN VALOR DEL HEAP
     * @param pos 
     * @return Heap  | null;
     */
    getHeap(pos:number){
        let retorno : any = null;
        for(let i = 0; i < this.Heap.length; i++){
            let Heap = this.Heap[i];
            if(i === pos) retorno = Heap;
        }
        return retorno;
    }

    /**
     * METODO QUE SE ENCARGA DE INCREMENTAR EN UNO EL HEAP SIEMPRE
     */
    incrementarEspacioHeap(){
        let tamOriginal = this.Heap.length;
        let nuevo = H - (this.Heap.length - 1);
    
        for(let i = 0; i < nuevo ; i++) this.Heap.push({tipo:"number",valor : -11});
    }

     /**
     * METODO QUE SIRVE PARA AGREGAR UN VALOR AL STACK
     * @param pos 
     * @param dato 
     */
    setValueHeap(pos:number,dato:any){
        for(let i = 0; i < this.Heap.length; i++){
           if(pos === i) this.Heap[i] = dato;
        }
    }

    getAllHeap(){
        return this.Heap;
    }


   


    /*
    -------------------------------------------------------------------------------------------------------------------------------------------------------
    --------------------------------------------------------------- STACK ---------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------------------------------------------------------------------
    */


    /**
     * METODO QUE INICIALIZARA EL STACK CON 10,000 POSICIONES
     */
    inicializarStack(){
        for(let i = 0; i < 10000 ; i++){
            this.Stack.push({tipo : "null", valor : -1});
        }
    }

    /**
     * METODOQ QUE BUSCA UN VALOR EN EL STACK
     * @param pos 
     * @return stack | null
     */
    getValueStack(pos:number){
        let retorno:any = null;
        for(let i = 0; i < this.Stack.length; i++){
            let stack = this.Stack[i];
            if((i) === pos) retorno = stack;
        }
        return retorno;
    }

    /**
     * METODO QUE SIRVE PARA AGREGAR UN VALOR AL STACK
     * @param pos 
     * @param dato 
     */
    setValueStack(pos:number,dato:any){
        for(let i = 0; i < this.Stack.length; i++){
            if(pos === i) this.Stack[i] = dato;
        }
    }


    getAllStack(){
        return this.Stack;
    }
    
}