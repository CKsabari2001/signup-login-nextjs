"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function VerifyEmail() {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    const url = window.location.search;
    const urlToken = url.split("?token=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    async function verifyEmail() {
      setIsLoding(true);
      try {
        const response = await axios.post("/api/users/verifyEmail", { token });
        setIsVerified(true);
        toast.success(response.data.message);
      } catch (error: any) {
        setError(true);
        console.log("Verification failed", error.message);
        toast.error(error.message);
      } finally {
        setIsLoding(false);
      }
    }

    if (token.length > 0) {
      verifyEmail();
    }

    setTimeout(() => {
      router.push("/profile");
    }, 3000);
  }, [token, router]);

  return (
    <>
      <div className="flex items-center justify-center flex-col h-screen">
        {isLoding ? (
          <h1 className=" text-neutral-700 font-bold text-center text-3xl">
            Loading
          </h1>
        ) : (
          <>
            <h1 className=" text-neutral-700 font-bold text-center text-3xl">
              {(isVerified && "Email verification successfully") ||
                (error && "Email Verification failed")}
            </h1>
            <h2 className="mt-2 text-xl text-neutral-700 font-medium">
              {error ? "No token" : token}
            </h2>
          </>
        )}
      </div>
    </>
  );
}
