"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const getTokenFromURL = () => {
    const url = new URLSearchParams(window.location.search);
    const tokennew = url.get("token");
    setToken(tokennew || "");
  };

  useEffect(() => {
    getTokenFromURL();
  }, []);

  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  const changePassword = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/resetpassword", { token, password });
      setLoading(false);
      router.push("/login");
    } catch (error) {
      setLoading(false)
      console.log(error.message);
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
          <h1>Reset Your Password</h1>
          <div className="m-4">
            <label htmlFor="username" className="mr-4">
              Enter New Password
            </label>
            <input
              className="bg-gray-800 p-1 rounded-sm  outline-1 outline-gray-600 outline-offset-3"
              type="password"
              name="password"
              id=""
              value={password}
              onChange={handleChange}
            />
          </div>

          <button
            className="bg-gray-800 h-[40px] w-[250px] rounded-xl outline-1 outline-gray-700 outline-offset-3 hover:bg-gray-700 active:bg-gray-900"
            onClick={changePassword}
          >
            {loading
              ? "Wait"
              : "Change Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
