"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { BiSolidUserPin } from "react-icons/bi";
import StudentShow from "@/components/StudentShow";
import { useRouter } from "next/navigation";
import Attendence from "@/components/Attendence";
// import { myLoginContext } from "@/components/contextProvider/Context";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../firebaseConfig";
import { setCookie } from 'cookies-next';
import { deleteCookie } from 'cookies-next';

const Admin = () => {
  const router = useRouter();

  const LogOutUser = async (user) => {
    const auth = getAuth();
    await signOut(auth);
    deleteCookie('logged');
    router.push("/");
  
  };

  const [attendence, setAttendence] = useState(false);
  const studntAttendence = () => {
    setAttendence(true);
    setStudnts(false);
  };

  const [studnts, setStudnts] = useState(false);
  const student = () => {
    setStudnts(true);
    setAttendence(false);
  };

  return (
    <div className="flex">
      <div className="w-[20%] h-screen  flex flex-col items-center">
      <Image
      src="/mylogo.jpg"
      width={150}
      height={150}
      alt="Picture of the author"
    />

        <button
          className="flex justify-center items-center  text-[20px] mb-4  "
          onClick={studntAttendence}
        >
          <FaRegCircleUser size={25} className="mr-2 text-customBlue" />{" "}
          Students
        </button>

        <button
          className="flex justify-center items-center text-[20px] mb-4 "
          onClick={student}
        >
          <BiSolidUserPin size={25} className="mr-2 text-customBlue" />{" "}
          Attendance
        </button>

        <div className="mt-auto me-auto p-8 font-semibold">
          <button onClick={LogOutUser}>Logout</button>
        </div>
      </div>

      <div className="w-[80%]">
        {studnts ? (
          <div className="bg-customWhite overflow-y-auto max-h-screen  ">
            <Attendence />
          </div>
        ) : (
          <div className="bg-customWhite overflow-y-auto max-h-screen ">
            <StudentShow />
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
