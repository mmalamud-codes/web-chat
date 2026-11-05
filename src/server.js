import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;

wss.on('connection', (socket) => {
    userCount++;

    const userId = `User${userCount}`;
    socket.userId = userId;


    console.log(userId + "connected");
    socket.on("Error", console.error);

    socket.on("message", (data, isBinary) => {
        const message = JSON.parse(data.toString());

        if (message.type === "join") {
            console.log(message.username + "connected");
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
        console.log(userId + "disconnected");

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