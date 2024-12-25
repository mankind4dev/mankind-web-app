"use client";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  return (
    <>
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl font-semibold">Create a post</h1>
        <form action="" className="">
          <div className="flex flex-col gap-4 sm:flex-row justify-between mb-2">
            <TextInput
              type="text"
              placeholder="Title"
              required
              id="title"
              className="flex-1"
            />
            <Select>
              <option value="Uncategorized">Select a category</option>
              <option value="Javascript">Javascript</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
            </Select>
          </div>
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 mb-3">
            <FileInput type="file" accept="image/*" />
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
            >
              Upload Image
            </Button>
          </div>
          <div className="relative h-72">
            <ReactQuill
              theme="snow"
              placeholder="Write something..."
              className="mb-12 h-full"
              style={{ minHeight: "200px" }}
            />
          </div>
          <Button
            type="submit"
            required
            gradientDuoTone="purpleToPink"
            className="mt-20 md:mt-14 w-full"
          >
            Publish
          </Button>
        </form>
      </div>
    </>
  );
}
