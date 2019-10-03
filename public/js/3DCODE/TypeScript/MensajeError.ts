class MensajeError{
    tipo : String;
    detalle : String;
    linea : number;
    columna : number;


    constructor(tipo,detalle,linea,columna){
        this.tipo = tipo;
        this.detalle = detalle;
        this.linea = linea;
        this.columna = columna;
    }
}