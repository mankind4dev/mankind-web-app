"use client"
import { useDispatch, useSelector } from "react-redux";
import { signoutUserSuccess } from "../redux/user/userSlice";

export default function SignOut() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  const handleSignout = async () =>{
    try {
       const res = await fetch('/api/user/signout', {
        method: "POST",
       }) 
       const data = await res.json()
       if(!res.ok){
        console.log(data.message)
       }else{
        dispatch(signoutUserSuccess())
       }
    } catch (error) {
        console.log(error.message)
    }
  }
  return (
    <>
      <span onClick={handleSignout} className="text-red-500 hover:text-red-700 hover:underline cursor-pointer">
        Sign Out
      </span>
    </>
  );
}
