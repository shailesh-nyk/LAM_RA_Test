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
            if(data[index] ^ svc.active) {
                let d = new Date();
                svc.activeTime = formatDate(d);
            }
            svc.active = data[index];
            svc.log = fs.readFileSync(svc.logFilePath,'utf8');
            return svc;
        })
        callback(JSON.stringify(results));
    });
}


var formatDate = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  }
  
  
