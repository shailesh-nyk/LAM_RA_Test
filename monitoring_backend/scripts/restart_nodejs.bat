ECHO "RUNNING NODEJS RESTART SCRIPT FOR " %2
FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :%2 ^| findstr LISTENING') DO taskkill /PID %%P /F
cd %1
npm start
EXIT /B