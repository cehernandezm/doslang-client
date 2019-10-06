var Valor = /** @class */ (function () {
    function Valor(valor) {
        this.dato = valor;
    }
    Valor.prototype.ejecutar = function () {
        return this.tipoDato(this.dato);
    };
    Valor.prototype.tipoDato = function (dato) {
        if (dato.tipo == "int")
            return { tipo: "number", valor: +dato.valor };
        else if (dato.tipo == "double")
            return { tipo: "number", valor: +dato.valor };
        else if (dato.tipo == "number")
            return { tipo: "number", valor: +dato.valor };
        else if (dato.tipo == "temporal") {
            var valorTemp = buscarTemporal(dato.valor);
            if (valorTemp != null)
                return (this.tipoDato(valorTemp));
            else {
                listaSalida.push(new MensajeError("Semantico", "No existe el temporal :" + dato.valor, dato.linea, dato.columna));
                return new MensajeError("", "", 0, 0);
            }
        }
        else if (dato.tipo == "posHeap")
            return { tipo: "posHeap", valor: H };
        else
            dato.valor;
    };
    return Valor;
}());
