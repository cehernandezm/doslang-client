var Ambito = /** @class */ (function () {
    /**
     * CONSTRUCTOR DE LA CLASEs
     * @param Temporales
     * @param Stack
     * @param Heap
     */
    function Ambito() {
        this.Temporales = [];
        this.Stack = [];
        this.Heap = [{ tipo: "number", valor: -11 }];
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
    Ambito.prototype.getTemporal = function (nombre) {
        var retorno = null;
        for (var i = 0; i < this.Temporales.length; i++) {
            var temporal = this.Temporales[i];
            if (temporal.id === nombre)
                retorno = temporal;
        }
        return retorno;
    };
    /**
    * METODO QUE AGREGA UN NUEVO TEMPORAL
    * @param dato
    */
    Ambito.prototype.agregarTemporal = function (dato) {
        if (this.getTemporal(dato.id) != null)
            this.eliminarTemporal(dato.id);
        this.Temporales.push(dato);
        return -1;
    };
    /**
     * METODO QUE ELIMINA EL TEMPORAL ANTERIOR
     * @param nombre
     */
    Ambito.prototype.eliminarTemporal = function (nombre) {
        for (var i = 0; i < this.Temporales.length; i++) {
            var dato = this.Temporales[i];
            if (dato.id === nombre) {
                this.Temporales.splice(i, 1);
                break;
            }
        }
    };
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
    Ambito.prototype.getHeap = function (pos) {
        var retorno = null;
        for (var i = 0; i < this.Heap.length; i++) {
            var Heap = this.Heap[i];
            if ((i + 1) === pos)
                retorno = Heap;
        }
        return retorno;
    };
    /**
     * METODO QUE SE ENCARGA DE INCREMENTAR EN UNO EL HEAP SIEMPRE
     */
    Ambito.prototype.incrementarEspacioHeap = function () {
        var tamOriginal = this.Heap.length;
        var nuevo = H - (this.Heap.length - 1);
        for (var i = 0; i < nuevo; i++)
            this.Heap.push({ tipo: "number", valor: -11 });
    };
    /*
    -------------------------------------------------------------------------------------------------------------------------------------------------------
    --------------------------------------------------------------- STACK ---------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------------------------------------------------------------------
    */
    /**
     * METODO QUE INICIALIZARA EL STACK CON 10,000 POSICIONES
     */
    Ambito.prototype.inicializarStack = function () {
        for (var i = 0; i < 10000; i++) {
            this.Stack.push({ tipo: "null", valor: -1 });
        }
    };
    /**
     * METODOQ QUE BUSCA UN VALOR EN EL STACK
     * @param pos
     * @return stack | null
     */
    Ambito.prototype.getValueStack = function (pos) {
        var retorno = null;
        for (var i = 0; i < this.Stack.length; i++) {
            var stack = this.Stack[i];
            if ((i + 1) === pos)
                retorno = stack;
        }
        return retorno;
    };
    /**
     * METODO QUE SIRVE PARA AGREGAR UN VALOR AL STACK
     * @param pos
     * @param dato
     */
    Ambito.prototype.setValueStack = function (pos, dato) {
        for (var i = 0; i < this.Stack.length; i++) {
            this.Stack[i] = dato;
        }
    };
    /**
     * METODO QUE DEVUELVE TODO EL STACK
     */
    Ambito.prototype.getAllStack = function () {
        return this.Stack;
    };
    return Ambito;
}());
