import './style2.css'

export default function Login({ setLoggedIn }) {

    function getUser() {
        setLoggedIn(true);
    }

    return (
        <div className="login-card">
            <input id="user-input" placeholder="Username"></input>

            <button id="loginBtn" onClick={getUser}>Login</button>
        </div>
    );
}