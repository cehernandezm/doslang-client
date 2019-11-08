var Condicional3D = /** @class */ (function () {
    /**
     * CONSTRUCTOR DE LA CLASE
     * @param operador
     * @param etiqueta
     * @param l
     * @param c
     */
    function Condicional3D(operador, izq, der, etiqueta, l, c) {
        this.operador = operador;
        this.izq = izq;
        this.der = der;
        this.etiqueta = etiqueta.toLowerCase();
        this.l = l;
        this.c = c;
    }
    Condicional3D.prototype.ejecutar = function (ambito) {
        var existe = ambito.buscarEtiqueta(this.etiqueta);
        if (existe === null) {
            addMensajeError("Semantico", "La etiqueta: " + this.etiqueta + " no existe", this.l, this.c);
            return new Error3D();
        }
        var nodoIzq = this.izq.ejecutar(ambito);
        var nodoDer = this.der.ejecutar(ambito);
        if (nodoIzq instanceof Error3D || nodoDer instanceof Error3D)
            return new Error3D();
        var codigo = nodoIzq.getcodigo();
        codigo += "\n" + nodoDer.getcodigo();
        codigo += Generador.comparador(nodoIzq.getResultado(), nodoDer.getResultado(), "Comparamos : " + nodoIzq.getResultado() + " con: " + nodoDer.getResultado());
        codigo += Generador.tipoComparacion(this.operador, this.etiqueta, "Saltamos hacia la etiqueta: " + this.etiqueta + " si se cumple");
        var nodo = new Nodo3D(codigo, null);
        return nodo;
    };
    return Condicional3D;
}());
