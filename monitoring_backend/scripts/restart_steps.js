module.exports.nodeRestartSteps =  
`<ul> 
    <li>Open Terminal on your server </li>
    <li>Kill all processes running at the port you wish to run the server <br/>
        <code>netstat -ano | findstr 8000(replace with your port)</code><br/>
        <code>taskkill /PID PID_FROM_ABOVE_RESULT /f</code></li>
    <li>Change the directory to the NodeJS server root folder <br/>
        <code>cd PATH_TO_SERVER</code></li>
    <li>Run this command<br/>
        <code>npm start</code>
    </li> 
</ul>`



module.exports.solrRestartSteps =  
`<ul> 
    <li>Open Terminal on the server where SOLR db is running</li>
    <li>Kill all processes running at the port you wish to run SOLR <br/>
        <code>netstat -ano | findstr PORT_NUMBER(replace with your port)</code><br/>
        <code>taskkill /PID PID_FROM_ABOVE_RESULT /f</code></li>
    <li>Change the directory to the folder where SOLR home directory <br/>
        <code>cd PATH_TO_SOLR_HOME</code></li>
    <li>Run this command<br/>
        <code>bin/solr start -cloud -p PORT_NUMBER -s "example/cloud/node1/solr"</code>
    </li> 
</ul>`
