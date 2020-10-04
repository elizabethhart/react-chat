import React, { useEffect, useState } from "react";
import { MockChatLists, MockCurrentUser } from "../../constants/mocks";
import ChatHistory from "../ChatHistory";
import ChatTranscript from "../ChatTranscript";
import "./ChatLayout.scss";

interface ChatLayoutProps {}

/**
 * Component for app layout
 */
const ChatLayout: React.FC<ChatLayoutProps> = () => {
  const currentUser = MockCurrentUser;
  const [chatLists, setChatLists] = useState<any[]>(MockChatLists);
  const [currentChatId, setCurrentChatId] = useState<number>(0);

  useEffect(() => {
    // make request for current chats & current user
    // open websocket connection
  }, []);

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
