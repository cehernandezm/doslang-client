var editor;
$(document).ready(function(){
    var prefEditor = {
        lineNumbers : true,
        mode: "text/x-java",
        theme : "dracula"
    };

    var divEditable = document.getElementById("editorDeTexto");
    editor = CodeMirror(divEditable,prefEditor);
    editor.refresh();
});