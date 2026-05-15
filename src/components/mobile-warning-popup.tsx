"use client";

import * as React from "react";
import { Monitor } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const PHONE_BREAKPOINT = 640;
const SESSION_KEY = "mobile-warning-shown";

export function MobileWarningPopup() {
  const [open, setOpen] = React.useState(false);
  const [isPhone, setIsPhone] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${PHONE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      const phone = window.innerWidth < PHONE_BREAKPOINT;
      setIsPhone(phone);
      if (phone && !sessionStorage.getItem(SESSION_KEY)) {
        sessionStorage.setItem(SESSION_KEY, "1");
        setOpen(true);
      }
    };
    mql.addEventListener("change", onChange);
    onChange();
    return () => mql.removeEventListener("change", onChange);
  }, []);

  if (isPhone === undefined || !isPhone) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="border-accent/20 bg-gradient-to-b from-background to-background  [&>div]:text-center">
        <DialogHeader className="items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/20">
            <Monitor className="size-9 text-accent" strokeWidth={1.5} />
          </div>
          <DialogTitle className="text-xl leading-relaxed">
            تجربة أفضل على شاشة أكبر
          </DialogTitle>
          <DialogDescription className="text-balance leading-relaxed">
            لتجربة افضل ننصحك باستخدام جهاز بشاشة أكبر مثل اللابتوب او الايباد.
            يمكنك الاستمرار في استخدام الموقع على هاتفك اذا اردت.
          </DialogDescription>
        </DialogHeader>
        <Button
          size="lg"
          className="mt-2 w-full"
          onClick={() => setOpen(false)}
        >
          فهمت
        </Button>
      </DialogContent>
    </Dialog>
  );
}
