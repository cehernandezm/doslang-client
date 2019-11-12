var CallFuncion3D = /** @class */ (function () {
    /**
     * CONSTRUCTOR DE LA CLASE
     * @param nombre
     * @param l
     * @param c
     */
    function CallFuncion3D(nombre, l, c) {
        this.nombre = nombre;
        this.l = l;
        this.c = c;
    }
    /**
     * METODO DE LA CLASE PADRE
     * @param ambito
     */
    CallFuncion3D.prototype.ejecutar = function (ambito) {
        var existe = ambito.buscarFuncion(this.nombre.toLowerCase());
        if (existe === null) {
            addMensajeError("Semantico", "La funcion: " + this.nombre + " no existe", this.l, this.c);
            return new Error3D();
        }
        var codigo = "CALL " + this.nombre;
        return new Nodo3D(codigo, null);
    };
    return CallFuncion3D;
}());
