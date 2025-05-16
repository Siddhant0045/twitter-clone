import React from "react";
import styles from "./SignUpPage.module.scss";

const SignUpPage = () => {
    return (
        <div className={styles.signup_center}>
            <img src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?semt=ais_hybrid&w=740" alt="Logo" className={styles.x_logo_signup} />
            <h1 className={styles.create_account_word}>Create an account</h1>
            <button className={styles.signup_google}>Sign Up with Google</button>
            <div className={styles.or_divider}>
                <div className={styles.greyline_signup}></div>
                <p className={styles.or_word}>OR</p>
                <div className={styles.greyline_signup}></div>
            </div>
            <button className={styles.create_account_btn}>Create account</button>
            <p className={styles.terms_condition}>By signing up, you agree to the <a className={styles.blue_word}>Terms of Service</a> and <a className={styles.blue_word}>Privacy Policy</a>, including <a className={styles.blue_word}>Cookie Use.</a></p>
            <h3 className={styles.have_an_account}>Already have an account?</h3>
            <button className={styles.signin_btn}>Sign in</button>
        </div>

    );
};

export default SignUpPage;