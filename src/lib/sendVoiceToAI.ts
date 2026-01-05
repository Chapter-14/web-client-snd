interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
}

const sendVoiceToAI = async (fileURL: string) => {
  // AI request
  const audioResponse = await fetch(fileURL);
  if (!audioResponse.ok) {
    throw new Error("Failed to fetch audio file");
  }
  const audioBlob = await audioResponse.blob();
  const formData = new FormData();
  formData.append("audio", audioBlob);

  const response = await fetch("/api/transcribe-audio", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to transcribe audio");
  }

  const data = await response.json();
  const aiMessage: Message = {
    id: (Date.now() + 1).toString(),
    type: "ai",
    content: data.text, // data.text
  };
  return { data, aiMessage };
};

export { sendVoiceToAI };
