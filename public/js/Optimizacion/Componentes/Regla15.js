var Regla15 = /** @class */ (function () {
    /**
     * ESTA REGLA EDITA MULTIPLICACIONES CON CERO Y DEVUELVE UNA ASIGNACION A 0
     * *,T1,0,T2 => =,0,,t2
     * *,0,t1,T2 => =,0,,t2
     */
    /**
     * CONSTRUCTOR DE LA CLASE
     * @param instrucciones
     */
    function Regla15(instrucciones) {
        this.instrucciones = instrucciones;
    }
    /**
     * METODO ENCARGADO DE APLICAR LA 15va REGLA DE OPTIMIZACION
     */
    Regla15.prototype.optimizar = function () {
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
                        if (der.toLowerCase() === "0") {
                            addNewRegla(i, "Regla 15", element);
                            this.instrucciones[i] = "=,0,," + temp.toLowerCase();
                        }
                        else if (izq.toLowerCase() === "0") {
                            addNewRegla(i, "Regla 15", element);
                            this.instrucciones[i] = "=,0,," + temp.toLowerCase();
                        }
                    }
                }
            }
        }
        return this.instrucciones;
    };
    return Regla15;
}());
