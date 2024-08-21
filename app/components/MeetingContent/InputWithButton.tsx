import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FiPlus } from "react-icons/fi";

interface ComponentInputs {
  placeholder: string;
  id?: string;
  value?: string;
  onChange?: string;
  btnName: string;
}

const InputWithButton: React.FC<ComponentInputs> = ({
  placeholder,
  id,
  value,
  onChange,
  btnName,
}) => {
  return (
    <>
      <div className="flex justify-between pr-2 rounded-md border items-center border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">      
        <Input className="border-none w-3/4" placeholder={placeholder} />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>                
                 <FiPlus size={18} />                                 
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Meeting</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>{" "}
      </div>
    </>
  );
};

export default InputWithButton;
