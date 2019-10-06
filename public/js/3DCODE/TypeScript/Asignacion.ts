class Asignacion {
    izq: Object;
    der: Object;
    operacion: String;
    temporal: String;

    constructor(izq, der, operacion, temporal, l, c) {
        this.izq = izq;
        this.der = der;
        this.operacion = operacion;
        this.temporal = temporal;
    }

    ejecutar() {
        var op1: Object = (this.izq == null) ? null : this.izq.ejecutar();;
        var op2: Object = (this.der == null) ? null : this.der.ejecutar();
        if (op1 instanceof MensajeError || op2 instanceof MensajeError) {
            return;
        }
        switch (this.operacion) {
            //------------------------ TEMP | H = e + e
            case "suma":
                if (op1.tipo == "number" && op2.tipo == "number") agregarTemporal({ id: this.temporal, valor: op1.valor + op2.valor, tipo: "number" });
                //-------------------------- H = e + e -------------------------------------------------------------------------------------------------
                else if ((op1.tipo == "posHeap" && op2.tipo == "number" || op1.tipo == "number" && op2.tipo == "posHeap") && (this.temporal == "H" || this.temporal == "h")) H = op1.valor + op2.valor;
                else if (op1.tipo == "posHeap" && op2.tipo == "number" || op1.tipo == "number" && op2.tipo == "posHeap") agregarTemporal({ id: this.temporal, valor: op1.valor + op2.valor, tipo: "posHeap" });
                else listaSalida.push(new MensajeError("Semantico", "No se puede sumar: " + op1.tipo + " con: " + op2.tipo, izq.linea, izq.columna));
                break;

            //----------------------- TEMP = e - e 
            case "resta":
                if (op1.tipo == "number" && op2.tipo == "number") agregarTemporal({ id: this.temporal, valor: op1.valor - op2.valor, tipo: "number" });
                else listaSalida.push(new MensajeError("Semantico", "No se puede restar: " + op1.tipo + " con: " + op2.tipo, izq.linea, izq.columna));
                break;

            //----------------------- TEMP = e * e 
            case "multiplicacion":
                if (op1.tipo == "number" && op2.tipo == "number") agregarTemporal({ id: this.temporal, valor: op1.valor * op2.valor, tipo: "number" });
                else listaSalida.push(new MensajeError("Semantico", "No se puede multiplicar: " + op1.tipo + " con: " + op2.tipo, izq.linea, izq.columna));
                break;


            //----------------------- TEMP = e / e 
            case "division":
                if (op1.tipo == "number" && op2.tipo == "number") {
                    if (op2.valor == 0) listaSalida.push(new MensajeError("Semantico", "No se puede dividir dentro de 0 ", this.der.linea, this.der.columna));
                    else agregarTemporal({ id: this.temporal, valor: op1.valor / op2.valor, tipo: "number" });
                }
                else listaSalida.push(new MensajeError("Semantico", "No se puede dividir: " + op1.tipo + " con: " + op2.tipo, izq.linea, izq.columna));
                break;

            //----------------------- TEMP = e % e 
            case "modulo":
                if (op1.tipo == "number" && op2.tipo == "number") {
                    if (op2.valor == 0) listaSalida.push(new MensajeError("Semantico", "No se puede obtener el modulo de 0 ", this.der.linea, this.der.columna));
                    else agregarTemporal({ id: this.temporal, valor: op1.valor % op2.valor, tipo: "number" });
                }
                else listaSalida.push(new MensajeError("Semantico", "No se puede obtener el modulo: " + op1.tipo + " con: " + op2.tipo, izq.linea, izq.columna));
                break;

            //----------------------- TEMP = e % e 
            case "potencia":
                if (op1.tipo == "number" && op2.tipo == "number")  agregarTemporal({ id: this.temporal, valor: Math.pow(op1.valor , op2.valor), tipo: "number" });
                else listaSalida.push(new MensajeError("Semantico", "No se puede obtener el modulo: " + op1.tipo + " con: " + op2.tipo, izq.linea, izq.columna));
                break;
            //----------------------------------------------- Heap[pos] = numero; ------------------------------------------------------------------
            case "asignarheap":
                if (op1.tipo == "posHeap" || op1.tipo == "number") Heap.push(op2);
                else listaSalida.push(new MenasajeError("Semantico", "No se puede acceder a esta posicion del Heap: " + op1.valor, izq.linea, izq.columna));
                break;
                

        }
    }


    
}