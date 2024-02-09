"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

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
      <div>
        <Toaster />
      </div>
      <div className="flex items-center justify-center flex-col h-screen">
        <h1 className=" text-neutral-700 font-bold text-center text-3xl">
          {isLoding ? "Loading" : "Signup"}
        </h1>
        <Box
          className="flex flex-col justify-center"
          component="form"
          sx={{
            "& > :not(style)": { width: "42ch", margin: "auto", mt: 5 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            error={isUserNameError}
            id="standard-basic"
            label="User name"
            variant="standard"
            value={user.userName}
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
          />
          <TextField
            required
            error={isEmailError}
            id="standard-basic"
            label="Email"
            variant="standard"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <TextField
            required
            error={isPsswordError}
            id="standard-basic"
            label="Password"
            variant="standard"
            type="password"
            value={user.passWord}
            onChange={(e) => setUser({ ...user, passWord: e.target.value })}
          />
          <TextField
            required
            error={isConfirmPassWord}
            id="standard-basic"
            label="Password"
            variant="standard"
            type="password"
            value={user.confirmPassWord}
            onChange={(e) =>
              setUser({ ...user, confirmPassWord: e.target.value })
            }
          />

          <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
            <Button
              variant="outlined"
              onClick={onSignup}
              sx={{
                borderColor: "rgba(8, 145, 178, 0.6)",
                "&:hover": {
                  borderColor: "rgba(21, 94, 117, 0.8)",
                },
                "&:hover span": {
                  backgroundColor: "rgba(21, 94, 117, 0.1)",
                },
              }}
              className="text-cyan-600 hover:text-cyan-800"
              disabled={isDisabled || isLoding}
            >
              {isDisabled ? "No Signup" : "Signup"}
            </Button>
            <Link href="/login" className=" text-cyan-600 hover:text-cyan-800">
              Visit Login Page
            </Link>
          </Stack>
        </Box>
      </div>
    </>
  );
}
