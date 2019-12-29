import openSocket from 'socket.io-client';

const config = {
    //APP CONFIGS
    student_API: 'http://localhost:8000',
    monitor_API: 'http://localhost:3001',
    //SOCKET IO CONFIGS
    socket: openSocket("http://localhost:3001"),
    listen:  (socket , callback) => {
        socket.on('status', function (data) {
            callback(data);
        });
    },
    listenLogs:  (socket , callback) => {
        socket.on('logs', function (data) {
            callback(data);
        });
    }
}

export default config;
