import { Alert, Button, Modal, Spinner, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice";
import DeleteAcc from "./DeleteAcc";
import SignOut from "./SignOut";
import AdminPost from "./AdminPost";

export default function DashProfile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUsersuccess] = useState(null)
  const [updateUserError, setUpdateUserError] = useState(null)
  // const [showModal, setShowModal] = useState(false)

  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    //how to track the image info
    const file = e.target.files[0];
    // How to convert the image to URL to beable to use it
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  console.log(imageFile, imageFileUrl, imageFileUploadProgress, updateUserSuccess)
  //How to upload pic
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  //tO UPLOAD IMAGE online to firebse data
  const uploadImage = async () => {
    // rules_version = "2";

    // Craft rules based on data in your Firestore database
    // allow write: if firestore.get(
    // /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
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
    setImageFileUploading(true);
    //error to disapear when upload correct image
    setImageFileUploadError(null); //when the upload is currently uploaded, the error disappear
    const storage = getStorage(app); //for the firebase to have access to the image upload
    //not to get error when uploaded or repeat image upload
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
          "Could not upload (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null); //when uploading file instad of image the 100% disappear
        setImageFile(null); //to make the initial image display back when uploaded error file
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          //To safe the image to the header profile
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null)
    setUpdateUsersuccess(null)
    // to check if the formData have some value/empty
    //the submit button has no changes. return  no function/changes
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made")
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload")
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message) 
      } else {
        dispatch(updateSuccess(data));
        setUpdateUsersuccess("User's profile update successfully")
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message)
    }
  };
  return (
    <>
      <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
          />
          {/* this will track the image when clicked on it */}
          {/* onClick={() => filePickerRef.current.click()} */}
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
              src={ imageFileUrl || currentUser.profilePicture} //if there's no image exist, show the initial user image
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
            value={formData.username}
            onChange={handleChange}
          />
          <TextInput
            type="email"
            id="email"
            placeholder="Email"
            defaultValue={currentUser.email}
            value={formData.email}

            onChange={handleChange}
          />
          <TextInput
            type="password"
            id="password"  
            placeholder="****************"
            onChange={handleChange}
          />
            <Button type="submit" gradientDuoTone="purpleToBlue" outline disabled={loading || imageFileUploading}>
          {loading ? (
            <>
            <Spinner size="sm" />
            <p className="text-[20px] capitalize ml-2">loading...</p>
            </>
          ): (

            "Update"
          )}
          </Button>
        </form>
        <div className="flex justify-between mt-5">
          <DeleteAcc />
          <SignOut />
        </div>
        <AdminPost />
        {updateUserSuccess &&(
          <Alert color="success" className="mt-5">
            {updateUserSuccess}
          </Alert>
        )}
        {error &&(
          <Alert color="success" className="mt-5">
            {error}
          </Alert>
        )}
        {updateUserError &&(
          <Alert color="failure" className="mt-5">
            {updateUserError}
          </Alert>
        )}
        
      </div>
    </>
  );
}
