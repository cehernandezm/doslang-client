var Regla4 = /** @class */ (function () {
    /**
     * ESTA REGLA SIMPLIFICA LOS SALTOS CONDICIONALES. SI SE PUEDE SABER QUE LA CONDICION ES VERDADERA SEA REALIZA UN SALTO INCONDICIONAL
     * JGE,2,2,L1
     * JMP L2
     * => JMP L1
     *
     */
    /**
     * CONSTRUCTOR DE LA CLASE
     * @param instrucciones
     */
    function Regla4(instrucciones) {
        this.instrucciones = instrucciones;
    }
    /**
     * METODO ENCARGADO DE APLICAR LA CUARTA REGLA DE OPTIMIZACION
     */
    Regla4.prototype.optimizar = function () {
        for (var i = 0; i < this.instrucciones.length; i++) {
            var element = this.instrucciones[i];
            if (isCuadruplo(element)) {
                var cuadruplo = element.split(',');
                var operador = cuadruplo[0].trim();
                var izq = cuadruplo[1].trim();
                var der = cuadruplo[2].trim();
                var etiqueta = limpiarTemporal(cuadruplo[3]);
                if (operadoresLogicos(operador.toLowerCase()) !== undefined) {
                    if (!(isTemporal(izq.toLowerCase())) && !(isTemporal(der.toLowerCase()))) {
                        if (izq.toLowerCase() === der.toLowerCase()) {
                            if (this.ejecutar(i, etiqueta))
                                addNewRegla(i, "Regla 4", element);
                        }
                    }
                }
            }
        }
        return this.instrucciones;
    };
    Regla4.prototype.ejecutar = function (index, etiqueta) {
        if (index + 1 < this.instrucciones.length) {
            var element = this.instrucciones[index + 1];
            if (isCuadruplo(element)) {
                var cuadruplo = element.split(',');
                var operador = cuadruplo[0].trim();
                var izq = cuadruplo[1].trim();
                var der = cuadruplo[2].trim();
                var et = limpiarTemporal(cuadruplo[3]);
                if (operador.toLowerCase() === "jmp") {
                    this.instrucciones[index] = "jmp,,," + etiqueta;
                    this.instrucciones.splice(index + 1, 1);
                    return true;
                }
            }
        }
        return false;
    };
    return Regla4;
}());
