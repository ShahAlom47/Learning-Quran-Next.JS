import React from "react";
import { ImageKitProvider } from "imagekitio-next";

const urlEndpoint = process.env.NEXT_PUBLIC_IMG_KIT_URL;
const publicKey = process.env.NEXT_PUBLIC_IMG_KIT_PUBLIC_KEY;
console.log(urlEndpoint,publicKey);


export default function ImgKitProvider({ children }) {
    const authenticator = async () => {
        try {
            const response = await fetch("/api/imageKit-auth");

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();

            console.log(data);
            const { signature, expire, token } = data;
            return { signature, expire, token };
        } catch (error) {
            throw new Error(`Authentication request failed: ${error.message}`);
        }
    };

    return (

        <ImageKitProvider urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
            {children}
        </ImageKitProvider>

    );
}