var Incondicional3D = /** @class */ (function () {
    /**
     * CONSTRUCTOR DE LA CLASE
     * @param etiqueta
     * @param l
     * @param c
     */
    function Incondicional3D(etiqueta, l, c) {
        this.etiqueta = etiqueta.toLowerCase();
        this.l = l;
        this.c = c;
    }
    Incondicional3D.prototype.ejecutar = function (ambito) {
        var existe = ambito.buscarEtiqueta(this.etiqueta);
        if (existe === null) {
            addMensajeError("Semantico", "La etiqueta: " + this.etiqueta + " no existe", this.l, this.c);
            return new Error3D();
        }
        var codigo = Generador.saltoIncondicional(this.etiqueta);
        var nodo = new Nodo3D(codigo, null);
        return nodo;
    };
    return Incondicional3D;
}());
