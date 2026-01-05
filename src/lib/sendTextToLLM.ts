import { useChat } from "@ai-sdk/react";

const sendTextToLLM = (textInput: string) => {
  const { sendMessage, error } = useChat();
  sendMessage({ text: textInput });
  if (error) {
    throw new Error("Error sending message to LLM: " + error.message);
  }
};

export { sendTextToLLM };
