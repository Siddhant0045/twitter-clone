import React, { useState } from "react";
import styles from "./SignInPage.module.scss";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Google Sign-In handler
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("Google sign-in successful!");

            const user = result.user;

            navigate("/homepage");
        }
        catch (err) {
            console.error(err.message);
            setError("Google Sign-In failed.");
        }
    };

    // Email/Password Sign-In handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Email/password sign-in successful!");
            // Redirect or navigate to dashboard
            navigate("/homepage");
        } catch (err) {
            console.error(err.message);
            setError("Invalid username or password.");
        }
    };

    return (
        <div className={styles.signin_center}>
            <div className={styles.signin_container}>
                <img src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?semt=ais_hybrid&w=740" alt="Logo" className={styles.x_logo_signin} />
                <h2 className={styles.signin_word}>Sign in to X</h2>

                <button className={styles.signin_google} onClick={handleGoogleSignIn}>
                    Sign in with Google
                </button>

                <div className={styles.or_divider}>
                    <div className={styles.greyline_signin}></div>
                    <p className={styles.or_word}>OR</p>
                    <div className={styles.greyline_signin}></div>
                </div>

                <form className={styles.signin_form} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        className={styles.signin_input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className={styles.signin_input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className={styles.signin_btn}>Sign in</button>
                </form>

                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            </div>
        </div>
    );
};

export default SignInPage;
