"use client";

import React, { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      try {
        const responce = await axios.get("/api/users/me");
        router.push(`/profile/${responce.data.data.userName}`);
      } catch (error: any) {
        console.log("Getting user data failed", error.message);
        toast.error(error.message);
      }
    }
    getData();
  }, [router]);

  return <></>;
}
