const mqtt = require('mqtt');
const WebSocket = require('ws');
const PORT = 8888;
var wss = new WebSocket.Server({
    host: '0.0.0.0',
    port: PORT
});
options={
    clientId:"mqttjs01",
    username:"DataTrack_user",
    password:"GcCkf8CZ6k",
    connectTimeout: 4000,
    reconnectPeriod: 1000,
    clean:true
};
const client  = mqtt.connect('mqtt://54.70.109.70', options);
const topic = 'ETX.0001/gps';
client.on("connect",function(){
    console.log("connected");
    client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`)
    });
});
wss.on('connection', function (ws, request) {
    ws.id = request.identity;
    console.log("Client Connected");
    ws.on('message', async function (msg) {
        console.log(ws.id, msg.toString());
    });
    client.on('message', function (topic, message) {
        console.log('Received Message:', topic, message.toString())
        ws.send(JSON.stringify(message.toString()));
    });
    ws.on('close', function () {
        console.log('Client Disconnected');
    });
});