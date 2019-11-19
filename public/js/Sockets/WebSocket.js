let ip = "127.0.0.1";
let port = 3000;
var socket = io.connect('http://' + ip + ':' + port,{'forceNew':true});


/**
 * LISTENER QUE OBTIENE EN RESULTADO DE REGRESO
 */
socket.on('resultadoAnalisis',function(data){
    if(isJSON(data)){
        let json = JSON.parse(data);
        analizarErrores(json.data);
    }
    else new3D(data);
    
    
});

/**
 * METODO QUE AGREGA LOS ERRORES A CONSOLA
 * @param {*} data 
 */
function analizarErrores(data){
    data.forEach(element => {
        addMensajeError(element.Tipo,element.Detalle,element.Linea,element.Columna);
    });
    if (!$("#consolaTarget").is(":visible")) $("#consolaTarget").toggle();
}


/**
 * FUNCION QUE ME PERMITE VERIFICAR SI MI ENTRADA ES UN JSON O UN TEXTO PLANO
 * @param {*} str 
 */
function isJSON(str){
    try{
        JSON.parse(str);
    }catch(e){ return false;}
    return true;
}

function agregarPestaña3D(data){

}