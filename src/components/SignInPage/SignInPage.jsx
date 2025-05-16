import React from "react";
import styles from "./SignInPage.module.scss";

const SignInPage = () => {
    return (
        <div className={styles.signin_center}>
            <div className={styles.signin_container}>
                <img src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?semt=ais_hybrid&w=740" alt="Logo" className={styles.x_logo_signin} />
                <h2 className={styles.signin_word}>Sign in to X</h2>
                <button className={styles.signin_google}>Sign in with Google</button>
                <div className={styles.or_divider}>
                    <div className={styles.greyline_signin}></div>
                    <p className={styles.or_word}>OR</p>
                    <div className={styles.greyline_signin}></div>
                    </div>
            </div>
        </div>
    );
};

export default SignInPage;