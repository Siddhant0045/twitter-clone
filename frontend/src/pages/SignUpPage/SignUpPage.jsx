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

  const uploadImageToCloudinary = async (imageUrl) => {
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dkblqemw6/image/upload`,
        {
          file: imageUrl,
          upload_preset: "unsigned_preset",
        }
      );
      return response.data.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error:", err.message);
      throw new Error("Failed to upload image to Cloudinary.");
    }
  };

  // Helper function to send user data to backend
  const sendUserDataToBackend = async (user) => {
    try {
      let photoURL = user.photoURL || "";
      console.log("User photoURL:", photoURL);
      if (photoURL) {
        photoURL = await uploadImageToCloudinary(photoURL);
      }
      console.log(photoURL);

      const userData = {
        uid: user.uid,
        name: user.displayName || user.email.split("@")[0],
        email: user.email,
        photoURL,
        username: user.email.split("@")[0], 
      };

      console.log("Sending user data to backend:", userData);

      await axios.post("http://localhost:8080/api/users"||"https://twitter-clone-kfoi.onrender.com/api/users", userData);
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
    <div className={styles.signup_x_align}>
      <div className={styles.x_logo_div}>
      <svg className={styles.x_logo_signup} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 462.799"><path fill="#fff" d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"/></svg></div>
    <div className={styles.signup_center}>
      <h1 style={{color:"white",fontSize:"66px",width:"600px",marginLeft:"180px",marginBottom:"50px"}}>Happening Now</h1>
      <h1 className={styles.create_account_word}>Join Today.</h1>

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
    </div>
  );
};

export default SignUpPage;
