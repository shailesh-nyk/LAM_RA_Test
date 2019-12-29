//configs & dependencies
const express = require('express');
const app = express();
const logger = require('morgan');
var configs = require('./config');
var constants = require('./constants');
var check_status_service = require('./services/check_status_service');
const fs = require('fs');
var path = require('path');

//CLEAR OLD LOGS
fs.readdir("./logs", function (err, files) {
    files.forEach(function (file, index) {
        fs.writeFileSync(path.join("./logs", file), "");
    });
});

//HTTP SETUP
app.use(express.json());
app.use(logger('dev'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

//SOCKET IO SETUP
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.set('socketio', io);

io.on('connection', function (socket) {
    socket.on('openSocket', function (id) {
      console.log("------------------------");
      console.log(`Socket ${socket.id} connected.`);
      console.log("------------------------");
      io.emit('status');
      setInterval(() => {
         io.emit('status');
      }, 30000)
   });
  
   socket.on('disconnect', function(){
      console.log("------------------------");   
      console.log(`Socket ${socket.id} disconnected.`);
      console.log("------------------------");
   });
});

//CONNECTION ON PORT 
const port = process.env.PORT || 3001;
server.listen(port, () => {
   console.log(`Listening on ${port}...`)
})

//ENDPOINTS
app.get('/api/', (req, res) => {
    res.send("Welcome!!!");
})

app.get('/status', (req,res) => {
    check_status_service.checkStatus((data) => {
        res.send(data)
   })
})

app.get('/restart', (req,res) => {
    let service = configs.service_list.find(svc => svc.svcID == req.query.svcID);
    service.restart_service(service, (data) => {
        res.send(data);
    } , (logs) => {
        io.emit('logs', logs);
    })
})

app.get('/stop', (req,res) => {
    let service = configs.service_list.find(svc => svc.svcID == req.query.svcID);
    service.stop_service(service, (data) => {
        res.send(data);
    } , (logs) => {
        io.emit('logs', logs);
    })
})

app.get('/details', (req,res) => {
    let service = configs.service_list.find(svc => svc.svcID == req.query.svcID);
    service.getDetails(service, (data) => {
        res.send(data);
    })
})

    