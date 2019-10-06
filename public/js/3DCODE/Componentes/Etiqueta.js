var Etiqueta = /** @class */ (function () {
    /**
     * CONSTRUCTOR DE LA CLASE
     * @param nombre
     * @param l
     * @param c
     * @param pos
     */
    function Etiqueta(nombre, l, c, pos) {
        this.nombre = nombre;
        this.l = l;
        this.c = c;
        this.pos = pos;
    }
    /**
     * METODO DE LA CLASE PADRE
     */
    Etiqueta.prototype.ejecutar = function () {
        var resultado = buscarEtiqueta(this.nombre);
        if (resultado == null)
            agregarEtiqueta({ nombre: this.nombre, posicion: this.pos });
        else
            listaSalida.push(new MensajeError("Semantico", "La etiqueta: " + this.nombre + " ya existe", this.l, this.c));
        return -1;
    };
    return Etiqueta;
}());
