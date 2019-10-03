var Asignacion = /** @class */ (function () {
    function Asignacion(izq, der, operacion, temporal, l, c) {
        this.izq = izq;
        this.der = der;
        this.operacion = operacion;
        this.temporal = temporal;
    }
    Asignacion.prototype.ejecutar = function () {
        var op1 = (this.izq == null) ? null : this.tipoDato(this.izq);
        var op2 = (this.der == null) ? null : this.tipoDato(this.der);
        if (op1 instanceof MensajeError || op2 instanceof MensajeError) {
            return;
        }
        switch (this.operacion) {
            //------------------------ TEMP | H = e + e
            case "suma":
                if (op1.tipo == "number" && op2.tipo == "number")
                    agregarTemporal({ id: this.temporal, valor: op1.valor + op2.valor, tipo: "number" });
                else if (op1.tipo == "posHeap" && op2.tipo == "number" || op1.tipo == "number" && op2.tipo == "posHeap")
                    agregarTemporal({ id: this.temporal, valor: op1.valor + op2.valor, tipo: "posHeap" });
                else
                    listaSalida.push("Semantico", "No se puede operar: " + op1.tipo + " con: " + op2.tipo, izq.linea, der.linea);
                break;
            //----------------------------------------------- Heap[pos] = numero; ------------------------------------------------------------------
            case "asignarheap":
                if (op1.tipo == "posHeap" || op1.tipo == "number")
                    Heap.push(op2);
                else
                    listaSalida.push("Semantico", "No se puede acceder a esta posicion del Heap: " + op1.valor, izq.linea, der.linea);
                break;
            //------------------------------------------------ H = e + e ---------------------------------
            case "aumentarheap":
                if (op1.tipo == "posHeap" && op2.tipo == "number" || op1.tipo == "number" && op2.tipo == "posHeap")
                    H = op1.valor + op2.valor;
                break;
        }
    };
    Asignacion.prototype.tipoDato = function (dato) {
        if (dato.tipo == "int")
            return { tipo: "number", valor: +dato.valor };
        else if (dato.tipo == "double")
            return { tipo: "number", valor: +dato.valor };
        else if (dato.tipo == "temporal") {
            var valorTemp = buscarTemporal(dato.valor);
            if (valorTemp != null)
                return (this.tipoDato(valorTemp));
            else {
                listaSalida.push(new MensajeError("Semantico", "No existe el temporal :" + dato.valor, dato.linea, dato.columna));
                return new MensajeError("", "", 0, 0);
            }
        }
        else if (dato.tipo == "posHeap")
            return { tipo: "posHeap", valor: H };
        else
            dato.valor;
    };
    return Asignacion;
}());
