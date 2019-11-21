var Regla12 = /** @class */ (function () {
    /**
     * ESTA REGLA EDITA MULTIPLICACIONES CON OPERADORES UNO Y QUE SE ESTEN ASIGNANDO A DIFERENTE TEMPORAL
     * *,1,T1,T2 => =,t1,,t2
     * *,T1,1,T2 => =,t1,,t2
     *
     */
    /**
     * CONSTRUCTOR DE LA CLASE
     * @param instrucciones
     */
    function Regla12(instrucciones) {
        this.instrucciones = instrucciones;
    }
    /**
     * METODO ENCARGADO DE APLICAR LA 12va REGLA DE OPTIMIZACION
     */
    Regla12.prototype.optimizar = function () {
        for (var i = 0; i < this.instrucciones.length; i++) {
            var element = this.instrucciones[i];
            if (isCuadruplo(element)) {
                var cuadruplo = element.split(',');
                var operador = cuadruplo[0].trim();
                var izq = cuadruplo[1].trim();
                var der = cuadruplo[2].trim();
                var temp = limpiarTemporal(cuadruplo[3]);
                if (!(operador.toLowerCase() === "begin") && !(operador.toLowerCase() === "call") && !(operador.toLowerCase() === "end") && !(izq.toLowerCase() === "stack") && !(temp.toLowerCase() === "stack") && !(izq.toLowerCase() === "heap") && !(temp.toLowerCase() === "heap")) {
                    if (operador === "*") {
                        if (der.toLowerCase() === "1") {
                            addNewRegla(i, "Regla 12", element);
                            this.instrucciones[i] = "=," + izq.toLowerCase() + "," + "," + temp.toLowerCase();
                        }
                        else if (izq.toLowerCase() === "1") {
                            addNewRegla(i, "Regla 12", element);
                            this.instrucciones[i] = "=," + der.toLowerCase() + "," + "," + temp.toLowerCase();
                        }
                    }
                }
            }
        }
        return this.instrucciones;
    };
    return Regla12;
}());
