class Generador{

    /**
     * GUARDA UN MOVIMIENTO
     * @param destino 
     * @param origen 
     * @param comentario 
     */
    public static guardarMov(destino:String,origen:String,comentario:String){
        return "\nMOV " + destino + "," + origen + "                              ;" + comentario;
    }

    /**
     * GUARDA UNA SUMA
     * @param destino 
     * @param origen 
     * @param comentario 
     */
    public static guardarAdd(destino:String,origen:String,comentario:String){
        return "\nADD " + destino + "," + origen + "                              ;" + comentario;
    }

    /**
     * GUARDA UNA RESTA
     * @param destino 
     * @param origen 
     * @param comentario 
     */
    public static guardarSub(destino:String,origen:String,comentario:String){
        return "\nSUB " + destino + "," + origen + "                              ;" + comentario;
    }

    /**
     * GUARDA UNA MULTIPLICACION
     * @param destino 
     * @param origen 
     * @param comentario 
     */
    public static guardarMul(destino:String,comentario:String){
        return "\nMUL " + destino  + "                              ;" + comentario;
    }

    /**
     * REALIZA UNA DIVISION
     * @param destino 
     * @param comentario 
     */
    public static guardarDiv(destino:String,comentario:String){
        return "\nDIV " + destino  + "                              ;" + comentario;
    }

    /**
     * LLAMAR A UN PROCEDURE
     * @param nombre 
     * @param comentario 
     */
    public static llamarProc(nombre:String, comentario:String){
        return "\nCALL "+ nombre + "                              ;" + comentario;
    }
    
    /**
     * GENERA EL CODIGO DE UN SALTO INCONDICIONAL
     * @param etiqueta 
     */
    public static saltoIncondicional(etiqueta:String){
        return "\nJPM " + etiqueta; 
    }

    /**
     * COMPARA DOS NUMEROS
     * @param izq 
     * @param der 
     */
    public static comparador(izq:String,der:String,comentario:String){
        return "\nCMP " + izq + "," + der + "                              ;" + comentario;
    }

    /**
     * GENERAMOS CODIGO ASSEMBLER SEGUN EL TIPO DE COMPARACION
     * @param operacion 
     * @param etiqueta 
     * @param comentario 
     */
    public static tipoComparacion(operacion:String,etiqueta:String,comentario:String){
        return "\n" + operacion + " " + etiqueta + "                              ;" + comentario;
    }
}