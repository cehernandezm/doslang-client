var CallFuncion = /** @class */ (function () {
    /**
     * CONSTRUCTOR DE LA CLASE
     * @param id
     * @param l
     * @param c
     * @param posicion
     */
    function CallFuncion(id, l, c, posicion) {
        this.id = id;
        this.l = l;
        this.c = c;
        this.posicion = posicion;
    }
    CallFuncion.prototype.ejecutar = function (ambito) {
        var newAmbito = new Ambito();
        newAmbito.Heap = newAmbito.Heap.concat(ambito.Heap);
        newAmbito.Stack = this.llenarStack(ambito.getAllStack());
        newAmbito.Temporales = newAmbito.Temporales.concat(ambito.Temporales);
        var funcion = buscarFuncion(this.id);
        if (funcion === null)
            listaSalida.push(new MensajeError("Semantico", "La funcion: " + this.id + " no existe", this.l, this.c));
        else
            funcion.ejecutar(newAmbito);
        return -1;
    };
    CallFuncion.prototype.llenarStack = function (stack) {
        var newStack = [];
        for (var i = 0; i < stack.length; i++)
            newStack.push(stack[i]);
        return newStack;
    };
    return CallFuncion;
}());
