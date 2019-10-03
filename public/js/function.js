var listaTemporales = [];
var listaSalida = [];
var Heap = [];
var H = 0;
$("#compiler").on('click',function(e){
    let codigo = editor.getValue();
    
    listaTemporales = [];
    listaSalida = [];
    Heap = [];
    H = 0;
    var listaEtiquetas = [];
    var Stack = [];
    
    
    Gramatica.parse(codigo);
    let listaInstrucciones = Gramatica.arbol.raiz;

    listaInstrucciones.forEach(element => {
        element.ejecutar();
    });

    listaTemporales.forEach(element => {
        console.log(element);
    });

    listaSalida.forEach(element => {
        console.log(element);
    });

    Heap.forEach(element => {
        console.log(element);
    })

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