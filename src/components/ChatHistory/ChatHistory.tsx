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
  function getChatUsers(chatList: ChatListItem[]) {
    let chatUsers: User[] = [];
    chatList.forEach((chatListItem: ChatListItem) => {
      let chatListItemUser = chatListItem.user;
      if (chatUsers.indexOf(chatListItemUser) === -1) {
        chatUsers.push(chatListItemUser);
      }
    });

    return chatUsers;
  }

  function buildChatHistoryItem(chatList: ChatListItem[]) {
    let chatUsers = getChatUsers(chatList);

    return chatUsers
      .map((user) => {
        return user.name;
      })
      .filter((value) => {
        return value;
      })
      .join(", ");
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
