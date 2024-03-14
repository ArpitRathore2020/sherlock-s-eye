import { useState } from "react";
import AddLeads from "./AddLead";
import PostModal from "./PostModal";

const posts = [
  {
    authorID: 234,
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ab perspiciatis sequi dignissimos corrupti quisquam accusamus rem recusandae fugiat, quis sint necessitatibus dolores minus nesciunt expedita animi veritatis vitae voluptas!",
    media: "https://picsum.photos/200",
    sentiment: 0.45,
    createdAt: "23 march 2024",
    upvotes: 23,
    downvotes: 34,
    title: "Theft at Noida sec 63",
    category: "Murder",
    comments: [
      {
        _id: 23,
        text: "la la random",
        id: 234,
        author: "user1",
      },
    ],
  },
  {
    authorID: 234,
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ab perspiciatis sequi dignissimos corrupti quisquam accusamus rem recusandae fugiat, quis sint necessitatibus dolores minus nesciunt expedita animi veritatis vitae voluptas!",
    media: "https://picsum.photos/200",
    sentiment: 0.45,
    createdAt: "23 march 2024",
    upvotes: 23,
    downvotes: 34,
    title: "Theft at Noida sec 63",
    category: "Murder",
    comments: [
      {
        _id: 23,
        text: "la la random",
        id: 234,
        author: "user1",
      },
    ],
  },
  {
    authorID: 234,
    text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ab perspiciatis sequi dignissimos corrupti quisquam accusamus rem recusandae fugiat, quis sint necessitatibus dolores minus nesciunt expedita animi veritatis vitae voluptas!",
    media: "https://picsum.photos/200",
    sentiment: 0.45,
    createdAt: "23 march 2024",
    upvotes: 23,
    downvotes: 34,
    title: "Theft at Noida sec 63",
    category: "Murder",
    comments: [
      {
        _id: 23,
        text: "la la random",
        id: 234,
        author: "user1",
      },
    ],
  },
];

// the input data will be something as follows

function Posts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="bg-gray-700 h-screen overflow-auto p-5">
      <AddLeads setIsModalOpen={setIsModalOpen} />
      {/* use useCallback here for setIsModalOpen to prevent rerendering in opening and closing of modal */}
      <PostModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <hr className="m-8 bg-gray-500"></hr>
      {posts.map((post, key) => {
        return (
          <Post
            key={key}
            text={post.text}
            author={post.authorID}
            image="https://picsum.photos/400/600"
            title={post.title}
          />
        );
      })}
    </div>
  );
}

function Post({ text, author, image, title }) {
  return (
    <div className="flex-col bg-gray-600 hover:bg-gray-500 rounded-md p-5 m-4">
      <div className="flex">
        <img
          className="rounded-full"
          src="https://picsum.photos/200"
          alt="userprofile"
          width={30}
          height={30}
        ></img>
        <i className="px-5">{author}</i>
        <div className="flex justify-end w-full">
          <button className="bg-red-400 p-2 rounded-xl hover:bg-red-500">
            <i>send message</i>
          </button>
        </div>
      </div>
      <div>
        <b>{title}</b>
      </div>
      <div className="flex rounded-xl bg-gray-800 justify-around">
        <img src={image} alt="media" />
      </div>
      <div className="flex">{text}</div>
    </div>
  );
}

export default Posts;
