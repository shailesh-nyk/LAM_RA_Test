ECHO "RUNNING SOLR RESTART SCRIPT FOR "%2
set a=%1
%a:~0,2%
cd %1
FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :%2 ^| findstr LISTENING') DO taskkill /PID %%P /F
bin\solr.cmd start -cloud -p %2 -s "example/cloud/node2/solr" -z localhost:9983
EXIT /B