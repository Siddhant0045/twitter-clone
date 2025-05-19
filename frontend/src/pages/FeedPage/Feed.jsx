import React, { useState, useEffect } from "react";
import styles from "./Feed.module.scss";
import { FaRegComment, FaRetweet, FaHeart, FaShare } from "react-icons/fa";
import TweetBox from "../../components/TweetBox";
import { auth } from "../../firebase/firebase";
import defaultimg from "/src/public/Images/default.jpg";
import { Link } from "react-router-dom";


function Feed() {
  const [tweets, setTweets] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const currentUserId = auth.currentUser.uid;

  const fetchTweets = async () => {
    const res = await fetch("http://localhost:8080/api/tweets");
    const data = await res.json();
    console.log("Fetched tweets:", data); // <- Add this line
    setTweets(data);
  };

  useEffect(() => {
    fetchTweets();
  }, [refreshTrigger]); // Fetches tweets when refreshTrigger changes

  const handleTweetPosted = () => {
    // Increment to trigger useEffect
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchTweetsWithLikes = async () => {
      const res = await fetch("http://localhost:8080/api/tweets");
      const data = await res.json();

      const tweetsWithLikes = await Promise.all(
        data.map(async (tweet) => {
          const [countRes, likedRes] = await Promise.all([
            fetch(`http://localhost:8080/api/likes/count/${tweet._id}`),
            fetch(`http://localhost:8080/api/likes/isLiked?tweetId=${tweet._id}&userId=${currentUserId}`)
          ]);

          const countData = await countRes.json();
          const likedData = await likedRes.json();

          return {
            ...tweet,
            likeCount: countData.count,
            isLiked: likedData.liked,
          };
        })
      );

      setTweets(tweetsWithLikes);
    };

    fetchTweetsWithLikes();
  }, [refreshTrigger]);
  const toggleLike = async (tweetId, isLiked) => {
    const url = "http://localhost:8080/api/likes";
    const payload = {
      tweet: tweetId,
      user: currentUserId
    };

    try {
      if (isLiked) {
        await fetch(url, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      // Refresh only that tweet
      setTweets(prev =>
        prev.map(tweet =>
          tweet._id === tweetId
            ? {
              ...tweet,
              isLiked: !isLiked,
              likeCount: isLiked ? tweet.likeCount - 1 : tweet.likeCount + 1
            }
            : tweet
        )
      );
    } catch (err) {
      console.error("Like/unlike failed", err);
    }
  };



  return (
    <main className={styles.feed}>
      <div className={styles.tabs}>
        <button>
          For you
        </button>
        <button>
          Following
        </button>
      </div>

      <TweetBox onTweetPosted={handleTweetPosted} />

      <div className={styles.tweetList}>
        {tweets.length === 0 ? (
          <p>No tweets found</p>
        ) : (
          tweets.map((tweet) => (
            <div key={tweet._id} className={styles.tweet}>
              <div className={styles.tweetLeft}>
                <Link to={`/homepage/profile/${tweet.author?._id}`}>
                  <img
                    src={tweet.author?.photoURL || defaultimg}
                    alt="Profile"
                    className={styles.avatar}
                  />
                </Link>
              </div>

              <div className={styles.tweetRight}>
                <div className={styles.tweetHeader}>
                  <Link to={`/homepage/profile/${tweet.author?._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <span style={{ fontWeight: "600", color: "white", fontSize: "15px" }}>
                      {tweet.author?.name || "unknown"}
                    </span>
                    <span style={{ color: "grey", fontSize: "14px", marginLeft: "5px" }}>
                      @{tweet.email.split("@")[0]}
                    </span>
                  </Link>
                  <span style={{ marginLeft: "5px" }}>
                    · {new Date(tweet.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <p>{tweet.content}</p>

                <div className={styles.tweetActions}>
                  <FaRegComment />
                  <FaRetweet />
                  <div
                    onClick={() => toggleLike(tweet._id, tweet.isLiked)}
                    style={{ color: tweet.isLiked ? "red" : "#71767b", cursor: "pointer" }}
                  >
                    <div style={{ display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center", gap: "5px" }}><FaHeart /> <a style={{ fontSize: "14px", marginTop: "2px", marginLeft: "2px" }}>{tweet.likeCount}</a></div>
                  </div>
                  <FaShare />
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default Feed;
