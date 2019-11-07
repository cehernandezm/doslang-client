class Generador{


    public static guardarMov(destino:String,origen:String,comentario:String) {
        return "\nMOV " + destino + "," + origen + "                              " + comentario;
    }


}