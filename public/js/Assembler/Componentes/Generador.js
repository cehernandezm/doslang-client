var Generador = /** @class */ (function () {
    function Generador() {
    }
    Generador.guardarMov = function (destino, origen, comentario) {
        return "\nMOV " + destino + "," + origen + "                              " + comentario;
    };
    return Generador;
}());
