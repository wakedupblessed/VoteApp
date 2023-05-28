import React, { useState, useEffect, ChangeEvent } from "react";
import Select, { ValueType, ActionMeta } from "react-select";
import Fuse from "fuse.js";
import { PollApi } from "../../api/Polls/api";
import useAuthContext from "../../сontext/hooks";
import { UserDTO } from "../../api/Polls/interfaces/polls";

interface OptionType {
  label: string;
  value: UserDTO;
}

const createOption = (user: UserDTO): OptionType => ({
  label: user.username,
  value: user,
});

interface AllowedUsersSelectorProps {
  users: UserDTO[];
  updateUsersList: (updatedUsers: UserDTO[]) => void;
}

const AllowedUsersSelector = ({
  users,
  updateUsersList,
}: AllowedUsersSelectorProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [usersOptions, setUserOptions] = useState<UserDTO[]>([]);
  const [options, setOptions] = useState<OptionType[]>();
  const { authTokens } = useAuthContext();

  useEffect(() => {
    if (authTokens) {
      const fetchUsers = async () => {
        const usersFetched = await PollApi.getUsers(authTokens.access);
        if (usersFetched) {
          setUserOptions([...usersFetched.users]);
        }
      };
      fetchUsers();
    }
  }, []);

  const fuseOptions = {
    includeScore: true,
    threshold: 0.6,
  };

  const fuse = new Fuse(usersOptions, fuseOptions);

  useEffect(() => {
    if (inputValue.length > 2) {
      const result = fuse
        .search(inputValue)
        .map(({ item }) => createOption(item));
      setOptions(result);
    } else if (usersOptions) {
      setOptions(usersOptions.map(createOption));
    }
  }, [inputValue, usersOptions]);

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
    control: (provided) => ({
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
