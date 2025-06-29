"use client";

import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const sendEmailpage = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/forgotpassword", { email });
      toast.success("Email Sent");
      setEmailSent(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
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
      <div className="flex h-[100vh] w-full justify-center items-center">
        <div>
          <h1>Forgot Your Password</h1>
          <div className="m-4">
            <label htmlFor="username" className="mr-4">
              Enter Your Email
            </label>
            <input
              className="bg-gray-800 p-1 rounded-sm  outline-1 outline-gray-600 outline-offset-3"
              type="email"
              name="email"
              id=""
              value={email}
              onChange={handleChange}
            />
          </div>

          <button
            className="bg-gray-800 h-[40px] w-[250px] rounded-xl outline-1 outline-gray-700 outline-offset-3 hover:bg-gray-700 active:bg-gray-900"
            onClick={sendEmailpage}
          >
            {emailSent ? "Email Sent" : loading ? "Sending" : "Send Forgot Password Email"}
          </button>
          <h1 className="mt-2">

            {emailSent && "Check Your Email For Instructions"}
          </h1>
        </div>
      </div>
    </div>
  );
}
