import { React, useState, useEffect } from "react";
import { doc, setDoc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase/firebase";
import { getMessaging, getToken } from "firebase/messaging";

const mechBooks = (props) => {
  const [user, setUser] = useState({});
  const [status, setStatus] = useState(false);
  const check = async () => {
    const docRef = doc(db, "mechbooks", props.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      onSnapshot(docRef, (doc) => {
        setUser(doc.data());
        console.log("data fetched");
      });
    }
  };
  useEffect(() => {
    check();
  }, []);

  const handleConfirm = (useruid) => {
    updateDoc(doc(db, "clients", useruid), {
      [useruid]: "confirmed",
    }).then(() => {
      console.log("field added");
      // setStatus(true);
    });
    getToken(messaging, {
      vapidKey:
        "BIn0ve8Z-VyYOM089LsQ0LwIJHRZpSgeGL9OFQwKlGdmRU6XMdS3iCIxLFv1J9Aabu8c9AOFixeS3Vc68tJ2xYc",
    }).then((currentToken) => {
      if (currentToken) {
        const message = {
          data: {
            name : "Your request has been accepted"
          },
          token: registrationToken
        };
        
        // Send a message to the device corresponding to the provided
        // registration token.
        getMessaging().send(message)
          .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
          })
          .catch((error) => {
            console.log('Error sending message:', error);
          });
      }})
  };
  const handleDelete = (useruid) => {
    updateDoc(doc(db, "clients", useruid), {
      [useruid]: "Booked",
    }).then(() => {
      console.log("field added");
      // setStatus(false);
    });
  };
  console.log(user["book"]);
  // user["book"].map((e) => {
  //   console.log(e);
  // });
  console.log("from mechbooks", props.uid);
  console.log(user);
  return (
    <>
      {Object.keys(user).length != 0 &&
        user["book"].map((val, i) => (
          <div key={i} className="item-center flex-wrap mt-20">
            <div className="lg:w-3/5 w-5/6 shadow-2xl m-auto text-center bg-slate-200 text-black rounded-2xl">
              <div className="p-4 md:p-12 text-center">
                <h1 className="text-2xl font-bold ">
                  Client Name : {val["username"]}
                </h1>
                <h1 className="text-2xl font-bold pt-4">
                  Address : {val["userAddress"]}
                </h1>
                <h1 className="text-2xl font-bold py-4">
                  Phone No : {val["phone"]}
                </h1>
                <h1 className="text-2xl font-bold py-4">
                  Vehicle Model : {val["vModel"]}
                </h1>
                <h1 className="text-2xl font-bold py-4">
                  Vehicle No : {val["vNo"]}
                </h1>
                <h1 className="text-2xl font-bold py-4">
                  Vehicle No : {val["vNo"]}
                </h1>
                <h1 className="text-2xl font-bold py-4">
                  Message : {val["msg"]}
                </h1>
                <hr />

                {/* {status ? (
                  <>
                    <h3 className="text-green-600 text-xl text-center">
                      You have approved
                    </h3>
                    <button
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-red-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center  text-center"
                      onClick={() => handleDelete(val["useruid"])}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center  text-center"
                    onClick={() => handleConfirm(val["useruid"])}
                  >
                    Confirm
                  </button>
                )} */}
                <button
                  type="button"
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center  text-center"
                  onClick={() => handleConfirm(val["useruid"])}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default mechBooks;