import React from "react";
import "./ChatHistory.scss";

interface ChatHistoryProps {
  chatLists: any[];
  currentChatId: number;
  handleSetCurrentChatId: Function;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  chatLists,
  currentChatId,
  handleSetCurrentChatId,
}) => {
  function buildChatHistoryItem(chatList: ChatListItem[]) {
    let chatUsers: string[] = [];

    chatList.forEach((chatListItem: ChatListItem) => {
      if (chatUsers.indexOf(chatListItem.user.name) === -1) {
        chatUsers.push(chatListItem.user.name);
      }
    });

    return chatUsers.join(", ");
  }

  return (
    <div className="history">
      <h2>Chat History</h2>
      {chatLists.map((chatList: ChatListItem[], index) => {
        return (
          <div
            className={`history-item ${
              currentChatId === index ? "active" : ""
            }`}
            key={index}
            onClick={() => handleSetCurrentChatId(index)}
          >
            {buildChatHistoryItem(chatList)}
          </div>
        );
      })}
    </div>
  );
};

export default ChatHistory;
