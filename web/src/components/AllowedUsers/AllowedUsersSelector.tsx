import React, { useState, useEffect, ChangeEvent } from "react";
import Select, { ValueType, ActionMeta } from "react-select";
import { User } from "../../api/Auth/interfaces";
import Fuse from "fuse.js";

const DATA: User[] = [
  {
    id: 1,
    username: "johndoe",
    email: "johndoe@example.com",
  },
  {
    id: 2,
    username: "janedoe",
    email: "janedoe@example.com",
  },
  {
    id: 3,
    username: "alice",
    email: "alice@example.com",
  },
  {
    id: 4,
    username: "bob",
    email: "bob@example.com",
  },
  {
    id: 5,
    username: "charlie",
    email: "charlie@example.com",
  },
];

interface OptionType {
  label: string;
  value: User;
}

const createOption = (user: User): OptionType => ({
  label: user.name,
  value: user,
});

interface AllowedUsersSelectorProps {
  users: User[];
  updateUsersList: (updatedUsers: User[]) => void;
}

const AllowedUsersSelector = ({
  users,
  updateUsersList,
}: AllowedUsersSelectorProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<OptionType[]>(DATA.map(createOption));

  const fuseOptions = {
    includeScore: true,
    threshold: 0.6,
  };

  const fuse = new Fuse(DATA, fuseOptions);

  useEffect(() => {
    if (inputValue.length > 2) {
      const result = fuse
        .search(inputValue)
        .map(({ item }) => createOption(item));
      setOptions(result);
    } else {
      setOptions(DATA.map(createOption));
    }
  }, [inputValue]);

  const handleInputChange = (inputValue: string) => {
    setInputValue(inputValue);
  };

  const handleChange = (
    selectedOption: ValueType<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    if (actionMeta.action === "select-option") {
      const selectedValue = (selectedOption as OptionType).value;
      if (!users.includes(selectedValue)) {
        updateUsersList([...users, selectedValue]);
      }
      setInputValue("");
    }
  };

  const customStyles = {
    control: provided => ({
      ...provided,
      borderColor: "#ddd",
      boxShadow: null,
      "&:hover": {
        borderColor: "#ddd",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#e2e2e2" : null,
    }),
  };

  return (
    <Select
      isSearchable
      isClearable
      onInputChange={handleInputChange}
      onChange={handleChange}
      options={options}
      value={createOption(inputValue)}
      styles={customStyles}
    />
  );
};

export default AllowedUsersSelector;
