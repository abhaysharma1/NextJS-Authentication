"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    password: "",
    email: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [processing, setProcessing] = useState(false);

  const onLogIn = async () => {
      try {
        setProcessing(true);
        setButtonDisabled(true);
        const response = await axios.post("/api/users/login", user);
        console.log("Logged In Successfuly", response.data);
        toast("Logged In Successfully ");
        router.push("/profile");
      } catch (error) {
        toast.error(error);
      } finally {
        setProcessing(false);
        setButtonDisabled(false);
      }
    
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      <div className="h-[100vh] w-full flex justify-center items-center">
        <div>
          <h1>LogIn</h1>
          <div className="m-4">
            <label htmlFor="username" className="mr-4">
              Email
            </label>
            <input
              className="bg-gray-800 p-1 rounded-sm  outline-1 outline-gray-600 outline-offset-3"
              type="text"
              name="email"
              id=""
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div className="m-4">
            <label htmlFor="password" className="mr-4">
              Password
            </label>
            <input
              className="bg-gray-800 p-1 rounded-sm  outline-1 outline-gray-600 outline-offset-3"
              type="password"
              name="password"
              id=""
              value={user.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              className="bg-gray-800 h-[40px] w-[100px] rounded-xl outline-1 outline-gray-700 outline-offset-3 hover:bg-gray-700 active:bg-gray-900"
              onClick={onLogIn}
              style={buttonDisabled ? { color: "#364153" } : { color: "white" }}
              disabled={buttonDisabled}
            >
              {processing ? "Processing" : "LogIn"}
            </button>
            <Link href="/forgotpassword" className="ml-5">
              Forgot Password
            </Link>
            <Link href="/signup" className="ml-5">
              Go to SignUp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
