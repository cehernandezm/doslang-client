var Regla1 = /** @class */ (function () {
    /**
     * ESTA REGLA EVALUA SI EXISTE UNA ASIGNACION IGUAL ES DECIR:
     * A = B, Y LUEGO MAS ADELANTE EN EL CODIGO EXISTE UN
     * B = A, SIEMPRE Y CUANDO NO HAYA UNA ETIQUETA ENTRE ESTAS DOS ASIGNACIONES
     * SE PROCEDE  ELIMINAR B = A
     *
     */
    /**
     * CONSTRUCTOR DE LA CLASE
     * @param instrucciones
     */
    function Regla1(instrucciones) {
        this.instrucciones = instrucciones;
    }
    /**
     * METODO ENCARGADO DE APLICAR LA PRIMERA REGLA DE OPTIMIZACION
     */
    Regla1.prototype.optimizar = function () {
        for (var i = 0; i < this.instrucciones.length; i++) {
            var element = this.instrucciones[i];
            if (isCuadruplo(element)) {
                var cuadruplo = element.split(',');
                var operador = cuadruplo[0].trim();
                var izq = cuadruplo[1].trim();
                var der = cuadruplo[2].trim();
                var temp = limpiarTemporal(cuadruplo[3]);
                if (!(operador.toLowerCase() === "begin") && !(operador.toLowerCase() === "call") && !(operador.toLowerCase() === "end") && !(izq.toLowerCase() === "stack") && !(temp.toLowerCase() === "stack") && !(izq.toLowerCase() === "heap") && !(temp.toLowerCase() === "heap")) {
                    if (operador === "=")
                        this.aplicar(izq, temp, i + 1);
                }
            }
        }
        return this.instrucciones;
    };
    Regla1.prototype.aplicar = function (izquierdo, temporal, index) {
        for (var i = index; i < this.instrucciones.length; i++) {
            var element = this.instrucciones[i];
            if (isCuadruplo(element)) {
                var cuadruplo = element.split(',');
                var operador = cuadruplo[0];
                var izq = cuadruplo[1];
                var der = cuadruplo[2];
                var temp = limpiarTemporal(cuadruplo[3]);
                if (!(operador.toLowerCase() === "begin") && !(operador.toLowerCase() === "call") && !(operador.toLowerCase() === "end") && !(izq.toLowerCase() === "stack") && !(temp.toLowerCase() === "stack") && !(izq.toLowerCase() === "heap") && !(temp.toLowerCase() === "heap")) {
                    if (operador === "=") {
                        if (izq === temporal && temp === izquierdo) {
                            addNewRegla(i + 1, "Regla 1", element);
                            this.instrucciones.splice(i, 1); // a=b y b=a, eliminamos b=a
                            i--;
                        }
                    }
                }
            }
            else {
                if (isComentario(element)) { }
                else if (isEtiqueta(element))
                    return; //--------------------------------------- SI ES UNA ETIQUETA SE ROMPE LA PRIMERA REGLA
            }
        }
    };
    return Regla1;
}());
