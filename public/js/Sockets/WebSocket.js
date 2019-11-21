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
 * LISTENER PARA OBTENER EL RESULTADOD DE LOS REPORTES
 */
socket.on('resultadoReporte',function(data){
    let json = JSON.parse(data);
    let codigo = "";
    let index = 0;
    json.forEach(element => {
        codigo += "\n<tr>";
        codigo += "\n<td>" + index + "</td>";
        codigo += "\n<td>" + element.id + "</td>";
        codigo += "\n<td>" + element.ambito + "</td>";
        codigo += "\n<td>" + element.archivo + "</td>";
        codigo += "\n<td>" + element.constante + "</td>";
        codigo += "\n<td>" + element.parametro + "</td>";
        codigo += "\n<td>" + element.posicion + "</td>";
        codigo += "\n<td>" + element.posicionrel + "</td>";
        codigo += "\n<td>" + element.referencia + "</td>";
        codigo += "\n<td>" + element.tipo + "</td>";
        codigo += "\n</tr>";
        index++;
    });
    document.getElementById("bodyModalStack").innerHTML = codigo;
    $("#modalStack").modal();
    
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