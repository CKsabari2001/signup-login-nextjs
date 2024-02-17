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

import { CTextField, CBox, CButton } from "../../components/StyledComponents";

import BgVideo from "../../components/bgVideo";

export default function ConfirmEmail() {
  const [email, setEmail] = useState("");
  const [isLoding, setIsLoding] = useState(false);

  const [isEmailError, setIsEmailError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let isFormInvalid = false;

    // Validate Email
    if (email.length > 0 && !EMAIL_REGEX.test(email)) {
      setIsEmailError(true);
      isFormInvalid = true;
    } else {
      setIsEmailError(false);
    }

    setIsDisabled(isFormInvalid || !email);
  }, [email]);

  async function onConfirmEmail() {
    setIsLoding(true);

    try {
      const response = await axios.post(
        "/api/users/forgetPassword/confirmEmail",
        { email }
      );

      toast.success(response.data.message);

      setEmail("");
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
              required
              error={isEmailError}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
              <CButton
                disabled={isLoding || isDisabled}
                variant="outlined"
                onClick={onConfirmEmail}
                className="font-semibold text-base md:text-lg"
              >
                Submit
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
