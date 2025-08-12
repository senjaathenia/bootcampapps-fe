"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface ModalWrapperProps {
  title: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ModalWrapper({
  title,
  trigger,
  children,
  className = "",
}: ModalWrapperProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={`${className} bg-[#171717] border-[#2F2F2F]`}>
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
