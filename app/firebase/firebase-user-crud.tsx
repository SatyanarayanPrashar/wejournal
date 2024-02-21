// import { useState, useEffect } from "react";
// import { db } from "./config";
// import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

// export function createUser() {
//   const [userId, setUsersId] = useState("");
//   const [journalId, journalIdId] = useState("");

//   const usersCollectionRef = collection(db, "users");

//   console.log("step3");
//   const createUser = async (userId: any) => {
//     await addDoc(usersCollectionRef, { userId: userId });
//     console.log("step5");
// };
// console.log("step6");