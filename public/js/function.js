/**
 * ESTRUCTURA DE DATOS ALMACENADOS EN EL STACK
 * {TIPO,VALOR}
 * 
 */


 /**
  * TIPOS DE EDITORES
  * 0: PASCAL
  * 1: 3D
  * 
  */


var listaSalida = [];
var listaEtiquetas = [];
var listaFuncion = [];
var listaEditores = [];

var TabId = 0;

var H = 0;
var P = 0;

let editorActual = null;
let markedText = null;
let instruccionesDebug = null;
let ambitoActual = null;

function redirigir(listaInstrucciones, posicion, actual) {
    let indice = actual;
    let index = 0;
    listaInstrucciones.forEach(element => {
        if (element.posicion === posicion) {
            indice = index;
        }
        index++;
    });
    return indice;
}

/**
 * METODO QUE INSERTA UNA ETIQUETA
 * @param {*} etiqueta NUEVA ETIQUETA
 */
function agregarEtiqueta(etiqueta) {
    eliminarEtiqueta(etiqueta.nombre);
    listaEtiquetas.push(etiqueta);
}

function eliminarEtiqueta(etiqueta) {
    for (let i = 0; i < listaEtiquetas.length; i++) {
        et = listaEtiquetas[i];
        if (et.nombre === etiqueta) listaEtiquetas.splice(i, 1);
    }
}

/**
 * METODO QUE BUSCA UNA ETIQUETA
 * @param {*} nombre ETIQUETA A BUSCARs
 * @return objeto | null
 */
function buscarEtiqueta(nombre) {
    let retorno = null;
    for (let i = 0; i < listaEtiquetas.length; i++) {
        let etiqueta = listaEtiquetas[i];
        if (etiqueta.nombre === nombre) retorno = etiqueta;
    }
    return retorno;
}

function buscarFuncion(nombre) {
    let retorno = null;
    for (let i = 0; i < listaFuncion.length; i++) {
        if (listaFuncion[i].nombre === nombre) retorno = listaFuncion[i].funcion;
    }
    return retorno;
}

/**
 * METODO PARA CREAR UN NUEVO ARCHIVO DE PASCAL
 */
$("#newPascal").on("click", function (e) {
    e.preventDefault();
    $("#nav-tab").append(
        '<a class="nav-item nav-link"  data-toggle="tab" href="#nav-' +
        TabId +
        '" role="tab" >' +
        " Pestaña " +
        TabId +
        '<span class="badge" id="Tab' +
        TabId +
        '">x</span>' +
        " </a>"
    );

    let tab = document.createElement("div");
    tab.setAttribute("id", "nav-" + TabId);
    tab.className = "tab-pane active";

    let cuerpo = document.createElement("textarea");
    tab.appendChild(cuerpo);

    let es = document.getElementById("espacioEditores");
    es.appendChild(tab);
    let editor = CodeMirror.fromTextArea(cuerpo, prefEditorPascal);
    editor.setSize(null, "100%");

    let objectEditor = {
        editor: editor,
        id: "Tab" + TabId,
        tab: "nav-" + TabId,
        breakpoins: [],
        tipo: 0
    };

    listaEditores.push(objectEditor);

    editor.refresh;

    $("#nav-tab a").click();
    TabId++;
});

/**
 * METODO PARA CREAR UN NUEVO ARCHIVO DE 3D
 */
$("#new3D").on("click", function (e) {
    e.preventDefault();
    new3D("");
});

/**
 * CREA UNA NUEVA PESTAÑA CON UN ARCHIVO 3D
 * @param {*} texto 
 */
function new3D(texto){
    $("#nav-tab").append(
        '<a class="nav-item nav-link"  data-toggle="tab" href="#nav-' +
        TabId +
        '" role="tab" >' +
        " Pestaña " +
        TabId +
        '<span class="badge" id="Tab' +
        TabId +
        '">x</span>' +
        " </a>"
    );

    let tab = document.createElement("div");
    tab.setAttribute("id", "nav-" + TabId);
    tab.className = "tab-pane active";

    let cuerpo = document.createElement("textarea");
    tab.appendChild(cuerpo);

    let es = document.getElementById("espacioEditores");
    es.appendChild(tab);
    let editor = CodeMirror.fromTextArea(cuerpo, prefEditor3D);
    editor.setSize(null, "100%");

    let objectEditor = {
        editor: editor,
        id: "Tab" + TabId,
        tab: "nav-" + TabId,
        breakpoins: [],
        tipo: 1
    };

    editor.on("gutterClick", function (cm, n) {
        var info = cm.lineInfo(n);
        addBreakPoint(objectEditor.breakpoins, info.line);
        console.log(objectEditor.breakpoins);
        cm.setGutterMarker(
            n,
            "breakpoints",
            info.gutterMarkers ? null : makeMarker()
        );
    });

    listaEditores.push(objectEditor);
    editor.getDoc().setValue(texto);
    editor.refresh;

    $("#nav-tab a").click();
    TabId++;
}

/**
 * CREA UN NUEVO ARCHIVO ASSEMBLER
 * @param {*} texto 
 */
function newAssembler(texto){
    $("#nav-tab").append(
        '<a class="nav-item nav-link"  data-toggle="tab" href="#nav-' +
        TabId +
        '" role="tab" >' +
        " Pestaña " +
        TabId +
        '<span class="badge" id="Tab' +
        TabId +
        '">x</span>' +
        " </a>"
    );

    let tab = document.createElement("div");
    tab.setAttribute("id", "nav-" + TabId);
    tab.className = "tab-pane active";

    let cuerpo = document.createElement("textarea");
    tab.appendChild(cuerpo);

    let es = document.getElementById("espacioEditores");
    es.appendChild(tab);
    let editor = CodeMirror.fromTextArea(cuerpo, prefEditor3D);
    editor.setSize(null, "100%");

    let objectEditor = {
        editor: editor,
        id: "Tab" + TabId,
        tab: "nav-" + TabId,
        breakpoins: [],
        tipo: 2
    };

   
    listaEditores.push(objectEditor);
    editor.getDoc().setValue(texto);
    editor.refresh;

    $("#nav-tab a").click();
    TabId++;
}

/**
 * FUNCION QUE AGREGA UN MARCADOR(BREAKPOINT)
 */
function makeMarker() {
    var marker = document.createElement("div");
    marker.style.color = "#822";
    marker.innerHTML = "●";
    return marker;
}

/**
 * FUNCION QUE ALMACENA QUE LINEA ESTAMOS AGREGADO EL BREAKPOINT
 * @param {*} breakpoins
 * @param {*} linea
 */
function addBreakPoint(breakpoins, linea) {
    let flag = 1;
    for (let i = 0; i < breakpoins.length; i++) {
        if (breakpoins[i] === linea + 1) {
            breakpoins.splice(i, 1);
            flag = 0;
            break;
        }
    }
    if (flag) breakpoins.push(linea + 1);
}

/**
 * MUESTRA LA NUEVA PESTAÑA
 */
$("#nav-tab").on("click", "a", function (e) {
    let href = $(this).attr("href");
    href = href.slice(1);

    editorActual = listaEditores.find(function (element) {
        return element.tab === href;
    });

    $(this).tab("show");
});

/**
 * BORRA UNA PESTAÑA ACTUAL
 */

$("#nav-tab").on("click", ".badge", function () {
    let id = $(this).attr("id");
    $(this)
        .parents("a")
        .remove();
    $(id).remove();
    let cuerpo = getEditor(id);
    let div = document.getElementById(cuerpo);
    div.remove();
    let firsr = $("#nav-tab a:first");
    if (firsr != null) firsr.tab("show");
});

/**
 * OBTENGO EL EDITOR EN EL QUE ESTOY ACTUALMETE
 * @param {*} id
 */
function getEditor(id) {
    for (let i = 0; i < listaEditores.length; i++) {
        if (listaEditores[i].id === id) return listaEditores[i].tab;
    }
    return null;
}

/**
 * SHOW / HIDE CONSOLA
 */
$("#consolaClick").on("click", function (e) {
    $("#consolaTarget").toggle();
});

/**
 * INICIAR DEBUG
 */

$("#debugButton").on("click", function (e) {
    $("#debugTarget").toggle();
    if (document.getElementById("bodyInfo").style.visibility != "visible") document.getElementById("bodyInfo").style.visibility = "visible";
    else document.getElementById("bodyInfo").style.visibility = "hidden";
    let firstIndex = editorActual.breakpoins[0];
    //------------------------------------------ RECORRIDO QUE EJECUTARA TODO EL CODIGO ------------------------------------------
    let ambito = new Ambito();
    let listaInstrucciones = getInstrucciones();
    if (listaInstrucciones != null) {
        instruccionesDebug = new Instruccion(listaInstrucciones, ambito);
        ambitoActual = ambito;
        let index = instruccionesDebug.ejecutarDebugger(firstIndex);
        recorrerStack();
        recorrerHeap();
        markedText = editorActual.editor.markText({ line: index, ch: 0 }, { line: index, ch: 100 }, { className: "styled-background" });
    }

    if (!$("#consolaTarget").is(":visible")) $("#consolaTarget").toggle();
    
});

/**
 * STEP ON STEP EN DEBUG
 */
$("#nextStep").on("click", function (e) {
    let index = instruccionesDebug.siguienteDebug();
    markedText.clear();
    if (index === -777) {
        $("#debugTarget").toggle();
        document.getElementById("bodyInfo").style.visibility = "hidden";
    } else {
        jumpToLine(index);
        recorrerStack();
        recorrerHeap();
        markedText = editorActual.editor.markText({ line: index, ch: 0 }, { line: index, ch: 100 }, { className: "styled-background" });
    }
});

/**
 * FUNCION QUE SE ENCARGA DE RECORRER EL STACK E IMPRIMIRLO
 */
function recorrerStack(){
    let codigo = "";

    for(let i = 0; i < ambitoActual.getAllStack().length; i++){
        let dato = ambitoActual.getAllStack()[i];
        if(dato.valor != -11){
            let div = '<div class="element">' + i +".       " + dato.valor + '</div>';
            codigo += "\n" + div;
        }
    }
    document.getElementById("elementsStack").innerHTML = codigo;
}

/**
 * FUNCION QUE RECORRE E IMPRIME EL HEAP
 */
function recorrerHeap(){
    let codigo = "";

    for(let i = 0; i < ambitoActual.getAllHeap().length; i++){
        let dato = ambitoActual.getAllHeap()[i];
        if(dato.valor != -11){
            let div = '<div class="element">' + i +".       " + dato.valor + '</div>';
            codigo += "\n" + div;
        }
    }
    document.getElementById("elementsHeap").innerHTML = codigo;
}



/**
 * HACE UNA SALTO DE LINEA DESDE EL DEBUG
 * @param {*} i
 */
function jumpToLine(i) {
    editorActual.editor.setCursor(i);
}

/**
 * METODO ENCARGADO DE EJECUTAR CODIGO DE PASCAL (TRADUCIR EL CODIGO)
 */
$("#playButton").on("click", function (e) {
    e.preventDefault();
    inicializarDatos();
    if (editorActual) {
        switch (editorActual.tipo) {
            //------------------------------------- EJECUTAR 3D -----------------------------------------------------------------------
            case 0:
                sendTraduccion();
                break;
            
            case 1:
                ejecutar3D();
                break;
        }
    }
});


/**
 * METODO ENCARGADO DE LEER TODOS LOS ARCHIVOS QUE ESTEN CARGADOS EN EL SISTEMA Y ENVIARLOS AL SERVER
 */
function sendTraduccion(){
    let code = editorActual.editor.getValue();
    $.ajax({
        type: "post",
        datatype: "json",
        url: "/readFiles",
        data: { cuerpo : code },
        succes : function(data,textStatus,xhr){},
        error : function(XMLHttpRequest,textStatus,errorThrow){
            alert("Error de conexion con el servidor");
            console.error(XMLHttpRequest);
        }
    });
}


/**
 * EJECUTA EL CODIGO 3D -
 */
function ejecutar3D() {
    //------------------------------------------ RECORRIDO QUE EJECUTARA TODO EL CODIGO ------------------------------------------
    let ambito = new Ambito();
    let listaInstrucciones = getInstrucciones();
    if (listaInstrucciones != null) {
        let instruccionCuerpo = new Instruccion(listaInstrucciones, ambito);
        instruccionCuerpo.ejecutar();
    }

    if (!$("#consolaTarget").is(":visible")) $("#consolaTarget").toggle();
}

/**
 * NOS DEVUELVE EL CONJUNTO DE INSTRUCCIONES DEL ANALISIS DE UN CODIGO 3D PARA EJECUTAR
 */
function getInstrucciones() {
    let codigo = editorActual.editor.getValue();
    inicializarDatos();

    Gramatica.parse(codigo);
    let listaInstrucciones = Gramatica.arbol.raiz;
    if (Gramatica.arbol.errores.length > 0) {
        Gramatica.arbol.errores.forEach(element => {
            addMensajeError(
                element.tipo,
                element.mensaje,
                element.linea,
                element.columna
            );
        });
        Gramatica.arbol.errores = [];
        return null;
    }
    return listaInstrucciones;
}

/**
 * INICIALIZA TODAS LAS VARIABLES Y ESTRUCTURAS
 */
function inicializarDatos() {
    listaSalida = [];
    listaFuncion = [];
    listaEtiquetas = [];
    H = 0;
    P = 0;
    document.getElementById("consolaTarget").innerHTML = "";
}

/**
 * MENSAJE DE ERROR
 * @param {*} tipo
 * @param {*} mensaje
 * @param {*} linea
 * @param {*} columna
 */
function addMensajeError(tipo, mensaje, linea, columna) {
    let salida =
        '<p class="messageError"> > ' +
        tipo +
        ": " +
        mensaje +
        ", Linea: " +
        linea +
        ", Columna: " +
        columna +
        "</p>";
    $("#consolaTarget").append(salida);
}

/**
 * CONSOLA NORMAL
 * @param {} mensaje
 */
function addMessage(mensaje) {
    let salida = '<spam class="message">' + mensaje + "</spam>";
    $("#consolaTarget").append(salida);
}

/**
 * SE ENCARGARA DE TRADUCIR DE 3D A ASSEMBLER
 */
$("#translateButton").on("click", function (e) {
    if (editorActual.tipo === 1) {
        //------------------------------------------ RECORRIDO QUE EJECUTARA TODO EL CODIGO ------------------------------------------
        let ambito = new Ambito3D();
        let listaInstrucciones = getInstrucciones3D();
        if (listaInstrucciones != null) {
            let codigo = "";

            /**
             * ALMACENAMOS LAS ETIQUETAS
             */
            listaInstrucciones.forEach(element => {
                if (element instanceof Etiqueta3D) element.ejecutarFirst(ambito);
            });

            /**
             * HACE UNA PASADA BUSCANDO FUNCIONES
             */
            listaInstrucciones.forEach(element => {
                if (element instanceof Funcion3D) {
                    let encontrado = ambito.buscarFuncion(element.nombre.toLowerCase());
                    if (encontrado != null)
                        addMensajeError(
                            "Semantico",
                            "La funcion: " + element.nombre.toLowerCase() + " ya existe",
                            element.l,
                            element.c
                        );
                    else ambito.agregarFuncion(element.nombre.toLowerCase());
                }
            });

            listaInstrucciones.forEach(element => {
                if (!(element instanceof Funcion3D)) {
                    let res = element.ejecutar(ambito);
                    if (!(res instanceof Error3D)) codigo += "\n" + res.codigo;

                }
            });

            let codigoTemp = "";
            listaInstrucciones.forEach(element => {
                if (element instanceof Funcion3D) {
                    let res = element.ejecutar(ambito);
                    if (!(res instanceof Error3D)) codigoTemp += "\n" + res.getcodigo();
                }
            })

            armarAssembler(codigo, ambito.getTemporales(), codigoTemp);


        }
    }
});

/**
 * NOS DEVUELVE EL CONJUNTO DE INSTRUCCIONES DEL ANALISIS DE UN CODIGO 3D PARA TRADUCIR
 */
function getInstrucciones3D() {
    let codigo = editorActual.editor.getValue();

    Gramatica3D.parse(codigo);
    let listaInstrucciones = Gramatica3D.arbol.raiz;

    if (Gramatica3D.arbol.errores.length > 0) {
        Gramatica3D.arbol.errores.forEach(element => {
            addMensajeError(
                element.tipo,
                element.mensaje,
                element.linea,
                element.columna
            );
        });
        return null;
    }
    return listaInstrucciones;
}


/**
 * FUNCION ENCARGADA DE ARMAR EL CUERPO DEL ASSEMBLER
 * @param {*} cuerpo 
 * @param {*} ambito
 */
function armarAssembler(cuerpo, listaTemporales, funciones) {
    let codigo = Generador.getEncabezado();
    codigo += "\n" + Generador.getDeclaraciones(listaTemporales);
    codigo += "\n.CODE";
    codigo += "\nMAIN PROC FAR";
    codigo += "\nMOV AX,@DATA";
    codigo += "\nMOV DS,AX";
    codigo += "\nMOV H,0d";
    codigo += "\nMOV P,0d";
    codigo += "\n" + cuerpo;
    codigo += "\nMOV AH,4CH";
    codigo += "\nINT 21H";
    codigo += "\nMAIN ENDP";
    codigo += "\n" + Generador.funcionPrint();
    codigo += "\n" + funciones;
    codigo += "\nEND MAIN";
    newAssembler(codigo);
    //console.log(codigo);

}


/**
 * METODO QUE SE ENCARGARA DE PARA EL DEBUG
 */
$("#stopDebug").on("click", function (e) {
    if(markedText) markedText.clear();
    $("#debugTarget").toggle();
    document.getElementById("bodyInfo").style.visibility = "hidden";
});