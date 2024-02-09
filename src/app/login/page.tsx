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
      <div>
        <Toaster />
      </div>
      <div className="flex items-center justify-center flex-col h-screen">
        <h1 className=" text-neutral-700 font-bold text-center text-3xl">
          {isLoding ? "Loding" : "Login"}
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

          <Link
            href="/forgetPassword/confirmEmail"
            className=" text-cyan-600 hover:text-cyan-800"
          >
            Forget Password
          </Link>

          <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
            <Button
              variant="outlined"
              onClick={onLogin}
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
              {isDisabled ? "No Login" : "Login"}
            </Button>
            <Link href="/signup" className=" text-cyan-600 hover:text-cyan-800">
              Visit Signup Page
            </Link>
          </Stack>
        </Box>
      </div>
    </>
  );
}
