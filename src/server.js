import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (socket) => {
    socket.userId = null;

    socket.on("error", console.error);

    socket.on("message", (data, isBinary) => {
        const message = JSON.parse(data.toString());

        if (message.type === "join") {
            socket.userId = message.username;

            console.log("\n" + socket.userId + " connected");
            const users = [];

            wss.clients.forEach((client) => {
                if (client.userId) {
                    users.push(client.userId);
                }
            });

            const userList = JSON.stringify({
                type: "users",
                users: users
            });

            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(userList);
                }
            })

            return;
            
        }

        wss.clients.forEach((client) => {
            if (client != socket && client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary});
            }
        });
    });

    socket.on("close", () => {
        console.log("\n" + socket.userId + " disconnected");

        updateUsers();
    });

function updateUsers() {
    const users = [];

    wss.clients.forEach((client) => {
        users.push(client.userId);
    });

    const userList = JSON.stringify({
        type: "users",
        users: users
    });

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(userList);
        }
    });
}

});