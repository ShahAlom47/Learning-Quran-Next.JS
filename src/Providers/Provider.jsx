"use client";

import { SessionProvider } from "next-auth/react";
import { ImageKitProvider } from "imagekitio-next";
import { NotificationProvider } from "../components/Notification";

const urlEndpoint = process.env.NEXT_PUBLIC_IMG_KIT_URL;
const publicKey = process.env.NEXT_PUBLIC_IMG_KIT_PUBLIC_KEY;

export default function Providers({ children }) {
  const authenticator = async () => {
    try {
      const res = await fetch("/api/imageKit-auth");
      if (!res.ok) throw new Error("Failed to authenticate");
      return res.json();
    } catch (error) {
      console.error("ImageKit authentication error:", error);
      throw error;
    }
  };

  return (
    <SessionProvider refetchInterval={5 * 60}>

      <NotificationProvider>
        <ImageKitProvider
          publicKey={publicKey}
          urlEndpoint={urlEndpoint}
          authenticator={authenticator}
        >
          {children}
        </ImageKitProvider>
      </NotificationProvider>
    </SessionProvider>
  );
}