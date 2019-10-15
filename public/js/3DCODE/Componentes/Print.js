/**
 *  OPERACION:
 * 0  ----------------   IMPRIMIR SU VALOR EN ENTERO
 * 1 ------------------ CONVERTIR DE ASCII A CARACTER
 */
var Print = /** @class */ (function () {
    function Print(operacion, valor, l, c, posicion) {
        this.operacion = operacion;
        this.valor = valor;
        this.l = l;
        this.c = c;
        this.posicion = posicion;
    }
    Print.prototype.ejecutar = function (ambito) {
        var resultado = (this.valor == null) ? null : this.valor.ejecutar(ambito);
        if (!(resultado instanceof MensajeError)) {
            if (this.operacion === 0)
                listaSalida.push(Math.floor(resultado.valor));
            else if (this.operacion === 1)
                listaSalida.push(String.fromCharCode(resultado.valor));
            else
                listaSalida.push(resultado.valor);
        }
        return -1;
    };
    return Print;
}());
