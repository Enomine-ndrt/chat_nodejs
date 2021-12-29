/**ws
 * websocket
 * @module websocket
 * @requires express
 * @requires http
 * @requires ws
 */

const express = require("express");
const app = express();
const http = require("http");
const WebSocket = require("ws");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

/** 
 * on connection 
 * establece la conexion
 * @name connection
 * @function
 * @param {Object} ws  recibe  conexion ws 
 * */ 
wss.on("connection", function connection(ws) {
  /**
   * on message
   * @member {Object} ws
   * @name message
   * @function  
   * @param {Object}  message recibe un  objeto mensaje
   * @param {Boolean} isBinary recibe un tipo boleano
   */
  ws.on("message", function incoming(message, isBinary) {
    console.log(message.toString(), isBinary);
  
     /**
      *clients each 
      *@name clients
      *@function 
      *@param {WebSocket} client trae a los clientes
       */
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        /**
         * send 
         * @name send
         * @function
         * @param {string} message  mensaje obtenido
         */
          client.send(message.toString());  
      }
    });
  });
});

/**
 * Get
 * @name GET
 * @function
 * @param {String} "/" - Punto de entrada
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
app.get("/", (req, res) => {
  res.send("Hello");
});

/**
 * Sever listen
 * @name listen
 * @function 
 * @param {number} process.env.PORT - puerto usado por variable de ambiente
 * @param {number} '5000' puerto por default
 */
server.listen(process.env.PORT || 5000, "0.0.0.0", () => {
  console.log(`Listen on port ${process.env.PORT || 5000}`);
});
