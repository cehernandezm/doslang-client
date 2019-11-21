declare function isCuadruplo(linea);
declare function limpiarTemporal(temp);
declare function isEtiqueta(linea);
declare function isComentario(linea);
declare function addNewRegla(linea, tipo, detalle);
class Regla10 {
    instrucciones: Array<String>;

    /**
     * ESTA REGLA EDITA SUMAS CON OPERADORES CERO Y QUE SE ESTEN ASIGNANDO A DIFERENTE TEMPORAL
     * +,0,T1,T2 => =,t1,,t2
     * +,T1,0,T2 => =,t1,,t2
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
     * METODO ENCARGADO DE APLICAR LA DECIMA REGLA DE OPTIMIZACION
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
                    if(operador === "+") {
                        if( der.toLowerCase() === "0" ) {
                            addNewRegla(i,"Regla 10",element);
                            this.instrucciones[i] = "=," + izq.toLowerCase() + "," + "," + temp.toLowerCase();
                            
                        }
                        else if( izq.toLowerCase() === "0" ) {
                            addNewRegla(i,"Regla 10",element);
                            this.instrucciones[i] = "=," + der.toLowerCase() + "," + "," + temp.toLowerCase();
                            
                        }
                    }
                }
                
            }
        }
        return this.instrucciones;
    }

}