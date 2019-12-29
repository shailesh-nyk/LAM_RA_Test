const { exec } = require('child_process');
var axios = require('axios');
var SolrNode = require('solr-node');
const fs = require('fs');

module.exports.checkSolr = (service, resolve) => {
    let client = new SolrNode({
        host: service.host.replace("http://" , ""),
        port: service.port,
        core: 'students',
        protocol: 'http'
    });
    var strQuery = client.query().q('*:*').rows(1); 
    client.search(strQuery,  (err, result) => {
        if (err) {
            resolve(false);
            fs.appendFileSync(service.logFilePath, "\n" + err, 'utf8');
        } else {
            resolve(true);
        }
    });
    setTimeout(() => {
        resolve(false);
    }, 5000)
}


module.exports.restartSolr = (service, callback, sendLogs) => {
    let command = process.platform === "win32" ? '': 'sh ';
    command += service.startScriptFile + ' ' + service.directory + ' ' + service.port;
    solr_start_cp = exec(command);
    solr_start_cp.stdout.on('data', function(data) {
        fs.appendFileSync(service.logFilePath , "\n" + data, 'utf8');
        sendLogs({ 
            log: fs.readFileSync(service.logFilePath,'utf8') ,
            svcID: service.svcID
        });
    });
    solr_start_cp.stderr.on('data', function(data) {
        fs.appendFileSync(service.logFilePath, "\n" + data, 'utf8');
        sendLogs({
            log: fs.readFileSync(service.logFilePath,'utf8') ,
            svcID: service.svcID
        });
    });
    callback('done');
}

module.exports.stopSolr = (service, callback, sendLogs) => {
    let command = process.platform == 'win32' ? '': 'sh ';
    command+= service.stopScriptFile + ' ' + service.directory + ' ' + service.port;
    solr_stop_cp = exec(command);
    solr_stop_cp.stdout.on('data', function(data) {
        fs.appendFileSync(service.logFilePath , "\n" + data, 'utf8');
        sendLogs({ 
            log: fs.readFileSync(service.logFilePath,'utf8') ,
            svcID: service.svcID
        });
    });
    solr_stop_cp.stderr.on('data', function(data) {
        fs.appendFileSync(service.logFilePath, "\n" + data, 'utf8');
        sendLogs({
            log: fs.readFileSync(service.logFilePath,'utf8') ,
            svcID: service.svcID
        });
    });
    callback('done');
}

module.exports.getDetails = (service, callback) => {
    axios.get(service.host + ":" + service.port + "/solr/admin/collections?action=clusterstatus&wt=json",{
        headers: {
          'Accept': '*/*',
        },
    })
    .then(resp => {
        let details = Object.assign({}, resp.data.cluster.collections.students);
        Object.keys(details.shards).forEach(key => {
            Object.keys(details.shards[key].replicas).forEach(rep =>  { 
                if(!details.shards[key].replicas[rep].base_url.includes(service.port)) {
                    delete details.shards[key].replicas[rep];
                }
            })
        })
        callback(details.shards);
    })
    .catch(err => {
        callback("err" + err);
    })
}