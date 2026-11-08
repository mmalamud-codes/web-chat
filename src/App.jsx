import { useState, useEffect } from 'react';
import './style.css';
import Login from './Login.jsx';

function App() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [online, setOnline] = useState([]);
    const [username, setUsername] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (!loggedIn) return;

        const socket = new WebSocket("ws://localhost:8080");

        socket.onopen = () => {
            console.log("\nConnected to server");

            socket.send(JSON.stringify ({
                type: "join",
                username: username
            }));
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === "users") {
                setOnline(data.users);
            }
        }

        socket.onclose = () => {
            console.log("\nDisconnected from server");
        }
        
    }, [loggedIn, username]);

    if (!loggedIn) {
        return <Login setLoggedIn={setLoggedIn} 
        setUsername={setUsername} 
        />;
    }

    function handleSend() {
        if (message.trim() === '') return;

        //Look back at this, make sure you understand how this works
        setMessages([
            ...messages,
            { id: Date.now(), text: message.trim() }
        ]);

        setMessage('');
    }

    function userUpdate(users) {
        setOnline(users);
    }

    return (
        <div className="layout">
            <aside className="side-bar">
                <section className="online-users">
                    <ul id="user-list">
                        {online.map((user) => {
                            return <li key={user}>{user}</li>
                        })}
                    </ul>
                </section>
            </aside>

            <main className="main-content">

                <div id="messageHistory">
                    {messages.map((msg) => (
                        <div className="message" key={msg.id}>
                            {msg.text}
                        </div>
                    ))}
                </div>

                <div className="input-area">
                    <input
                        type="text"
                        id="messageInput"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(event) =>
                            setMessage(event.target.value)
                        }
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') handleSend();
                        }}
                    />

                    <button id="sendBtn" type="button" onClick={handleSend}>
                        Send
                    </button>
                </div>
            </main>
        </div>
    );
}

export default App;