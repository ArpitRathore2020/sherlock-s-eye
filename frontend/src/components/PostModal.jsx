import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/helper";

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

  async function addPost() {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("file", file);
    formData.append("fileType", fileType);
    formData.append("category", "report");
    console.log(file);
    await axios
      .post(`${BASE_URL}/addPost`, formData)
      .then((res) => {
        alert(res);
      })
      .catch((err) => {
        alert(err);
      });
  }

  if (!isModalOpen) return null;

  return (
    <div>
      <div style={OVERLAY_STYLES}>
        <div
          style={MODAL_STYLES}
          className="rounded-xl bg-gray-600 w-full max-w-lg text-white border-2 flex-col overflow-auto "
        >
          <div className="flex justify-end h-4">
            <RxCross2 onClick={() => setIsModalOpen(false)} color="white" />
          </div>
          <div className="flex">
            <input
              className="p-4 border-none bg-gray-600 text-3xl w-full"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div className="flex">
            <input
              className="p-4 border-none bg-gray-600 w-full h-full"
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
            className="bg-red-500 hover:bg-red-800 m-2 text-white rounded-xl p-3 cursor-pointer"
          >
            Upload File
          </label>

          <button
            className="bg-red-500 hover:bg-red-800 m-2 text-white rounded-xl p-3"
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
