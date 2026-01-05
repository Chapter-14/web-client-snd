"use client";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useClerk } from "@clerk/nextjs";

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavigationMenu({ isOpen, onClose }: NavigationMenuProps) {
  const menuItems = [
    { label: "مكتبتي", href: "/my-library" },
    { label: "المهام اليومية", href: "/" },
    { label: "تحليلات الاداء", href: "/" },
    { label: "الإعدادات", href: "/" },
    { label: "المساعدة", href: "/" },
  ];
  const { user } = useUser();
  const { openUserProfile } = useClerk();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      )}

      {/* Sliding Menu */}
      <div
        className={`fixed right-0 top-0 h-screen w-64 bg-primary  border-l border-border z-100 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-border">
            <h2 className="text-lg font-semibold text-card">القائمة</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center px-4 py-2 text-sm font-medium text-card hover:bg-accent rounded-lg transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            onClick={(e) => {
              e.preventDefault();
              openUserProfile();
            }}
            type="button"
            className="flex items-center gap-3 p-4 border-t border-border"
          >
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 ">
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p className="text-sm font-medium text-card">{user?.fullName}</p>
              <p className="text-xs text-card/20">
                {user?.emailAddresses[0]?.emailAddress}
              </p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
