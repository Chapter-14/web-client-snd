import { streamText, UIMessage, convertToModelMessages } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: openai("gpt-5-nano"),
      messages: [
        {
          role: "system",
          content:
            "You are a private tutor that helps students understand course material better. Provide clear and concise explanations, summaries, and practice questions based on the content provided. All responses must be in Arabic. Give a very short answer in one or two sentences. The first response should be a through walk through of the main concept of the chapter. ",
        },
        ...convertToModelMessages(messages),
      ],
    });

    // result.usage.then((usage) => {
    //   console.log({
    //     messageCount: messages.length,
    //     inputTokens: usage.inputTokens,
    //     outputTokens: usage.outputTokens,
    //     totalTokens: usage.totalTokens,
    //   });
    // });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}
