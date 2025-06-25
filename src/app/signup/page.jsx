"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

function SignUpPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast("SignUp Successful")
      console.log("SignUp Success", response.data);
      router.push("/login");
      setLoading(true);
    } catch (error) {
      console.log("Couldn't Load The Signup Page");
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
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
          <h1>{loading ? "Processing" : "SignUp"}</h1>
          <div className="m-4">
            <label htmlFor="username" className="mr-4">
              UserName
            </label>
            <input
              className="bg-gray-800 rounded-sm  outline-1 outline-gray-600 outline-offset-3 p-2"
              type="text"
              name="username"
              id=""
              value={user.username}
              onChange={handleChange}
            />
          </div>

          <div className="m-4">
            <label htmlFor="password" className="mr-4">
              Password
            </label>
            <input
              className="bg-gray-800 rounded-sm  outline-1 outline-gray-600 outline-offset-3 p-2"
              type="password"
              name="password"
              id=""
              value={user.password}
              onChange={handleChange}
            />
          </div>

          <div className="m-4">
            <label htmlFor="email" className="mr-4">
              Email
            </label>
            <input
              className="bg-gray-800 rounded-sm  outline-1 outline-gray-600 outline-offset-3 p-2"
              type="text"
              name="email"
              id=""
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              className="bg-gray-800 h-[40px] w-[100px] rounded-xl outline-1 outline-gray-700 outline-offset-3 hover:bg-gray-700 active:bg-gray-900"
              onClick={onSignup}
              disabled = {buttonDisabled}
            >
              {buttonDisabled ? "NoSignUp" : "SignUp"}
            </button>
            <Link href="/login" className="ml-5">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
