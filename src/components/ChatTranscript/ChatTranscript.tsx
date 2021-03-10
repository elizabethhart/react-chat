import React, { useState } from "react";
import ChatTranscriptInput from "../ChatTranscriptInput";
import "./ChatTranscript.scss";

interface ChatTranscriptProps {
  currentUser: User;
  chatListId: number;
  chatList: ChatListItem[];
  handleSetChatList: Function;
}

interface DraftMessageStorage {
  [x: number]: string;
}

/**
 * Component for displaying a user's current chat
 */
const ChatTranscript: React.FC<ChatTranscriptProps> = ({
  currentUser,
  chatListId,
  chatList,
  handleSetChatList,
}) => {
  const [draftMessageStorage, setDraftMessageStorage] = useState<
    DraftMessageStorage
  >({});

  function handleSendNewMessage(newMessage: string) {
    const newChatListItem = {
      user: currentUser,
      message: newMessage,
    };

    const newChatList = [...chatList, newChatListItem];

    handleSetChatList(newChatList);
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

  function handleDraftMessageStorage(draftMessage: string) {
    console.log("updating draft", draftMessage);
    setDraftMessageStorage({
      ...draftMessageStorage,
      [chatListId]: draftMessage,
    });
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
      <ChatTranscriptInput
        draftMessage={
          draftMessageStorage[chatListId] ? draftMessageStorage[chatListId] : ""
        }
        handleDraftMessageStorage={(draftMessage: string) => {
          handleDraftMessageStorage(draftMessage);
        }}
        handleSendNewMessage={(newMessage: string) =>
          handleSendNewMessage(newMessage)
        }
      />
    </div>
  );
};

export default ChatTranscript;
