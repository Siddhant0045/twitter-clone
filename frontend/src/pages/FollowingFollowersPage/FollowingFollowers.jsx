import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./FollowingFollowers.module.scss"; // your CSS module
import defaultProfilePhoto from "/src/public/Images/Siddhant.jpg";

function FollowingFollowers({ type }) {
  const { userId } = useParams(); // get userId from URL
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        let data;
        if (type === "followers") {
          data = await fetchFollowers(userId);
        } else if (type === "following") {
          data = await fetchFollowing(userId);
        }
        setList(data);
      } catch (error) {
        console.error("Error fetching follow data:", error);
        setList([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [type, userId]);

  if (loading) return <div>Loading {type}...</div>;

  return (
    <div className={styles.container}>
      {list.length === 0 ? (
        <p className={styles.noDataText}>No {type} to show.</p>
      ) : (
        <ul className={styles.userList}>
          {list.map((user) => (
            <li key={user.uid} className={styles.userItem}>
              <img
                src={user.photoURL || defaultProfilePhoto}
                alt={user.name}
                className={styles.userPhoto}
              />
              <div className={styles.userInfo}>
                <p className={styles.userName}>{user.name}</p>
                <p className={styles.userUsername}>@{user.username}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FollowingFollowers;
