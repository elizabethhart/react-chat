import React from "react";
import ChatHistory from "../ChatHistory";
import ChatTranscript from "../ChatTranscript";
import "./ChatLayout.scss";

interface ChatLayoutProps {}

const ChatLayout: React.FC<ChatLayoutProps> = () => {
  return (
    <div className="layout">
      <ChatHistory />
      <ChatTranscript />
    </div>
  );
};

export default ChatLayout;
