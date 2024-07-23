interface IActionItems {
  title: string;
  Icon: React.ReactNode;
  className?: string;
}

const ActionItem: React.FC<IActionItems> = ({ title, Icon, className }) => {
  return (
    <div
      className={`flex justify-center items-center cursor-pointer gap-2 text-gray-600 hover:bg-[#0001] p-3 rounded-full ${className}`}
    >
      <div>{Icon}</div>
      <div className="text-sm font-[500]">{title}</div>
    </div>
  );
};

export default ActionItem;
