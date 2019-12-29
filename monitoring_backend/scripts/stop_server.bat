ECHO "STOPPING THE SERVER"
FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :%2 ^| findstr LISTENING') DO taskkill /PID %%P /F
EXIT /B