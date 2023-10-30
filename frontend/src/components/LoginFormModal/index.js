import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { NavLink, useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    // consuming ModalContext's closeModal function
    const { closeModal } = useModal();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    const demoLogin = (e) => {
        e.preventDefault();
        setErrors({});
        history.push("/");
        return dispatch(
            sessionActions.login({ credential: "Demo-lition", password: "password" })
        )
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    return (
        <div className="LoginFormModal">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div className="loginModalInputsButton">
                    <ul>
                        {errors.message && <p>{errors.message}</p>}
                        <label>
                            <input
                                type="text"
                                placeholder="Username or Email"
                                value={credential}
                                onChange={(e) => setCredential(e.target.value)}
                                required
                            />
                        </label>
                    </ul>
                    <ul>
                        <label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                    </ul>
                    <button
                        className="logInButton"
                        type="submit"
                        disabled={credential.length < 4 || password.length < 6}
                    >
                        Log In
                    </button>
                </div>
            </form>
            <button className='demoUser' onClick={demoLogin}>
                Demo User
            </button>
        </div>
    );
}

export default LoginFormModal;
