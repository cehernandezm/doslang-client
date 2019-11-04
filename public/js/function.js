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
$("#newPascal").on("click", function(e) {
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
$("#new3D").on("click", function(e) {
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
  let editor = CodeMirror.fromTextArea(cuerpo, prefEditor3D);
  editor.setSize(null, "100%");

  let objectEditor = {
    editor: editor,
    id: "Tab" + TabId,
    tab: "nav-" + TabId,
    breakpoins: [],
    tipo: 1
  };

  editor.on("gutterClick", function(cm, n) {
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

  editor.refresh;

  $("#nav-tab a").click();
  TabId++;
});

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
$("#nav-tab").on("click", "a", function(e) {
  let href = $(this).attr("href");
  href = href.slice(1);

  editorActual = listaEditores.find(function(element) {
    return element.tab === href;
  });

  $(this).tab("show");
});

/**
 * BORRA UNA PESTAÑA ACTUAL
 */

$("#nav-tab").on("click", ".badge", function() {
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
$("#consolaClick").on("click", function(e) {
  $("#consolaTarget").toggle();
});

/**
 * INICIAR DEBUG
 */

$("#debugButton").on("click", function(e) {
  $("#debugTarget").toggle();
  let firstIndex = editorActual.breakpoins[0];
  //------------------------------------------ RECORRIDO QUE EJECUTARA TODO EL CODIGO ------------------------------------------
  let ambito = new Ambito();
  let listaInstrucciones = getInstrucciones();
  if (listaInstrucciones != null) {
    instruccionesDebug = new Instruccion(listaInstrucciones, ambito);
    let index = instruccionesDebug.ejecutarDebugger(firstIndex);

    markedText = editorActual.editor.markText(
      { line: index, ch: 0 },
      { line: index, ch: 100 },
      { className: "styled-background" }
    );
  }

  if (!$("#consolaTarget").is(":visible")) $("#consolaTarget").toggle();
});

$("#nextStep").on("click", function(e) {
  let index = instruccionesDebug.siguienteDebug();
  markedText.clear();
  if (index === -777) {
    $("#debugTarget").toggle();
  } else {
    jumpToLine(index);
    markedText = editorActual.editor.markText({ line: index, ch: 0 }, { line: index, ch: 100 }, { className: "styled-background" });
  }
});

function jumpToLine(i) {
  editorActual.editor.setCursor(i);
  
}

/**
 * METODO ENCARGADO DE EJECUTAR,TRADUCIR
 */
$("#playButton").on("click", function(e) {
  e.preventDefault();
  if (editorActual) {
    switch (editorActual.tipo) {
      //------------------------------------- EJECUTAR 3D -----------------------------------------------------------------------
      case 1:
        ejecutar3D();
        break;
    }
  }
});

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
  let salida = '<p class="message"> > ' + mensaje + "</p>";
  $("#consolaTarget").append(salida);
}
