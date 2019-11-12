var Generador = /** @class */ (function () {
    function Generador() {
    }
    /**
     * GUARDA UN MOVIMIENTO
     * @param destino
     * @param origen
     * @param comentario
     */
    Generador.guardarMov = function (destino, origen, comentario) {
        return "\nMOV " + destino + ", " + origen + "                              ;" + comentario;
    };
    Generador.guardarMovEspecial = function (destino, origen, comentario) {
        var codigo = "\nMOV AX," + origen;
        codigo += "\nMOV " + destino + ", AX" + "                              ;" + comentario;
        return codigo;
    };
    /**
     * GUARDA UNA SUMA
     * @param destino
     * @param origen
     * @param comentario
     */
    Generador.guardarAdd = function (destino, origen, comentario) {
        var codigo = "\nMOV AX," + destino;
        codigo += "\nADD AX," + origen + "                              ;" + comentario;
        return codigo;
    };
    /**
     * GUARDA UNA RESTA
     * @param destino
     * @param origen
     * @param comentario
     */
    Generador.guardarSub = function (destino, origen, comentario) {
        var codigo = "\nMOV AX," + destino;
        codigo += "\nSUB AX," + origen + "                              ;" + comentario;
        return codigo;
    };
    /**
     * GUARDA UNA MULTIPLICACION
     * @param destino
     * @param origen
     * @param comentario
     */
    Generador.guardarMul = function (destino, origen, comentario) {
        var codigo = "\nMOV AX," + destino;
        codigo += "\nMOV BX," + origen;
        codigo += "\nMUL BX" + "                              ;" + comentario;
        return codigo;
    };
    /**
     * REALIZA UNA DIVISION
     * @param destino
     * @param comentario
     */
    Generador.guardarDiv = function (destino, origen, comentario) {
        var codigo = "\nMOV AX," + destino;
        codigo += "\nXOR DX,DX";
        codigo += "\nMOV BX," + origen;
        codigo += "\nDIV BX" + "                              ;" + comentario;
        return codigo;
    };
    /**
     * LLAMAR A UN PROCEDURE
     * @param nombre
     * @param comentario
     */
    Generador.llamarProc = function (nombre, comentario) {
        return "\nCALL " + nombre + "                              ;" + comentario;
    };
    /**
     * GENERA EL CODIGO DE UN SALTO INCONDICIONAL
     * @param etiqueta
     */
    Generador.saltoIncondicional = function (etiqueta) {
        return "\nJMP " + etiqueta;
    };
    /**
     * COMPARA DOS NUMEROS
     * @param izq
     * @param der
     */
    Generador.comparador = function (izq, der, comentario) {
        var codigo = "\nMOV CX," + izq;
        codigo += "\nCMP CX," + der + "                              ;" + comentario;
        return codigo;
    };
    /**
     * GENERAMOS CODIGO ASSEMBLER SEGUN EL TIPO DE COMPARACION
     * @param operacion
     * @param etiqueta
     * @param comentario
     */
    Generador.tipoComparacion = function (operacion, etiqueta, comentario) {
        return "\n" + operacion + " " + etiqueta + "                              ;" + comentario;
    };
    /**
     * MUESTRA UNA INTERRUPCION
     * @param i
     * @param comentario
     */
    Generador.interrupcion = function (i, comentario) {
        return "\nINT " + i + "                              ;" + comentario;
    };
    Generador.arreglarIndice = function () {
        var codigo = this.guardarMov("bx", "2d", "Multiplicamos por 2");
        codigo += "\nMUL bx";
        return codigo;
    };
    /**
     * DEVUELVE EL CODIGO ASSEMBLER DE LA FUNCION PRINT
     */
    Generador.funcionPrint = function () {
        return 'PRINT PROC\n' +
            ';initilize count\n' +
            'mov cx,0\n' +
            'mov dx,0\n' +
            'cmp ax,0\n' +
            'je printcero\n' +
            'label1:\n' +
            '; if ax is zero\n' +
            'cmp ax,0\n' +
            'je print1\n' +
            ';initilize bx to 10 \n' +
            'mov bx,10\n' +
            '; extract the last digit\n' +
            'div bx\n' +
            ';push it in the stack\n' +
            'push dx\n' +
            ';increment the count\n' +
            'inc cx\n' +
            ';set dx to 0\n' +
            'xor dx,dx\n' +
            'jmp label1\n' +
            'print1:\n' +
            ';check if count\n' +
            ';is greater than zero\n' +
            'cmp cx,0\n' +
            'je exit\n' +
            ';pop the top of stack\n' +
            'pop dx\n' +
            ';add 48 so that it\n' +
            ';represents the ASCII\n' +
            ';value of digits\n' +
            'add dx,48\n' +
            ';interuppt to print a\n' +
            ';character\n' +
            'mov ah,02h\n' +
            'int 21h\n' +
            ';decrease the count\n' +
            'dec cx\n' +
            'jmp print1\n' +
            'printcero:\n' +
            'mov dx,48\n' +
            'mov ah,02h\n' +
            'int 21h\n' +
            'jmp exit\n' +
            'exit:\n' +
            'ret\n' +
            'PRINT ENDP\n';
    };
    /**
     * OBTENEMOS LAS DECLARACIONES DE TODOS LOS TEMPORALES EN CODIGO ASSEMBLER
     * @param listado
     */
    Generador.getDeclaraciones = function (listado) {
        var codigo = "";
        listado.forEach(function (element) {
            codigo += element.nombre + " dw ?\n";
        });
        return codigo;
    };
    /**
     * OBTENEMOS EL CODIGO DEL ENCABEZADO EN CODIGO ASSEMBLER
     */
    Generador.getEncabezado = function () {
        var codigo = "";
        codigo = '.MODEL SMALL\n' +
            '.STACK 100H\n' +
            '.DATA\n' +
            'S dw 500 DUP(?)\n' +
            'He dw 1000 DUP(?)\n' +
            'tP dw 0' +
            'tH dw 0';
        return codigo;
    };
    return Generador;
}());
