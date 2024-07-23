import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";

const FlagSelector = () => {
  const [selected, setSelected] = useState("");
  return (
    <div>
      <ReactFlagsSelect
        selected={selected}
        onSelect={(code) => setSelected(code)}
        className="file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground w-full"
      />
    </div>
  );
};

export default FlagSelector;
