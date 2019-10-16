var listaSalida = [];
var listaEtiquetas = [];
var listaFuncion = [];

var H = 0;
var P = 0;
$("#compiler").on('click',function(e){
    let codigo = editor.getValue();
    
    listaSalida = [];
    listaFuncion = [];
    listaEtiquetas = [];
    H = 0;
    P = 0;
    Gramatica.parse(codigo);
    let listaInstrucciones = Gramatica.arbol.raiz;
    
    //--------------------------------- HACEMOS UN PRIMER RECORRIDO BUSCANDO TODAS LAS ETIQUETAS QUE EXISTEN EN EL CODIGO -------
    listaInstrucciones.forEach(element => {
        if(element instanceof Etiqueta) element.ejecutar(); 
        else if(element instanceof Funcion) {
            if(buscarFuncion(element.id) === null ) listaFuncion.push({nombre : element.id , funcion : element});
            else listaSalida.push(new MensajeError("Semantico","La funcion " + element.id + " ya existe",element.l,element.c));
        }
    });

    //------------------------------------------ RECORRIDO QUE EJECUTARA TODO EL CODIGO ------------------------------------------
    let ambito = new Ambito();
    for(let i = 0; i < listaInstrucciones.length; i++){
        let element = listaInstrucciones[i];
        if(element instanceof Etiqueta || element instanceof Funcion){}
        else if(element instanceof Incondicional){
            let posicion = element.ejecutar(ambito);
            if(posicion != -1) i = posicion - 1;
        }
        else if(element instanceof Condicional){
            let posicion = element.ejecutar(ambito);
            if(posicion != -1) i = posicion - 1;
        }
        else element.ejecutar(ambito);
    }
    
    
    listaEtiquetas.forEach(element =>{
        console.log(element);
    });
    console.log("---------------------HRAp----------------------------");
    ambito.Heap.forEach(element =>{
        console.log(element);
    });
    console.log("---------------------ERRORES----------------------------");
    consolaSalida = "";
    listaSalida.forEach(element =>{
        if(element instanceof MensajeError) console.error(element);

        else consolaSalida += element;
    });
    console.log(consolaSalida);

});



/**
 * METODO QUE INSERTA UNA ETIQUETA
 * @param {*} etiqueta NUEVA ETIQUETA
 */
function agregarEtiqueta(etiqueta){
    eliminarEtiqueta(etiqueta.nombre);
    listaEtiquetas.push(etiqueta);
}


function eliminarEtiqueta(etiqueta){
    for(let i = 0; i < listaEtiquetas.length; i++){
        et = listaEtiquetas[i];
        if(et.nombre === etiqueta) listaEtiquetas.splice(i,1);
    }
}

/**
 * METODO QUE BUSCA UNA ETIQUETA
 * @param {*} nombre ETIQUETA A BUSCARs
 * @return objeto | null
 */
function buscarEtiqueta(nombre){
    let retorno = null;
    for(let i = 0; i < listaEtiquetas.length; i++){
        let etiqueta = listaEtiquetas[i];
        if(etiqueta.nombre === nombre) retorno = etiqueta;
    }
    return retorno;
}


function buscarFuncion(nombre){
    let retorno = null;
    for(let i = 0; i < listaFuncion.length; i++){
        if(listaFuncion[i].nombre === nombre) retorno = listaFuncion[i].funcion;
    }
    return retorno;
}
