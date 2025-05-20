import { db } from "../firebase/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

import { fetchUserById } from "./userAPI"; // adjust the path

export async function fetchFollowing(userId) {
  console.log("Fetching following for:", userId);

  const user = await fetchUserById(userId);
  if (!user) throw new Error("User not found");

  const followingIds = user.following || [];
  console.log("Following IDs:", followingIds);

  if (followingIds.length === 0) return [];

  const userPromises = followingIds.map(async (id) => {
    const data = await fetchUserById(id);
    if (data) {
      return {
        uid: id,
        name: data.name,
        username: data.username,
        photoURL: data.photoURL || null,
      };
    }
    return null;
  });

  const users = await Promise.all(userPromises);
  console.log("Final list of following users:", users.filter(Boolean));
  return users.filter(Boolean);
}

  

export async function fetchFollowers(userId) {
    console.log("Fetching following for:", userId);
  
    const user = await fetchUserById(userId);
    if (!user) throw new Error("User not found");
  
    const followersIds = user.followers || [];
    console.log("Following IDs:", followersIds);
  
    if (followersIds.length === 0) return [];
  
    const userPromises = followersIds.map(async (id) => {
      const data = await fetchUserById(id);
      if (data) {
        return {
          uid: id,
          name: data.name,
          username: data.username,
          photoURL: data.photoURL || null,
        };
      }
      return null;
    });
  
    const users = await Promise.all(userPromises);
    console.log("Final list of following users:", users.filter(Boolean));
    return users.filter(Boolean);
  }
  
