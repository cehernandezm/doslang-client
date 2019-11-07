var Nodo3D = /** @class */ (function () {
    function Nodo3D(codigo, tipo) {
        this.codigo = codigo;
        this.tipo = tipo;
    }
    Nodo3D.prototype.setResultado = function (resultado) {
        this.resultado = resultado;
    };
    Nodo3D.prototype.getResultado = function () {
        return this.resultado;
    };
    return Nodo3D;
}());
