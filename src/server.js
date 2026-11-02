const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (socket) => {
    console.log("Connected");
    socket.on("Error", console.error);

    socket.on("message", (data, isBinary) => {
        const message = JSON.parsse(data.toString());

        if (message.type === "join") {
            const username = message.username;

            console.log(username + "connected");
        }
        wss.clients.forEach((client) => {
            if (client != socket && client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary});
            }
        });
    });

    socket.on("close", () => {
        console.log("Disconnected");
    });

});