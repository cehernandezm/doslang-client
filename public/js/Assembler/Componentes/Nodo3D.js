var Nodo3D = /** @class */ (function () {
    function Nodo3D(codigo, tipo) {
        this.codigo = codigo;
        this.tipo = tipo;
    }
    /**
     * Getter $codigo
     * @return {String}
     */
    Nodo3D.prototype.getcodigo = function () {
        return this.codigo;
    };
    /**
     * Setter $codigo
     * @param {String} value
     */
    Nodo3D.prototype.setcodigo = function (value) {
        this.codigo = value;
    };
    Object.defineProperty(Nodo3D.prototype, "$tipo", {
        /**
         * Getter $tipo
         * @return {Tipo}
         */
        get: function () {
            return this.tipo;
        },
        /**
         * Setter $tipo
         * @param {Tipo} value
         */
        set: function (value) {
            this.tipo = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Getter $resultado
     * @return {String}
     */
    Nodo3D.prototype.getResultado = function () {
        return this.resultado;
    };
    Object.defineProperty(Nodo3D.prototype, "$resultado", {
        /**
         * Setter $resultado
         * @param {String} value
         */
        set: function (value) {
            this.resultado = value;
        },
        enumerable: true,
        configurable: true
    });
    return Nodo3D;
}());
