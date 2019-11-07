var Ambito3D = /** @class */ (function () {
    function Ambito3D() {
        this.listaTemporales = [];
    }
    Ambito3D.prototype.buscarTemporal = function (nombre) {
        var retorno = null;
        for (var i = 0; i < this.listaTemporales.length; i++) {
            console.log(this.listaTemporales[i].nombre + "_" + nombre);
            if (this.listaTemporales[i].nombre === nombre) {
                retorno = this.listaTemporales[i];
                break;
            }
        }
        return retorno;
    };
    Ambito3D.prototype.agregarTemporal = function (nombre, tipo) {
        if (this.buscarTemporal(nombre) === null) {
            this.listaTemporales.push({ nombre: nombre, tipo: tipo });
        }
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
