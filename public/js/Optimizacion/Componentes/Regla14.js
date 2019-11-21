var Regla14 = /** @class */ (function () {
    /**
     * ESTA REGLA EDITA MULTIPLICACIONES Y LAS VUELVE UNA SUMA DE BAJO COSTO
     * *,T1,2,T2 => +,t1,t1,t2
     * *,2,t1,T2 => +,t1,t1,t2
     */
    /**
     * CONSTRUCTOR DE LA CLASE
     * @param instrucciones
     */
    function Regla14(instrucciones) {
        this.instrucciones = instrucciones;
    }
    /**
     * METODO ENCARGADO DE APLICAR LA 14va REGLA DE OPTIMIZACION
     */
    Regla14.prototype.optimizar = function () {
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
                        if (der.toLowerCase() === "2" && izq.toLowerCase() !== "") {
                            addNewRegla(i, "Regla 14", element);
                            this.instrucciones[i] = "+," + izq.toLowerCase() + "," + izq.toLowerCase() + "," + temp.toLowerCase();
                        }
                        else if (izq.toLowerCase() === "2" && der.toLowerCase() !== "") {
                            addNewRegla(i, "Regla 14", element);
                            this.instrucciones[i] = "+," + der.toLowerCase() + "," + der.toLowerCase() + "," + temp.toLowerCase();
                        }
                    }
                }
            }
        }
        return this.instrucciones;
    };
    return Regla14;
}());
