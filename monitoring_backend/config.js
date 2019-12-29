var solr_service = require('./services/solr_service');
var node_service = require('./services/node_service');
var restart_steps = require('./scripts/restart_steps');
var constants = require('./constants');
const fs = require('fs');

module.exports.service_list = [
    {
        svcID: 1,
        host: "http://localhost",
        port: "8000",
        name: "Node JS Server",
        status_check_script: node_service.checkNodeJS,
        active: false,
        restart_service: node_service.restartNodeJS,
        stop_service: node_service.stopNodeJS,
        restart_steps: restart_steps.nodeRestartSteps,
        log: fs.readFileSync(constants.NODEJS_LOG_FILE,'utf8'),
        logFilePath: constants.NODEJS_LOG_FILE,
        getDetails: node_service.getDetails,
        startScriptFile: process.platform === "win32" ? constants.RESTART_NODEJS_BATCH : constants.RESTART_NODEJS_SHELL,
        stopScriptFile: process.platform === "win32" ? constants.STOP_SERVER_BATCH : constants.STOP_SERVER_SHELL,
        directory: "D:/Projects/RA_Test/backend"
    },
    {
        svcID: 2,
        host: "http://localhost",
        port: "8983",
        name: "Solr DB Instance 1",
        status_check_script: solr_service.checkSolr,
        active: false,
        restart_service: solr_service.restartSolr,
        stop_service: solr_service.stopSolr,
        restart_steps: restart_steps.solrRestartSteps,
        log: fs.readFileSync(constants.SOLR1_LOG_FILE,'utf8'),
        logFilePath: constants.SOLR1_LOG_FILE,
        getDetails: solr_service.getDetails,
        startScriptFile: process.platform == "win32" ? constants.RESTART_SOLR1_BATCH : constants.RESTART_SOLR1_SHELL,
        stopScriptFile: process.platform == "win32" ? constants.STOP_SERVER_BATCH : constants.STOP_SERVER_SHELL,
        directory: 'C:/SOLR'
    },
    {
        svcID: 3,
        host: "http://localhost",
        port: "7574",
        name: "Solr DB Instance 2",
        status_check_script: solr_service.checkSolr,
        active: false,
        restart_service: solr_service.restartSolr,
        stop_service: solr_service.stopSolr,
        restart_steps: restart_steps.solrRestartSteps,
        log: fs.readFileSync(constants.SOLR2_LOG_FILE,'utf8'),
        logFilePath: constants.SOLR2_LOG_FILE,
        getDetails: solr_service.getDetails,
        startScriptFile: process.platform == "win32" ? constants.RESTART_SOLR2_BATCH : constants.RESTART_SOLR2_SHELL,
        stopScriptFile: process.platform == "win32" ? constants.STOP_SERVER_BATCH : constants.STOP_SERVER_SHELL,
        directory: "C:/SOLR"
    }
]
