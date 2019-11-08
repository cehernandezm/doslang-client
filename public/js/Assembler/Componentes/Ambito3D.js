var Ambito3D = /** @class */ (function () {
    function Ambito3D() {
        this.listaTemporales = [];
        this.listaEtiquetas = [];
    }
    /**
     *
     * @param nombre
     */
    Ambito3D.prototype.buscarTemporal = function (nombre) {
        var retorno = null;
        for (var i = 0; i < this.listaTemporales.length; i++) {
            if (this.listaTemporales[i].nombre === nombre) {
                retorno = this.listaTemporales[i];
                break;
            }
        }
        return retorno;
    };
    /**
     * AGREGAMOS UN TEMPORAL AL AMBITO
     * @param nombre
     * @param tipo
     */
    Ambito3D.prototype.agregarTemporal = function (nombre, tipo) {
        if (this.buscarTemporal(nombre) === null) {
            this.listaTemporales.push({ nombre: nombre, tipo: tipo });
        }
    };
    /**
     * Agregamos una etiqueta
     * @param etiqueta
     */
    Ambito3D.prototype.agregarEtiqueta = function (etiqueta) {
        this.listaEtiquetas.push(etiqueta);
    };
    /**
     * BUSCAMOS UNA ETIQUETA
     * @param etiqueta
     */
    Ambito3D.prototype.buscarEtiqueta = function (etiqueta) {
        var retorno = null;
        for (var i = 0; i < this.listaEtiquetas.length; i++) {
            if (this.listaEtiquetas[i] === etiqueta)
                retorno = etiqueta;
        }
        return retorno;
    };
    return Ambito3D;
}());
/**
 * MODELO DE UN TEMPORAL
 * NOMBRE
 * TIPO
 */
var Tipo;
(function (Tipo) {
    Tipo[Tipo["INT"] = 0] = "INT";
    Tipo[Tipo["DOUBLE"] = 1] = "DOUBLE";
})(Tipo || (Tipo = {}));
var Operacion;
(function (Operacion) {
    Operacion[Operacion["SUMA"] = 0] = "SUMA";
    Operacion[Operacion["RESTA"] = 1] = "RESTA";
    Operacion[Operacion["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    Operacion[Operacion["DIVISION"] = 3] = "DIVISION";
    Operacion[Operacion["MODULO"] = 4] = "MODULO";
    Operacion[Operacion["IGUAL"] = 5] = "IGUAL";
    Operacion[Operacion["POTENCIA"] = 6] = "POTENCIA";
})(Operacion || (Operacion = {}));
