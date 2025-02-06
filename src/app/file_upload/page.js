"use client";
import { useRef } from "react";
import {   IKUpload } from "imagekitio-next";
import { Upload } from "lucide-react";
import Provider from "@/src/Providers/Provider";



const onError = (err) => {
  console.log("Error", err);
};

const onSuccess = (res) => {
  console.log("Success", res);
};

const onUploadProgress = (progress) => {
  console.log("Progress", progress);
};

const onUploadStart = (evt) => {
  console.log("Start", evt);
};

export default function FileUpload() {
  const ikUploadRefTest = useRef(null);
  return (
    <div className="App">
      <h1>ImageKit Next.js quick start</h1>


      <Provider>

   
        <IKUpload
          fileName="test-upload.jpg"
          useUniqueFileName={true}
          validateFile={(file) => file.size < 2000000}
          folder={"/test-folder"}
          overwriteCustomMetadata={true}
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          transformation={{
            pre: "l-text,i-Imagekit,fs-50,l-end",
            post: [
              {
                type: "transformation",
                value: "w-100",
              },
            ],
          }}
          style={{ display: 'flex' }}
          ref={ikUploadRefTest}
        />

       <button className=" bg-green-500 px-2 flex  gap-2 items-center" onClick={() => ikUploadRefTest.current.click()}> <Upload /> Upload</button>

      </Provider>
      
    </div>
  );
}