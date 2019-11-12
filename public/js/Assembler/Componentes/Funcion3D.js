var Funcion3D = /** @class */ (function () {
    /**
     * CONSTRUCTOR
     * @param nombre
     * @param cuerpo
     * @param l
     * @param c
     */
    function Funcion3D(nombre, cuerpo, l, c) {
        this.nombre = nombre;
        this.cuerpo = cuerpo;
        this.l = l;
        this.c = c;
    }
    /**
     * METODO DE LA CLASE PADRE
     * @param ambito
     */
    Funcion3D.prototype.ejecutar = function (ambito) {
        var codigo = this.nombre + " PROC";
        /**
       * ALMACENAMOS LAS ETIQUETAS
       */
        this.cuerpo.forEach(function (element) {
            if (element instanceof Etiqueta3D)
                element.ejecutarFirst(ambito);
        });
        this.cuerpo.forEach(function (element) {
            if (!(element instanceof Funcion3D)) {
                var res = element.ejecutar(ambito);
                if (!(res instanceof Error3D))
                    codigo += "\n" + res.codigo;
            }
        });
        codigo += "\nret";
        codigo += "\n" + this.nombre + " ENDP";
        var nodo = new Nodo3D(codigo, null);
        return nodo;
    };
    return Funcion3D;
}());
