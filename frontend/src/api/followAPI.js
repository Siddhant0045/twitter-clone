const BASE_URL = "http://localhost:8080/api/follows"; 

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