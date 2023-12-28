"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../app/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCookie } from "cookies-next";
import Image from "next/image";

const Login = (e) => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const AdminLogin = (e) => {
    const email = data.email;
    const password = data.password;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast.success("Login Successfull😜!", {
          position: "top-center",
        });

        setCookie("logged", "true");

        setTimeout(() => {
          router.push("/Dashboard");
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        toast.error(errorMessage, {
          position: "top-center",
        });
      });
  };

  return (
    <div>
      <div className="bg-cyan-600 flex ">
        <div className="h-screen w-[40%]  flex-col flex items-center justify-center p-10 bg-white">
          <h1 className="m-5 mb-15">
            {" "}
            <Image
              src="/mylogo.jpg"
              width={150}
              height={150}
              alt="Picture of the author"
            />
          </h1>

          <input
            onChange={(e) => {
              setData({
                ...data,
                email: e.target.value,
              });
            }}
            value={data.email}
            required
            className="placeholder-shown:border-gray-900 autofill:bg-yellow-200 mt-1 block w-small px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      "
            placeholder="Enter your Email"
          />

          <input
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
            value={data.password}
            className="placeholder-shown:border-gray-900 autofill:bg-yellow-200 mt-1 block w-small px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      "
            placeholder="Enter your Password"
            type={'password'}
          />

          <button
            onClick={() => {
              AdminLogin();
            }}
            type="button"
            class=" mt-8 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <ToastContainer />
            Login In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
