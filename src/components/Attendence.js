"use client";
import React, { useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { IoArrowBackSharp } from "react-icons/io5";
import { collection, doc, addDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../app/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";

const StudentShow = () => {
  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [courseError, setCourseError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    course: "",
    password: "",
    email: "",
    phone: "",
  });

  const addData = async (input) => {
    if (!input.firstName || !input.firstName.length) {
      setFnameError("First name is required");
      return false;
    } else {
      setFnameError("");
    }
    if (!input.lastName || !input.lastName.length) {
      setLnameError("Last name is required");
      return false;
    } else {
      setLnameError("");
    }
    if (!input.course || !input.course.length) {
      setCourseError("Course name is required");
      return false;
    } else {
      setCourseError("");
    }

    if (!input.password || !input.password.length) {
      setPasswordError("Password is required");
      return false;
    } else {
      setPasswordError("");
    }

    if (!input.email || !input.email.length) {
      setEmailError("Email is required");
      return false;
    } else {
      setEmailError("");
    }

    if (!input.phone || !input.phone.length) {
      setPhoneError("Phone number is required");
      return false;
    } else {
      setPhoneError("");
    }

    const docRef = await addDoc(collection(db, "cities"), {
      fname: input.firstName,
      lname: input.lastName,
      course: input.course,
      password: input.password,
      email: input.email,
      phone: input.phone,
    });

    // setTimeout(() => {
    //   setInput({
    //     firstName: "",
    //     lastName: "",
    //     course: "",
    //     password: "",
    //     email: "",
    //     phone: "",
    //   });
    // }, 2000);

    setTimeout(() => {
      window.location.reload();
    }, 1000);
    // console.log("Document written with ID: ", docRef.id);
  };

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "cities"));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
      // console.log(doc.id, " => ", doc.data());
    });

    return data;
  };

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const MyData = await getData();
      setUserData(MyData);
    }
    fetchData();
  }, []);

  const [spinner, setSpinner] = useState(false);

  setTimeout(() => {
    setSpinner(true);
  }, 2000);

  return (
    <div className="container mx-auto p-8 h-screen">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2 text-blue-600">
          <FaRegCircleUser size={22} />
          <h1 className="text-xl text-black font-medium">Attendence</h1>
        </div>
      </div>

      <div className="w-full flex justify-center ">
        <div className="w-full max-w-[900px]  rounded-t-md">
          <div className="flex items-center mb-4 h-12 bg-customBlue text-white rounded">
            <h5 className="flex-1">ID</h5>
            <h5 className="flex-1">Profile Image</h5>
            <h5 className="flex-1">Name</h5>
            <h5 className="flex-1">Check In Time</h5>
            <h5 className="flex-1">Check Out Time</h5>
          </div>
        </div>
      </div>
      {spinner ? (
        <div className="scroll-auto max-h-screen">
          {userData.map((kamran, index) => {
            return (
              <div
                key={kamran.id}
                className="w-full flex justify-center mt-2 bg-white"
              >
                <ul className="flex items-center w-full max-w-[900px] space-x-4 p-2">
                  <li className="flex-1">{index + 1}</li>
                  <li className="flex-1">
                    <Image
                      src="/avataaars.png"
                      width={50}
                      height={50}
                      alt="Picture of the author"
                    />
                  </li>
                  <li className="flex-1">{kamran.fname}</li>
                  <li className="flex-1">{kamran.course}</li>
                  <li className="flex-1">{kamran.password}</li>
                </ul>
              </div>
            );
          })}
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default StudentShow;
