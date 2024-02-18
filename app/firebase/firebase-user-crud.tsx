import { useState, useEffect } from "react";
import { db } from "./config";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export function createUser() {
  const [userId, setUsersId] = useState("");
  const [journalId, journalIdId] = useState("");

  const usersCollectionRef = collection(db, "users");

  console.log("step3");
  const createUser = async (userId: any) => {
    console.log("step4");
    await addDoc(usersCollectionRef, { userId: userId });
    console.log("step5");
};
console.log("step6");

//   const updateUser = async (userId: string) => {
//     const userDoc = doc(db, "users", userId);
//     const journalId = { journalId: 1223 };
//     await updateDoc(userDoc, journalId);
//   };

//   const deleteUser = async (userId: string) => {
//     const userDoc = doc(db, "users", userId);
//     await deleteDoc(userDoc);
//   };
}