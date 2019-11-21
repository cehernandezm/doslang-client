declare function isCuadruplo(linea);
declare function limpiarTemporal(temp);
declare function isEtiqueta(linea);
declare function isComentario(linea);
declare function addNewRegla(linea,tipo,detalle);
class Regla1{
    instrucciones:Array<String>;
    
    /**
     * ESTA REGLA EVALUA SI EXISTE UNA ASIGNACION IGUAL ES DECIR:
     * A = B, Y LUEGO MAS ADELANTE EN EL CODIGO EXISTE UN
     * B = A, SIEMPRE Y CUANDO NO HAYA UNA ETIQUETA ENTRE ESTAS DOS ASIGNACIONES
     * SE PROCEDE  ELIMINAR B = A
     * 
     */



    /**
     * CONSTRUCTOR DE LA CLASE
     * @param instrucciones 
     */
    constructor(instrucciones:Array<String>){
        this.instrucciones = instrucciones;
    }

    /**
     * METODO ENCARGADO DE APLICAR LA PRIMERA REGLA DE OPTIMIZACION
     */
    optimizar(){
        for(let i = 0; i < this.instrucciones.length; i++){
            let element = this.instrucciones[i];
            if(isCuadruplo(element)) {
                let cuadruplo = element.split(',');
                let operador = cuadruplo[0].trim();
                let izq = cuadruplo[1].trim();
                let der = cuadruplo[2].trim();
                let temp = limpiarTemporal(cuadruplo[3]);
                if(!(operador.toLowerCase() === "begin") && !(operador.toLowerCase() === "call") && !(operador.toLowerCase() === "end") && !(izq.toLowerCase() === "stack") && !(temp.toLowerCase() === "stack") && !(izq.toLowerCase() === "heap") && !(temp.toLowerCase() === "heap")){
                    if(operador === "=") this.aplicar(izq,temp,i + 1);
                }
                
            }
        }
        return this.instrucciones;
    }

    aplicar(izquierdo,temporal,index){
        for(let i = index; i < this.instrucciones.length; i++){
            let element = this.instrucciones[i];
            
            if(isCuadruplo(element)) {
                let cuadruplo = element.split(',');
                let operador = cuadruplo[0];
                let izq = cuadruplo[1];
                let der = cuadruplo[2];
                let temp = limpiarTemporal(cuadruplo[3]);
                if(!(operador.toLowerCase() === "begin") && !(operador.toLowerCase() === "call") && !(operador.toLowerCase() === "end") && !(izq.toLowerCase() === "stack") && !(temp.toLowerCase() === "stack") && !(izq.toLowerCase() === "heap") && !(temp.toLowerCase() === "heap")){
                    if(operador === "="){
                        if(izq === temporal && temp === izquierdo) {
                            addNewRegla(i + 1,"Regla 1",element);
                            this.instrucciones.splice(i,1); // a=b y b=a, eliminamos b=a
                            i--;
                        }
                    }
                }
                
            }else{
                if(isComentario(element)){}
                else if(isEtiqueta(element)) return; //--------------------------------------- SI ES UNA ETIQUETA SE ROMPE LA PRIMERA REGLA
            }
        }
    }

}