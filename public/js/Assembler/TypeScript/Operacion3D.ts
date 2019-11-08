declare function addMensajeError(tipo, mensaje, linea, columna);
class Operacion3D {
    izq: Valor3D;
    der: Valor3D;
    l: number;
    c: number;
    operacion: Operacion;
    estructura: String;
    resultadoIzq: any;
    resultadoDer: any;

    constructor(izq: Valor3D, der: Valor3D, operacion: Operacion, estructura: String, l: number, c: number) {
        this.izq = izq;
        this.der = der;
        this.l = l;
        this.c = c;
        this.operacion = operacion;
        this.estructura = estructura.toLowerCase();
    }

    ejecutar(ambito: Ambito3D) {
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
    }

    private operacionTemporal(ambito: Ambito3D) {
        let codigo: String = "";
        if (Operacion.IGUAL === this.operacion) {
            if (this.resultadoDer != null) {
                addMensajeError("Semantico", "No se puede igualar a dos valores", this.l, this.c);
                return new Error3D();
            }
            if (this.resultadoIzq instanceof Error3D) return this.resultadoIzq;

            let temp: Nodo3D = this.resultadoIzq;
            codigo = Generador.guardarMov(this.estructura, temp.$resultado, "Almacenamos el valor: " + temp.$resultado + " en el temporal " + this.estructura);

            ambito.agregarTemporal(this.estructura.toLowerCase(), Tipo.INT);
            let nodo: Nodo3D = new Nodo3D(codigo, null);
            return nodo;

        }
        else {
            if (this.resultadoIzq instanceof Error3D) return this.resultadoIzq;
            if (this.resultadoDer instanceof Error3D) return this.resultadoDer;

            let nodoIzq: Nodo3D = this.resultadoIzq;
            let nodoDer: Nodo3D = this.resultadoDer;
            switch (this.operacion) {
                case Operacion.SUMA:
                    codigo = nodoIzq.getcodigo();
                    codigo += "\n" + nodoDer.getcodigo();
                    codigo += Generador.guardarMov("AX", nodoIzq.getResultado(), "Asignamos el valor de " + nodoIzq.getResultado() + " a memoria");
                    codigo += Generador.guardarAdd("AX", nodoDer.getResultado(), "Le sumamos el valor de: " + nodoDer.getResultado());
                    codigo += Generador.guardarMov(this.estructura, "AX", "Almacenamos la suma en :" + this.estructura);
                    let nodo: Nodo3D = new Nodo3D(codigo, Tipo.INT);
                    nodo.$resultado = this.estructura;
                    ambito.agregarTemporal(this.estructura, Tipo.INT);
                    return nodo;


                case Operacion.RESTA:
                    codigo = nodoIzq.getcodigo();
                    codigo += "\n" + nodoDer.getcodigo();
                    codigo += Generador.guardarMov("AX", nodoIzq.getResultado(), "Asignamos el valor de " + nodoIzq.getResultado() + " a memoria");
                    codigo += Generador.guardarSub("AX", nodoDer.getResultado(), "Restamos el valor de: " + nodoDer.getResultado());
                    codigo += Generador.guardarMov(this.estructura, "AX", "Almacenamos la resta en: " + this.estructura);
                    nodo = new Nodo3D(codigo, Tipo.INT);
                    nodo.$resultado = this.estructura;
                    ambito.agregarTemporal(this.estructura, Tipo.INT);
                    return nodo;

                case Operacion.MULTIPLICACION:
                    codigo = nodoIzq.getcodigo();
                    codigo += "\n" + nodoDer.getcodigo();
                    codigo += Generador.guardarMov("AX", nodoIzq.getResultado(), "Asignamos el valor de " + nodoIzq.getResultado() + " a memoria");
                    codigo += Generador.guardarMov("BX", nodoDer.getResultado(), "Asignamos el valor de " + nodoDer.getResultado() + " a memoria");
                    codigo += Generador.guardarMul("BX", "Multiplicamos el valor de: " + nodoDer.getResultado());
                    codigo += Generador.guardarMov(this.estructura, "AX", "Almacenamos la multiplicacion en: " + this.estructura);
                    nodo = new Nodo3D(codigo, Tipo.INT);
                    nodo.$resultado = this.estructura;
                    ambito.agregarTemporal(this.estructura, Tipo.INT);
                    return nodo;


                case Operacion.DIVISION:
                    codigo = nodoIzq.getcodigo();
                    codigo += "\n" + nodoDer.getcodigo();
                    codigo += Generador.guardarMov("AX", nodoDer.getResultado(), "Asignamos el valor de " + nodoDer.getResultado() + " a memoria");
                    codigo += Generador.guardarMov("BX", "AX", "");
                    codigo += Generador.guardarMov("AX", nodoIzq.getResultado(), "Asignamos el valor de " + nodoIzq.getResultado() + " a memoria");
                    codigo += Generador.guardarDiv("BX", "Realizamos la divison de ax/bx el resultado se almacena en ax, el residuo queda en dx");
                    codigo += Generador.guardarMov(this.estructura, "AX", "Almacenamos la division en: " + this.estructura);
                    nodo = new Nodo3D(codigo, Tipo.INT);
                    nodo.$resultado = this.estructura;
                    ambito.agregarTemporal(this.estructura, Tipo.INT);
                    return nodo;

                case Operacion.MODULO:
                    codigo = nodoIzq.getcodigo();
                    codigo += "\n" + nodoDer.getcodigo();
                    codigo += Generador.guardarMov("AX", nodoDer.getResultado(), "Asignamos el valor de " + nodoDer.getResultado() + " a memoria");
                    codigo += Generador.guardarMov("BX", "AX", "");
                    codigo += Generador.guardarMov("AX", nodoIzq.getResultado(), "Asignamos el valor de " + nodoIzq.getResultado() + " a memoria");
                    codigo += Generador.guardarDiv("BX", "Realizamos la divison de ax/bx el resultado se almacena en ax, el residuo queda en dx");
                    codigo += Generador.guardarMov("AX","DX", "Almacenamos el modulo en AX");
                    codigo += Generador.guardarMov(this.estructura, "AX", "Almacenamos la division en: " + this.estructura);
                    nodo = new Nodo3D(codigo, Tipo.INT);
                    nodo.$resultado = this.estructura;
                    ambito.agregarTemporal(this.estructura, Tipo.INT);
                    return nodo;
                
                case Operacion.POTENCIA:
                    codigo = nodoIzq.getcodigo();
                    codigo += "\n" + nodoDer.getcodigo();
                    codigo += Generador.guardarMov("AX",nodoIzq.getResultado(),"Guardamos la base: " + nodoIzq.getResultado() + " en memoria");
                    codigo += Generador.guardarMov("BX",nodoIzq.getResultado(),"Guardamos la base: " + nodoIzq.getResultado() + " en memoria");
                    codigo += Generador.guardarMov("CX",nodoDer.getResultado(),"Guardamos la potencia: " + nodoDer.getResultado() + " en memoria");
                    codigo += Generador.llamarProc("POTENCIA","llamamos a la funcion encargada de sacar la potencia");
                    codigo += Generador.guardarMov(this.estructura, "AX", "Almacenamos el resultado en: " + this.estructura);
                    nodo = new Nodo3D(codigo, Tipo.INT);
                    nodo.$resultado = this.estructura;
                    ambito.agregarTemporal(this.estructura, Tipo.INT);
                    return nodo;
            }
        }


    }



}

