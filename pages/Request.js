//a["//a["resourceSets"][0]["resources"][0]["travelDistance"]
import React, { useState, useContext, useEffect } from "react";
import {
  arrayUnion,
  arrayRemove,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteField,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getMessaging, getToken } from "firebase/messaging";
import { messaging } from "../firebase/firebase";

// import { doc, setDoc, getDoc } from "firebase/firestore";
const Request = (props) => {
  const a = new Array();
  console.log(props);
  const [mech, setMech] = useState([]);
  const [status, setStatus] = useState(true);
  
  useEffect(
    () =>
      onSnapshot(collection(db, "mechanic"), (snapshot) => {
        setMech(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }),
    []
  );
  const api =
    "ApOrSPtt3Kb25jn69KkX92oZaaLopI9ppMJaU6-eVeieOrMCWg9vusEaME2E10Dd";

  async function getLoc(lat2, lng2) {
    const url = `http://dev.virtualearth.net/REST/V1/Routes?wp.0=${props.lat},${props.lng}&wp.1=${lat2},${lng2}&key=${api}`;
    const response = await fetch(url);
    var data = await response.json();
    const dis = data["resourceSets"][0]["resources"][0]["travelDistance"];
    a.push(dis);
    return dis;
  }

  if (Object.keys(mech).length != 0) {
    mech.forEach((e) => {
      getLoc(e["lat"], e["lng"]).then((ed) => {
        e["dis"] = ed;
      });
    });
    console.log(mech);
  }

  const handleDelete = (index) => {
    updateDoc(doc(db, "clients", props.user.uid), {
      [index]: deleteField(),
    });

    // updateDoc(doc(db, "mechbooks", index), {
    //   book: arrayRemove(),
    // }).then(() => {
    //   console.log("deleted");
    // });
  };
  const handleButton = async (index, dis) => {
    // onSnapshot(doc(db, "mechbooks", index), (doc) => {
    //   console.log(doc.data()["book"][0]["useruid"]);
    // });
    // console.log(props.user[`${index}`]);
    updateDoc(doc(db, "clients", props.user.uid), {
      [index]: "booked",
    }).then(() => {
      console.log("field added");
    });

    console.log(props.user);

    try {
      updateDoc(doc(db, "mechbooks", index), {
        book: arrayUnion({
          useruid: props.user.uid,
          email: props.user.email,
          phone: props.user.phone,
          username: props.user.username,
          vModel: props.user.vModel,
          vNo: props.user.vNo,
          userLat: props.lat,
          userLng: props.lng,
          userAddress: props.address,
          distance: dis,
          msg : props.msg,
        }),
      })
        .then(() => {
          console.log(
            "A New mechbook Document Field has been added to an existing document"
          );
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("succesfull");
    } catch (err) {
      console.log(err);
      console.log("failed1");
    }
    setStatus(false);
    // const registrationToken = currentToken;

    // const message = {
    //   "notification":{
    //     "title":"An Order",
    //     "body":"You have an order"
    //   },
    //   token: registrationToken
    // };

    // // Send a message to the device corresponding to the provided
    // // registration token.
    // const getmsg = getMessaging()
    // await getmsg.send(message)
    //   .then((response) => {
    //     // Response is a message ID string.
    //     console.log('Successfully sent message:', response);
    //   })
    //   .catch((error) => {
    //     console.log('Error sending message:', error);
    //   });
   
   
    
  };

  return (
    <>
      {mech.map((val, i) => (
        <div
          key={i}
          className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
        >
          <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
            {val["ShopName"]}
          </h5>

          <ul role="list" className="space-y-5 my-7">
            <li className="flex space-x-3">
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                {val["Address"]}
              </span>
            </li>
            <li className="flex space-x-3">
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                {val["phone"]}
              </span>
            </li>
            <li className="flex space-x-3">
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                {val["username"]}
              </span>
            </li>
            <li className="flex space-x-3">
              <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                {val["dis"]} KM
              </span>
            </li>
          </ul>
          {props.user[`${val["uid"]}`] === "confirmed" ? (
            <h3 className="text-green-600 text-2xl text-center">
              Mechanic has approved your request
            </h3>
          ) : props.user[`${val["uid"]}`] === "booked" ? (
            <>
              <h3 className="text-indigo-700 text-center">
                You have Booked this mechanic
              </h3>
              <button
                type="button"
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-red-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                onClick={() => handleDelete(val["uid"])}
              >
                Delete
              </button>
            </>
          ) : (
            <button
              type="button"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
              onClick={() => handleButton(val["uid"], val["dis"])}
            >
              Book
            </button>
          )}
        </div>
      ))}
    </>
  );
};

export default Request;
{
  /* {props.user[`${val["uid"]}`] ? ( */
}
