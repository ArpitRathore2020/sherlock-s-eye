// we will recieve such object from backend
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";
const USER_ID = "65f289606797755339715b95";
import axios from "axios";

function ChatsBar() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    axios
      .post(`${BASE_URL}/api/v1/getChats`, {
        data: {
          user: USER_ID,
        },
      })
      .then((response) => {
        setConversations(response.data.response);
        // console.log(response.data.response);
      })
      .catch((e) => {
        console.log(`error occured ${e}`);
      });
  }, [conversations]);

  // now we have the conversation array
  // console.log(conversations.length);
  return (
    <div className="flex-col bg-gray-700 h-full">
      <b>CHATS</b>
      {conversations.map((conversation, key) => {
        const reciever =
          conversation.person1._id == USER_ID
            ? conversation.person2.name
            : conversation.person1.name;
        return (
          <ChatComp key={key} reciever={reciever} conversation={conversation} />
        );
      })}
    </div>
  );
}

function ChatComp({ reciever, conversation }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        // now we need to pass the messages here,
        const receiverId =
          conversation.person1._id == USER_ID
            ? conversation.person2._id
            : conversation.person1._id;
        // console.log(receiverId);
        navigate("/home/messages", {
          state: {
            messages: conversation.messages,
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
