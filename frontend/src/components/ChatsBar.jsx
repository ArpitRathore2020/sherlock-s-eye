// we will recieve such object from backend
const userId = 3432;
const conversations = [
  // user id is 3432
  {
    chatid: 234,
    person1: 3432,
    person2: 3423,
    messages: ["hello, how are you", "This is nice", "amazing", "great"],
  },
  {
    chatid: 234,
    person1: 432,
    person2: 3432,
    messages: [
      "hello, how are you",
      "This is nice",
      "amazing",
      "great",
      "what about you",
    ],
  },
  {
    chatid: 234,
    person1: 3432,
    person2: 33,
    messages: [
      "hello, how are you",
      "This is nice",
      "amazing",
      "great",
      "nice..",
    ],
  },
];
function ChatsBar() {
  return (
    <div className="flex-col bg-gray-700 h-full">
      <b>CHATS</b>
      {conversations.map((conversation) => {
        const reciever =
          conversation.person1 == userId
            ? conversation.person2
            : conversation.person1;
        const latestMessage =
          conversation.messages[conversation.messages.length - 1];
        return (
          <ChatComp
            key={reciever}
            reciever={reciever}
            latestMessage={latestMessage}
          />
        );
      })}
    </div>
  );
}

function ChatComp({ reciever, latestMessage }) {
  return (
    <div className="flex bg-gray-500 hover:bg-gray-400 m-2 p-2 rounded-xl">
      <b>{reciever}</b>:<i>{latestMessage}</i>
    </div>
  );
}

export default ChatsBar;
