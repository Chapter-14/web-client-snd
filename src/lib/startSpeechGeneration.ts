const startSpeechGeneration = async (
  text: string
): Promise<HTMLAudioElement> => {
  const response = await fetch("/api/generate-speach", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate speech");
  }

  const audioBlob = await response.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  return new Audio(audioUrl);
};

export { startSpeechGeneration };
