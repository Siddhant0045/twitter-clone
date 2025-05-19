import React, { useState, useEffect } from "react";
import styles from "./Feed.module.scss";
import { FaRegComment, FaRetweet, FaHeart, FaShare } from "react-icons/fa";
import TweetBox from "./TweetBox";

function Feed() {
  const [tweets, setTweets] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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
                <img
                  src={
                    tweet.author?.photoURL ||
                    `src/Images/default.jpg`
                  }
                  alt="Profile"
                  className={styles.avatar}
                />
              </div>

              <div className={styles.tweetRight}>
                <div className={styles.tweetHeader}>
                  <span style={{fontWeight:"600",color:"white",fontSize:"15px"}}>{tweet.author?.name || "unknown"}</span>
                  <span style={{color:"grey",fontSize:"14px"}}>@{tweet.email.split("@")[0]}</span>
                  <span> · {new Date(tweet.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                </div>

                <p>{tweet.content}</p>

                <div className={styles.tweetActions}>
                  <FaRegComment />
                  <FaRetweet />
                  <FaHeart />
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
