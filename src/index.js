
/**
 * ws
 *
 * @param {Function} connection - Establece conexion con websocket
 */
const express = require("express");
const app = express();
const http = require("http");
const WebSocket = require("ws");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message, isBinary) {
    console.log(message.toString(), isBinary);
    /**
     * Clients
     * @param {Function} each - Trae los clientes
     */
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        /**
         * send
         * @param {string} - envia mensaje
         * */
        client.send(message.toString());
      }
    });
  });
});

/**
 * Get
 * @param {String} "/" - Punto de entrada
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
app.get("/", (req, res) => {
  res.send("Hello");
});

/**
 * Sever listen
 * 
 * @param {number} process.env.PORT - puerto usado
 */
server.listen(process.env.PORT || 5000, "0.0.0.0", () => {
  console.log(`Listen on port ${process.env.PORT || 5000}`);
});
