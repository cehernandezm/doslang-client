const http = require('http');

const express = require('express');

const app = express();

const path = require('path');

const server=require('http').createServer(app);



//---------------------------------------------------- Configuracion del Servidor-----------------------------
const hostname = '127.0.0.1';
const port = 3000;








//---------------------------------------------------- CONFIGURACION PARA EL SOCKET --------------------------
const portSocket = 2500;
const ipSocket = 'localhost';

var net = require('net');

var client = new net.Socket();





app.use(express.static('public'));


app.get("/",function(solictud,respuesta){
    respuesta.sendFile(path.join(__dirname + '/public/Pages/index.html'));
});

app.get("/sendCode",function(solictud,respuesta){
    client = net.connect(portSocket,ipSocket);
    client.setEncoding('utf8');
    client.write("Holaaas");
    client.write("tu culo\n");
    
    client.on('data',function(data){
      console.log(data);
      client.end();
    });
    //client.destroy();
    
});


app.get('*',function(solictud,respuesta){
    respuesta.send("Error 404");
});

//------------------------------------------------- Configuracion de IP Y PUERTO -------------------------------------------------
server.listen(port,hostname,()=>{
  console.log("Cliente Iniciado");
});