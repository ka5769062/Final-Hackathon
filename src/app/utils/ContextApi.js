"use client";
import React, { createContext, useState } from "react";

export const myContext = createContext();

const ContextApi = ({children}) => {
  const [info, setInfo] = useState("");
  return (
    <>
      <myContext.Provider value={{info,setInfo}}>
        {children}
      </myContext.Provider>
    </>
  );
};

export default ContextApi;
