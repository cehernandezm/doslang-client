var listaTemporales = [];
$("#compiler").on('click',function(e){
    let codigo = editor.getValue();
    
    listaTemporales = [];
    var listaEtiquetas = [];
    var Stack = [];
    var Heap = [];
    
    Gramatica.parse(codigo);
    let listaInstrucciones = Gramatica.arbol.raiz;

    listaInstrucciones.forEach(element => {
        element.ejecutar();
    });

    listaTemporales.forEach(element => {
        console.log(element);
    });

});


function buscarTemporal(nombre){
    var retonar = null;
    listaTemporales.forEach(element => {
        if(element.id === nombre) retornar = element.valor;
    });
    return retornar;
}