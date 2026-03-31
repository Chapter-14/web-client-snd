import { auth } from "@clerk/nextjs/server";
import { createHash } from "crypto";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const cdnTokenKey = process.env.BUNNY_CDN_TOKEN_KEY;
    const storageZone = process.env.BUNNY_STORAGE_ZONE;
    const storageRegion = process.env.BUNNY_STORAGE_REGION;

    if (!cdnTokenKey || !storageZone || !storageRegion) {
      return new Response(
        JSON.stringify({
          error: "Server misconfigured: Bunny CDN credentials missing",
        }),
        { status: 500 },
      );
    }

    const body = await req.json();
    const { filePath } = body;

    if (!filePath || typeof filePath !== "string") {
      return new Response(JSON.stringify({ error: "filePath is required" }), {
        status: 400,
      });
    }

    if (!filePath.startsWith("/")) {
      return new Response(
        JSON.stringify({ error: "filePath must start with /" }),
        { status: 400 },
      );
    }

    if (!filePath.endsWith(".json")) {
      return new Response(
        JSON.stringify({ error: "Only .json files are allowed" }),
        { status: 400 },
      );
    }

    const cdnBaseUrl = `https://${storageRegion}/${storageZone}`;
    const expires = Math.round(Date.now() / 1000) + 3600;
    const hashableBase = cdnTokenKey + filePath + expires;

    const md5Hash = createHash("md5").update(hashableBase).digest("binary");
    const tokenBase64 = Buffer.from(md5Hash, "binary").toString("base64");
    const token = tokenBase64
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

    const signedUrl = `${cdnBaseUrl}${filePath}?token=${token}&expires=${expires}`;

    return new Response(JSON.stringify({ url: signedUrl }), { status: 200 });
  } catch (error) {
    console.error("Error generating Bunny Storage signed URL:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate signed URL" }),
      { status: 500 },
    );
  }
}
