import React, { useCallback, useEffect, useState } from "react";
import "./ChatTranscript.scss";

interface ChatTranscriptProps {
  currentUser: User;
  chatList: ChatListItem[];
  handleSetChatList: Function;
}

const ChatTranscript: React.FC<ChatTranscriptProps> = ({
  currentUser,
  chatList,
  handleSetChatList,
}) => {
  const [newMessage, setNewMessage] = useState<string>("");

  const onKeyDown = useCallback((event) => {
    const { keyCode } = event;

    if (keyCode === 13) {
      // handle 'Enter' click for adding new message
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  function handleInputChange(inputMessage: string) {
    setNewMessage(inputMessage);
  }

  function handleEmojiClick() {
    // TODO: Add Emoji Library
  }

  function handleSendClick() {
    const newChatListItem = {
      user: currentUser,
      message: newMessage,
    };

    const newChatList = [...chatList, newChatListItem];

    handleSetChatList(newChatList);

    setNewMessage("");
  }

  return (
    <div className="transcript">
      <div className="transcript-header">Chat Transcript Header</div>
      <div className="transcript-body">
        {chatList.map((chatItem, index) => {
          if (chatItem.user.id === currentUser.id) {
            return (
              <div className="transcript-body-item current-user" key={index}>
                {chatItem.message}
              </div>
            );
          } else {
            return (
              <div className="transcript-body-item" key={index}>
                {chatItem.user.name}: {chatItem.message}
              </div>
            );
          }
        })}
      </div>
      <div className="transcript-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <button onClick={() => handleEmojiClick()}>:)</button>
        <button onClick={() => handleSendClick()}>Send</button>
      </div>
    </div>
  );
};

export default ChatTranscript;
