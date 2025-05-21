import React, { useState } from "react";
import styles from "./TweetBox.module.scss";
import { auth } from "../firebase/firebase";
import defaultpic from "../public/Images/default.jpg";

const TweetBox = ({ onTweetPosted,currentUser }) => {
  const MAX_CHARS = 280;

  const [tweetText, setTweetText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentUserId = auth.currentUser?.uid;
  const user = auth.currentUser;

  const remainingChars = MAX_CHARS - tweetText.length;

  const handleTextChange = (e) => {
    setTweetText(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleTweet = async () => {
    if (tweetText.trim().length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/tweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: tweetText, author: currentUserId , email: user?.email}),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Failed to post tweet");
      }

      setTweetText("");
      setImageFile(null);
      setImagePreview(null);

      onTweetPosted();
    } catch (err) {
      setError(err.message || "Error posting tweet");
    } finally {
      setLoading(false);
    }
  };

  const isTweetValid = tweetText.trim().length > 0 || imageFile !== null;

  return (
    <div>
      <div className={styles.tweetBox}>
        <img
            src={user?.photoURL || defaultpic}
            alt="Profile"
          className={styles.profilePic}
        />
        <div className={styles.tweetInputSection}>
          <textarea
            maxLength={MAX_CHARS}
            rows={4}
            placeholder={"What's happening?"}
            value={tweetText}
            onChange={handleTextChange}
            className={styles.textarea}
          />
          <div className={styles.tweetBottom}>
            <label
              htmlFor="image-upload"
              className={styles.imageUploadLabel}
              title="Add image"
            >
              📷
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <span className={styles.charCount}>{remainingChars}</span>
          </div>
          {imagePreview && (
            <div className={styles.imagePreviewContainer}>
              <img
                src={imagePreview}
                alt="Preview"
                className={styles.imagePreview}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.tweetActions}>
        <button
          onClick={handleTweet}
          disabled={!isTweetValid || loading}
          className={styles.tweetButton}
          style={{
            backgroundColor:
              isTweetValid && !loading ? "#1da1f2" : "#8ed0f9",
            cursor: isTweetValid && !loading ? "pointer" : "not-allowed",
          }}
        >
          {loading ? "Posting..." : "Tweet"}
        </button>
      </div>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default TweetBox;
