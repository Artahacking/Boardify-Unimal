"use client";

import { X } from "lucide-react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { createBoard } from "@/actions/create-board";
import { ElementRef, useRef, useState } from "react";
import { FormSubmit } from "./form-submit";
import { FormPicker } from "./form-picker";
import { FormSelect } from "./form-select"; 

import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  userRole?: string;
}

export const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
  userRole,
}: FormPopoverProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const { user } = useUser();

  const [categories, setCategories] = useState([
    "Sempro",
    "Semhas",
    "Sidang Akhir",
    "Bimbingan Awal",
    "Bimbingan Akhir",
  ]);

  const { execute, FieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board created!");
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    const adminEmail = user?.emailAddresses[0].emailAddress as string;

    execute({ title, image, adminEmail });
  };

  if (userRole?.toLowerCase().includes("member")) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-96 pt-5 pb-6 px-6 bg-white border rounded-xl shadow-2xl"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-lg font-semibold text-center text-green-700 pb-4">
          ✨ Buat Board Baru
        </div>

        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-3 right-3 text-rose-600"
            variant="ghost"
          >
            <X className="h-5 w-5" />
          </Button>
        </PopoverClose>

        <form action={onSubmit} className="space-y-5">
          <div className="space-y-4">
            <FormPicker id="image" errors={FieldErrors} />

            <FormSelect
              id="title"
              label="Kategori Board"
              errors={FieldErrors}
              options={categories}
              setOptions={setCategories}
            />
          </div>

          <FormSubmit className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-md">
            Create Board
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
