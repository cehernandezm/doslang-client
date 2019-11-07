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
            case "heap": break;
            case "stack": break;
            //-------------------------------- ES UN TEMPORAL ----------------------------------------------
            default:
                return this.operacionTemporal(ambito);
                break;
        }
    };
    Operacion3D.prototype.operacionTemporal = function (ambito) {
        var codigo = "";
        if (Operacion.IGUAL === this.operacion) {
            if (this.resultadoDer != null) {
                addMensajeError("Semantico", "No se puede igualar a dos valores", this.l, this.c);
                return new Error3D();
            }
            if (this.resultadoIzq instanceof Error3D)
                return this.resultadoIzq;
            var temp = this.resultadoIzq;
            codigo = temp.codigo;
            codigo += Generador.guardarMov(this.estructura, temp.getResultado(), "Almacenamos el valor: " + temp.getResultado() + " en el temporal " + this.estructura);
            ambito.agregarTemporal(this.estructura.toLowerCase(), Tipo.INT);
            var nodo = new Nodo3D(codigo, null);
            return nodo;
        }
        else {
            switch (this.operacion) {
                case Operacion.SUMA:
                    break;
            }
        }
    };
    return Operacion3D;
}());
