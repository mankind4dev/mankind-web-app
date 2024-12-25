"use client";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import React, { useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function DeleteAcc() {
    const {currentUser, loading} = useSelector((state) => state.user)
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteAcct = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json()
      if(!res.ok){
        dispatch(deleteUserFailure(data.message))
      }else{
        dispatch(deleteUserSuccess(data))
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    } 
  };
  return (
    <>
      <span
        onClick={() => setShowModal(true)}
        className="text-red-500 hover:text-red-700 hover:underline cursor-pointer"
      >
        Delete Account
      </span>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <IoIosInformationCircleOutline className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:bg-gray-400">
              Are you sure you want to delete this account
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteAcct}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
