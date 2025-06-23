import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./ProfilePage.module.scss";
import { auth } from "../../firebase/firebase";
import { fetchUserById,fetchAllUsers } from "../../api/userAPI";
import { followUser, unfollowUser } from "../../api/followAPI";
import defaultBanner from "/src/public/Images/image.png";
import defaultProfilePhoto from "/src/public/Images/default.jpg";
import axios from "axios";
import EditProfile from "../EditProfile/EditProfile"; // adjust the path as needed

function ProfilePage() {
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("posts");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [tweets, setTweets] = useState([]);
  const [likedTweets, setLikedTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);


  const currentUserId = auth.currentUser?.uid;

  const handleProfileUpdate = async () => {
    await fetchUserData(); // re-fetch user data to get updated bio and other info
  };

  const fetchUserData = async () => {
    try {
      const user = await fetchUserById(userId);
      setUserData(user);
      setIsOwnProfile(user.uid === currentUserId);

      if (currentUserId) {
        const res = await fetch(
          `https://twitter-clone-kfoi.onrender.com/api/checking/follows?firebaseUid=${currentUserId}&targetObjectId=${user._id}`
        );
        if (res.ok) {
          const data = await res.json();
          setIsFollowing(data.follows);
        } else {
          setIsFollowing(false);
        }
      }
    } catch (error) {
      console.error("Error fetching user data or follow status:", error);
    }
  };

  const fetchTweets = async () => {
    setLoading(true);
    try {
      if (selectedTab === "posts") {
        const res = await axios.get(`https://twitter-clone-kfoi.onrender.com/api/usertweets/${userId}`);
        setTweets(res.data);
      } else if (selectedTab === "likes") {
        const res = await axios.get(`https://twitter-clone-kfoi.onrender.com/api/userlikedtweets/${userId}`);
        setLikedTweets(res.data);
      }
    } catch (err) {
      console.error("Error fetching tweets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId, currentUserId]);

  useEffect(() => {
    fetchTweets();
  }, [selectedTab, userId]);

  const handleFollowToggle = async () => {
    if (loadingFollow || !currentUserId) return;
    setLoadingFollow(true);
    try {
      if (isFollowing) {
        await unfollowUser(currentUserId, userId);
      } else {
        await followUser(currentUserId, userId);
      }
      await fetchUserData();
    } catch (error) {
      console.error("Follow/unfollow failed:", error);
    } finally {
      setLoadingFollow(false);
    }
  };

  useEffect(() => {
  async function getUsers() {
    try {
      const users = await fetchAllUsers();
      setAllUsers(users);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  }

  getUsers();
}, []);


  const isFollowRoute =
    location.pathname.endsWith("/followers") || location.pathname.endsWith("/following");

  if (!userData) return <div>Loading...</div>;

  if (isFollowRoute) {
    return <Outlet />;
  }

  return (
    <main className={styles.profile_section}>
      <div className={styles.profilesection_header}>
        <div
          className={styles.back_option_profilesection}
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        >
          ← 
        </div>
        <div style={{ marginLeft: "20px" }}>
          <h6 className={styles.profile_name}>{userData.name}</h6>
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
            <button className={styles.edit_profile_btn} onClick={() => setShowEditProfile(true)}>
              Edit profile
            </button>
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
                position: "relative",
                top: "-120px",
                left: "300px",
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
            <strong>{userData.following?.length || 0}</strong> Following
          </Link>
          <Link
            to="followers"
            className={styles.followLink}
            style={{ textDecoration: "none", color: "inherit", marginLeft: "15px" }}
          >
            <strong>{userData.followers?.length || 0}</strong> Followers
          </Link>
        </div>
      </div>

      <div className={styles.buttons_profile_page}>
        <div
          className={`${styles.button_of_profile_page} ${
            selectedTab === "posts" ? styles.active : ""
          }`}
          onClick={() => setSelectedTab("posts")}
        >
          Posts
        </div>
        <div
          className={`${styles.button_of_profile_page} ${
            selectedTab === "likes" ? styles.active : ""
          }`}
          onClick={() => setSelectedTab("likes")}
        >
          Likes
        </div>
      </div>

      <div className={styles.profile_page_posts}>
      {loading ? (
  <p>Loading...</p>
) : selectedTab === "posts" ? (
  tweets.length === 0 ? (
    <p>No tweets yet.</p>
  ) : (
    tweets.map((tweet) => (
      <div key={tweet._id} className={styles.tweetContainer}>
        <img
          src={userData.photoURL || defaultProfilePhoto}
          alt="profile"
          className={styles.tweetProfilePhoto}
        />
        <div className={styles.tweetContentWrapper}>
          <div className={styles.tweetHeader}>
            <strong>{userData.name}</strong>{" "}
            <span className={styles.tweetUsername}>@{userData.username}</span>{" "}
            <span className={styles.tweetDate}>
              · {new Date(tweet.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className={styles.tweetContent}>{tweet.content}</div>
          {tweet.imageUrl && (
            <img
              src={tweet.imageUrl}
              alt="tweet"
              className={styles.tweetImage}
            />
          )}
        </div>
      </div>
    ))
  )
) : likedTweets.length === 0 ? (
  <p>No liked tweets yet.</p>
) : (
  likedTweets.map((tweet) => {
    const author = allUsers.find((user) => user._id === tweet.author._id);
    console.log("Author:", author);
    console.log("Tweet:", tweet);
    console.log("All Users:", allUsers);
    return (
      <div key={tweet._id} className={styles.tweetContainer}>
        <img
          src={author?.photoURL || defaultProfilePhoto}
          alt="profile"
          className={styles.tweetProfilePhoto}
        />
        <div className={styles.tweetContentWrapper}>
          <div className={styles.tweetHeader}>
            <strong>{author?.name || "User"}</strong>{" "}
            <span className={styles.tweetUsername}>
              @{author?.username || "username"}
            </span>{" "}
            <span className={styles.tweetDate}>
              · {new Date(tweet.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className={styles.tweetContent}>{tweet.content}</div>
          {tweet.imageUrl && (
            <img
              src={tweet.imageUrl}
              alt="tweet"
              className={styles.tweetImage}
            />
          )}
        </div>
      </div>
    );
  })
)
}


      </div>

      <div style={{ marginTop: "20px" }}>
        <Outlet />
      </div>
      {showEditProfile && (
  <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <EditProfile
        userData={userData}
        onClose={() => setShowEditProfile(false)}
        onUpdate={handleProfileUpdate}  // <-- new callback
      />
    </div>
  </div>
)}


    </main>
  );
}

export default ProfilePage;
