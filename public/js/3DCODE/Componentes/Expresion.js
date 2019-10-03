var Expresion = /** @class */ (function () {
    function Expresion(izq, der, operacion) {
        this.izq = izq;
        this.der = der;
        this.operacion = operacion;
    }
    Expresion.prototype.ejecutar = function () {
        switch (this.operacion) {
            case "suma":
                if (this.izq["tipo"] == "int" && this.der["tipo"] == "int") {
                    var numizq = +this.izq["valor"];
                    var numder = +this.der["valor"];
                    console.log(numizq + numder);
                }
                break;
        }
    };
    return Expresion;
}());
