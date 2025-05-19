import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import styles from "./HomePage.module.scss";
import LeftSideBar from "../../components/LeftSideBar";
import Feed from "../FeedPage/Feed";
import RightSideBar from "../../components/RightSideBar";
import ProfilePage from "../ProfilePage/ProfilePage";
import FollowingFollowers from "../FollowingFollowersPage/FollowingFollowers";

function HomePage() {
    return (
        <div className={styles.container}>
            <LeftSideBar />

            <div className={styles.mainContent}>
                <Routes>
                    <Route path="/" element={<Feed />} />
  <Route path="/profile/:userId" element={<ProfilePage />}>
    <Route
      path="followers"
      element={<FollowingFollowers type="followers" />}
    />
    <Route
      path="following"
      element={<FollowingFollowers type="following" />}
    />
  </Route>
</Routes>
            </div>

            <RightSideBar />
        </div>
    );
}

export default HomePage;
