var listaSalida = [];
var listaEtiquetas = [];
var listaFuncion = [];
var listaEditores = [];

var TabId = 0;

var H = 0;
var P = 0;
$("#compiler").on("click", function(e) {
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
    if (element instanceof Etiqueta) element.ejecutar();
    else if (element instanceof Funcion) {
      if (buscarFuncion(element.id) === null)
        listaFuncion.push({ nombre: element.id, funcion: element });
      else
        listaSalida.push(
          new MensajeError(
            "Semantico",
            "La funcion " + element.id + " ya existe",
            element.l,
            element.c
          )
        );
    }
  });

  //------------------------------------------ RECORRIDO QUE EJECUTARA TODO EL CODIGO ------------------------------------------
  let ambito = new Ambito();

  for (let i = 0; i < listaInstrucciones.length; i++) {
    let element = listaInstrucciones[i];
    if (element instanceof Etiqueta || element instanceof Funcion) {
    } else {
      if (element instanceof Incondicional) {
        let posicion = element.ejecutar(ambito);
        if (posicion != -1) i = redirigir(listaInstrucciones, posicion, i);
      } else if (element instanceof Condicional) {
        let posicion = element.ejecutar(ambito);
        if (posicion != -1) i = redirigir(listaInstrucciones, posicion, i);
      } else element.ejecutar(ambito);
    }
  }

  for (let i = 0; i < 10; i++) {
    console.log(ambito.Stack[i]);
  }

  console.log("---------------------HRAp----------------------------");
  ambito.Heap.forEach(element => {
    console.log(element);
  });
  console.log("---------------------ERRORES----------------------------");
  consolaSalida = "";
  listaSalida.forEach(element => {
    if (element instanceof MensajeError) console.error(element);
    else consolaSalida += element;
  });
  console.log(consolaSalida);
});

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
    editor : editor,
    id : "Tab" + TabId,
    tab : "nav-" + TabId,
    breakpoins : []
  };

  editor.on("gutterClick", function(cm, n) {
    var info = cm.lineInfo(n);
    addBreakPoint(objectEditor.breakpoins,info.line);
    console.log(objectEditor.breakpoins);
    cm.setGutterMarker(n,"breakpoints",info.gutterMarkers ? null : makeMarker()
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
function addBreakPoint(breakpoins,linea){
    let flag = 1;
    for(let i = 0; i < breakpoins.length; i++){
        if(breakpoins[i] === (linea + 1)){
            breakpoins.splice(i,1);
            flag = 0;
            break;
        }
    }
    if(flag) breakpoins.push(linea + 1);
}

/**
 * MUESTRA LA NUEVA PESTAÑA
 */
$("#nav-tab").on("click", "a", function(e) {
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
function getEditor(id){
    for(let i = 0; i < listaEditores.length;i++){
        if(listaEditores[i].id === id) return listaEditores[i].tab;
    }
    return null;
}
