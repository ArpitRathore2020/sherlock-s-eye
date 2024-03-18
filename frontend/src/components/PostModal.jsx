import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/helper";
import { toast } from "react-hot-toast";

// this is the styling of the post modal
const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "50px",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0,0,0,0.7)",
  zIndex: 1000,
};

function PostModal({ isModalOpen, setIsModalOpen }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState();
  const [category, setCategory] = useState("other");

  async function addPost() {
    const toastId = toast.loading("Creating Post ...");

    // Check if title, content, and file are all provided
    if (!title.trim() || !content.trim() || !file) {
      toast.error("Please provide title, content, and image.");
      toast.dismiss(toastId);
      return;
    }
    // putting all the data received into a form
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("fileType", fileType);
    formData.append("file", file);
    formData.append("category", category);
    // sending the postdata to database
    await axios
      .post(`${BASE_URL}/addPost`, formData)
      .then((res) => {
        toast.success("Post created");
        setIsModalOpen(false);
      })
      .catch((err) => {
        toast.error("Error in creating post");
      });

    toast.dismiss(toastId);
  }

  if (!isModalOpen) return null;

  return (
    <div>
      <div style={OVERLAY_STYLES}>
        <div
          style={MODAL_STYLES}
          className="rounded-xl bg-gray-50 dark:bg-gray-600 w-full max-w-lg text-gray-500 dark:text-white border border-gray-600 dark:border-gray-50 flex-col overflow-auto "
        >
          <div className="flex justify-end h-4">
            <RxCross2
              onClick={() => setIsModalOpen(false)}
              color="white"
              className="rounded-sm bg-gray-300 hover:bg-gray-400 dark:bg-gray-300 "
            />
          </div>
          <div className="flex">
            <input
              className="p-4 border-none bg-gray-50 dark:bg-gray-600 text-3xl w-full outline-none"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div className="flex">
            <input
              className="p-4 border-none bg-gray-50 dark:bg-gray-600 w-full h-full outline-none"
              placeholder="What do you want to write about"
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></input>
          </div>
          <hr className="my-2"></hr>
          {file && (
            <>
              <img
                className="w-full rounded-xl shadow-xl py-2"
                src={URL.createObjectURL(file)}
                alt="selected Image"
              />
              <hr className="my-2"></hr>
            </>
          )}
          <input
            type="file"
            className="hidden"
            id="fileInput"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setFileType(e.target.files[0].type);
            }}
          />
          <label
            htmlFor="fileInput"
            className="bg-blue-400 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-800 m-2 text-white rounded-xl p-3 cursor-pointer"
          >
            Upload File
          </label>

          <select
            className="bg-blue-400 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-800 m-2 text-white rounded-xl p-3 cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="report">Report</option>
            <option value="observation">Observation</option>
            <option value="suggestion">Suggestion</option>
            <option value="other">Other</option>
          </select>

          <button
            className="bg-blue-400 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-800 m-2 text-white rounded-xl p-3"
            onClick={addPost}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
