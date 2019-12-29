var service_list = require('../config').service_list;
const fs = require('fs');

module.exports.checkStatus = (callback) => {
    let requests = service_list.map(svc => {
        return new Promise((resolve) => {
            svc.status_check_script(svc, resolve);
        })
    });
    Promise.all(requests).then((data) => {
        var results = service_list.map((svc, index) => {
            svc.active = data[index];
            svc.log = fs.readFileSync(svc.logFilePath,'utf8');
            return svc;
        })
        callback(JSON.stringify(results));
    });
}
