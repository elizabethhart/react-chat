import React, { useCallback, useEffect, useState } from "react";
import "./ChatTranscriptInput.scss";

interface ChatTranscriptInputProps {
  handleSendNewMessage: Function;
}

/**
 * Component that handles user input
 */
const ChatTranscriptInput: React.FC<ChatTranscriptInputProps> = ({
  handleSendNewMessage,
}) => {
  const [newMessage, setNewMessage] = useState<string>("");

  const onKeyDown = useCallback(
    (event) => {
      // Listen for 'Enter' click
      if (event.keyCode === 13 && newMessage.length > 0) {
        handleSendNewMessage(newMessage);
        setNewMessage("");
      }
    },
    [newMessage, handleSendNewMessage]
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
  }

  return (
    <div className="transcript-input">
      <input
        type="text"
        name="message"
        aria-label="message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
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
