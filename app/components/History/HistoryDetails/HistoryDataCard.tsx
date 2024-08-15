interface CardProps {
  fieldName: string;
  prevValue: string;
  latestValue: string;
}

const HistoryDataCard: React.FC<CardProps> = ({
  fieldName,
  prevValue,
  latestValue,
}) => {
  return (
    <div className="card bg-white p-3 rounded-md shadow-sm mb-5 border border-gray-300">
      <div className="flex items-center justify-between p-2">
        <p className="text-left flex-1 text-sm">{fieldName}</p>
        <p className="text-left flex-1 text-sm">{prevValue}</p>
        <p className="text-left flex-1 text-sm">{latestValue}</p>
      </div>
    </div>
  );
};

export default HistoryDataCard;
