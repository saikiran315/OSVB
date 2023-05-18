import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthUserContext";
import login_validate from "../lib/validate";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useRouter } from "next/router";
import Link from "next/link";
// import Mechanic from "./Mechanic";
import { messaging } from "../firebase/firebase";
import { getMessaging, getToken } from "firebase/messaging";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import h from "../public/photos/Animated_Shape.svg";
import Image from "next/image";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const [user, setUser] = useState({});

  if (!currentUser) {
    router.push("./Login");
  }
    //  const messaging=getMessaging();
    // async function requestPermission() {
    //   const permission = await Notification.requestPermission();
    //   if (permission === "granted") {
    //     // Generate Token
    //     const token = await getToken(messaging, {
    //       vapidKey:
    //         "BIn0ve8Z-VyYOM089LsQ0LwIJHRZpSgeGL9OFQwKlGdmRU6XMdS3iCIxLFv1J9Aabu8c9AOFixeS3Vc68tJ2xYcOFGg",
    //     }).then((currentToken) => {
    //       if (currentToken) {
    //         // Send the token to your server and update the UI if necessary
    //         // ...
    //       } else {
    //         // Show permission request UI
    //         console.log('No registration token available. Request permission to generate one.');
    //         // ...
    //       }
    //     }).catch((err) => {
    //       console.log('An error occurred while retrieving token. ', err);
    //       // ...
    //     });
    //     console.log("Token Gen", token);
    //     // Send this token  to server ( db)
    //   } else if (permission === "denied") {
    //     alert("You denied for the notification");
    //   }
    // }
  
    // useEffect(() => {
    //   // Req user for notification permission
    //   requestPermission();
    // }, []);
  //   return children;
  // };
  // useEffect(() => {
  //   const getData = () => {
  //     const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
  //       // console.log(doc.data());
  //       setUser(doc.data());
  //     });

  //     return () => { 
  //       unsub();
  //     };
  //   };

  //   currentUser.uid && getData();
  // }, [currentUser.uid]);

  useEffect(() => {
    if (auth.currentUser) {
      let uid = auth.currentUser.uid;

      onSnapshot(doc(db, "clients", uid), (doc) => {
        setUser(doc.data());
      });
    } else {
    }
  }, [auth]);

  // console.log(user);

  return (
    <>
      <div className=" relative">
        <Image src={h} className="w-full h-[135vh]" alt=""></Image>
        <div className="absolute inset-4">
          <div className="item-center flex-wrap ">
            <div className="lg:w-3/5 w-5/6 shadow-2xl m-auto bg-slate-200 text-black rounded-2xl">
            <button
                className="float-right font-bold m-2 bg-red-500 px-4 py-3 rounded-lg text-slate-200 hover:scale-110 duration-300"
                onClick={() => signOut(auth)}
              >
                Sign out
              </button>
              <button
                className="float-right font-bold m-2 bg-green-500 px-4 py-3 rounded-lg text-slate-200 hover:scale-110 duration-300"
              >
                <Link href="./Update">Edit</Link>
              </button>
              <div className="p-4 md:p-12 text-center">
                <div
                  className="rounded-full shadow-2xl mx-auto h-48 w-48 bg-cover"
                // style={{ backgroundImage: `url(${user.photoURL})` }}
                >
                  <img
                    src={user.photoURL}
                    alt=""
                    className="rounded-full h-48 w-48 shadow-2xl bg-cover"
                    // width="192"
                    // height="192"
                  />
                </div>

                <h1 className="text-3xl font-bold p-6 uppercase">
                  Name : {user.username}
                </h1>
                <h2 className=" font-bold p-6">Email : {user.email}</h2>
                <hr />
              </div>
            </div>
          </div>
          <div className="item-center flex-wrap mt-20">
            <div className="lg:w-3/5 w-5/6 shadow-2xl m-auto text-center bg-slate-200 text-black rounded-2xl">
              <div className="p-4 md:p-12 text-center">
              
                <h1 className="text-2xl font-bold ">
                  Vehicle No. : {user.vNo}
                </h1>
                <h1 className="text-2xl font-bold pt-4">
                  Vehicle Model : {user.vModel}
                </h1>
                <h1 className="text-2xl font-bold py-4">
                  Phone : {user.phone}
                </h1>
                {/* <h1 className="text-2xl font-bold p-6">City :</h1> */}
                <hr />
                <Link
                  href="./search"
                  className="bg-indigo-600 rounded-lg p-3 text-white "
                >
                  Mechanics Near Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
