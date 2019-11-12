var Print3D = /** @class */ (function () {
    /**
     * CONSTRUCTOR DE LA CLASE
     * @param operacion
     * @param valor
     * @param l
     * @param c
     */
    function Print3D(operacion, valor, l, c) {
        this.operacion = operacion;
        this.valor = valor;
        this.l = l;
        this.c = c;
    }
    Print3D.prototype.ejecutar = function (ambito) {
        var nodoIzq = this.valor.ejecutar(ambito);
        if (nodoIzq instanceof Error3D)
            return nodoIzq;
        var codigo = nodoIzq.getcodigo();
        //------------------------------ ENTERO | DECIMAL ----------------------------------------------
        if (this.operacion === 0 || this.operacion === 2) {
            codigo += Generador.guardarMov("AX", nodoIzq.getResultado(), "Guardamos en memoria a " + nodoIzq.getResultado());
            codigo += Generador.llamarProc("Print", "Llamamos la funcion print que se encargara de mostrar el numero");
        }
        else {
            codigo += Generador.guardarMov("bx", nodoIzq.getResultado(), "guardamos en memoria el valor");
            codigo += Generador.guardarMov("DX", "BX", "guardamos el ascii a mostrar: " + nodoIzq.getResultado());
            codigo += Generador.guardarMov("AH", "02H", "Interrupcion para mostrar un caracter");
            codigo += Generador.interrupcion("21H", "Interrupcion para mostrar un caracter");
        }
        var nodo = new Nodo3D(codigo, null);
        return nodo;
    };
    return Print3D;
}());
