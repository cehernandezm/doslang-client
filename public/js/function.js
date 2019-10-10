var listaTemporales = [];
var listaSalida = [];
var Heap = [];
var listaEtiquetas = [];
var Stack = [];


var H = 0;
var P = 0;
$("#compiler").on('click',function(e){
    let codigo = editor.getValue();
    
    listaTemporales = [];
    listaSalida = [];
    Heap = [ {tipo: "number", valor:-1} ];
    H = 0;
    P = 0;
    listaEtiquetas = [];
    Stack = [];
    inicializarStack();
    Gramatica.parse(codigo);
    let listaInstrucciones = Gramatica.arbol.raiz;
    //--------------------------------- HACEMOS UN PRIMER RECORRIDO BUSCANDO TODAS LAS ETIQUETAS QUE EXISTEN EN EL CODIGO -------
    listaInstrucciones.forEach(element => {
        if(element instanceof Etiqueta) element.ejecutar(); 
        
    });

    //------------------------------------------ RECORRIDO QUE EJECUTARA TODO EL CODIGO ------------------------------------------
    for(let i = 0; i < listaInstrucciones.length; i++){
        let element = listaInstrucciones[i];
        if(element instanceof Etiqueta){}
        else if(element instanceof Incondicional){
            let posicion = element.ejecutar();
            if(posicion != -1) i = posicion - 1;
        }
        else if(element instanceof Condicional){
            let posicion = element.ejecutar();
            if(posicion != -1) i = posicion - 1;
        }
        else element.ejecutar();
    }
    

    listaEtiquetas.forEach(element =>{
        console.log(element);
    });

    console.log("---------------------ERRORES----------------------------");
    listaSalida.forEach(element =>{
        console.error(element);
    });

    console.log("----------------------Temporales---------------------------");
    listaTemporales.forEach(element =>{
        console.log(element);
    });

    console.log("--------------------- HEAP ---------------------------------")
    Heap.forEach(element => {
        console.log(element);
    });

    console.log("--------------------- STACK ---------------------------------")
    Stack.forEach(element => {
        console.log(element);
    });
});


function buscarTemporal(nombre){
    let retornar = null;
    listaTemporales.forEach(element => {
        if(element.id == nombre)  retornar = element;
    });
    return retornar;
}

function agregarTemporal(dato){
    eliminarTemporal(dato.id);
    listaTemporales.push(dato);
}

function eliminarTemporal(nombre){
    for(let i = 0; i < listaTemporales.length; i++){
        let dato = listaTemporales[i];
        if(dato.id === nombre){
            listaTemporales.splice(i,1);
            break;
        }
    }
}


/**
 * METODO QUE INSERTA UNA ETIQUETA
 * @param {*} etiqueta NUEVA ETIQUETA
 */
function agregarEtiqueta(etiqueta){
    listaEtiquetas.push(etiqueta);
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

/**
 * METODO QUE BUSCARA UN VALOR EN EL HEAP
 * @param {*} posicion POSICION A BUSCAR
 */
function valorHeap(posicion){
    let retorno = null;
    for(let i = 0; i < Heap.length; i++){
        if(posicion === i) retorno = Heap[i];
    }
    return retorno;
}


/**
 * METODO QUE BUSCARA UN VALOR EN EL STACK
 * @param {*} posicion POSICION A BUSCAR
 */
function valorStack(posicion){
    let retorno = null;
    for(let i = 0; i < Stack.length; i++){
        if(posicion === i) retorno = Stack[i];
    }
    return retorno;
}

/**
 * METODO QUE SE EJECUTA CADA VEZ QUE H = H +1;
 * @param {*} tam Tam nuevo de H
 */
function incrementarEspacioHeap(){
    let tamOriginal = Heap.length;
    let nuevo = H - (Heap.length - 1);

    for(let i = 0; i < nuevo ; i++) Heap.push({tipo:"number",valor : -1});
}


function inicializarStack(){
    for(let i = 0; i < 10; i++){
        Stack.push({tipo : "null", valor : -1});
    }
}