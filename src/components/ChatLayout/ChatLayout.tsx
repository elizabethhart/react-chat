import React, { useState } from "react";
import ChatHistory from "../ChatHistory";
import ChatTranscript from "../ChatTranscript";
import "./ChatLayout.scss";

interface ChatLayoutProps {}

const ChatLayout: React.FC<ChatLayoutProps> = () => {
  const currentUser = {
    id: 2,
    name: "Jane",
  };
  const [chatLists, setChatLists] = useState<any[]>([
    [
      {
        user: {
          id: 1,
          name: "John",
        },
        message: "Hello",
      },
      {
        user: {
          id: 2,
          name: "Jane",
        },
        message: "Hi",
      },
    ],
    [
      {
        user: {
          id: 3,
          name: "Mark",
        },
        message: "What's up?",
      },
      {
        user: {
          id: 2,
          name: "Jane",
        },
        message: "Hey!",
      },
    ],
  ]);
  const [currentChatId, setCurrentChatId] = useState<number>(0);

  function updateChatLists(newChatList: ChatListItem[]) {
    let newChatLists = [...chatLists];

    newChatLists[currentChatId] = newChatList;

    setChatLists(newChatLists);
  }

  return (
    <div className="layout">
      <ChatHistory
        chatLists={chatLists}
        currentChatId={currentChatId}
        handleSetCurrentChatId={(newChatId: number) => {
          setCurrentChatId(newChatId);
        }}
      />
      <ChatTranscript
        currentUser={currentUser}
        chatList={chatLists[currentChatId]}
        handleSetChatList={(newChatList: ChatListItem[]) => {
          updateChatLists(newChatList);
        }}
      />
    </div>
  );
};

export default ChatLayout;
