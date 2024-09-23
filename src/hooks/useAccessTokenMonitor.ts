"use client";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { UserData } from "@/dto/SignIn.dto";
import { Pages } from "@/constants/constants";
import { useRouter } from "next/navigation";

interface Props {
  accessTokenCookie: any;
  accessToken: any;
  update: any;
  session: any;
  responseStatus: any;
}
export async function useAccessTokenMonitor({
  accessTokenCookie,
  accessToken,
  update,
  session,
  responseStatus,
}: Props) {
  console.log("useAccessTokenMonitor", accessTokenCookie);
  const router = useRouter();
  async function updateSession() {
    if (accessToken !== accessTokenCookie.value) {
      console.log("updateSession");
      const sessionData = {
        expires: new Date().toISOString(), // Assuming you want to set the current date/time as the expires field
        user: {
          ...session?.user,
          accessToken: accessTokenCookie.value,
        } as UserData,
      };

      await update(sessionData);
    }
  }

  const handleSignOut = async () => {
    console.log("handleSignOut");
    await signOut({ redirect: false }); // Prevent default redirect
    router.push(Pages.SIGNIN); // Redirect to the desired URL
  };

  useEffect(() => {
    if (accessTokenCookie) updateSession();
  }, [accessTokenCookie]);

  useEffect(() => {
    if (responseStatus) {
      if (responseStatus.value.includes("401")) {
        console.log("401 responseStatus");
        handleSignOut();
      }
    }
  }, [responseStatus]);

  return {
    monitoredToken: accessToken,
  };
}
