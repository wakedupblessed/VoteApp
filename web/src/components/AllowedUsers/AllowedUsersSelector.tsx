import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";

const DATA = ["ivan", "ivanessa", "kyrylo", "syrylo", "mamluik"];

interface AllowedUsersSelectorProps {
  users?: string[];
  updateUsersList: (updatedPolles: string[]) => void;
}

const AllowedUsersSelector = ({
  users,
  updateUsersList,
}: AllowedUsersSelectorProps) => {
  const [queryInput, setQueryInput] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>(
    DATA.map((item) => item)
  );

  const options = {
    includeScore: true,
    threshold: 0.6,
  };

  const fuse = new Fuse(DATA, options);

  useEffect(() => {
    if (queryInput.length > 2) {
      const result = fuse.search(queryInput).map(({ item }) => item);
      setFilteredOptions(result);
    }
  }, [queryInput]);

  const handleOptionSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateUsersList([...users, e.target.value]);
    setQueryInput("");
  };

  return (
    <>
      <input
        type='text'
        onChange={(e) => {
          setQueryInput(e.target.value);
        }}
      />
      <select onChange={handleOptionSelection}>
        {filteredOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default AllowedUsersSelector;
