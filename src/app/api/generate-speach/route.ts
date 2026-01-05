import { openai } from "@ai-sdk/openai";
import { elevenlabs } from "@ai-sdk/elevenlabs";
import { experimental_generateSpeech as generateSpeech } from "ai";

const SAMPLE_TEXT =
  "مرحباً! أرى أنك بدأت الفصل الرابع، الذي يتناول قائمة الدخل والمعلومات ذات الصلة. الموضوع الرئيسي الأول في هذا الفصل، هدف التعلم الأول، يدور حول قائمة الدخل نفسها: وتحديداً، **فوائدها**، و**قيودها**، و**جودة الأرباح**.دعنا نتناول ذلك بالتفصيل، مع الإشارة إلى الشرائح الخاصة بك. --- ## 1. قائمة الدخل: الفائدة (الشريحة 4-4) قائمة الدخل—التي تُسمى أحياناً قائمة الأرباح والخسائر—هي أداة مالية حيوية. تساعد المستخدمين بثلاث طرق رئيسية: ### أ. تقييم الأداء السابق";

const VOICE_ID = "VCgLBmBjldJmfphyB8sZ";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    // OpenAI example:
    const { audio }: { audio: any } = await generateSpeech({
      model: openai.speech("tts-1"),
      text: text,
      voice: "alloy",
    });

    // Eleven Labs example:
    // const { audio }: { audio: any } = await generateSpeech({
    //   model: elevenlabs.speech("eleven_flash_v2_5"),
    //   text: text,
    //   language: "ar",
    //   voice: VOICE_ID,
    // });

    return new Response(audio.uint8Array, {
      headers: {
        "Content-Type": audio.mediaType || "audio/mpeg",
      },
    });
  } catch (error) {
    console.error("Error generating speech:", error);
    return new Response("Failed to generate speech", { status: 500 });
  }
}
