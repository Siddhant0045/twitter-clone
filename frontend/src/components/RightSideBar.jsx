import React from "react";
import styles from "./RightSideBar.module.scss"; // Adjust the path based on your project structure

function RightSideBar() {
    return <aside className={styles.sidebarRight}>
                    {/* Search Bar */}
                    <div className={styles.searchBox}>
    <span className={styles.searchIcon}>🔍</span> {/* You can replace with SVG or an actual icon */}
    <input type="text" placeholder="Search Twitter" />
</div>

    
                    {/* Trending Section */}
                    <div className={styles.trendingBox}>
                        <h3>What's happening</h3>
                        <ul>
                            <li>
                                <div className={styles.trendItem}>
                                    <span className={styles.trendCategory}>Trending in Computer Science</span>
                                    <span className={styles.trendName}>#ReactJS</span>
                                    <span className={styles.tweetCount}>120K Tweets</span>
                                </div>
                            </li>
                            <li>
                                <div className={styles.trendItem}>
                                    <span className={styles.trendCategory}>Trending in Computer Science</span>
                                    <span className={styles.trendName}>#OpenAI</span>
                                    <span className={styles.tweetCount}>89K Tweets</span>
                                </div>
                            </li>
                            <li>
                                <div className={styles.trendItem}>
                                    <span className={styles.trendCategory}>Trending in India</span>
                                    <span className={styles.trendName}>#VITians</span>
                                    <span className={styles.tweetCount}>34K Tweets</span>
                                </div>
                            </li>
                            <li>
                                <div className={styles.trendItem}>
                                    <span className={styles.trendCategory}>Trending in India</span>
                                    <span className={styles.trendName}>#TechNews</span>
                                    <span className={styles.tweetCount}>57K Tweets</span>
                                </div>
                            </li>
                            <li>
                                <div className={styles.trendItem}>
                                    <span className={styles.trendCategory}>Trending in India</span>
                                    <span className={styles.trendName}>#SiddhantShindeIsTheBest</span>
                                    <span className={styles.tweetCount}>10K Tweets</span>
                                </div>
                            </li>
                        </ul>
                    </div>
    
                    {/* Who to Follow Section */}
                    <div className={styles.whoToFollowBox}>
                        <h3>Who to follow</h3>
                        <ul>
                            <li>
                                <div className={styles.followItem}>
                                    <img src="/src/public/Images/Siddhant.jpg" alt="Siddhant Shinde" className={styles.profileImage} />
                                    <div className={styles.profileInfo}>
                                        <span className={styles.profileName}>Siddhant Shinde</span>
                                        <span className={styles.profileHandle}>@siddhant_codes</span>
                                    </div>
                                    <button className={styles.followButton}>Follow</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </aside>
}
export default RightSideBar;