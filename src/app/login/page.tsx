"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import Stack from "@mui/material/Stack";

import { CTextField, CBox, CButton } from "../components/StyledComponents";

import BgVideo from "../components/bgVideo";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    passWord: "",
  });
  const [isLoding, setIsLoding] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [isEmailError, setIsEmailError] = useState(false);
  const [isPsswordError, setIsPsswordError] = useState(false);

  useEffect(() => {
    const { email, passWord } = user;
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const PASSWORD_REGEX =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&. '"_-])[A-Za-z\d@$!%*?&. '"_-]{8,}$/;

    let isFormInvalid = false;

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

    setIsDisabled(isFormInvalid || !email || !passWord);
  }, [user]);

  async function onLogin() {
    setIsLoding(true);

    try {
      const response = await axios.post("/api/users/login", user);

      console.log("Login sucessfully", response.data);

      toast.success("Login sucessfully");
      router.push("/profile");
    } catch (error: any) {
      const errMsg = error.response.data.error;
      const isCustomError =
        errMsg === "User does not exist" || errMsg === "Password is incorrect";

      if (isCustomError) {
        console.log("Login failed", errMsg);
        toast.error(errMsg);
      } else {
        console.log("Login failed", error.message);
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
            {isLoding ? "Loading" : "Login"}
          </h1>
          <CBox>
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

            <Link
              href="/forgetPassword/confirmEmail"
              className="main__link font-semibold text-base md:text-lg"
            >
              Forget Password
            </Link>

            <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
              <CButton
                variant="outlined"
                onClick={onLogin}
                className="font-semibold text-base md:text-lg"
                disabled={isDisabled || isLoding}
              >
                {isDisabled ? "No Login" : "Login"}
              </CButton>
              <Link
                href="/signup"
                className="main__link font-semibold text-base md:text-lg"
              >
                Visit Signup Page
              </Link>
            </Stack>
          </CBox>
        </div>
      </div>
    </>
  );
}
