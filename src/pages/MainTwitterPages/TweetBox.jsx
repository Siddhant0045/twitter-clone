import React, { useState } from "react";
import styles from "./TweetBox.module.scss";

const TweetBox = () => {
  const MAX_CHARS = 280;

  const [tweetText, setTweetText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleTweet = () => {
    alert(`Tweet posted:\n${tweetText}${imageFile ? "\nWith image attached." : ""}`);
    setTweetText("");
    setImageFile(null);
    setImagePreview(null);
  };

  const isTweetValid = tweetText.trim().length > 0 || imageFile !== null;

  return (
    <div>
      <div className={styles.tweetBox}>
        <img
          src="src/Images/Siddhant.jpg"
          alt="Profile"
          className={styles.profilePic}
        />
        <div className={styles.tweetInputSection}>
          <textarea
            maxLength={MAX_CHARS}
            rows={4}
            placeholder="What's happening?"
            value={tweetText}
            onChange={handleTextChange}
            className={styles.textarea}
          />
          <div className={styles.tweetBottom}>
            <label htmlFor="image-upload" className={styles.imageUploadLabel} title="Add image">
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
              <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.tweetActions}>
        <button
          onClick={handleTweet}
          disabled={!isTweetValid}
          className={styles.tweetButton}
          style={{
            backgroundColor: isTweetValid ? "#1da1f2" : "#8ed0f9",
            cursor: isTweetValid ? "pointer" : "not-allowed",
          }}
        >
          Tweet
        </button>
      </div>
    </div>
  );
};

export default TweetBox;
