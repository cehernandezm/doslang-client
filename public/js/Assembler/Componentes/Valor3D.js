var Valor3D = /** @class */ (function () {
    function Valor3D(dato) {
        this.dato = dato;
    }
    Valor3D.prototype.ejecutar = function (ambito) {
        if (this.dato.tipo === "int") {
            var nodo = new Nodo3D("", Tipo.INT);
            nodo.$resultado = this.dato.valor + "d";
            return nodo;
        }
        else if (this.dato.tipo === "double") {
            var nodo = new Nodo3D("", Tipo.INT);
            nodo.$resultado = "0" + "d";
            return nodo;
        }
        else if (this.dato.tipo === "temporal") {
            var temp = ambito.buscarTemporal(this.dato.valor.toLowerCase());
            if (temp === null) {
                addMensajeError("Semantico", "No existe el temporal: " + this.dato.valor, this.dato.linea, this.dato.columna);
                return new Error3D();
            }
            var nodo = new Nodo3D("", Tipo.INT);
            nodo.$resultado = temp.nombre;
            return nodo;
        }
        else if (this.dato.tipo === "h") {
            var nodo = new Nodo3D("", Tipo.INT);
            nodo.$resultado = "H";
            return nodo;
        }
        else if (this.dato.tipo === "p") {
            var nodo = new Nodo3D("", Tipo.INT);
            nodo.$resultado = "P";
            return nodo;
        }
        else if (this.dato.tipo == "stack")
            return new Nodo3D("stack", null);
        else if (this.dato.tipo == "heap")
            return new Nodo3D("heap", null);
    };
    return Valor3D;
}());
