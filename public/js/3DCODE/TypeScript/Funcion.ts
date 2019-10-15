class Funcion {
    id: String;
    instrucciones: any;
    l: number;
    c: number;
    posicion: number;

    /**
     * CONSTRUCTOR DE LA CLASE
     * @param id 
     * @param instrucciones 
     * @param l 
     * @param c 
     * @param posicion 
     */
    constructor(id: String, instrucciones: any, l: number, c: number, posicion: number) {
        this.id = id;
        this.instrucciones = instrucciones;
        this.l = l;
        this.c = c;
        this.posicion = posicion;
    }


    ejecutar(ambito: Ambito) {

        for (let i = 0; i < this.instrucciones.length; i++) {
            this.instrucciones[i].posicion = i;
        }
        //--------------------------------- HACEMOS UN PRIMER RECORRIDO BUSCANDO TODAS LAS ETIQUETAS QUE EXISTEN EN EL CODIGO -------
        this.instrucciones.forEach(element => {
            if (element instanceof Etiqueta) element.ejecutar(ambito);
        });

       

        for (let i = 0; i < this.instrucciones.length; i++) {
            let element = this.instrucciones[i];
            if (element instanceof Etiqueta || element instanceof Funcion) { }
            else if (element instanceof Incondicional) {
                let posicion = element.ejecutar(ambito);
                if (posicion != -1) i = posicion - 1;
            }
            else if (element instanceof Condicional) {
                let posicion = element.ejecutar(ambito);
                if (posicion != -1) i = posicion - 1;
            }
            else element.ejecutar(ambito);
        }

        return -1;
    }
}