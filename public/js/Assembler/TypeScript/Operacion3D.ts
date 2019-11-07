declare function addMensajeError(tipo,mensaje,linea,columna);
class Operacion3D{
    izq: Valor3D;
    der: Valor3D;
    l: number;
    c: number;
    operacion:Operacion;
    estructura:String;
    resultadoIzq:any;
    resultadoDer:any;

    constructor(izq:Valor3D,der:Valor3D,operacion:Operacion,estructura:String,l:number,c:number){
        this.izq = izq;
        this.der = der;
        this.l = l;
        this.c = c;
        this.operacion = operacion;
        this.estructura = estructura.toLowerCase();
    }

    ejecutar(ambito:Ambito3D){
        this.resultadoIzq = this.izq.ejecutar(ambito);
        this.resultadoDer = (this.der == null) ? null : this.der.ejecutar(ambito);
        switch(this.estructura){
            case "heap": break;
            case "stack": break;
            //-------------------------------- ES UN TEMPORAL ----------------------------------------------
            default:
                return this.operacionTemporal(ambito);
                break;
        }
    }

    private operacionTemporal(ambito:Ambito3D){
        let codigo:String = "";
        if(Operacion.IGUAL === this.operacion){
            if(this.resultadoDer != null) {
                addMensajeError("Semantico","No se puede igualar a dos valores",this.l,this.c);
                return new Error3D();
            }
            if(this.resultadoIzq instanceof Error3D) return this.resultadoIzq;
            
            

            let temp:Nodo3D = this.resultadoIzq;
            codigo = temp.codigo;
            codigo +=  Generador.guardarMov(this.estructura,temp.getResultado(),"Almacenamos el valor: " + temp.getResultado() + " en el temporal " + this.estructura);

            ambito.agregarTemporal(this.estructura.toLowerCase(),Tipo.INT);
            let nodo:Nodo3D = new Nodo3D(codigo,null);
            return nodo;

        }
        else{
            switch(this.operacion){
                case Operacion.SUMA:
                    break;
    
                
            }
        }
        
        
    }
    
    
    
}

