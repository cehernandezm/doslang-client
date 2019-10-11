var Valor = /** @class */ (function () {
    function Valor(valor) {
        this.dato = valor;
    }
    Valor.prototype.ejecutar = function () {
        return this.tipoDato(this.dato);
    };
    Valor.prototype.tipoDato = function (dato) {
        if (dato.tipo === "int")
            return { tipo: "number", valor: +dato.valor };
        else if (dato.tipo === "double")
            return { tipo: "number", valor: +dato.valor };
        else if (dato.tipo === "number")
            return { tipo: "number", valor: +dato.valor };
        else if (dato.tipo === "temporal") {
            var valorTemp = buscarTemporal(dato.valor);
            if (valorTemp != null)
                return (this.tipoDato(valorTemp));
            else {
                listaSalida.push(new MensajeError("Semantico", "No existe el temporal :" + dato.valor, dato.linea, dato.columna));
                return new MensajeError("", "", 0, 0);
            }
        }
        else if (dato.tipo === "h")
            return { tipo: "number", valor: H };
        else if (dato.tipo === "p")
            return { tipo: "number", valor: P };
        else if (dato.tipo === "heap")
            return { tipo: "heap", valor: 0 };
        else if (dato.tipo === "stack")
            return { tipo: "stack", valor: 0 };
        else
            return dato.valor;
    };
    return Valor;
}());
