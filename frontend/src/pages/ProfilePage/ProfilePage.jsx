import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./ProfilePage.module.scss";
import { auth } from "../../firebase/firebase";
import { fetchUserById } from "../../api/userAPI";
import { followUser, unfollowUser } from "../../api/followAPI";
import defaultBanner from "/src/public/Images/image.png";
import defaultProfilePhoto from "/src/public/Images/Siddhant.jpg";

function ProfilePage() {
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);

  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await fetchUserById(userId);
        setUserData(user);
        setIsOwnProfile(user.uid === currentUserId);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    if (userId && currentUserId) {
      getUserData();
    }
  }, [userId, currentUserId]);

  if (!userData) return <div>Loading...</div>;

  const isFollowRoute =
    location.pathname.endsWith("/followers") || location.pathname.endsWith("/following");

  if (isFollowRoute) {
    return <Outlet />;
  }

  const handleFollowToggle = async () => {
    if (loadingFollow || !currentUserId) return;
    setLoadingFollow(true);

    try {
      if (isFollowing) {
        await unfollowUser(currentUserId, userId);
        setIsFollowing(false);
        setUserData((prev) => ({
          ...prev,
          followers: prev.followers ? prev.followers.filter((id) => id !== currentUserId) : [],
        }));
      } else {
        await followUser(currentUserId, userId);
        setIsFollowing(true);
        setUserData((prev) => ({
          ...prev,
          followers: prev.followers ? [...prev.followers, currentUserId] : [currentUserId],
        }));
      }
    } catch (error) {
      console.error("Follow/unfollow failed:", error);
    } finally {
      setLoadingFollow(false);
    }
  };

  return (
    <main className={styles.profile_section}>
      <div className={styles.profilesection_header}>
        <div
          className={styles.back_option_profilesection}
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        >
          ← Back
        </div>
        <div style={{ marginLeft: "20px" }}>
          <h6 className={styles.profile_name}>{userData.name}</h6>
          <p className={styles.profile_no_of_tweets}>{userData.postsCount || 0} posts</p>
        </div>
      </div>

      <img
        className={styles.profile_page_banner}
        src={userData.bannerPhoto || defaultBanner}
        alt="banner"
      />

      <div className={styles.profile_information}>
        <div className={styles.profile_page_profile_photo_div}>
          <img
            className={styles.profile_page_profile_photo}
            src={userData.photoURL || defaultProfilePhoto}
            alt="profile"
          />
          {isOwnProfile ? (
            <button className={styles.edit_profile_btn}>Edit profile</button>
          ) : (
            <button
              onClick={handleFollowToggle}
              disabled={loadingFollow}
              className={styles.follow_unfollow_btn}
              style={{
                backgroundColor: isFollowing ? "#fff" : "#1da1f2",
                color: isFollowing ? "#1da1f2" : "#fff",
                border: "1px solid #1da1f2",
                cursor: loadingFollow ? "not-allowed" : "pointer",
                padding: "8px 15px",
                borderRadius: "20px",
                fontWeight: "bold",
                marginLeft: "15px",
              }}
            >
              {loadingFollow ? "Loading..." : isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>

        <h4 className={styles.profile_your_name}>{userData.name}</h4>
        <h4 className={styles.profile_username}>@{userData.username}</h4>
        <p className={styles.profile_bio}>{userData.bio || "No bio available."}</p>

        <div className={styles.followers_following_profilepage}>
          <Link
            to="following"
            className={styles.followLink}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <strong>{userData.following ? userData.following.length : 0}</strong> Following
          </Link>
          <Link
            to="followers"
            className={styles.followLink}
            style={{ textDecoration: "none", color: "inherit", marginLeft: "15px" }}
          >
            <strong>{userData.followers ? userData.followers.length : 0}</strong> Followers
          </Link>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Outlet />
      </div>
    </main>
  );
}

export default ProfilePage;
