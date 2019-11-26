<h1 align="center">
  <br>
  <a></a>
  <br>
 DOSLANG
  <br>
</h1>

<h4 align="center">Doslang(client) es una aplicacion desarrollada en html5,css3,javascript y typescript. El editor permite un lenguaje de alto nivel(Pascal) para su traduccion, un lenguaje de bajo nivel(Cuadruplos) para su ejecucion,debug, optimizacion y traduccion a Ensamblador</h4>


  [![GitHub issues](https://img.shields.io/github/issues/Naereen/StrapDown.js.svg)](https://github.com/wolfghost9898/doslang-client/issues) [![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)  

<p align="center">
  <a href="#instalar">Instalar</a> •
  <a href="#paquetes">Paquetes</a>•
  <a href="#como-funciona">Como Funciona</a> •
  <a href="#license">Licencia</a>•
  <a href="#soporte">Soporte</a>
</p>

![screen](https://user-images.githubusercontent.com/20384738/69673273-9373d180-105f-11ea-8e5b-9c8b808513e9.png)

## Instalar

Para clonar esta aplicacion necesitas tener instalado [Git](https://git-scm.com) and [Nodejs](https://nodejs.org/es/)

```bash
# Clonar el repositorio
$ git https://github.com/wolfghost9898/doslang-client

# Entrar a la carpeta
$ cd doslang-client

# Ejecutar la aplicacion
$ node index.js
```

Nota: Para ejecutar el proyecto es necesario tener instaladas los package necesarios.



## Como Funciona
>La comunicacion de servidor-cliente se realiza a traves de sockets con la parte del [servidor](https://github.com/wolfghost9898/doslang-server)
### Pascal
>El editor permite escribir un codigo de alto nivel en el lenguaje pascal. 
>Se procede a compilar el lenguaje. Si hay errores lexicos,sintactico o semanticos se mostraran en consola: 
>![errores](https://user-images.githubusercontent.com/20384738/69673329-aededc80-105f-11ea-9293-b434b87c126c.png)

>Si la compilacion fue exitos en otra pestaña con el lenguaje de cuadruplos generado.

>![cuadruplos](https://user-images.githubusercontent.com/20384738/69673395-d5047c80-105f-11ea-905a-54dcdb9cf205.png)

### Cuadruplos
>El editor permite escribir un lenguaje de bajo nivel(Cuadruplos).
* Ejecutar
	> Analisis lexico,sintactico y semantico, si llegara a existir un error en
	esta parte de la ejecucion se reportara en la consola.
	> Si no existe ningun error se ejecuta el codigo de bajo nivel
	
	>![ejecutarCuadruplo](https://user-images.githubusercontent.com/20384738/69673433-eb123d00-105f-11ea-870a-4ffc78d52565.png)

* Debug
	> El editor de texto permite hacer debug al codigo de bajo nivel.
	-Mostrando las estructuras de stack y heap, y su cambio en el tiempo de ejecucion.
	-Mostrando la linea en ejecucion
	-Mostrando la salida en consola
	![i8](https://user-images.githubusercontent.com/20384738/69673720-928f6f80-1060-11ea-981f-069304a1c410.png)
* Optimizar 
	> El editor permite optimizar el codigo de cuadruplos aplicacion 15  reglas especificadas en el enunciado
	
	>![optimizacion](https://user-images.githubusercontent.com/20384738/69673466-011ffd80-1060-11ea-9220-78649ef13735.png)

* Traducir
	> El editor realiza un analisis lexico,sintactico,semantico del codigo de cuadruplos y si no existe ningun error procede a su traduccion a ensamblador.
### Ensamblador
> El editor permite la visualizacion del codigo ensamblador

>![ensamblador](https://user-images.githubusercontent.com/20384738/69673509-0da45600-1060-11ea-859f-3e8c1288d222.png)


## Paquetes
### Express
```bash
$ npm i express
```
### FS
```bash
$ npm i fs
```
### Socket io
```bash
$ npm i socket.io
```
### Body-Parser
```bash
$ npm i body-parser
```
### Jison
>[Analizador](https://zaa.ch/jison/) Lexico-Sintactico
```bash
$ npm i jison
```






## License
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**

## Soporte


- Twitter at <a href="https://twitter.com/cehernandezz" target="_blank">`@cehernandezz`</a>

---

