const BASE_URL = "http://localhost:8080/api/follows"; // adjust base URL as per your backend

// Follow a user
export async function followUser(followerId, followingId) {
  try {
    const res = await fetch(`${BASE_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ follower: followerId, following: followingId }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to follow user");
    }
    return await res.json();
  } catch (error) {
    console.error("followUser error:", error);
    throw error;
  }
}

// Unfollow a user
export async function unfollowUser(followerId, followingId) {
  try {
    const res = await fetch(`${BASE_URL}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ follower: followerId, following: followingId }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to unfollow user");
    }
    return await res.json();
  } catch (error) {
    console.error("unfollowUser error:", error);
    throw error;
  }
}

// Get followers of a user
export async function fetchFollowers(userId) {
  try {
    const res = await fetch(`${BASE_URL}/followers/${userId}`);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to fetch followers");
    }
    const data = await res.json();
    // Data structure: array of follows with populated follower object
    // Extract follower info from each item
    return data.map(item => ({
      uid: item.follower._id || item.follower._id,
      name: item.follower.username, // change if you have full name field
      username: item.follower.username,
      photoURL: item.follower.profilePicUrl || null,
    }));
  } catch (error) {
    console.error("fetchFollowers error:", error);
    throw error;
  }
}

// Get following of a user
export async function fetchFollowing(userId) {
  try {
    const res = await fetch(`${BASE_URL}/following/${userId}`);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to fetch following");
    }
    const data = await res.json();
    // Data structure: array of follows with populated following object
    return data.map(item => ({
      uid: item.following._id || item.following._id,
      name: item.following.username, // change if you have full name field
      username: item.following.username,
      photoURL: item.following.profilePicUrl || null,
    }));
  } catch (error) {
    console.error("fetchFollowing error:", error);
    throw error;
  }
}
