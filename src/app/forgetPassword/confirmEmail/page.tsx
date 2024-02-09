"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

import toast, { Toaster } from "react-hot-toast";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// useEffect(() => {
//   const { email, passWord, userName } = user;
//   const USERNAME_REGEX = /^(?![_-])[a-zA-Z0-9_-]{4,}(?<![_-])$/;
//   const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   const PASSWORD_REGEX =
//     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&. '"_-])[A-Za-z\d@$!%*?&. '"_-]{8,}$/;

//   let isFormInvalid = false;

//   // Validate User Name
//   if (userName.length > 0 && !USERNAME_REGEX.test(userName)) {
//     setuserNameError(true);
//     isFormInvalid = true;
//   } else {
//     setuserNameError(false);
//   }

//   // Validate Email
//   if (email.length > 0 && !EMAIL_REGEX.test(email)) {
//     setIsEmailError(true);
//     isFormInvalid = true;
//   } else {
//     setIsEmailError(false);
//   }

//   // Validate Password
//   if (
//     passWord.length > 0 &&
//     (!PASSWORD_REGEX.test(passWord) || email === passWord)
//   ) {
//     setIsPsswordError(true);
//     isFormInvalid = true;
//   } else {
//     setIsPsswordError(false);
//   }

//   setIsDisabled(isFormInvalid || !email || !passWord || !userName);
// }, [user]);

export default function ConfirmEmail() {
  const [email, setEmail] = useState("");
  const [isLoding, setIsLoding] = useState(false);

  const [isEmailSend, setIsEmailSend] = useState(false);

  async function onConfirmEmail() {
    setIsLoding(true);

    try {
      const response = await axios.post(
        "/api/users/forgetPassword/confirmEmail",
        { email }
      );

      toast.success(response.data.message);

      setEmail("");

      setIsEmailSend(true);
    } catch (error: any) {
      const errMsg = error.response.data.error;

      const isCustomError = errMsg === "User does not exist";

      if (isCustomError) {
        console.log("Cannot find user", errMsg);
        toast.error(errMsg);
      } else {
        console.log("Cannot find user", error.message);
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
            required
            id="standard-basic"
            label="Email"
            variant="standard"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
            <Button
              disabled={isLoding}
              variant="outlined"
              onClick={onConfirmEmail}
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
            <Link href="/login" className=" text-cyan-600 hover:text-cyan-800">
              Visit Login Page
            </Link>
          </Stack>
        </Box>
      </div>
    </>
  );
}
