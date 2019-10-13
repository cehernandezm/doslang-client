%lex

%options case-insensitive

%%
[ \r\t\n]+                                  {} // ESPACIOS
\/\/.([^\n])*                               {} // COMENTARIO SIMPLE
\/\*(.?\n?)*\*\/                             {} // COMENTARIO MULTILINEA
[0-9]+("."[0-9]+)                           return 'DECIMAL'
[0-9]+                                      return 'ENTERO'
"-"[0-9]+("."[0-9]+)                        return 'DECIMAL'
"-"[0-9]+                                   return 'ENTERO'
"+"                                         return 'MAS'
"-"                                         return 'MENOS'
"*"                                         return 'POR'
"/"                                         return 'DIVIDIR'
"%"                                         return 'MODULO'
"^"                                         return 'POTENCIA'
"="                                         return "IGUAL"
","                                         return 'COMA'
":"                                         return 'DSPUNTOS'
"("                                         return 'PARIZQ'
")"                                         return 'PARDER'
"HEAP"                                      return 'HEAP'
"STACK"                                     return 'STACK'
"E"                                         return 'IE'
"C"                                         return 'IC'
"D"                                         return 'ID'
"PRINT"                                     return 'PRINT'
"H"                                         return 'H'
"P"                                         return 'P'
"Jmp"                                       return 'JMP'
"Je"                                        return 'JE'
"Jne"                                       return 'JNE'
"Jg"                                        return 'JG'
"Jl"                                        return "JL"
"Jge"                                       return "JGE"
"Jle"                                       return "JLE"
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
inicio: instrucciones                                {parser.arbol.raiz = $1; parser.linea = 0;}
      | error                                        { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
      ;


instrucciones : instrucciones instruccion            {$$ = $1; $$.push($2); parser.linea++;}
              | instruccion                          {$$ = []; $$.push($1); parser.linea++;}
              ;


instruccion : asignacion                             {$$ = $1;}
            | etiqueta                               {$$ = $1;}
            | incondicional                          {$$ = $1;}
            | condicional                            {$$ = $1;}
            | imprimir                               {$$ = $1;}
            ;

asignacion : operacion COMA e COMA e2 COMA TEMPORAL          {$$ = new Asignacion($3,$5,$1,$7,@1.first_line,@1.first_column,parser.linea);} // T = e op e
           | operacion COMA e COMA e2 COMA estructura        {$$ = new Asignacion($3,$5,$1,$7,@1.first_line,@1.first_column,parser.linea);} // H|S [e] = e;
           | operacion COMA e COMA e2 COMA H                 {$$ = new Asignacion($3,$5,$1,"h",@1.first_line,@1.first_column,parser.linea);}// H = H op e
           | operacion COMA e COMA e2 COMA P                 {$$ = new Asignacion($3,$5,$1,"p",@1.first_line,@1.first_column,parser.linea);}// P = P op e
           | operacion COMA e COMA  COMA TEMPORAL            {$$ = new Asignacion($3,null,$1,$6,@1.first_line,@1.first_column,parser.linea);}// T = e
           ;


estructura : HEAP                                           {$$ = "heap";}
           | STACK                                          {$$ = "stack";}
           ;


operacion : MAS                                             {$$ = "suma";}
          | MENOS                                           {$$ = "resta";}
          | POR                                             {$$ = "multiplicacion";}
          | DIVIDIR                                         {$$ = "division";}
          | MODULO                                          {$$ = "modulo";}
          | POTENCIA                                        {$$ = "potencia";}
          | IGUAL                                           {$$ = "igual";}
          ;

e : ENTERO                                   {$$ = new Valor({tipo : "int", valor: $1, linea: @1.first_line, columna: @1.first_column});}
  | NENTERO                                  {$$ = new Valor({tipo : "int", valor: $1, linea: @1.first_line, columna: @1.first_column});}
  | TEMPORAL                                 {$$ = new Valor({tipo : "temporal", valor: $1, linea: @1.first_line, columna: @1.first_column});}
  | DECIMAL                                  {$$ = new Valor({tipo: "double", valor:  $1, linea: @1.first_line, columna: @1.first_column});}
  | H                                        {$$ = new Valor({tipo: "h", valor:  $1, linea: @1.first_line, columna: @1.first_column});}
  | P                                        {$$ = new Valor({tipo: "p", valor:  $1, linea: @1.first_line, columna: @1.first_column});}
  | estructura                               {$$ = new Valor({tipo: $1, valor:  $1, linea: @1.first_line, columna: @1.first_column});}
  ;

e2 : ENTERO                                   {$$ = new Valor({tipo : "int", valor: $1, linea: @1.first_line, columna: @1.first_column});}
   | NENTERO                                  {$$ = new Valor({tipo : "int", valor: $1, linea: @1.first_line, columna: @1.first_column});}
   | TEMPORAL                                 {$$ = new Valor({tipo : "temporal", valor: $1, linea: @1.first_line, columna: @1.first_column});}
   | DECIMAL                                  {$$ = new Valor({tipo: "double", valor:  $1, linea: @1.first_line, columna: @1.first_column});}
   | H                                        {$$ = new Valor({tipo: "h", valor:  $1, linea: @1.first_line, columna: @1.first_column});}
   | P                                        {$$ = new Valor({tipo: "p", valor:  $1, linea: @1.first_line, columna: @1.first_column});}
   ;


etiqueta : ETIQUETA DSPUNTOS                 {$$ = new Etiqueta($1,@1.first_line,@1.first_column,parser.linea);}
         ;


incondicional : JMP COMA COMA COMA ETIQUETA     { $$ = new Incondicional(parser.linea,@1.first_line,@1.first_column, $5);}
              ;

condicional : operador COMA e2 COMA e2 COMA ETIQUETA       {$$ = new Condicional(parser.linea,@1.first_line,@1.first_column,$1,$3,$5,$7);}
            ;

operador : JE                   {$$ = "=="}
         | JNE                  {$$ = "!="}
         | JG                   {$$ = ">"}
         | JL                   {$$ = "<"}
         | JGE                  {$$ = ">="}
         | JLE                  {$$ = "<="}
         ;



imprimir : PRINT PARIZQ MODULO IE COMA e2 PARDER    { $$ = new Print(0,$6,@1.first_line,@1.first_column,parser.linea); }
         | PRINT PARIZQ MODULO IC COMA e2 PARDER    { $$ = new Print(1,$6,@1.first_line,@1.first_column,parser.linea); }
         | PRINT PARIZQ MODULO ID COMA e2 PARDER    { $$ = new Print(2,$6,@1.first_line,@1.first_column,parser.linea); }      
         ;

%%

parser.arbol = {
    raiz: null
};

parser.linea = 0;