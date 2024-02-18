"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import toast, { Toaster } from "react-hot-toast";

import Stack from "@mui/material/Stack";

import { CTextField, CBox, CButton } from "../../components/StyledComponents";

import BgVideo from "../../components/bgVideo";

interface ResponseEmail {
  email: string;
}

export default function ChangePassword() {
  const router = useRouter();
  const [token, setToken] = useState("ss");
  const [isLoding, setIsLoding] = useState(false);
  const [isVerified, setIsVerified] = useState(true);

  const [email, setEmail] = useState("Cksabari");
  const [passWord, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isPwError, setIsPwError] = useState(false);
  const [isCpwError, setIsCpwError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const url = window.location.search;
    const urlToken = url.split("?token=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    async function verifyUser() {
      setIsLoding(true);
      try {
        const response = await axios.post(
          "/api/users/forgetPassword/verifyUser",
          { token }
        );
        const { email }: ResponseEmail = response.data;

        setEmail(email);

        setIsVerified(true);
        toast.success(response.data.message);
      } catch (error: any) {
        const errMsg = error.response.data.error;

        const isCustomError = errMsg === "Invalid token";

        if (isCustomError) {
          console.log("email verification failed", errMsg);
          toast.error(errMsg);
        } else {
          console.log("email verification failed", error.message);
          toast.error(error.message);
        }
      } finally {
        setIsLoding(false);
      }
    }

    if (token.length > 0) {
      verifyUser();
    }
  }, [token]);

  useEffect(() => {
    const PASSWORD_REGEX =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&. '"_-])[A-Za-z\d@$!%*?&. '"_-]{8,}$/;

    let isFormInvalid = false;

    // Validate Password
    if (
      passWord.length > 0 &&
      (!PASSWORD_REGEX.test(passWord) || email === passWord)
    ) {
      setIsPwError(true);
      isFormInvalid = true;
    } else {
      setIsPwError(false);
    }

    // Validate Confirm Password
    if (
      (confirmPassword.length > 0 && !PASSWORD_REGEX.test(confirmPassword)) ||
      (confirmPassword.length > 0 && confirmPassword !== passWord)
    ) {
      setIsCpwError(true);
      isFormInvalid = true;
    } else {
      setIsCpwError(false);
    }

    setIsDisabled(isFormInvalid || !passWord || !confirmPassword);
  }, [email, passWord, confirmPassword]);

  async function onConfirmPassword() {
    try {
      const response = await axios.post(
        "/api/users/forgetPassword/confirmPassword",
        { email, passWord, confirmPassword }
      );

      toast.success(response.data.message);
      console.log(response.data);

      // Redirect to Login page
      router.push("/login");
    } catch (error: any) {
      const errMsg = error.response.data.error;
      const isCustomError = errMsg === "User is not found";

      if (isCustomError) {
        console.log("Confirm password failed", errMsg);
        toast.error(errMsg);
      } else {
        console.log("Confirm password failed", error.message);
        toast.error(error.message);
      }
    }
  }

  return isVerified ? (
    <>
      <div className="main-container">
        <BgVideo />
        <div>
          <Toaster />
        </div>
        <div className="flex items-center justify-center flex-col pt-14 md:pt-0 md:min-h-screen">
          <h1 className="font-bold text-3xl lg:text-5xl mb-10 lg:mb-16 main__title">
            {isLoding ? "Loding" : "Confirm you'r Email"}
          </h1>
          <CBox>
            <CTextField
              error={isPwError}
              required
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              value={passWord}
              onChange={(e) => setPassWord(e.target.value)}
            />
            <CTextField
              error={isCpwError}
              required
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
              <CButton
                disabled={isLoding || isDisabled}
                variant="outlined"
                onClick={onConfirmPassword}
                className="font-semibold text-base md:text-lg "
              >
                Submit
              </CButton>
            </Stack>
          </CBox>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="main-container">
        <BgVideo />
        <div>
          <Toaster />
        </div>
        <div className="flex items-center justify-center flex-col pt-14 md:pt-0 md:min-h-screen">
          <h1 className=" font-bold text-3xl lg:text-5xl mb-10 lg:mb-16 main__title">
            {isLoding ? "Loading" : "Invalid Request"}
          </h1>
        </div>
      </div>
    </>
  );
}
