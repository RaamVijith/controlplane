interface IButton {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const OutlineButton: React.FC<IButton> = ({ children }) => {
  return (
    <div className="flex cursor-pointer items-center justify-center gap-2 outline outline-[#aaa] outline-[1px] text-gray-500 rounded-md px-3 py-2 hover:outline-transparent hover:bg-[#eee] hover:font-semi">
      {children}
    </div>
  );
};

const FillButton: React.FC<IButton> = ({ children, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-2 bg-[#3f76ff] text-white hover:bg-[#0b4092] ${className}`}
    >
      {children}
    </div>
  );
};

const InverseFillButton: React.FC<IButton> = ({ onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-2 text-[#3f76ff] hover:bg-[#1D62B4] hover:text-white"
    >
      {children}
    </div>
  );
};

export { OutlineButton, FillButton, InverseFillButton };
