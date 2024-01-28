"use client";
import React, { useContext, useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import Button from "@mui/material/Button";
import { IoArrowBackSharp } from "react-icons/io5";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../app/firebaseConfig";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { myContext } from "../app/utils/ContextApi";

const Attendence = () => {
  const [spinner, setSpinner] = useState(false);
  const { info, setInfo } = useContext(myContext);
  
 
 useEffect(() => {
    setSpinner(true);
    const newArray = info.map(data => data.fname);
    console.log(newArray);
    
    async function fetchData() {
      try {
        const docRef = await addDoc(collection(db, "attendence"), {
          name: newArray
        });
        console.log("Document written with ID: ", docRef.id);
       
      } catch (error) {
        setSpinner(false);
        console.log(error);
      }
      
    }
  
    return ()=> fetchData();
  
  }, []);




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
          <div
                
                className="w-full flex justify-center mt-2 bg-white"
              >
                <ul className="flex items-center w-full max-w-[900px] space-x-4 p-2">
                  <li className="flex-1"></li>
                  <li className="flex-1">
                    <Image
                      src="/avataaars.png"
                      width={50}
                      height={50}
                      alt="Picture of the author"
                    />
                  </li>
                  <li className="flex-1">fname</li>
                  <li className="flex-1">Check in </li>
                  <li className="flex-1">check out</li>
                </ul>
              </div>



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

export default Attendence;
