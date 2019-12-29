var axios = require('axios');
const { exec } = require('child_process');
const fs = require('fs');

module.exports.checkNodeJS = (service, resolve) => {
    axios.get(service.host + ":" + service.port + "/api")
    .then(resp => {
        resolve(true);
    })
    .catch(err => {
        resolve(false);
        fs.appendFileSync(service.logFilePath, "\n" + err, 'utf8');
    })
    setTimeout(() => {
        resolve(false);
    }, 5000)
}

module.exports.restartNodeJS = (service, callback, sendLogs) => {
    let command = process.platform == 'win32' ? '': 'sh ';
    command += service.startScriptFile + ' ' + service.directory + ' ' + service.port;
    var node_cp = exec(command);
    node_cp.stdout.on('data', function(data) {
        fs.appendFileSync(service.logFilePath, "\n" + data, 'utf8');
        sendLogs({
            log: fs.readFileSync(service.logFilePath,'utf8') ,
            svcID: service.svcID
        });
    });
    node_cp.stderr.on('data', function(data) {
        fs.appendFileSync(service.logFilePath, "\n" + data, 'utf8');
        sendLogs({
            log: fs.readFileSync(service.logFilePath,'utf8') ,
            svcID: service.svcID
        });
    });
    callback('done');
}

module.exports.stopNodeJS = (service, callback, sendLogs) => {
    let command = process.platform == 'win32' ? '': 'sh ';
    command += service.stopScriptFile + ' ' + service.directory + ' ' + service.port;
    var node_cp = exec(command);
    node_cp.stdout.on('data', function(data) {
        fs.appendFileSync(service.logFilePath, "\n" + data, 'utf8');
        sendLogs({
            log: fs.readFileSync(service.logFilePath,'utf8') ,
            svcID: service.svcID
        });
    });
    node_cp.stderr.on('data', function(data) {
        fs.appendFileSync(service.logFilePath, "\n" + data, 'utf8');
        sendLogs({
            log: fs.readFileSync(service.logFilePath,'utf8') ,
            svcID: service.svcID
        });
    });
    callback('done');
}

module.exports.getDetails = (service, callback) => {
    callback(null);
}