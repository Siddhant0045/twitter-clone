import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import styles from "./FollowingFollowers.module.scss";
import defaultProfilePhoto from "/src/public/Images/default.jpg";
import { fetchFollowing, fetchFollowers } from "../../api/followHelpers"; 

function FollowingFollowers() {
  const { userId } = useParams();
  const location = useLocation();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const type = location.pathname.includes("followers") ? "followers" : "following";

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        let data = [];
        if (type === "followers") {
          data = await fetchFollowers(userId);
        } else {
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
      <div className={styles.profilesection_header}>
        <div
          className={styles.back_option_profilesection}
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        >
        ← 
        </div>
        <div style={{ marginLeft: "20px" }}>
          <h6 className={styles.profile_name}>Go Back</h6>
        </div>
      </div>
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
