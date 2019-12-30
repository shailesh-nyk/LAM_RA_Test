var solr_service = require('./services/solr_service');
var node_service = require('./services/node_service');
var restart_steps = require('./scripts/restart_steps');
var constants = require('./constants');
const fs = require('fs');

module.exports.service_list = [
    {
        //Custom service ID provided -- Use any number 
        svcID: 1,

        //Host IP of the service
        host: "http://localhost",
        
        //Port where service is running
        port: "8000",

        //Custom name
        name: "Node JS Server",

        //Current root directory where the service is installed on the machine
        directory: "D:/Projects/RA_Test/backend",

        //initial state
        active: false,

        //default active time. do not change
        activeTime: "Not known",

        //method that checks the status of this server. You can edit/add new method and reference here
        status_check_script: node_service.checkNodeJS,

        //method to start this server. You can edit/add new method and reference here
        restart_service: node_service.restartNodeJS,

        //method to stop this server. You can edit/add new method and reference here
        stop_service: node_service.stopNodeJS,

        //method to get details of this server. You can edit/add new method and reference here
        getDetails: node_service.getDetails,

        //shell scripts to start the server. Edit/add new and reference in /scripts
        startScriptFile: process.platform === "win32" ? constants.RESTART_NODEJS_BATCH : constants.RESTART_NODEJS_SHELL,

        //shell scripts to stop the server. Edit/add new and reference in /scripts
        stopScriptFile: process.platform === "win32" ? constants.STOP_SERVER_BATCH : constants.STOP_SERVER_SHELL,

        // String variable to store the logs and send over to UI for display
        log: fs.readFileSync(constants.NODEJS_LOG_FILE,'utf8'),

        // Path to the log file. Edit in constants.js if needed
        logFilePath: constants.NODEJS_LOG_FILE,

        //static steps to restart. Shown in UI as instructions to users
        restart_steps: restart_steps.nodeRestartSteps,
    },
    {
        svcID: 2,
        host: "http://localhost",
        port: "8983",
        name: "Solr DB Instance 1",
        directory: 'C:/SOLR',
        active: false,
        activeTime: "Not known",
        status_check_script: solr_service.checkSolr,
        restart_service: solr_service.restartSolr,
        stop_service: solr_service.stopSolr,
        getDetails: solr_service.getDetails,
        startScriptFile: process.platform == "win32" ? constants.RESTART_SOLR1_BATCH : constants.RESTART_SOLR1_SHELL,
        stopScriptFile: process.platform == "win32" ? constants.STOP_SERVER_BATCH : constants.STOP_SERVER_SHELL,
        log: fs.readFileSync(constants.SOLR1_LOG_FILE,'utf8'),
        logFilePath: constants.SOLR1_LOG_FILE,
        restart_steps: restart_steps.solrRestartSteps,
    },
    {
        svcID: 3,
        host: "http://localhost",
        port: "7574",
        name: "Solr DB Instance 2",
        directory: "C:/SOLR",
        active: false,
        activeTime: "Not known",
        status_check_script: solr_service.checkSolr,
        restart_service: solr_service.restartSolr,
        stop_service: solr_service.stopSolr,
        getDetails: solr_service.getDetails,
        startScriptFile: process.platform == "win32" ? constants.RESTART_SOLR2_BATCH : constants.RESTART_SOLR2_SHELL,
        stopScriptFile: process.platform == "win32" ? constants.STOP_SERVER_BATCH : constants.STOP_SERVER_SHELL,
        log: fs.readFileSync(constants.SOLR2_LOG_FILE,'utf8'),
        logFilePath: constants.SOLR2_LOG_FILE,
        restart_steps: restart_steps.solrRestartSteps,
    }
]
