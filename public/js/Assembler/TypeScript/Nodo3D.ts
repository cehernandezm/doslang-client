class Nodo3D{
    private codigo: String;
    private tipo:Tipo;
    private resultado: String;
    

    constructor(codigo:String,tipo:Tipo){
        this.codigo = codigo;
        this.tipo = tipo;
    }



    /**
     * Getter $codigo
     * @return {String}
     */
	public getcodigo(): String {
		return this.codigo;
	}

    /**
     * Setter $codigo
     * @param {String} value
     */
	public setcodigo(value: String) {
		this.codigo = value;
	}
    

    /**
     * Getter $tipo
     * @return {Tipo}
     */
	public get $tipo(): Tipo {
		return this.tipo;
	}

    /**
     * Setter $tipo
     * @param {Tipo} value
     */
	public set $tipo(value: Tipo) {
		this.tipo = value;
	}
    

    /**
     * Getter $resultado
     * @return {String}
     */
	public getResultado(): String {
		return this.resultado;
	}

    /**
     * Setter $resultado
     * @param {String} value
     */
	public set $resultado(value: String) {
		this.resultado = value;
	}
    
    
    
}