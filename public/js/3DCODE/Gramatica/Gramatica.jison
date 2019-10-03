%lex

%options case-insensitive

%%
[ \r\t\n]+                                  {} // ESPACIOS
\/\/.([^\n])*                               {} // COMENTARIO SIMPLE
\/\*(.?\n?)*\*\/                             {} // COMENTARIO MULTILINEA
[0-9]+("."[0-9]+)                           return 'DECIMAL'
[0-9]+                                      return 'ENTERO'
"+"                                         return 'MAS'
"="                                         return "IGUAL"
","                                         return 'COMA'
"HEAP"                                      return 'HEAP'
"H"                                         return 'H'
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
           | IGUAL COMA e COMA e COMA HEAP            {$$ = new Asignacion($3,$5,"asignarheap",$7);}
           | MAS COMA e COMA e COMA H              {$$ = new Asignacion($3,$5,"aumentarheap",$7);}
           ;




e : ENTERO                                   {$$ = {tipo : "int", valor: $1, linea: @1.first_line, columna: @1.first_column};}
  | TEMPORAL                                 {$$ = {tipo : "temporal", valor: $1, linea: @1.first_line, columna: @1.first_column};}
  | DECIMAL                                  {$$ = {tipo: "double", valor:  $1, linea: @1.first_line, columna: @1.first_column};}
  | H                                        {$$ = {tipo: "posHeap", valor:  $1, linea: @1.first_line, columna: @1.first_column};} 
  ;
%%

parser.arbol = {
    raiz: null
};