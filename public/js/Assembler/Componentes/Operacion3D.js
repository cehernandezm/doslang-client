var Operacion3D = /** @class */ (function () {
    function Operacion3D(izq, der, operacion, estructura, l, c) {
        this.izq = izq;
        this.der = der;
        this.l = l;
        this.c = c;
        this.operacion = operacion;
        this.estructura = estructura.toLowerCase();
    }
    Operacion3D.prototype.ejecutar = function (ambito) {
        this.resultadoIzq = this.izq.ejecutar(ambito);
        this.resultadoDer = (this.der == null) ? null : this.der.ejecutar(ambito);
        switch (this.estructura) {
            case "heap": return this.operacionHeap();
            case "stack": return this.operacionStack();
            //-------------------------------- ES UN TEMPORAL ----------------------------------------------
            default:
                return this.operacionTemporal(ambito);
                break;
        }
    };
    /**
     * METODO QUE SE ENCARGA DE HACER LA ASIGNACION A UN TEMPORAL
     * @param ambito
     */
    Operacion3D.prototype.operacionTemporal = function (ambito) {
        var codigo = "";
        if (Operacion.IGUAL === this.operacion) {
            if (this.resultadoIzq instanceof Error3D)
                return this.resultadoIzq;
            if (this.resultadoIzq.getcodigo() === "stack") {
                if (this.resultadoDer === null) {
                    addMensajeError("Semantico", "El stack necesita una posicion", this.l, this.c);
                    return new Error();
                }
                codigo += this.resultadoDer.getcodigo();
                codigo += Generador.guardarMov("ax", this.resultadoDer.getResultado(), "Guardamos en memoria la direccion");
                codigo += Generador.arreglarIndice();
                codigo += Generador.guardarMov("bx", "ax", "Indice ya arreglado");
                codigo += Generador.guardarMov("ax", "S[bx]", "Almacenamos en memoria donde estamos accediendo");
                codigo += Generador.guardarMov(this.estructura, "ax", "Accedemos a la posicion: " + this.resultadoDer.getResultado() + " del stack");
                ambito.agregarTemporal(this.estructura, Tipo.INT);
                var nodo_1 = new Nodo3D(codigo, null);
                return nodo_1;
            }
            if (this.resultadoIzq.getcodigo() === "heap") {
                if (this.resultadoDer === null) {
                    addMensajeError("Semantico", "El Heap necesita una posicion", this.l, this.c);
                    return new Error();
                }
                codigo += Generador.guardarMov("ax", this.resultadoDer.getResultado(), "Guardamos en memoria la direccion");
                codigo += Generador.arreglarIndice();
                codigo += Generador.guardarMov("bx", "ax", "Indice ya arreglado");
                codigo += Generador.guardarMov("ax", this.resultadoDer.getResultado(), "Guardamos en memoria la direccion");
                codigo += Generador.guardarMov("ax", "He[bx]", "Almacenamos en memoria donde estamos accediendo");
                codigo += Generador.guardarMov(this.estructura, "ax", "Accedemos a la posicion: " + this.resultadoDer.getResultado() + " del Heap");
                ambito.agregarTemporal(this.estructura, Tipo.INT);
                var nodo_2 = new Nodo3D(codigo, null);
                return nodo_2;
            }
            if (this.resultadoDer != null) {
                addMensajeError("Semantico", "No se puede igualar a dos valores", this.l, this.c);
                return new Error3D();
            }
            var temp = this.resultadoIzq;
            codigo = temp.getcodigo();
            codigo += Generador.guardarMovEspecial(this.estructura, temp.getResultado(), "Almacenamos el valor: " + temp.getResultado() + " en el temporal " + this.estructura);
            ambito.agregarTemporal(this.estructura.toLowerCase(), Tipo.INT);
            var nodo = new Nodo3D(codigo, null);
            return nodo;
        }
        else {
            if (this.resultadoIzq instanceof Error3D)
                return this.resultadoIzq;
            if (this.resultadoDer instanceof Error3D)
                return this.resultadoDer;
            var nodoIzq = this.resultadoIzq;
            var nodoDer = this.resultadoDer;
            switch (this.operacion) {
                case Operacion.SUMA:
                    codigo = nodoIzq.getcodigo();
                    codigo += "\n" + nodoDer.getcodigo();
                    codigo += Generador.guardarAdd(nodoIzq.getResultado(), nodoDer.getResultado(), "SUMA DE: " + nodoIzq.getResultado() + " CON: " + nodoDer.getResultado());
                    codigo += Generador.guardarMov(this.estructura, "AX", "Almacenamos la suma en :" + this.estructura);
                    var nodo = new Nodo3D(codigo, Tipo.INT);
                    nodo.$resultado = this.estructura;
                    ambito.agregarTemporal(this.estructura, Tipo.INT);
                    return nodo;
                case Operacion.RESTA:
                    codigo = nodoIzq.getcodigo();
                    codigo += "\n" + nodoDer.getcodigo();
                    codigo += "\n" + Generador.guardarSub(nodoIzq.getResultado(), nodoDer.getResultado(), "RESTA DE: " + nodoIzq.getResultado() + " CON: " + nodoDer.getResultado());
                    codigo += Generador.guardarMov(this.estructura, "AX", "Almacenamos la resta en: " + this.estructura);
                    nodo = new Nodo3D(codigo, Tipo.INT);
                    nodo.$resultado = this.estructura;
                    ambito.agregarTemporal(this.estructura, Tipo.INT);
                    return nodo;
                case Operacion.MULTIPLICACION:
                    codigo = nodoIzq.getcodigo();
                    codigo += "\n" + nodoDer.getcodigo();
                    codigo += "\n" + Generador.guardarMul(nodoIzq.getResultado(), nodoDer.getResultado(), "MULTIPLICACION  DE: " + nodoIzq.getResultado() + " CON: " + nodoDer.getResultado());
                    codigo += Generador.guardarMov(this.estructura, "AX", "Almacenamos la multiplicacion en: " + this.estructura);
                    nodo = new Nodo3D(codigo, Tipo.INT);
                    nodo.$resultado = this.estructura;
                    ambito.agregarTemporal(this.estructura, Tipo.INT);
                    return nodo;
                case Operacion.DIVISION:
                    codigo = nodoIzq.getcodigo();
                    codigo += "\n" + nodoDer.getcodigo();
                    codigo += "\n" + Generador.guardarDiv(nodoIzq.getResultado(), nodoDer.getResultado(), "DIVISION  DE: " + nodoIzq.getResultado() + " CON: " + nodoDer.getResultado());
                    codigo += Generador.guardarMov(this.estructura, "AX", "Almacenamos la division en: " + this.estructura);
                    nodo = new Nodo3D(codigo, Tipo.INT);
                    nodo.$resultado = this.estructura;
                    ambito.agregarTemporal(this.estructura, Tipo.INT);
                    return nodo;
                case Operacion.MODULO:
                    codigo = nodoIzq.getcodigo();
                    codigo += "\n" + nodoDer.getcodigo();
                    codigo += "\n" + Generador.guardarDiv(nodoIzq.getResultado(), nodoDer.getResultado(), "MODULO  DE: " + nodoIzq.getResultado() + " CON: " + nodoDer.getResultado());
                    codigo += Generador.guardarMov(this.estructura, "DX", "Almacenamos la division en: " + this.estructura);
                    nodo = new Nodo3D(codigo, Tipo.INT);
                    nodo.$resultado = this.estructura;
                    ambito.agregarTemporal(this.estructura, Tipo.INT);
                    return nodo;
                case Operacion.POTENCIA:
                    codigo = nodoIzq.getcodigo();
                    codigo += "\n" + nodoDer.getcodigo();
                    codigo += Generador.guardarMov("AX", nodoIzq.getResultado(), "Guardamos la base: " + nodoIzq.getResultado() + " en memoria");
                    codigo += Generador.guardarMov("BX", nodoIzq.getResultado(), "Guardamos la base: " + nodoIzq.getResultado() + " en memoria");
                    codigo += Generador.guardarMov("CX", nodoDer.getResultado(), "Guardamos la potencia: " + nodoDer.getResultado() + " en memoria");
                    codigo += Generador.llamarProc("POTENCIA", "llamamos a la funcion encargada de sacar la potencia");
                    codigo += Generador.guardarMov(this.estructura, "AX", "Almacenamos el resultado en: " + this.estructura);
                    nodo = new Nodo3D(codigo, Tipo.INT);
                    nodo.$resultado = this.estructura;
                    ambito.agregarTemporal(this.estructura, Tipo.INT);
                    return nodo;
            }
        }
    };
    /**
     * SE ENCARGARA DE ASIGNAR EN EL STACK
     * @param ambito
     */
    Operacion3D.prototype.operacionStack = function () {
        if (this.resultadoIzq instanceof Error3D || this.resultadoDer instanceof Error3D)
            return new Error3D();
        var codigo = "";
        codigo += this.resultadoIzq.getcodigo();
        codigo += "\n" + this.resultadoDer.getcodigo();
        codigo += Generador.guardarMov("ax", this.resultadoIzq.getResultado(), "Almacenamos en memoria la ubicacion");
        codigo += Generador.arreglarIndice();
        codigo += Generador.guardarMov("bx", "ax", "Indice ya arreglado");
        codigo += Generador.guardarMov("ax", this.resultadoDer.getResultado(), "Almacenamos en memoria el valor");
        codigo += Generador.guardarMov("S[bx]", "ax", "Asignamos el valor: " + this.resultadoDer.getResultado() + " en la posicion: " + this.resultadoIzq.getResultado() + " del stack");
        var nodo = new Nodo3D(codigo, null);
        return nodo;
    };
    /**
     * SE ENCARGARA DE ASIGNAR EN EL HEAP
     * @param ambito
     */
    Operacion3D.prototype.operacionHeap = function () {
        if (this.resultadoIzq instanceof Error3D || this.resultadoDer instanceof Error3D)
            return new Error3D();
        var codigo = "";
        codigo += this.resultadoIzq.getcodigo();
        codigo += "\n" + this.resultadoDer.getcodigo();
        codigo += Generador.guardarMov("ax", this.resultadoIzq.getResultado(), "Guardamos en memoria la direccion");
        codigo += Generador.arreglarIndice();
        codigo += Generador.guardarMov("bx", "ax", "Indice ya arreglado");
        codigo += Generador.guardarMov("ax", this.resultadoDer.getResultado(), "Almacenamos en memoria el valor");
        codigo += Generador.guardarMov("He[bx]", "ax", "Asignamos el valor: " + this.resultadoDer.getResultado() + " en la posicion: " + this.resultadoIzq.getResultado() + " del Heap");
        var nodo = new Nodo3D(codigo, null);
        return nodo;
    };
    return Operacion3D;
}());
