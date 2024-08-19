import { Input } from "@/components/ui/input";

interface ComponentInputs {
    placeholder: string;
    id?:string;
    value?: string;
    onChange?: string;
    btnName:string;
  }
  
  const InputWithButton: React.FC<ComponentInputs> = ({
    placeholder,
    id,
    value,
    onChange,
    btnName
  }) => {
    return(
        <>
         <div className="flex justify-between pr-2 rounded-md border items-center border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              {/* <input
                id={id}
                placeholder={placeholder}
                value={value}
                className="w-3/4 select-none"
              /> */}
                        <Input className="border-none w-3/4" placeholder={placeholder} />

              <button className="flex p-1 rounded-sm shadow shadow-gray-700 px-3">{btnName}</button>
              </div></>
    )
  }

  export default InputWithButton