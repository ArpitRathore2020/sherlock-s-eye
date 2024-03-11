import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
// this is the syling of the post modal
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
  const [file, setFile] = useState();
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  // if modal is not open so just return null
  if (!isModalOpen) return null;
  // if modal is open so we have to show the modal
  return (
    <div>
      <div style={OVERLAY_STYLES}>
        <div
          style={MODAL_STYLES}
          className="rounded-xl bg-gray-600 w-3/5 h-3/5 text-white border-2 flex-col overflow-auto"
        >
          <div className="flex justify-end h-4">
            <RxCross2 onClick={() => setIsModalOpen(false)} color="white" />
          </div>
          <div className=" flex">
            <input
              className="p-4 border-none bg-gray-600 text-3xl w-full"
              placeholder="Title"
            ></input>
          </div>
          <div className=" flex">
            <input
              className="p-4 border-none bg-gray-600 w-full h-full"
              placeholder="What do you want to write about"
            ></input>
          </div>
          <hr className="my-2"></hr>
          <img
            className="w-3/5 rounded-xl shadow-xl py-2"
            src={file}
            alt="selected Image"
          />
          <hr className="my-2"></hr>
          <input
            type="file"
            className="hidden"
            id="fileInput" // Add an id to the input element
            onChange={handleChange}
          />
          <label
            htmlFor="fileInput"
            className="bg-red-500 hover:bg-red-800 m-2 text-white rounded-xl p-3 cursor-pointer"
          >
            Upload File
          </label>

          <button
            className="bg-red-500 hover:bg-red-800 m-2 text-white rounded-xl p-3"
            onClick={() => {
              setFile();
              setIsModalOpen(false);

              // we have to send a request to backend now to add a post
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
