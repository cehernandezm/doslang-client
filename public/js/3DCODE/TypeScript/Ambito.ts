
class Ambito{
    listaTemporales : Array<object>;
    salida : number;
    ambitoOld : number;
    nombre : string;

    Ambito(salida, ambitoOld, nombre){
        this.listaTemporales = new Array<object>();
        this.salida = salida;
        this.ambitoOld = ambitoOld;
        this.nombre = nombre;
    }

    agregarTemporales(nombre,valor){
        if(this.buscarTemporal(nombre) != -777.77) this.listaTemporales.push({nombre:nombre,valor:valor});
        else this.changeValor(nombre,valor);
    }

    buscarTemporal(nombre){
        this.listaTemporales.forEach(element => {
            if(element["nombre"] === nombre) return element["valor"];
        });
        return -777.77;
    }

    changeValor(nombre,valor){
        this.listaTemporales.forEach(element => {
            if(element["nombre"] === nombre){
                element["valor"] = valor;
                return;
            }
        });
    }
}