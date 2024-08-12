import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import { FillButton } from "./libs/buttons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface DeleteDialogProps {
  trigger: React.ReactNode;
}

const Delete: React.FC<DeleteDialogProps> = ({ trigger }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="fixed bg-white p-4 rounded-md shadow-lg left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[450px]">
          <DialogDescription className="p-0 text-sm text-gray-500">
            <div className="w-full h-full overflow-auto">
              <div className="flex justify-center p-4">
                <Image src="/warning.png" alt="delete" width={60} height={60} />
              </div>
              <p className="text-bold text-lg mb-3 text-black text-center">
                Are you sure ?
              </p>
              <div className="flex justify-center items-center">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-md text-center mb-4">
                  This action cannot be undone, All values <br /> associated
                  with this field will be lost.
                </p>
              </div>

              <Textarea placeholder="Enter the Reason" />
              <div className="flex flex-col md:flex-row gap-1 mt-3">
                <FillButton className="rounded-sm w-full md:w-1/2 p-4 bg-slate-300 hover:bg-slate-400">
                  No, Keep it.
                </FillButton>
                <FillButton className="rounded-sm w-full md:w-1/2 p-4 bg-red-600 hover:bg-red-400">
                  Yes, Delete!
                </FillButton>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Delete;
