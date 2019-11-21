declare function isCuadruplo(linea);
declare function limpiarTemporal(temp);
declare function isEtiqueta(linea);
declare function isComentario(linea);
declare function addNewRegla(linea,tipo,detalle);
class Regla2 {
    instrucciones:Array<String>;
    
    /**
     * ESTA REGLA SE ENCARGA DE ELIMINAR CODIGO INNALCANZABLE ES DECIR:
     * JPM,,,L2
     * CODIGO
     * L2:
     * LA REGLA ELIMINARA EL CODIGO ENTRE EL SALTO Y LA ETIQUETA L2 SIEMPRE Y CUANDO
     * NO EXISTA UNA ETIQUETA DENTRO DE 'CODIGO'
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
     * METODO ENCARGADO DE APLICAR LA SEGUNDA REGLA DE OPTIMIZACION
     */
    optimizar(){
        for(let i = 0; i < this.instrucciones.length; i++){
            let element = this.instrucciones[i];
            if(isCuadruplo(element)) {
                let cuadruplo = element.split(',');
                let operador = cuadruplo[0].trim();
                let salto = limpiarTemporal(cuadruplo[3]);
                if(operador.toLowerCase() === "jmp") this.aplicar(salto,i + 1);
                
                
            }
        }
        return this.instrucciones;
    }

    aplicar(etiqueta,index){
        for(let i = index; i < this.instrucciones.length; i++){
            let element = this.instrucciones[i];
            if(isComentario(element)){}
            else if(isCuadruplo(element)) {}
            else if(isEtiqueta(element)){
                let etiquetaTemp = limpiarTemporal(element);
                etiqueta = limpiarTemporal(etiqueta);
                if(etiquetaTemp.toLowerCase() === etiqueta.toLowerCase() + ":"){
                    let diferencia = i - index;
                    for(let j = 0; j < diferencia; j++){
                        addNewRegla(index + j,"Regla 2",this.instrucciones[index]);
                        this.instrucciones.splice(index,1);
                    }
                    return ;
                }else return; //------------------------- SI ES UNA ETIQUETA DIFERENTE NO ES CODIGO INALCANZABLE
            }
        }
    }
}