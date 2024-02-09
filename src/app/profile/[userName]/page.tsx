"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface Params {
  params: {
    userName: string;
  };
}

interface userData {
  id: string;
  email: string;
  userName: string;
  isVerified: boolean;
  iat: number;
  exp: number;
}

export default function UserPage({ params }: Params) {
  const router = useRouter();
  const [isLoding, setIsLoding] = useState(false);
  const [data, setData] = useState<userData>({} as userData);

  useEffect(() => {
    async function getData() {
      try {
        const responce = await axios.get("/api/users/me");
        const userData = responce.data.data;
        setData(userData);
      } catch (error: any) {
        console.log("Getting user data failed", error.message);

        toast.error(error.message);
      }
    }
    getData();
  }, []);

  async function onLogout() {
    setIsLoding(true);

    try {
      const responce = await axios.get("/api/users/logout");

      const logOutMsg = responce.data.message;

      toast.success(logOutMsg);

      router.push("/login");
    } catch (error: any) {
      console.log("Logout failed", error.message);

      toast.error(error.message);
    } finally {
      setIsLoding(false);
    }
  }

  async function onVerifyUser() {
    setIsLoding(true);
    try {
      const response = await axios.post("/api/users/verifyEmail/fireMail", {
        user: data,
      });

      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsLoding(false);
    }
  }

  async function onDeleteUser() {
    const isVerifiedUser = data.isVerified;

    if (!isVerifiedUser) {
      toast.error("Only verified users can delete their account");
      return;
    }

    try {
      const response = await axios.delete("/api/users/deleteUser", {
        data: {
          user: data,
        },
      });

      console.log(response);
      toast.success(response.data.message);

      router.push("/login");
    } catch (error: any) {
      const errMsg = error.response.data.error;

      // const isCustomErr = errMsg === "User does not exist";

      // if (isCustomErr) {
      //   console.log(errMsg);
      //   toast.error(errMsg);
      // } else {
      //   console.log(error.message);
      //   toast.error(error.message);
      // }

      console.log(error.message);
    }
  }
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="flex items-center justify-center flex-col h-screen">
        <h1 className=" text-neutral-700 font-bold text-center text-3xl mb-10">
          {isLoding ? "Loding" : "User Details"}
        </h1>
        <div className="user-data">
          <h2>User Name - {data.userName}</h2>
          <h2>Email - {data.email}</h2>
          <h2>Verified User - {data.isVerified ? "Yes" : "No"}</h2>
        </div>
        <Stack
          spacing={2}
          direction="row"
          sx={{ alignItems: "center", marginTop: "20px" }}
        >
          <Button
            variant="outlined"
            onClick={onLogout}
            sx={{
              marginTop: "20px",
              borderColor: "rgba(8, 145, 178, 0.6)",
              "&:hover": {
                borderColor: "rgba(21, 94, 117, 0.8)",
              },
              "&:hover span": {
                backgroundColor: "rgba(21, 94, 117, 0.1)",
              },
            }}
            className="text-cyan-600 hover:text-cyan-800"
            disabled={isLoding}
          >
            Logout
          </Button>
          <Button
            variant="outlined"
            onClick={onVerifyUser}
            sx={{
              marginTop: "20px",
              borderColor: "rgba(8, 145, 178, 0.6)",
              "&:hover": {
                borderColor: "rgba(21, 94, 117, 0.8)",
              },
              "&:hover span": {
                backgroundColor: "rgba(21, 94, 117, 0.1)",
              },
            }}
            className="text-cyan-600 hover:text-cyan-800"
            disabled={isLoding}
          >
            Verify User
          </Button>
          <Button
            variant="outlined"
            onClick={onDeleteUser}
            sx={{
              marginTop: "20px",
              borderColor: "rgba(8, 145, 178, 0.6)",
              "&:hover": {
                borderColor: "rgba(21, 94, 117, 0.8)",
              },
              "&:hover span": {
                backgroundColor: "rgba(21, 94, 117, 0.1)",
              },
            }}
            className="text-cyan-600 hover:text-cyan-800"
            disabled={isLoding}
          >
            Delete User
          </Button>
        </Stack>
      </div>
    </>
  );
}
