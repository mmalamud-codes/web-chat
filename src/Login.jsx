import { useState } from 'react';
import './style2.css'

export default function Login({ setLoggedIn, setUsername }) {

    const [username, setUsernameInput] = useState('');

    function handleClick() {
        setLoggedIn(true);
        setUsername(username); 
    }

    return (
        <div className="login-card">
            <input id="user-input" 
            placeholder="Username"
            value={username}
            onChange={(event) => setUsernameInput(event.target.value)} 
            />

            <button id="loginBtn" onClick={handleClick}>Login</button>
        </div>
    );
}