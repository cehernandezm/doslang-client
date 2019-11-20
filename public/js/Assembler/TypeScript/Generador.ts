class Generador {

    /**
     * GUARDA UN MOVIMIENTO
     * @param destino 
     * @param origen 
     * @param comentario 
     */
    public static guardarMov(destino: String, origen: String, comentario: String) {
        return "\nMOV " + destino + ", " + origen + "                              ;" + comentario;

    }

    public static guardarMovEspecial(destino: String, origen: String, comentario: String) {
        let codigo = "\nMOV AX," + origen;
        codigo += "\nMOV " + destino + ", AX" + "                              ;" + comentario
        return codigo;

    }
    /**
     * GUARDA UNA SUMA
     * @param destino 
     * @param origen 
     * @param comentario 
     */
    public static guardarAdd(destino: String, origen: String, comentario: String) {
        let codigo = "\nMOV AX," + destino;
        codigo += "\nADD AX," + origen + "                              ;" + comentario
        return codigo;
    }

    /**
     * GUARDA UNA RESTA
     * @param destino 
     * @param origen 
     * @param comentario 
     */
    public static guardarSub(destino: String, origen: String, comentario: String) {
        let codigo = "\nMOV AX," + destino;
        codigo += "\nSUB AX," + origen + "                              ;" + comentario;
        return codigo;
    }

    /**
     * GUARDA UNA MULTIPLICACION
     * @param destino 
     * @param origen 
     * @param comentario 
     */
    public static guardarMul(destino: String, origen: String, comentario: String) {
        let codigo = "\nMOV AX," + destino;
        codigo += "\nMOV BX," + origen;
        codigo += "\nMUL BX" + "                              ;" + comentario
        return codigo;
    }

    /**
     * REALIZA UNA DIVISION
     * @param destino 
     * @param comentario 
     */
    public static guardarDiv(destino: String, origen: String, comentario: String) {
        let codigo = "\nMOV AX," + destino;
        codigo += "\nXOR DX,DX";
        codigo += "\nMOV BX," + origen;
        codigo += "\nDIV BX" + "                              ;" + comentario;
        return codigo;
    }

    /**
     * LLAMAR A UN PROCEDURE
     * @param nombre 
     * @param comentario 
     */
    public static llamarProc(nombre: String, comentario: String) {
        return "\nCALL " + nombre + "                              ;" + comentario;
    }

    /**
     * GENERA EL CODIGO DE UN SALTO INCONDICIONAL
     * @param etiqueta 
     */
    public static saltoIncondicional(etiqueta: String) {
        return "\nJMP " + etiqueta;
    }

    /**
     * COMPARA DOS NUMEROS
     * @param izq 
     * @param der 
     */
    public static comparador(izq: String, der: String, comentario: String) {
        let codigo = "\nMOV CX," + izq;
        codigo += "\nCMP CX," + der + "                              ;" + comentario
        return codigo;
    }

    /**
     * GENERAMOS CODIGO ASSEMBLER SEGUN EL TIPO DE COMPARACION
     * @param operacion 
     * @param etiqueta 
     * @param comentario 
     */
    public static tipoComparacion(operacion: String, etiqueta: String, comentario: String) {
        return "\n" + operacion + " " + etiqueta + "                              ;" + comentario;
    }

    /**
     * MUESTRA UNA INTERRUPCION
     * @param i 
     * @param comentario 
     */
    public static interrupcion(i: String, comentario: String) {
        return "\nINT " + i + "                              ;" + comentario;
    }


    public static arreglarIndice() {
        let codigo = this.guardarMov("bx", "2d", "Multiplicamos por 2");
        codigo += "\nMUL bx";
        return codigo;
    }

    /**
     * DEVUELVE EL CODIGO ASSEMBLER DE LA FUNCION PRINT
     */
    public static funcionPrint() {
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
            'PRINT ENDP\n'
    }

    /**
     * OBTENEMOS LAS DECLARACIONES DE TODOS LOS TEMPORALES EN CODIGO ASSEMBLER
     * @param listado 
     */
    public static getDeclaraciones(listado: any) {
        let codigo = "";
        listado.forEach(element => {
            codigo += element.nombre + " dw ?\n";
        });
        return codigo;
    }

    /**
     * DEVUELVE EL CODIGO ASSEMBLER DE LA FUNCION POTENCIA
     */
    public static funcionPotencia() {
        
        return 'POTENCIA PROC\n' +

        'cmp cx, 0\n' +
        'jg etiquetaLoop\n' +
        'mov ax, 1d\n' +
        'jmp exitPotencia\n' +

        'etiquetaLoop:\n' +
        'cmp cx, 1\n' +
        'jle exitPotencia\n' +
        'mul bx\n' +
        'dec cx\n' +
        'jmp etiquetaLoop\n' +




        'exitPotencia:\n' +
        'ret\n' +
        'POTENCIA ENDP\n';
    }

    /**
     * OBTENEMOS EL CODIGO DEL ENCABEZADO EN CODIGO ASSEMBLER
     */
    public static getEncabezado() {
        let codigo: String = "";
        codigo = '.MODEL SMALL\n' +
            '.STACK 100H\n' +
            '.DATA\n' +

            'S dw 1000 DUP(0d)\n' +
            'He dw 3000 DUP(0d)\n'
        return codigo;
    }
}