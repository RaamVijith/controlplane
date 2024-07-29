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
              <p className="text-bold text-2xl mb-3 text-black text-center">
                Are you sure ?
              </p>
              <p className="text-lg text-center mb-4">
                This action cannot be undone, All values <br /> associated with
                this field will be lost.
              </p>

              <FillButton className="p-4 bg-slate-300 my-2 hover:bg-slate-400">
                No, Keep it.
              </FillButton>
              <FillButton className="p-4 bg-red-600 hover:bg-red-400">
                Yes, Delete!
              </FillButton>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Delete;
