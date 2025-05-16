import React from "react";
import styles from "./HomePage.module.scss";
import LeftSideBar from "./LeftSideBar";
import Feed from "./Feed";
import RightSideBar from "./RightSideBar"; // Assuming you have a RightSideBar component

function HomePage() {
    return (
        <div className={styles.container}>
            <LeftSideBar />
            <Feed />
            <RightSideBar />
        </div>
    );
}

export default HomePage;
