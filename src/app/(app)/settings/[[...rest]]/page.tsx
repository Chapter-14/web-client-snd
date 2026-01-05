import { UserProfile } from "@clerk/nextjs";

export default function Settings() {
  return (
    <div className="flex justify-center py-10 bg-background">
      {/* This embeds the entire settings UI directly into your page */}
      <UserProfile path="/settings" routing="path" />
    </div>
  );
}
