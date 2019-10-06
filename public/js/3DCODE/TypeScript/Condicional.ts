class Condicional{
    linea:number;
    l:number;
    c:number;
    operacion:string;
    izq:Object;
    der:Object;
    etiqueta:String;

    /**
     * CONSTRUCTOR DE LA CLASE
     * @param linea 
     * @param l 
     * @param c 
     * @param operacion 
     * @param izq 
     * @param der 
     * @param etiqueta 
     */
    constructor(linea,l,c,operacion,izq,der,etiqueta){
        this.linea = linea;
        this.l = l;
        this.c = c;
        this.operacion = operacion;
        this.izq = izq;
        this.der = der;
        this.etiqueta = etiqueta;
    }




    ejecutar(){
        let op1 = (this.izq == null) ? null : this.izq.ejecutar();
        let op2 = (this.der == null) ? null : this.der.ejecutar();
        if( op1 != null && op2 != null ){
            if(!(op1 instanceof MensajeError) && !(op2 instanceof MensajeError)){
                let etiqueta = buscarEtiqueta(this.etiqueta);
                if(etiqueta != null){
                    switch(this.operacion){
                        case "==": if(op1.valor === op2.valor) return etiqueta.posicion; break;
                        case "!=": if(op1.valor != op2.valor) return etiqueta.posicion; break;
                        case ">": if(op1.valor > op2.valor) return etiqueta.posicion; break;
                        case "<": if(op1.valor < op2.valor) return etiqueta.posicion; break;
                        case ">=": if(op1.valor >= op2.valor) return etiqueta.posicion; break;
                        case "<=": if(op1.valor <= op2.valor) return etiqueta.posicion; break;
                    }
                } else listaSalida.push(new MensajeError("Semantico","No existe la etiqueta: " + this.etiqueta,l,c));
                
            }
        }
        return -1;
    }

}