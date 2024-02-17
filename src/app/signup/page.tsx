"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { CTextField, CBox, CButton } from "../components/StyledComponents";

import BgVideo from "../components/bgVideo";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    passWord: "",
    confirmPassWord: "",
    userName: "",
  });
  const [isLoding, setIsLoding] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [isEmailError, setIsEmailError] = useState(false);
  const [isUserNameError, setuserNameError] = useState(false);
  const [isPsswordError, setIsPsswordError] = useState(false);
  const [isConfirmPassWord, setIsConfirmPassWord] = useState(false);

  useEffect(() => {
    const { email, passWord, confirmPassWord, userName } = user;
    const USERNAME_REGEX = /^(?![_-])[a-zA-Z0-9_-]{4,}(?<![_-])$/;
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const PASSWORD_REGEX =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&. '"_-])[A-Za-z\d@$!%*?&. '"_-]{8,}$/;

    let isFormInvalid = false;

    // Validate User Name
    if (userName.length > 0 && !USERNAME_REGEX.test(userName)) {
      setuserNameError(true);
      isFormInvalid = true;
    } else {
      setuserNameError(false);
    }

    // Validate Email
    if (email.length > 0 && !EMAIL_REGEX.test(email)) {
      setIsEmailError(true);
      isFormInvalid = true;
    } else {
      setIsEmailError(false);
    }

    // Validate Password
    if (
      passWord.length > 0 &&
      (!PASSWORD_REGEX.test(passWord) || email === passWord)
    ) {
      setIsPsswordError(true);
      isFormInvalid = true;
    } else {
      setIsPsswordError(false);
    }

    // Validate Confirm Password
    if (
      confirmPassWord.length > 0 &&
      (!PASSWORD_REGEX.test(confirmPassWord) || confirmPassWord !== passWord)
    ) {
      setIsConfirmPassWord(true);
      isFormInvalid = true;
    } else {
      setIsConfirmPassWord(false);
    }

    setIsDisabled(
      isFormInvalid || !email || !passWord || !userName || !confirmPassWord
    );
  }, [user]);

  async function onSignup() {
    setIsLoding(true);
    try {
      const response = await axios.post("/api/users/signup", user);

      toast.success(response.data.message);

      router.push("/login");
    } catch (error: any) {
      const errMsg = error.response.data.error;

      // set the Custom Error Message for Custom Error passing from the Route
      const customError =
        errMsg === "User email already exists" ||
        errMsg === "User name already exists";

      if (customError) {
        console.log("Signup failed", errMsg);
        toast.error(errMsg);
      } else {
        console.log("Signup failed", error.message);
        toast.error(error.message);
      }
    } finally {
      setIsLoding(false);
    }
  }

  return (
    <>
      <div className="main-container">
        <BgVideo />
        <div>
          <Toaster />
        </div>
        <div className="flex items-center justify-center flex-col pt-14 md:pt-0 md:min-h-screen">
          <h1 className="font-bold text-3xl lg:text-5xl mb-10 lg:mb-16 main__title">
            {isLoding ? "Loading" : "Signup"}
          </h1>
          <CBox>
            <CTextField
              required
              error={isUserNameError}
              id="outlined-basic"
              label="User name"
              variant="outlined"
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
            />
            <CTextField
              required
              error={isEmailError}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <CTextField
              required
              error={isPsswordError}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              value={user.passWord}
              onChange={(e) => setUser({ ...user, passWord: e.target.value })}
            />
            <CTextField
              required
              error={isConfirmPassWord}
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={user.confirmPassWord}
              onChange={(e) =>
                setUser({ ...user, confirmPassWord: e.target.value })
              }
            />

            <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
              <CButton
                variant="outlined"
                onClick={onSignup}
                className="font-semibold text-base md:text-lg"
                disabled={isDisabled || isLoding}
              >
                {isDisabled ? "No Signup" : "Signup"}
              </CButton>
              <Link
                href="/login"
                className="main__link font-semibold text-base md:text-lg"
              >
                Visit Login Page
              </Link>
            </Stack>
          </CBox>
        </div>
      </div>
    </>
  );
}
