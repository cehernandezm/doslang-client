var Ambito = /** @class */ (function () {
    function Ambito() {
    }
    Ambito.prototype.Ambito = function (salida, ambitoOld, nombre) {
        this.listaTemporales = new Array();
        this.salida = salida;
        this.ambitoOld = ambitoOld;
        this.nombre = nombre;
    };
    Ambito.prototype.agregarTemporales = function (nombre, valor) {
        if (this.buscarTemporal(nombre) != -777.77)
            this.listaTemporales.push({ nombre: nombre, valor: valor });
        else
            this.changeValor(nombre, valor);
    };
    Ambito.prototype.buscarTemporal = function (nombre) {
        this.listaTemporales.forEach(function (element) {
            if (element["nombre"] === nombre)
                return element["valor"];
        });
        return -777.77;
    };
    Ambito.prototype.changeValor = function (nombre, valor) {
        this.listaTemporales.forEach(function (element) {
            if (element["nombre"] === nombre) {
                element["valor"] = valor;
                return;
            }
        });
    };
    return Ambito;
}());
