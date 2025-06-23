import React, { useState } from "react";
import styles from "./EditProfile.module.scss";
import { auth } from "../../firebase/firebase";

function EditProfile({ userData ,onClose, onUpdate}) {
  const [username] = useState(userData.username || "");
  const [name] = useState(userData.name || "");
  const [bio, setBio] = useState(userData.bio || "");
  const id = auth.currentUser?.uid;
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8080/api/updatebio"||"https://twitter-clone-kfoi.onrender.com/api/updatebio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: id, 
          bio: bio,
        }),
      });
  
      const data = await response.json();
      if (onUpdate) {
        await onUpdate();  
      }
  
      if (response.ok) {
        console.log("Bio updated successfully:", data);
        onClose();
      } else {
        console.error("Failed to update bio:", data.message);
      }
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  return (
    <div className={styles.editProfileContainer}>
      <button onClick={onClose} className={styles.closeButton}>X</button>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            readOnly
          />
        </label>

        <label>
          Name:
          <input
            type="text"
            value={name}
            readOnly
          />
        </label>

        <label>
          Bio:
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            required
          />
        </label>

        <button type="submit" className={styles.saveButton}>Save</button>
      </form>
    </div>
  );
}

export default EditProfile;
