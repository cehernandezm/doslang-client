var Funcion = /** @class */ (function () {
    /**
     * CONSTRUCTOR DE LA CLASE
     * @param id
     * @param instrucciones
     * @param l
     * @param c
     * @param posicion
     */
    function Funcion(id, instrucciones, l, c, posicion) {
        this.id = id;
        this.instrucciones = instrucciones;
        this.l = l;
        this.c = c;
        this.posicion = posicion;
    }
    Funcion.prototype.ejecutar = function (ambito) {
        //--------------------------------- HACEMOS UN PRIMER RECORRIDO BUSCANDO TODAS LAS ETIQUETAS QUE EXISTEN EN EL CODIGO -------
        this.instrucciones.forEach(function (element) {
            if (element instanceof Etiqueta)
                element.ejecutar(ambito);
        });
        for (var i = 0; i < this.instrucciones.length; i++) {
            var element = this.instrucciones[i];
            if (element instanceof Etiqueta || element instanceof Funcion) { }
            else if (element instanceof Incondicional) {
                var posicion = element.ejecutar(ambito);
                if (posicion != -1)
                    i = redirigir(this.instrucciones, posicion, i);
            }
            else if (element instanceof Condicional) {
                var posicion = element.ejecutar(ambito);
                if (posicion != -1)
                    i = redirigir(this.instrucciones, posicion, i);
            }
            else
                element.ejecutar(ambito);
        }
        return -1;
    };
    return Funcion;
}());
