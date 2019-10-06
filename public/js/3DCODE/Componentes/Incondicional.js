var Incondicional = /** @class */ (function () {
    function Incondicional(pos, l, c, etiqueta) {
        this.pos = pos;
        this.l = l;
        this.c = c;
        this.etiqueta = etiqueta;
    }
    Incondicional.prototype.ejecutar = function () {
        var etiqueta = buscarEtiqueta(this.etiqueta);
        if (etiqueta != null)
            return etiqueta.posicion;
        listaSalida.push(new MensajeError("Semantico", "La etiqueta: " + this.etiqueta + " no existe", this.l, this.c));
        return -1;
    };
    return Incondicional;
}());
