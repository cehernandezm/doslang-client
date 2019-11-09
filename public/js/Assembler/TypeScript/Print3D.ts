class Print3D{
    operacion : number;
    valor : Valor3D;
    l : number;
    c : number;

    /**
     * CONSTRUCTOR DE LA CLASE
     * @param operacion 
     * @param valor 
     * @param l 
     * @param c 
     */
    constructor(operacion:number,valor:Valor3D,l:number,c:number){
        this.operacion = operacion;
        this.valor = valor;
        this.l = l;
        this.c = c;
    }


    ejecutar(ambito:Ambito3D){
        let nodoIzq = this.valor.ejecutar(ambito);
        if( nodoIzq instanceof Error3D) return nodoIzq;
        let codigo:String = nodoIzq.getcodigo();

        //------------------------------ ENTERO | DECIMAL ----------------------------------------------
        if(this.operacion === 0 || this.operacion === 2){
            codigo += Generador.guardarMov("AX",nodoIzq.getResultado(),"Guardamos en memoria a " + nodoIzq.getResultado());
            codigo += Generador.llamarProc("Print","Llamamos la funcion print que se encargara de mostrar el numero");
        }
        else{
            codigo += Generador.guardarMov("DL",nodoIzq.getResultado(),"guardamos el ascii a mostrar: " +  nodoIzq.getResultado());
            codigo += Generador.guardarMov("AH","02H","Interrupcion para mostrar un caracter");
            codigo += Generador.interrupcion("21H","Interrupcion para mostrar un caracter");
        }
        let nodo = new Nodo3D(codigo,null);
        return nodo;
    }
}