import React, { useCallback, useEffect, useState } from "react";
import "./ChatTranscriptInput.scss";

interface ChatTranscriptInputProps {
  draftMessage: string;
  handleDraftMessageStorage: Function;
  handleSendNewMessage: Function;
}

/**
 * Component that handles user input
 */
const ChatTranscriptInput: React.FC<ChatTranscriptInputProps> = ({
  draftMessage,
  handleDraftMessageStorage,
  handleSendNewMessage,
}) => {
  const [newMessage, setNewMessage] = useState<string>(
    draftMessage.length > 0 ? draftMessage : ""
  );

  const onKeyDown = useCallback(
    (event) => {
      // Listen for 'Enter' click
      if (event.keyCode === 13 && newMessage.length > 0) {
        handleSendNewMessage(newMessage);
        setNewMessage("");
        handleDraftMessageStorage("");
      }
    },
    [newMessage, handleSendNewMessage, handleDraftMessageStorage]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  function handleSendClick() {
    handleSendNewMessage(newMessage);
    setNewMessage("");
    handleDraftMessageStorage("");
  }

  function handleInputChange(draftMessage: string) {
    setNewMessage(draftMessage);
    handleDraftMessageStorage(draftMessage);
  }

  return (
    <div className="transcript-input">
      <input
        type="text"
        name="message"
        aria-label="message"
        value={draftMessage}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      <button
        disabled={newMessage.length === 0}
        className="send"
        onClick={() => handleSendClick()}
      >
        Send
      </button>
    </div>
  );
};

export default ChatTranscriptInput;
