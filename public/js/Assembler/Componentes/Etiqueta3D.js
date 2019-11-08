var Etiqueta3D = /** @class */ (function () {
    /**
     * CONSTRUCTOR DE LA CLASE
     * @param etiqueta
     * @param l
     * @param c
     */
    function Etiqueta3D(etiqueta, l, c) {
        this.etiqueta = etiqueta.toLowerCase();
        this.l = l;
        this.c = c;
    }
    /**
     * METODO DE LA CLASE PADRE
     * @param ambito
     */
    Etiqueta3D.prototype.ejecutar = function (ambito) {
        var nodo = new Nodo3D("\n" + this.etiqueta + ":", null);
        nodo.$resultado = "";
        return nodo;
    };
    /**
     * SE EJECUTARA EN LA PRIMERA PASADA
     * @param ambito
     */
    Etiqueta3D.prototype.ejecutarFirst = function (ambito) {
        var existe = ambito.buscarEtiqueta(this.etiqueta);
        if (existe != null) {
            addMensajeError("Semantico", "La etiqueta: " + this.etiqueta + " ya existe", this.l, this.c);
            return new Error3D();
        }
        ambito.agregarEtiqueta(this.etiqueta);
        return -1;
    };
    return Etiqueta3D;
}());
