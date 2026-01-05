import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn forceRedirectUrl="/my-library" fallbackRedirectUrl="/" />;
}
