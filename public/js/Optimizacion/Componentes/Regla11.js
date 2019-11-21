var Regla11 = /** @class */ (function () {
    /**
     * ESTA REGLA EDITA RESTAS CON OPERADORES CERO Y QUE SE ESTEN ASIGNANDO A DIFERENTE TEMPORAL
     * -,T1,0,T2 => =,t1,,t2
     *
     */
    /**
     * CONSTRUCTOR DE LA CLASE
     * @param instrucciones
     */
    function Regla11(instrucciones) {
        this.instrucciones = instrucciones;
    }
    /**
     * METODO ENCARGADO DE APLICAR LA 11va REGLA DE OPTIMIZACION
     */
    Regla11.prototype.optimizar = function () {
        for (var i = 0; i < this.instrucciones.length; i++) {
            var element = this.instrucciones[i];
            if (isCuadruplo(element)) {
                var cuadruplo = element.split(',');
                var operador = cuadruplo[0].trim();
                var izq = cuadruplo[1].trim();
                var der = cuadruplo[2].trim();
                var temp = limpiarTemporal(cuadruplo[3]);
                if (!(operador.toLowerCase() === "begin") && !(operador.toLowerCase() === "call") && !(operador.toLowerCase() === "end") && !(izq.toLowerCase() === "stack") && !(temp.toLowerCase() === "stack") && !(izq.toLowerCase() === "heap") && !(temp.toLowerCase() === "heap")) {
                    if (operador === "-") {
                        if (der.toLowerCase() === "0") {
                            addNewRegla(i, "Regla 11", element);
                            this.instrucciones[i] = "=," + izq.toLowerCase() + "," + "," + temp.toLowerCase();
                        }
                    }
                }
            }
        }
        return this.instrucciones;
    };
    return Regla11;
}());
