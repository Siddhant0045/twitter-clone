import React, { useState, useEffect } from 'react';
import styles from './LeftSideBar.module.scss';
import { auth } from '../../helpers/firebase';
import { fetchAllUsers, fetchUserById } from '../../api/userAPI';

const LeftSidebar = () => {
  const currentUserId = auth.currentUser?.uid;
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getUsersAndDefaultUser = async () => {
      try {
        const usersData = await fetchAllUsers();
        setUsers(usersData);
        console.log('All Users:', usersData);

        const currentUser = usersData.find(u => u.uid === currentUserId);
        if (currentUser && currentUser._id) {
          const userData = await fetchUserById(currentUser._id);
          setSelectedUser(userData);
          console.log('Selected User:', userData);
        }
      } catch (error) {
        console.error('Failed to fetch users or selected user:', error);
      }
    };

    if (currentUserId) {
      getUsersAndDefaultUser();
    }
  }, [currentUserId]);

  return (
    <aside className={styles.sidebarLeft}>
      <div className={styles.logo}>X-Clone</div>
      <nav>
        <ul className={styles.navList}>
          <li>
            <button className={`${styles.navButton} ${styles.active}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                className="bi bi-house-door-fill" viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 
                5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 
                1.146a.5.5 0 0 0-.708 0l-6 
                6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 
                .5.5h4a.5.5 0 0 0 .5-.5"/>
              </svg>
              <span>Home</span>
            </button>
          </li>
          <li>
            <button className={styles.navButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                className="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 
                4-1 1-1 1zm5-6a3 3 0 1 0 
                0-6 3 3 0 0 0 0 6"/>
              </svg>
              <span>Profile</span>
            </button>
          </li>
          <li>
            <button className={styles.navButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 
                1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 
                1 1 0-3 1.5 1.5 0 0 1 0 3m5 
                0a1.5 1.5 0 1 1 0-3 1.5 1.5 
                0 0 1 0 3"/>
              </svg>
              <span>Log Out</span>
            </button>
          </li>
        </ul>
      </nav>

      <div className={styles.profileSection}>
        <button className={styles.profileButton}>
          <img
            src={selectedUser?.photoURL || './src/Images/default.jpg'}
            alt="User Avatar"
            className={styles.avatar}
          />
          <div className={styles.userInfo}>
            <span className={styles.userName}>{selectedUser?.name || 'Loading...'}</span>
            <span className={styles.userHandle}>{selectedUser?.username || ''}</span>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default LeftSidebar;
