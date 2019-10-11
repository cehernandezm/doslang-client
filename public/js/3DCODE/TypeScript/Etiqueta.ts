declare function agregarEtiqueta(etiqueta:any):any;
class Etiqueta{
    nombre: string;
    l: number;
    c: number;
    pos : number;

    /**
     * CONSTRUCTOR DE LA CLASE
     * @param nombre 
     * @param l 
     * @param c 
     * @param pos 
     */
    constructor(nombre:string,l:number,c:number,pos:number){
        this.nombre = nombre;
        this.l = l;
        this.c = c;
        this.pos = pos;
    }

    /**
     * METODO DE LA CLASE PADRE
     */
    ejecutar(){
        let resultado = buscarEtiqueta(this.nombre);
        if(resultado == null) agregarEtiqueta({nombre: this.nombre,posicion : this.pos});
        else listaSalida.push(new MensajeError("Semantico","La etiqueta: " + this.nombre + " ya existe",this.l,this.c));
        return -1;
    }
}