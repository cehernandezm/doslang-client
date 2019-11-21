declare function isCuadruplo(linea);
declare function limpiarTemporal(temp);
declare function isEtiqueta(linea);
declare function isComentario(linea);
declare function addNewRegla(linea, tipo, detalle);
class Regla15 {
    instrucciones: Array<String>;

    /**
     * ESTA REGLA EDITA MULTIPLICACIONES CON CERO Y DEVUELVE UNA ASIGNACION A 0
     * *,T1,0,T2 => =,0,,t2
     * *,0,t1,T2 => =,0,,t2
     */


    /**
     * CONSTRUCTOR DE LA CLASE
     * @param instrucciones 
     */
    constructor(instrucciones: Array<String>) {
        this.instrucciones = instrucciones;
    }


    /**
     * METODO ENCARGADO DE APLICAR LA 15va REGLA DE OPTIMIZACION
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
                    if(operador === "*") {
                        if( der.toLowerCase() === "0") {
                            addNewRegla(i,"Regla 15",element);
                            this.instrucciones[i] = "=,0,," + temp.toLowerCase();
                            
                        }
                        else if( izq.toLowerCase() === "0" ) {
                            addNewRegla(i,"Regla 15",element);
                            this.instrucciones[i] = "=,0,," + temp.toLowerCase();
                            
                        }
                    }
                }
                
            }
        }
        return this.instrucciones;
    }

}