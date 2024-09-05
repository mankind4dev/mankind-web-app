import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
      {/* Left side */}
      <div className="flex-1">
      <Link
        to="/"
        className="    font-bold dark:text-white text-4xl"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Mankind
        </span>
        4dev
      </Link>
      <p className="text-sm mt-5">This is my best website you can learn more about Frontend frame work. Sign up with your email and password and enjoy your learning</p>
      </div>
      {/* right side */}
      <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div className="">
              <Label value="Your username" />
              <TextInput type='text' placeholder='Username' id='username'/>
            </div>
            <div className="">
              <Label value="Your email" />
              <TextInput type='email' placeholder='name@gmail.com' id='email'/>
            </div>
            <div className="">
              <Label value="Your Password" />
              <TextInput type='password' placeholder='*********' id='password'/>
            </div>
            <Button gradientDuoTone='purpleToBlue' type='submit'>
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='sign-in' className='text-blue-500 hover:underline'>
            Sign In
            </Link>
          </div>
        </div>
      </div>
      </div>
  )
}
