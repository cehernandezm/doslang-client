let ip = "127.0.0.1";
let port = 3000;
var socket = io.connect('http://' + ip + ':' + port,{'forceNew':true});


//-------------------------------------------------- RECIBIR EL ANALISIS ----------------------------------------------
socket.on('resultadoAnalisis',function(data){
    let json = JSON.parse(data);
    if(json.error === 1) analizarErrores(json.data);
});

function analizarErrores(data){
    data.forEach(element => {
        addMensajeError(element.Tipo,element.Detalle,element.Linea,element.Columna);
    });
    if (!$("#consolaTarget").is(":visible")) $("#consolaTarget").toggle();
}