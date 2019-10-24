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
        var nuevoAmbito = new Ambito();
        nuevoAmbito.Stack = ambito.getAllStack();
        nuevoAmbito.Heap = ambito.getAllHeap();
        nuevoAmbito.Temporales = this.llenarTemporales(ambito.getAllTemporales());
        var funcion = buscarFuncion(this.id);
        if (funcion === null)
            listaSalida.push(new MensajeError("Semantico", "La funcion: " + this.id + " no existe", this.l, this.c));
        else
            funcion.ejecutar(nuevoAmbito);
        return -1;
    };
    /**
     * FUNCION ENCARGADA DE LLENAR LA NUEVA LISTA CON LOS TEMPORALES ANTERIORES
     * @param temporales
     */
    CallFuncion.prototype.llenarTemporales = function (temporales) {
        var newTemporales = [];
        for (var i = 0; i < temporales.length; i++)
            newTemporales.push(temporales[i]);
        return newTemporales;
    };
    return CallFuncion;
}());
