import { Colors, statusOptions } from "@/constants/constants";
import { StakeHolderDto, UserDto } from "@/dto/User.dto";
import { addUser } from "@/server/users";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
  editUserData: UserDto | null;
  stackHoldersList: any[];
}
export const useEditUser = ({ editUserData, stackHoldersList }: Props) => {
  const [addUserFormValues, setAddUserFormValues] = useState<UserDto>({
    firstName: "",
    lastName: "",
    email: "",
    status: "",
    password: "",
    stakeHolderId: "",
    userId: "",
  });

  const [selectedUserStatus, setSelectedUserStatus] = useState<any>(
    null as any
  );

  const [selectedStackHolder, setSelectedStackHolder] = useState<any>(
    null as any
  );

  const StackHoldersOptions = stackHoldersList.map(
    (stackHolder: StakeHolderDto) => ({
      label: stackHolder.description,
      value: stackHolder.stakeHolderId,
    })
  );
  const handleStackHolderSelect = (selectedOption: any) => {
    setAddUserFormValues({
      ...addUserFormValues,
      stakeHolderId: selectedOption.value,
    });
    setSelectedStackHolder(selectedOption);
  };
  const visaTypeStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderWidth: 1,
      fontSize: "14px",
      paddingTop: "5px",
      paddingBottom: "5px",
      borderColor: state.isFocused ? Colors.PRIMARYGREEN : Colors.PRIMARYBLUE,
      boxShadow: "none",
      "&:hover": {
        borderColor: state.isFocused ? Colors.PRIMARYGREEN : Colors.PRIMARYBLUE,
      },
    }),
    input: (provided: any) => ({
      ...provided,
      color: Colors.PRIMARYBLUE,
      backgroundColor: "transparent",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: Colors.PRIMARYBLUE,
      backgroundColor: "transparent",
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused ? Colors.PRIMARYGREEN : Colors.PRIMARYBLUE,
      "&:hover": {
        color: state.isFocused ? Colors.PRIMARYGREEN : Colors.PRIMARYBLUE,
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: Colors.PRIMARYSLATE,
    }),
  };

  const handleValueSelect = (selectedOption: any) => {
    setAddUserFormValues({
      ...addUserFormValues,
      status: selectedOption.value,
    });
    setSelectedUserStatus(selectedOption);
  };

  async function handleFormSubmit(event: any) {
    event.preventDefault();
    const response = await addUser({
      email: addUserFormValues.email,
      firstName: addUserFormValues.firstName,
      lastName: addUserFormValues.lastName,
      password: addUserFormValues.password,
      stackHolderId: parseInt(addUserFormValues.stakeHolderId as string),
      status: addUserFormValues.status,
      userId: parseInt(addUserFormValues.userId as string),
    });

    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      window.location.reload();
      toast.success("User edit successfully");
    }
  }

  function resetForm() {
    setAddUserFormValues({
      firstName: "",
      lastName: "",
      email: "",
      status: "",
      password: "",
      stakeHolderId: "",
    });
    setSelectedUserStatus(null);
  }

  useEffect(() => {
    if (editUserData) {
      setAddUserFormValues({
        firstName: editUserData.firstName,
        lastName: editUserData.lastName,
        email: editUserData.email,
        status: editUserData.status,
        password: "",
        stakeHolderId: editUserData.stakeHolderId,
        userId: editUserData.userId,
      });

      setSelectedUserStatus(
        statusOptions.find((status) => status.value === editUserData.status)
      );
      setSelectedStackHolder({
        label: editUserData.stakeHolderDescription,
        value: editUserData.stakeHolderId,
      });
    }
  }, [editUserData]);
  return {
    addUserFormValues,
    setAddUserFormValues,
    selectedUserStatus,
    setSelectedUserStatus,
    visaTypeStyles,
    handleValueSelect,
    handleFormSubmit,
    resetForm,
    selectedStackHolder,
    setSelectedStackHolder,
    handleStackHolderSelect,
    StackHoldersOptions,
  };
};
