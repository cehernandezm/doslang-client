%lex

%options case-insensitive

%%
[ \r\t\n]+                                  {}
[0-9]+                                      return 'ENTERO'
"+"                                         return 'MAS'
","                                         return 'COMA'
"T"[0-9]+                                   return 'TEMPORAL'
"L"[0-9]+                                   return 'ETIQUETA'

<<EOF>>                                     {}
.					                        { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

%start inicio
%%

/*
* ANALISIS SINTACTICO
*/
inicio: instrucciones                                {parser.arbol.raiz = $1}
      | error                                        { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
      ;


instrucciones : instrucciones instruccion            {$$ = $1; $$.push($2);}
              | instruccion                          {$$ = []; $$.push($1);}
              ;


instruccion : asignacion                             {$$ = $1}
            ;

asignacion : MAS COMA e COMA e COMA TEMPORAL          {$$ = new Asignacion($3,$5,"suma",$7);}
           ;




e : ENTERO                                   {$$ = {tipo : "int", valor: $1};}
  | TEMPORAL                                 {$$ = {tipo : "temporal", valor: $1};}
  ;
%%

parser.arbol = {
    raiz: null
};