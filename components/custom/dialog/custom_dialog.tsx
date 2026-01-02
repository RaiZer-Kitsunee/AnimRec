"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

type CustomDialogType = {
  title: string;
  description?: string;
  children: ReactNode;
  showCloseButton?: boolean;
  open?: boolean; // controlled open state
  onOpenChange?: (open: boolean) => void;
};

export default function CustomDialog({
  title,
  description,
  children,
  showCloseButton = true,
  open,
  onOpenChange,
}: CustomDialogType) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Dialog Content */}
        <Dialog.Content
          className="
            fixed left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            w-[90%] max-w-lg
            rounded-lg bg-white p-6
            shadow-lg outline-none
          "
        >
          {/* Header */}
          <div className="mb-4 flex flex-col gap-2">
            <Dialog.Title className="text-lg font-semibold flex gap-2">
              <AlertTriangle /> {title}
            </Dialog.Title>
            {description && (
              <Dialog.Description className="text-sm text-gray-600">
                {description}
              </Dialog.Description>
            )}
          </div>

          {/* Footer / Close Button */}
          {showCloseButton && (
            <div className="flex gap-5 justify-end">
              <Link href={"/auth"}>
                <Button className="cursor-pointer">Sign In</Button>
              </Link>
              <Dialog.Close asChild>
                <Button className="cursor-pointer" variant="ghost">
                  Close
                </Button>
              </Dialog.Close>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
