const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require('ws');
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

wss.on("connection",function connection(ws){
    ws.on("message", function incoming(message,isBinary) {
        console.log(message.toString(),isBinary);
        wss.clients.forEach(function each(client) {
            if(client.readyState === WebSocket.OPEN){
                client.send(message.toString());
            }
        });
    });
});

app.get("/",(req,res)=>{
    res.send("Hello");
});

//const port = 5000;
server.listen(process.env.PORT,'0.0.0.0',()=>{
    console.log(`Listen on port ${process.env.PORT}`);
});
