var Generador = /** @class */ (function () {
    function Generador() {
    }
    /**
     * GUARDA UN MOVIMIENTO
     * @param destino
     * @param origen
     * @param comentario
     */
    Generador.guardarMov = function (destino, origen, comentario) {
        return "\nMOV " + destino + "," + origen + "                              ;" + comentario;
    };
    /**
     * GUARDA UNA SUMA
     * @param destino
     * @param origen
     * @param comentario
     */
    Generador.guardarAdd = function (destino, origen, comentario) {
        return "\nADD " + destino + "," + origen + "                              ;" + comentario;
    };
    /**
     * GUARDA UNA RESTA
     * @param destino
     * @param origen
     * @param comentario
     */
    Generador.guardarSub = function (destino, origen, comentario) {
        return "\nSUB " + destino + "," + origen + "                              ;" + comentario;
    };
    /**
     * GUARDA UNA MULTIPLICACION
     * @param destino
     * @param origen
     * @param comentario
     */
    Generador.guardarMul = function (destino, comentario) {
        return "\nMUL " + destino + "                              ;" + comentario;
    };
    /**
     * REALIZA UNA DIVISION
     * @param destino
     * @param comentario
     */
    Generador.guardarDiv = function (destino, comentario) {
        return "\nDIV " + destino + "                              ;" + comentario;
    };
    /**
     * LLAMAR A UN PROCEDURE
     * @param nombre
     * @param comentario
     */
    Generador.llamarProc = function (nombre, comentario) {
        return "\nCALL " + nombre + "                              ;" + comentario;
    };
    /**
     * GENERA EL CODIGO DE UN SALTO INCONDICIONAL
     * @param etiqueta
     */
    Generador.saltoIncondicional = function (etiqueta) {
        return "\nJPM " + etiqueta;
    };
    /**
     * COMPARA DOS NUMEROS
     * @param izq
     * @param der
     */
    Generador.comparador = function (izq, der, comentario) {
        return "\nCMP " + izq + "," + der + "                              ;" + comentario;
    };
    /**
     * GENERAMOS CODIGO ASSEMBLER SEGUN EL TIPO DE COMPARACION
     * @param operacion
     * @param etiqueta
     * @param comentario
     */
    Generador.tipoComparacion = function (operacion, etiqueta, comentario) {
        return "\n" + operacion + " " + etiqueta + "                              ;" + comentario;
    };
    return Generador;
}());
