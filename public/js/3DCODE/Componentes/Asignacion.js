var Asignacion = /** @class */ (function () {
    function Asignacion(izq, der, operacion, temporal) {
        this.izq = izq;
        this.der = der;
        this.operacion = operacion;
        this.temporal = temporal;
    }
    Asignacion.prototype.ejecutar = function () {
        switch (this.operacion) {
            case "suma":
                if (this.izq["tipo"] == "int" && this.der["tipo"] == "int") {
                    var numizq = +this.izq["valor"];
                    var numder = +this.der["valor"];
                    listaTemporales.push({ id: this.temporal, valor: numizq + numder });
                }
                else if (this.izq["tipo"] == "temporal" && this.der["tipo"] == "int") {
                    var resultado = buscarTemporal(this.izq["valor"]);
                    console.log(resultado);
                    var numizq = 0;
                    if (resultado != null)
                        numizq = +resultado;
                    var numder = +this.der["valor"];
                    listaTemporales.push({ id: this.temporal, valor: numizq + numder });
                }
                break;
        }
    };
    return Asignacion;
}());
