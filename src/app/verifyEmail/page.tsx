"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { CBox } from "../components/StyledComponents";

import BgVideo from "../components/bgVideo";
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
      <div className="main-container">
        <BgVideo />
        <div className="flex items-center justify-center flex-col pt-14 md:pt-0 md:min-h-screen">
          {isLoding ? (
            <h1 className="font-bold text-3xl lg:text-5xl mb-10 lg:mb-16 main__title">
              Loading
            </h1>
          ) : (
            <>
              <h1 className="font-bold text-3xl lg:text-5xl mb-10 lg:mb-16 main__title">
                {(isVerified && "Email verification successfully") ||
                  (error && "Email Verification failed")}
              </h1>
              <CBox>
                <h2 className="mb-10 lg:mb-16 mt-2 px-2 text-wrap">
                  {error ? "No token" : "Token - " + token}
                </h2>
              </CBox>
            </>
          )}
        </div>
      </div>
    </>
  );
}
