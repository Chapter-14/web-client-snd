const AUDIO_MIME_TYPE = "audio/webm";

const recordAudio = async (
  streamRef: React.MutableRefObject<MediaStream | null>,
  mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>,
  audioChunksRef: React.MutableRefObject<Blob[]>,
  readyToSendRef: React.MutableRefObject<boolean>,
  handleSendMessage: (audioUrl: string) => void
) => {
  // Implementation of audio recording
  return navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: AUDIO_MIME_TYPE,
      });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: AUDIO_MIME_TYPE,
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        if (readyToSendRef.current) {
          handleSendMessage(audioUrl);
          readyToSendRef.current = false;
        }
        audioChunksRef.current = [];
      };

      mediaRecorderRef.current.start();

      // Check if recording actually started
      if (mediaRecorderRef.current.state !== "recording") {
        throw new Error("Failed to start recording");
      }
    })
    .catch((error) => {
      if (
        error.name === "NotAllowedError" ||
        error.name === "PermissionDeniedError"
      ) {
        throw new Error(
          "لم يتم السماح للمنصة بالوصول للمايكروفون لتسجيل السؤال الصوتي"
        );
      } else if (error.name === "NotFoundError") {
        throw new Error("لم يتم العثور على مايكروفون لتسجيل السؤال الصوتي");
      } else {
        throw new Error(`فشل بدء التسجيل: ${error.message}`);
      }
    });
};

export { recordAudio };
