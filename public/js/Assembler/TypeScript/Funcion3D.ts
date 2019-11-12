class Funcion3D {
    nombre: String;
    cuerpo: any;
    l: number;
    c: number;

    /**
     * CONSTRUCTOR
     * @param nombre 
     * @param cuerpo 
     * @param l 
     * @param c 
     */
    constructor(nombre: String, cuerpo: any, l: number, c: number) {
        this.nombre = nombre;
        this.cuerpo = cuerpo;
        this.l = l;
        this.c = c;
    }

    /**
     * METODO DE LA CLASE PADRE
     * @param ambito 
     */
    ejecutar(ambito: Ambito3D) {

        let codigo = this.nombre + " PROC";
        /**
       * ALMACENAMOS LAS ETIQUETAS
       */
        this.cuerpo.forEach(element => {
            if (element instanceof Etiqueta3D) element.ejecutarFirst(ambito);
        });

        this.cuerpo.forEach(element => {
            if (!(element instanceof Funcion3D)) {
              let res = element.ejecutar(ambito);
              if (!(res instanceof Error3D)) codigo += "\n" + res.codigo;
              
            }
          });
        codigo += "\nret";
        codigo += "\n" + this.nombre + " ENDP"; 
        let nodo = new Nodo3D(codigo,null);
        return nodo;

    }
}