import { useState } from 'react';
import './style2.css'

export default function Login({ setLoggedIn, setUsername }) {

    const [username, setUsernameInput] = useState('');
    const [showError, setShowError] = useState(false);

    const hasText = username.trim().length > 0;

    function handleClick() {

        if (!hasText) {
            setShowError(true);
            return;
        }

        setShowError(false);
        setLoggedIn(true);
        setUsername(username); 
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <input id="user-input" 
                placeholder="Username"
                value={username}
                onChange={(event) => {
                    if (showError) setShowError(false);
                    setUsernameInput(event.target.value)}}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') handleClick();
                }}
                />

                <button id="loginBtn"
                onClick={handleClick}
                >Login</button>

                {showError && ( <div className="error-message">
                    <p>
                        Please enter your username before continuing!
                    </p>
                </div>)}

            </div>
        </div>
    );
}