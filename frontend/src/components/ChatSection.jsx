import { LuSendHorizonal } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import BASE_URL from "../config";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

function ChatSection() {
  const cookie = new Cookies();
  const obj = jwtDecode(cookie.get("jwt_auth"));
  const USER_ID = obj.id;
  const location = useLocation();
  const reciever = location.state.reciever;
  const recieverId = location.state.recieverId;
  const [messages, setMessages] = useState([]);
  // just take the user id and fetch all its chats
  useEffect(() => {
    axios
      .post(`${BASE_URL}/api/v1/getChats`, {
        data: {
          user: USER_ID,
        },
      })
      .then((response) => {
        setMessages(
          response.data.response.filter((message) => {
            return (
              (message.person1._id == USER_ID &&
                message.person2._id == recieverId) ||
              (message.person1._id == recieverId &&
                message.person2._id == USER_ID)
            );
          })[0].messages
        );

        // console.log(messages);
      })
      .catch((e) => {
        console.log(`error occured ${e}`);
      });
  }, [messages]);

  // console.log(recieverId);
  return (
    <div className="flex-col border border-gray-200 h-screen">
      <ChatTopBar
        className="h-1/6"
        recieverImage="https://winaero.com/blog/wp-content/uploads/2019/09/Chrome-Incognito-Mode-Icon-256.png"
        recieverUserName={reciever}
      />
      <div className="flex flex-col justify-end h-5/6">
        <Chats
          recieverImage="https://winaero.com/blog/wp-content/uploads/2019/09/Chrome-Incognito-Mode-Icon-256.png"
          messages={messages}
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
  const postChats = () => {
    axios
      .post(`${BASE_URL}/api/v1/putChats`, {
        data: {
          sender: senderId,
          reciever: recieverId,
          message: currentChat,
        },
      })
      .then((response) => {
        // console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
    setCurrentChat("");
  };
  return (
    <div className="bg-gray-600 flex w-full my-2">
      <input
        value={currentChat}
        onChange={(event) => {
          setCurrentChat(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key == "Enter") {
            postChats();
          }
        }}
        className="rounded-full p-3 m-3 w-full"
        type="text"
        placeholder="Enter your text here"
      />
      <LuSendHorizonal
        onClick={() => {
          postChats();
        }}
        className="m-3 w-12 h-12 p-1 rounded-2xl hover:bg-gray-500"
        color="white"
      />
    </div>
  );
}

// this is the part where we can see all the previous chats
function Chats({ recieverImage, messages }) {
  const cookie = new Cookies();
  const obj = jwtDecode(cookie.get("jwt_auth"));
  const USER_ID = obj.id;
  // console.log(messages);
  return (
    <div className="flex-col h-fit w-full overflow-auto no-scrollbar">
      {messages.map((chat, key) => {
        // console.log(messages);
        let msgClass = "",
          divClass = "flex m-1";
        let image =
          "https://winaero.com/blog/wp-content/uploads/2019/09/Chrome-Incognito-Mode-Icon-256.png";
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
