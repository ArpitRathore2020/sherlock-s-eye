import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

function ChatsBar() {
  const [conversations, setConversations] = useState([]);
  const cookie = new Cookies();
  const obj = jwtDecode(cookie.get("jwt_auth"));
  const USER_ID = obj.id;

  useEffect(() => {
    axios
      .post(`${BASE_URL}/api/v1/getChats`, {
        data: {
          user: USER_ID,
        },
      })
      .then((response) => {
        setConversations(response.data.response);
      })
      .catch((e) => {
        console.log(`error occurred ${e}`);
      });
  }, [conversations]);

  const navigate = useNavigate();
  return (
    <div className="flex-col bg-black h-full text-white">
      <b>CHATS</b>
      {conversations.map((conversation, key) => {
        const reciever =
          conversation.person1._id == USER_ID
            ? conversation.person2.name
            : conversation.person1.name;
        return (
          <ChatComp
            key={key}
            reciever={reciever}
            conversation={conversation}
            navigate={navigate}
            USER_ID={USER_ID}
          />
        );
      })}
    </div>
  );
}

function ChatComp({ reciever, conversation, navigate, USER_ID }) {
  return (
    <div
      onClick={() => {
        const receiverId =
          conversation.person1._id == USER_ID
            ? conversation.person2._id
            : conversation.person1._id;
        navigate("/home/messages", {
          state: {
            reciever: reciever,
            recieverId: receiverId,
          },
        });
      }}
      className="flex bg-gray-500 hover:bg-gray-400 m-2 p-2 rounded-xl"
    >
      <b>{reciever}</b>:
      <i>{conversation.messages[conversation.messages.length - 1].message}</i>
    </div>
  );
}

export default ChatsBar;
