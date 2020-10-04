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
  return <div className="history">Chat History</div>;
};

export default ChatHistory;
