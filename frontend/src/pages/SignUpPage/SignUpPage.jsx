import React, { useState } from "react";
import styles from "./SignUpPage.module.scss";
import { auth } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Helper function to send user data to backend
  const sendUserDataToBackend = async (user) => {
    try {
      const userData = {
        uid: user.uid,
        name: user.displayName || user.email.split("@")[0],
        email: user.email,
        photoURL: user.photoURL || "",
        username: user.email.split("@")[0], // fallback username
      };

      console.log("Sending user data to backend:", userData);

      await axios.post("http://localhost:8080/api/users", userData);
      console.log("User data sent to backend successfully");
    } catch (err) {
      console.error(
        "Error sending user data to backend:",
        err.response?.data || err.message
      );
      setError("Failed to save user data.");
    }
  };

  // Google Sign-Up handler
  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await sendUserDataToBackend(user);
      navigate("/homepage");
    } catch (err) {
      console.error("Google Sign-Up Error:", err.message);
      setError(err.message);
    }
  };

  // Email/Password Sign-Up handler
  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await sendUserDataToBackend(user);
      navigate("/homepage");
    } catch (err) {
      console.error("Email Sign-Up Error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className={styles.signup_center}>
      <img
        src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?semt=ais_hybrid&w=740"
        alt="Logo"
        className={styles.x_logo_signup}
      />
      <h1 className={styles.create_account_word}>Create an account</h1>

      <button onClick={handleGoogleSignUp} className={styles.signup_google}>
        Sign Up with Google
      </button>

      <div className={styles.or_divider}>
        <div className={styles.greyline_signup}></div>
        <p className={styles.or_word}>OR</p>
        <div className={styles.greyline_signup}></div>
      </div>

      <form onSubmit={handleEmailSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.signup_input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.signup_input}
          required
        />
        <button type="submit" className={styles.create_account_btn}>
          Create Account
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <p className={styles.terms_condition}>
        By signing up, you agree to the{" "}
        <a className={styles.blue_word}>Terms of Service</a> and{" "}
        <a className={styles.blue_word}>Privacy Policy</a>, including{" "}
        <a className={styles.blue_word}>Cookie Use.</a>
      </p>

      <h3 className={styles.have_an_account}>Already have an account?</h3>
      <button onClick={() => navigate("/signin")} className={styles.signin_btn}>
        Sign in
      </button>
    </div>
  );
};

export default SignUpPage;
