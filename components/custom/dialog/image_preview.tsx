/* eslint-disable @next/next/no-img-element */
"use client";

import * as Dialog from "@radix-ui/react-dialog";

type ImagePreviewProps = {
  url: string;
  children: React.ReactNode;
};

export default function ImagePreview({ url, children }: ImagePreviewProps) {
  return (
    <Dialog.Root >
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal >
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />

        <Dialog.Content
          className="
            fixed left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            outline-none
            z-10
          "
        >
          <img
            src={url}
            alt="Preview"
            width={800}
            height={800}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
