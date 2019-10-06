var listaTemporales = [];
var listaSalida = [];
var Heap = [];
var listaEtiquetas = [];


var H = 0;
$("#compiler").on('click',function(e){
    let codigo = editor.getValue();
    
    listaTemporales = [];
    listaSalida = [];
    Heap = [];
    H = 0;
    listaEtiquetas = [];
    var Stack = [];

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

    console.log("Temporales");
    listaTemporales.forEach(element =>{
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
    if(buscarTemporal(dato.id) != null) eliminarTemporal(dato.id);
    listaTemporales.push(dato);
}

function eliminarTemporal(nombre){
    for(let i = 0; i < listaTemporales.length; i++){
        let dato = listaTemporales[i];
        if(dato.id == nombre){
            listaTemporales.splice(i,1);
            break;
        }
    }
}


/**
 * METODO QUE INSERTA UNA ETIQUETA
 * @param {*} etiqueta 
 */
function agregarEtiqueta(etiqueta){
    listaEtiquetas.push(etiqueta);
}



/**
 * METODO QUE BUSCA UNA ETIQUETA
 * @param {*} nombre 
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