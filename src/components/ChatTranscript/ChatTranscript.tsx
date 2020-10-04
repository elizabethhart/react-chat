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

  const onKeyDown = useCallback(
    (event) => {
      const { keyCode } = event;

      if (keyCode === 13) {
        const newChatListItem = {
          user: currentUser,
          message: newMessage,
        };

        const newChatList = [...chatList, newChatListItem];

        handleSetChatList(newChatList);
        setNewMessage("");
      }
    },
    [chatList, currentUser, handleSetChatList, newMessage]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  function handleInputChange(inputMessage: string) {
    setNewMessage(inputMessage);
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

  function getCurrentChatUsers() {
    let chatUsers: string[] = [];

    chatList.forEach((chatListItem: ChatListItem) => {
      if (
        chatUsers.indexOf(chatListItem.user.name) === -1 &&
        chatListItem.user.name !== currentUser.name
      ) {
        chatUsers.push(chatListItem.user.name);
      }
    });

    return chatUsers.join(", ");
  }

  return (
    <div className="transcript">
      <div className="transcript-header">To: {getCurrentChatUsers()}</div>
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
                <span className="sender">{chatItem.user.name}:</span>{" "}
                {chatItem.message}
              </div>
            );
          }
        })}
      </div>
      <div className="transcript-input">
        <input
          type="text"
          name="message"
          aria-label="new-message"
          value={newMessage}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <button className="send" onClick={() => handleSendClick()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatTranscript;
