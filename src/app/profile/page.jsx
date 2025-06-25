"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function profile() {
  const router = useRouter();

  const Logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("LoggedOut Successfully");
      router.push("/login")
    } catch (error) {
      console.log(error.message);
      toast.error(error);
    }
  };

  return (
    <div>
      <div>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#000000",
            },
          }}
        />
      </div>
      <div className="w-full h-[100vh] flex justify-center items-center">
        <div>
          <div className="text-2xl">This is Your Profile</div>
          <div className="w-full  justify-center items-center flex mt-3">
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={Logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default profile;
