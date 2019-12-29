4//configs & dependencies
const express = require('express');
const app = express();
const logger = require('morgan');
var SolrNode = require('solr-node');
var client = new SolrNode({
    host: 'localhost',
    port: '8983',   
    core: 'students',
    protocol: 'http'
});
app.use(require('express-status-monitor')());
app.use(express.json());
app.use(logger('dev'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Listening on ${port}...`)
})

app.get('/api/', (req, res) => {
    res.send("Welcome!!!");
})

app.get('/api/all',(req, res) => {
        var strQuery = client.query().q('*:*').rows(1000); 
        client.search(strQuery,  (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            res.send(result.response);
        });
});

