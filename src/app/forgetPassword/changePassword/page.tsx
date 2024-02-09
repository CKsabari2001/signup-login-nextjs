"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import toast, { Toaster } from "react-hot-toast";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

interface ResponseEmail {
  email: string;
}

export default function ChangePassword() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isLoding, setIsLoding] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

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
      confirmPassword !== passWord
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
      <div>
        <Toaster />
      </div>
      <div className="flex items-center justify-center flex-col h-screen">
        <h1 className=" text-neutral-700 font-bold text-center text-3xl">
          {isLoding ? "Loding" : "Confirm you'r Email"}
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
            error={isPwError}
            required
            id="standard-basic"
            label="Password"
            variant="standard"
            type="password"
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)}
          />
          <TextField
            error={isCpwError}
            required
            id="standard-basic"
            label="Confirm Password"
            variant="standard"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
            <Button
              disabled={isLoding || isDisabled}
              variant="outlined"
              onClick={onConfirmPassword}
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
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </div>
    </>
  ) : (
    <>
      <div>
        <Toaster />
      </div>
      <div className="flex items-center justify-center flex-col h-screen">
        <h1 className=" text-neutral-700 font-bold text-center text-3xl">
          {isLoding ? "Loding" : "Invalid Request"}
        </h1>
      </div>
    </>
  );
}
