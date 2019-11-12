declare function addMensajeError(tipo,mensaje,linea,columna);
class Valor3D{

    dato:any;

    constructor(dato:any){
        this.dato = dato;
    }

    ejecutar(ambito:Ambito3D){
        if(this.dato.tipo === "int") {
            let nodo:Nodo3D = new Nodo3D("",Tipo.INT);

            nodo.$resultado= this.dato.valor + "d";
            return nodo;
        }
        else if(this.dato.tipo === "double") return new Nodo3D(this.dato.valor,Tipo.DOUBLE);
        else if(this.dato.tipo === "temporal"){
            let temp = ambito.buscarTemporal(this.dato.valor.toLowerCase());
            if(temp === null){
                addMensajeError("Semantico","No existe el temporal: " + this.dato.valor,this.dato.linea,this.dato.columna);
                return new Error3D();
            }
            let nodo:Nodo3D = new Nodo3D("",Tipo.INT);
            nodo.$resultado = temp.nombre;
            return nodo;
        }
        else if(this.dato.tipo === "h") {
            let nodo:Nodo3D = new Nodo3D("",Tipo.INT);
            nodo.$resultado = "H";
            return nodo;
        }

        else if(this.dato.tipo === "p") {
            let nodo:Nodo3D = new Nodo3D("",Tipo.INT);
            nodo.$resultado = "H";
            return nodo;
        }
        else if(this.dato.tipo == "stack") return new Nodo3D("stack",null);
        else if(this.dato.tipo == "heap") return new Nodo3D("heap",null);

    }
    

         
     
}