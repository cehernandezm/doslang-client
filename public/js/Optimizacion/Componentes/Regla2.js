var Regla2 = /** @class */ (function () {
    /**
     * CONSTRUCTOR DE LA CLASE
     * @param instrucciones
     */
    function Regla2(instrucciones) {
        this.instrucciones = instrucciones;
    }
    /**
     * METODO ENCARGADO DE APLICAR LA SEGUNDA REGLA DE OPTIMIZACION
     */
    Regla2.prototype.optimizar = function () {
        for (var i = 0; i < this.instrucciones.length; i++) {
            var element = this.instrucciones[i];
            if (isCuadruplo(element)) {
                var cuadruplo = element.split(',');
                var operador = cuadruplo[0].trim();
                var salto = limpiarTemporal(cuadruplo[3]);
                if (operador.toLowerCase() === "jmp")
                    this.aplicar(salto, i + 1);
            }
        }
        return this.instrucciones;
    };
    Regla2.prototype.aplicar = function (etiqueta, index) {
        for (var i = index; i < this.instrucciones.length; i++) {
            var element = this.instrucciones[i];
            if (isComentario(element)) { }
            else if (isCuadruplo(element)) { }
            else if (isEtiqueta(element)) {
                var etiquetaTemp = limpiarTemporal(element);
                etiqueta = limpiarTemporal(etiqueta);
                if (etiquetaTemp.toLowerCase() === etiqueta.toLowerCase() + ":") {
                    var diferencia = i - index;
                    for (var j = 0; j < diferencia; j++) {
                        addNewRegla(index + j, "Regla 2", this.instrucciones[index]);
                        this.instrucciones.splice(index, 1);
                    }
                    return;
                }
                else
                    return; //------------------------- SI ES UNA ETIQUETA DIFERENTE NO ES CODIGO INALCANZABLE
            }
        }
    };
    return Regla2;
}());
