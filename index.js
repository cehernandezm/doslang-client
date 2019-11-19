const http = require('http');

const express = require('express');

const app = express();

const path = require('path');

const server = require('http').createServer(app);

const files = './public/Files/';

const fs = require('fs');

const bodyParser = require('body-parser');


//---------------------------------------------------- Configuracion del Servidor-----------------------------
const hostname = '127.0.0.1';
const port = 3000;


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencode





//---------------------------------------------------- CONFIGURACION PARA EL SOCKET --------------------------
const io = require('socket.io').listen(server);
io.on('connection',(socket)=>{
  console.log("usuario conectado");
  socket.on('result',(data)=>{
    socket.broadcast.emit('resultadoAnalisis',data); //-------------------- ENVIAMOS UNA SEÑAL AL WEBSOCKET EN JS -----
  });
});

















app.use(express.static('public'));


app.get("/", function (solictud, respuesta) {
  respuesta.sendFile(path.join(__dirname + '/public/Pages/index.html'));
});



app.post("/readFiles", function (solicitud, respuesta) {
  let code = solicitud.body.cuerpo;
  let allFiles = [];
  let codigo = [];

  codigo.push({"name": "principal","body":code}); // Es el principal

  fs.readdirSync(files).forEach(file => {
    allFiles.push(file);
  });

  allFiles.forEach(element =>{
    let dir = path.join(__dirname,'/public/Files/' + element);
    let content = fs.readFileSync(dir,).toString('utf8');
    element = (element.split("."))[0];
    let newFile = {"name": element , "body": content };
    codigo.push(newFile);

  })
  let json = JSON.stringify(codigo);
  io.emit('sendCode',json);
  respuesta.sendStatus(200);
  
 

  
});


app.get('*', function (solictud, respuesta) {
  respuesta.send("Error 404");
});

//------------------------------------------------- Configuracion de IP Y PUERTO -------------------------------------------------
server.listen(port, hostname, () => {
  console.log("Cliente Iniciado");
});