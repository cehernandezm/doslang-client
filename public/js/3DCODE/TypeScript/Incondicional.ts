declare function buscarEtiqueta(etiqueta:any):any;
class Incondicional{
    pos: number;
    l : number;
    c : number;
    etiqueta : String;


    constructor(pos:number,l:number,c:number,etiqueta:String){
        this.pos = pos;
        this.l = l;
        this.c = c;
        this.etiqueta = etiqueta;
    }

    ejecutar(){
       let etiqueta = buscarEtiqueta(this.etiqueta);
       if(etiqueta != null)return etiqueta.posicion;
       listaSalida.push(new MensajeError("Semantico","La etiqueta: " + this.etiqueta + " no existe",this.l,this.c));
       return -1;
    }

}