import Footer from "@/components/landing/footer";
import TopNav from "@/components/landing/topNav";

export default function RootAuth({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <main className="bg-background text-card">{children}</main>
      <Footer />
    </>
  );
}
