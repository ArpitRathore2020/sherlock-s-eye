import { LuSendHorizonal } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import BASE_URL from "../config";
const USER_ID = "65f289606797755339715b95";

function ChatSection() {
  const location = useLocation();
  const reciever = location.state.reciever;
  const recieverId = location.state.recieverId;
  console.log(recieverId);
  // console.log("chats " + chats.messages[0].message);
  return (
    <div className="flex-col border border-gray-200 h-full">
      <ChatTopBar
        className="h-1/6"
        recieverImage="https://picsum.photos/200"
        recieverUserName={reciever}
      />
      <div className="flex flex-col justify-end h-5/6">
        <Chats
          recieverImage="https://picsum.photos/200"
          messages={location.state.messages}
        />
        <ChatFooter senderId={USER_ID} recieverId={recieverId} />
      </div>
    </div>
  );
}

// top bar of the chat section where we can see the information about the receiver
function ChatTopBar({ recieverImage, recieverUserName }) {
  return (
    <div className="bg-gray-600 flex p-4 w-full">
      <img
        className="w-10 h-10 rounded-full mx-2"
        src={recieverImage}
        alt="reciverImage"
      />
      <i className="mx-4">@{recieverUserName}</i>
    </div>
  );
}

// the field where we input the message
function ChatFooter({ senderId, recieverId }) {
  const [currentChat, setCurrentChat] = useState("");
  return (
    <div className="bg-gray-600 flex w-full my-2">
      <input
        onChange={(event) => {
          setCurrentChat(event.target.value);
        }}
        className="rounded-full p-3 m-3 w-full"
        type="text"
        placeholder="Enter your text here"
      />
      <LuSendHorizonal
        onClick={() => {
          axios
            .post(`${BASE_URL}/api/v1/putChats`, {
              data: {
                sender: senderId,
                reciever: recieverId,
                message: currentChat,
              },
            })
            .then((response) => {
              console.log(response);
            })
            .catch((e) => {
              console.log(e);
            });
        }}
        className="m-3 w-12 h-12 p-1 rounded-2xl hover:bg-gray-500"
        color="white"
      />
    </div>
  );
}

// this is the part where we can see all the previous chats
function Chats({ recieverImage, messages }) {
  console.log(messages);
  return (
    <div className="flex-col h-fit w-full overflow-auto">
      {messages.map((chat, key) => {
        let msgClass = "",
          divClass = "flex m-1";
        let image = "https://picsum.photos/200";
        if (chat.direction[0].from == USER_ID) {
          msgClass = "bg-gray-500 rounded-xl p-2 flex";
          divClass = "flex m-1 flex-row-reverse";
          image = recieverImage;
        } else {
          msgClass = "bg-gray-600 rounded-xl p-2 flex";
        }
        return (
          <div key={key} className={divClass}>
            <div>
              <img
                className="w-10 h-10 rounded-full mx-2 "
                src={image}
                alt="image here"
              />
            </div>
            <div className={msgClass}>{chat.message}</div>
          </div>
        );
      })}
    </div>
  );
}
export default ChatSection;
