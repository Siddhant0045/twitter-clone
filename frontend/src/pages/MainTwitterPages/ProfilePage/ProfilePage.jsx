import React from "react";
import styles from "./ProfilePage.module.scss";
import { BiFontSize } from "react-icons/bi";

function ProfilePage() {
    const [activeTab, setActiveTab] = React.useState("Posts");

    return <main className={styles.profile_section}>
        <div className={styles.profilesection_header}>
            <div className={styles.back_option_profilesection}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
            </div>
            <div style={{marginLeft:"40px",display:"flex", flexDirection:"column", justifyContent:"center"}}>
                <h6 className={styles.profile_name}>Siddhant Shinde</h6>
                <p className={styles.profile_no_of_tweets}>0 posts</p>
            </div>
        </div>
        <img className={styles.profile_page_banner} src="./src/Images/image.png"></img>
        <div className={styles.profile_information}>
            <div className={styles.profile_page_profile_photo_div}>
                <img className={styles.profile_page_profile_photo} src="./src/Images/Siddhant.jpg"></img>
                <button className={styles.edit_profile_btn}>Edit profile</button>
            </div>
            <h4 className={styles.profile_your_name}>Siddhant Shinde</h4>
            <h4 className={styles.profile_username}>@Siddhant250711</h4>
            <p className={styles.profile_bio}>This is my bio</p>
            <div className={styles.followers_following_profilepage}>
                <p>x Following</p>
                <p>y Followers</p>
            </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", borderBottom: "1px solid rgb(113,118,123)" }}>
            <button
                onClick={() => setActiveTab("Posts")}
                className={`${styles.button_of_profile_page} ${activeTab === "Posts" ? styles.active : ""}`}
            >
                Posts
            </button>
            <button
                onClick={() => setActiveTab("Media")}
                className={`${styles.button_of_profile_page} ${activeTab === "Media" ? styles.active : ""}`}
            >
                Media
            </button>
            <button
                onClick={() => setActiveTab("Liked")}
                className={`${styles.button_of_profile_page} ${activeTab === "Liked" ? styles.active : ""}`}
            >
                Liked
            </button>
        </div>
    </main>
}

export default ProfilePage;