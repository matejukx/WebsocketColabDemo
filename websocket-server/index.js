const webSocketsServerPort = 8000;
const webSocketServer = require("websocket").server;
const http = require("http");

const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
    httpServer: server,
});

let counter = 0;
const getUniqueID = () => {
    counter = counter + 1;
    return 'User ' + counter;
};

const clients = {};
let editorContent = null;

const sendMessage = (dataFromClient) => {
    Object.keys(clients).map((client) => {
        const json = JSON.stringify({
            type: "message",
            data: dataFromClient,
            user: Object.keys(clients).find((key) => clients[key] === clients[client]),
        });
        clients[client].sendUTF(json);
    });
};

wsServer.on("request", function (request) {
    var userID = getUniqueID();
    console.log(
        new Date() +
            " Recieved a new connection from origin " +
            request.origin +
            "."
    );
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    console.log(
        "connected: " + userID + " in " + Object.getOwnPropertyNames(clients)
    );
    connection.on("message", function (message) {
        const dataFromClient = message.utf8Data;
        editorContent = dataFromClient;
        sendMessage(dataFromClient);
    });

    connection.on("close", function (connection) {
        console.log(new Date() + " Peer " + userID + " disconnected.");
        delete clients[userID];
    });
});
