declare function isCuadruplo(linea);
declare function limpiarTemporal(temp);
declare function isEtiqueta(linea);
declare function isComentario(linea);
declare function addNewRegla(linea, tipo, detalle);
class Regla14 {
    instrucciones: Array<String>;

    /**
     * ESTA REGLA EDITA MULTIPLICACIONES Y LAS VUELVE UNA SUMA DE BAJO COSTO
     * *,T1,2,T2 => +,t1,t1,t2
     * *,2,t1,T2 => +,t1,t1,t2
     */


    /**
     * CONSTRUCTOR DE LA CLASE
     * @param instrucciones 
     */
    constructor(instrucciones: Array<String>) {
        this.instrucciones = instrucciones;
    }


    /**
     * METODO ENCARGADO DE APLICAR LA 14va REGLA DE OPTIMIZACION
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
                        if( der.toLowerCase() === "2" && izq.toLowerCase() !== "") {
                            addNewRegla(i,"Regla 14",element);
                            this.instrucciones[i] = "+," + izq.toLowerCase() + "," + izq.toLowerCase() + "," + temp.toLowerCase();
                            
                        }
                        else if( izq.toLowerCase() === "2" && der.toLowerCase() !== "") {
                            addNewRegla(i,"Regla 14",element);
                            this.instrucciones[i] = "+," + der.toLowerCase() + "," + der.toLowerCase() + "," + temp.toLowerCase();
                            
                        }
                    }
                }
                
            }
        }
        return this.instrucciones;
    }

}