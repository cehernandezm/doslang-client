declare function isCuadruplo(linea);
declare function limpiarTemporal(temp);
declare function isEtiqueta(linea);
declare function isComentario(linea);
declare function addNewRegla(linea, tipo, detalle);
declare function isTemporal(linea);
declare function operadoresLogicos(linea);
class Regla5 {
    instrucciones: Array<String>;

    /**
     * ESTA REGLA SIMPLIFICA LOS SALTOS CONDICIONALES. SI SE PUEDE SABER QUE LA CONDICION ES FALSA SEA REALIZA UN SALTO INCONDICIONAL
     * JGE,2,3,L1
     * JMP L2
     * => JMP L2
     * 
     */


    /**
     * CONSTRUCTOR DE LA CLASE
     * @param instrucciones 
     */
    constructor(instrucciones: Array<String>) {
        this.instrucciones = instrucciones;
    }


    /**
     * METODO ENCARGADO DE APLICAR LA QUINTA REGLA DE OPTIMIZACION
     */
    optimizar(){
        for(let i = 0; i < this.instrucciones.length; i++){
            let element = this.instrucciones[i];
            if(isCuadruplo(element)) {
                let cuadruplo = element.split(',');
                let operador = cuadruplo[0].trim();
                let izq = cuadruplo[1].trim();
                let der = cuadruplo[2].trim();
                let etiqueta = limpiarTemporal(cuadruplo[3]);
                if(operadoresLogicos(operador.toLowerCase()) !== undefined){
                    if(!(isTemporal(izq.toLowerCase())) && !(isTemporal(der.toLowerCase()))){
                        if( operador.toLowerCase() === "je" && (izq.toLowerCase() !== der.toLowerCase())){
                            if(this.ejecutar(i,etiqueta)) addNewRegla(i,"Regla 5",element);
                        }
                        else if( operador.toLowerCase() === "jne" && (izq.toLowerCase() === der.toLowerCase())){
                            if(this.ejecutar(i,etiqueta)) addNewRegla(i,"Regla 5",element);
                        }
                        else if( operador.toLowerCase() === "jg" && (+izq.toLowerCase() < +der.toLowerCase())){
                            if(this.ejecutar(i,etiqueta)) addNewRegla(i,"Regla 5",element);
                        }
                        else if( operador.toLowerCase() === "jl" && (+izq.toLowerCase() > +der.toLowerCase())){
                            if(this.ejecutar(i,etiqueta)) addNewRegla(i,"Regla 5",element);
                        }
                        else if( operador.toLowerCase() === "jge" && (+izq.toLowerCase() <= +der.toLowerCase())){
                            if(this.ejecutar(i,etiqueta)) addNewRegla(i,"Regla 5",element);
                        }
                        else if( operador.toLowerCase() === "jle" && (+izq.toLowerCase() >= +der.toLowerCase())){
                            if(this.ejecutar(i,etiqueta)) addNewRegla(i,"Regla 5",element);
                        }
                    }
                }
                
            }
        }
        return this.instrucciones;
    }

    ejecutar(index,etiqueta){

        if(index + 1 < this.instrucciones.length){
            let element = this.instrucciones[index + 1];
            if(isCuadruplo(element)) {
                let cuadruplo = element.split(',');
                let operador = cuadruplo[0].trim();
                let izq = cuadruplo[1].trim();
                let der = cuadruplo[2].trim();
                let et = limpiarTemporal(cuadruplo[3]);
                if(operador.toLowerCase() === "jmp"){
                    this.instrucciones[index] = "jmp,,," + et;
                    this.instrucciones.splice(index + 1,1);
                    return true;
                }
            }
        }

        return false;
    }

}