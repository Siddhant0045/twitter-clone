import React, { useState } from "react";
import styles from "./Feed.module.scss";
import { FaRegComment, FaRetweet, FaHeart, FaShare } from "react-icons/fa";
import TweetBox from "./TweetBox";

function Feed() {
  const [activeTab, setActiveTab] = useState("forYou");
  const [liked, setLiked] = useState(false);

  return (
    <main className={styles.feed}>
      <div className={styles.tabs}>
        <button
          className={activeTab === "forYou" ? styles.active : ""}
          onClick={() => setActiveTab("forYou")}
        >
          For you
        </button>
        <button
          className={activeTab === "following" ? styles.active : ""}
          onClick={() => setActiveTab("following")}
        >
          Following
        </button>
      </div>
        <TweetBox />
      <div className={styles.tweetList}>
  {[1, 2, 3].map((_, idx) => (
    <div key={idx} className={styles.tweet}>
      <div className={styles.tweetLeft}>
        <img
          src={`https://i.pravatar.cc/40?img=${idx + 10}`} // Random user avatar
          alt="Profile"
          className={styles.avatar}
        />
      </div>
      <div className={styles.tweetRight}>
        <div className={styles.tweetHeader}>
          <strong>@user{idx + 1}</strong>
          <span> · 2h</span>
        </div>
        <p>This is a sample tweet number {idx + 1} with some content 🎯 i am the best i am the best i am the best i am the best i am the best i am the best i am the best </p>
        <div className={styles.tweetActions}>
          <FaRegComment />
          <FaRetweet />
          <FaHeart 
          className={liked ? styles.liked : ''} 
          onClick={() => setLiked(!liked)} 
          />
          <FaShare />
        </div>
      </div>
    </div>
  ))}
</div>

    </main>
  );
}

export default Feed;
