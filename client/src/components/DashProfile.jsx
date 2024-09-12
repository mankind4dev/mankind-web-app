import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  //tO UPLOAD IMAGE
  const uploadImage = async () => {
    // rules_version = "2";

    // Craft rules based on data in your Firestore database
    // allow write: if firestore.get(
    //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
    //service firebase.storage {
    // match /b/{bucket}/o {
    //match /{allPaths=**} {
    //allow read,
    //allow write: if
    //request.resource.size < 2 * 1024 * 1024 &&
    //request.resource.contentType.matches('image/.*')

    //}
    // }
    //}
    //error to disapear when upload correct image
    setImageFileUploadError(null);
    const storage = getStorage(app);
    //not to get error when uploaded 2 image
    const fileName = new Date().getTime() + imageFile.name;

    const storageRef = ref(storage, fileName);

    //method use to upload image and to get info when it's uploaded
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          `Could not upload (File must be less than 2MB)`
        );
        setImageFileUploadProgress(null);
        setImageFile(null); //to make the initial image display back when uploaded error file
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
        <form className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
          />

          <div
            className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
            onClick={() => filePickerRef.current.click()}
          >
            {imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62, 152, 199, ${
                      imageFileUploadProgress / 100
                    })`,
                  },
                }}
              />
            )}
            <img
              src={imageFileUrl || currentUser.DashProfile}
              alt="User"
              className={`rounded-full w-full h-full object-cover border-8 border-[lightgray]
                ${
                  imageFileUploadProgress &&
                  imageFileUploadProgress < 100 &&
                  "opacity-60"
                }`}
            />
          </div>
          {imageFileUploadError && (
            <Alert color="failure">{imageFileUploadError}</Alert>
          )}
          <TextInput
            type="text"
            id="username"
            placeholder="Username"
            defaultValue={currentUser.username}
          />
          <TextInput
            type="email"
            id="email"
            placeholder="Email"
            defaultValue={currentUser.email}
          />
          <TextInput
            type="password"
            id="password"
            placeholder="****************"
          />
          <Button type="submit" gradientDuoTone="purpleToBlue">
            Update
          </Button>
        </form>
        <div className="text-red-500 flex justify-between mt-5">
          <span>Sign Out</span>
          <span>Delete Account</span>
        </div>
      </div>
    </>
  );
}
