import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../layout/layout";
import Link from "next/link";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import login_validate from "../lib/validate";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthUserContext";
import h from "../public/photos/Animated_Shape.svg";
import Nav from "../components/Nav";

// import bg from "./waves.svg";
// import waves from "../public/photos/waves.svg";

const Login = () => {
  // const { authUser, loading, signOut } = useAuth();
  const router = useRouter();
  //const [show, setShow] = useState(false);
  const [show, setShow] = useState({ password: false, cpassword: false });
  const [err, setErr] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/Dashboard");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <>
      <Nav />
      <div className="flex h-screen relative">
        <Image src={h} className="w-full h-screen" alt=""></Image>
        <div className="absolute inset-16 m-auto bg-white rounded-lg w-3/4 grid lg:grid-cols-2 ">
          <div className=" relative">
            <div className="relative w-[100%] z-10 h-[100%] bg-no-repeat rounded-lg bg-cover bg-[url('/photos/logo.png')]"></div>
          </div>
          <div className="right flex flex-col justify-evenly ">
            <div className="text-center">
              <div className="w-3/4 mx-auto flex flex-col gap-10">
                <div className="title">
                  <h1 className="text-gray-800 text-4xl font-bold"></h1>
                  <p className="w-3/4 mx-auto text-indigo-600 text-3xl font-bold pt-10">
                    {" "}
                    MOTO-HELP
                  </p>
                </div>
                <div className="title">
                  <p className="w-3/4 mx-auto text-blue-600 text-xl font-bold ">
                    Login
                  </p>
                </div>
                {/* <Link href="/Dashboard">dashboard</Link>; */}
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <div className="flex flex-row border rounded-t-xl">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                    />
                    <span className="icon flex items-center px-4">
                      <HiAtSymbol size={25} />
                    </span>
                  </div>

                  <div className="flex flex-row border rounded-t-xl">
                    <input
                      type={`${show.password ? "text" : "password"}`}
                      name="password"
                      placeholder="password"
                      className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                    />
                    <span
                      className="icon flex items-center px-4"
                     // onClick={() => setShow(!show)}
                     onClick={() =>
                      setShow({ ...show, password: !show.password })}
                    >
                      <HiFingerPrint size={25} />
                    </span>
                  </div>

                  <div className="input-button">
                    <button
                      type="submit"
                      className="bg-indigo-600 rounded-lg p-3 text-white hover:scale-110 duration-300 "
                    >
                      Login
                    </button>
                    {err && <span>Something went wrong</span>}
                  </div>
                  <div className="flex justify-center gap-2 ">
                    <Image
                      src={"/photos/google.svg"}
                      width="20"
                      height="20"
                      alt=""
                    ></Image>
                    <button type="button">Sign in with Google </button>
                  </div>
                  <div className="flex justify-center gap-2">
                    <Image
                      src={"/photos/github.svg"}
                      width="20"
                      height="20"
                      alt=""
                    ></Image>
                    <button
                      type="button"
                      // onClick={handleGithubSignin}
                      // className={styles.button_custom}
                    >
                      Sign-in with Github{" "}
                    </button>
                  </div>
                </form>
                <p className="text-center text-gray-400">
                  Don't have an account at?{" "}
                  <Link href="/Register" className="text-blue-700">
                    Signup
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
