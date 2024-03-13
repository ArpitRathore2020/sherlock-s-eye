import { LuSendHorizonal } from "react-icons/lu";

function ChatSection({ recieverId }) {
  return (
    <div className="flex-col border border-gray-200 h-full">
      <ChatTopBar
        className="h-1/6"
        recieverImage="https://picsum.photos/200"
        recieverUserName="random"
      />
      <div className="flex flex-col justify-end h-5/6">
        <Chats />
        <ChatFooter />
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
function ChatFooter() {
  return (
    <div className="bg-gray-600 flex w-full my-2">
      <input
        className="rounded-full p-3 m-3 w-full"
        type="text"
        placeholder="Enter your text here"
      />
      <LuSendHorizonal
        className="m-3 w-12 h-12 p-1 rounded-2xl hover:bg-gray-500"
        color="white"
      />
    </div>
  );
}
// we will recieve an object similar to following from backend
const chat = {
  message: [
    {
      message: "hello there",
      direction: [12321, 21321],
      // [21321, 12321]
    },
    {
      message: "hello heya",
      direction: [21321, 12321],
    },
    {
      message: "kaise ho bhai",
      direction: [12321, 21321],
    },
    {
      message: "main badiya tum batao",
      // direction: [12321, 21321]
      direction: [21321, 12321],
    },
  ],
};
// this is the part where we can see all the previous chats
function Chats() {
  const userId = 12321;
  const arr = chat.message;
  return (
    <div className="flex-col h-fit w-full overflow-auto">
      {arr.map((chat, key) => {
        let msgClass = "",
          divClass = "flex m-1";
        let image = "https://picsum.photos/200";
        if (chat.direction[0] == userId) {
          msgClass = "bg-gray-500 rounded-xl p-2 flex";
          divClass = "flex m-1 flex-row-reverse";
          // change image here
        } else {
          msgClass = "bg-gray-600 rounded-xl p-2 flex";
          // change image here
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
