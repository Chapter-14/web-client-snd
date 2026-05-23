import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { LibraryTour } from "@/components/tours/library-tour";
import { MobileWarningPopup } from "@/components/mobile-warning-popup";

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" collapsible="icon" />
      <SidebarInset>
        <MobileWarningPopup />
        <SiteHeader />
        {children}
      </SidebarInset>
      <LibraryTour />
    </SidebarProvider>
  );
}
