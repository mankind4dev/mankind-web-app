import { Button } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AdminPost() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  return (
    <>
      <div className="">
        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button
              type="button"
              gradientDuoTone="purpleToPink"
              outline 
              className="w-full"
            >
              Create Post
            </Button>
          </Link>
        )}
      </div>
    </>
  );
}
