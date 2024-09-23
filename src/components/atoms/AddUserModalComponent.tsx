'use client'
import { Colors, statusOptions } from "@/constants/constants";
import { useState, ChangeEvent } from "react";
import InputComponent from './InputComponent';
import Select from 'react-select';
import { useRouter } from "next/navigation";
import { StakeHolderDto, UserDto } from "@/dto/User.dto";
import { addUser } from "@/server/users";
import { toast } from "react-toastify";
interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setAddModal: React.Dispatch<React.SetStateAction<boolean>>;
    stackHoldersList: any[];
}
export default function AddUserModalComponent({ setShowModal, setAddModal, stackHoldersList }: Props) {
    const [addUserFormValues, setAddUserFormValues] = useState<UserDto>({
        firstName: '',
        lastName: '',
        email: '',
        status: '',
        password: '',
        stakeHolderId: ''
    })

    const [selectedUserStatus, setSelectedUserStatus] = useState<any>(null as any);
    const [selectedStackHolder, setSelectedStackHolder] = useState<any>(null as any);
    const StackHoldersOptions = stackHoldersList.map((stackHolder: StakeHolderDto) => ({
        label: stackHolder.description,
        value: stackHolder.stakeHolderId,
    }));
    const visaTypeStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            borderWidth: 1,
            fontSize: '14px',
            paddingTop: '5px',
            paddingBottom: '5px',
            borderColor: state.isFocused
                ? Colors.PRIMARYGREEN
                : Colors.PRIMARYBLUE,
            boxShadow: 'none',
            '&:hover': {
                borderColor: state.isFocused

                    ? Colors.PRIMARYGREEN

                    : Colors.PRIMARYBLUE,
            },
        }),
        input: (provided: any) => ({
            ...provided,
            color: Colors.PRIMARYBLUE,
            backgroundColor: 'transparent',
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: Colors.PRIMARYBLUE,
            backgroundColor: 'transparent',
        }),
        dropdownIndicator: (provided: any, state: any) => ({
            ...provided,
            color: state.isFocused ? Colors.PRIMARYGREEN : Colors.PRIMARYBLUE,
            '&:hover': {
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
    }
    const handleStackHolderSelect = (selectedOption: any) => {
        setAddUserFormValues({
            ...addUserFormValues,
            stakeHolderId: selectedOption.value,
        });
        setSelectedStackHolder(selectedOption);
    }

    async function handleFormSubmit(event: any) {
        event.preventDefault();

        const response = await addUser({
            email: addUserFormValues.email,
            firstName: addUserFormValues.firstName,
            lastName: addUserFormValues.lastName,
            password: addUserFormValues.password,
            status: addUserFormValues.status,
            stackHolderId: parseInt(addUserFormValues.stakeHolderId as string),
        });
        if (response.error && response.error.length > 0) {
            response.error.forEach((err: any) => {
                toast.error(`Error ${err.code}: ${err.description}`);
            });
        } else {
            toast.success('User added successfully');
            setAddModal(false);
            setShowModal(false);
            window.location.reload();
        }
    }

    function resetForm() {
        setAddUserFormValues({
            firstName: '',
            lastName: '',
            email: '',
            status: '',
            password: '',
            stakeHolderId: ''
        });
        setSelectedUserStatus(null);

    }
    return (
        <form onSubmit={handleFormSubmit}>
            <div className="flex  flex-col items-center justify-center px-3 py-10">
                <p className=" font-sans text-xl text-slate-200 w-60 text-center">
                    Create User
                </p>

                <p className="mt-6 font-sans text-base text-slate-200 w-full  text-start">
                    First Name
                </p>
                <InputComponent
                    label={''}
                    maxLength={32}
                    minLength={3}
                    type={'text'}
                    placeholder={'Enter First Name'}
                    name={'firstName'}
                    value={addUserFormValues.firstName}
                    className="md:w-96 w-64 text-white"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setAddUserFormValues({
                            ...addUserFormValues,
                            firstName: e.target.value
                        });
                    }}
                    error={''}
                    required

                />
                <p className="mt-6 font-sans text-base text-slate-200 w-full  text-start">
                    Last Name
                </p>
                <InputComponent
                    label={''}
                    maxLength={32}
                    minLength={3}
                    type={'text'}
                    placeholder={'Enter Last Name'}
                    name={'lastName'}
                    value={addUserFormValues.lastName}
                    className="md:w-96 w-64 text-white"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setAddUserFormValues({
                            ...addUserFormValues,
                            lastName: e.target.value
                        });
                    }}
                    error={''}
                    required

                />
                <p className="mt-6 font-sans text-base text-slate-200 w-full  text-start">
                    Email
                </p>
                <InputComponent
                    label={''}
                    maxLength={32}
                    minLength={3}
                    type={'text'}
                    placeholder={'Enter Your Email'}
                    name={'email'}
                    value={addUserFormValues.email}
                    className="md:w-96 w-64 text-white"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setAddUserFormValues({
                            ...addUserFormValues,
                            email: e.target.value
                        });
                    }}
                    error={''}
                    required

                />
                <p className="mt-6 font-sans text-base text-slate-200 w-full  text-start">
                    Password
                </p>
                <InputComponent
                    label={''}
                    maxLength={20}
                    type={'password'}
                    placeholder={'Enter your password'}
                    name={'password'}
                    value={addUserFormValues.password}
                    className="md:w-96 w-64 text-white"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setAddUserFormValues({
                            ...addUserFormValues,
                            password: e.target.value
                        })
                    }
                    error={''}
                    required
                />
                <div className="w-full mt-5">
                    <label className="font-sans text-base text-slate-200">
                        Status
                    </label>
                    <Select
                        options={statusOptions}
                        styles={visaTypeStyles}
                        onChange={handleValueSelect}
                        value={selectedUserStatus}
                        required
                    />
                </div>
                <div className="w-full mt-5">
                    <label className="font-sans text-base text-slate-200">
                        StackHolders
                    </label>
                    <Select
                        options={StackHoldersOptions}
                        styles={visaTypeStyles}
                        onChange={handleStackHolderSelect}
                        value={selectedStackHolder}
                        required
                    />
                </div>

                <div className='flex gap-x-5 mt-5'>

                    <button
                        onClick={() => {
                            setShowModal(false);
                            setAddModal(false);
                            resetForm();

                        }}
                        className="mt-4 rounded-xl bg-red-900 px-10 py-2 text-white hover:bg-black"
                    >
                        Back
                    </button>

                    <button
                        type="submit"
                        className="mt-4 rounded-xl bg-logoColorGreen px-6 py-2 text-white hover:bg-black"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </form>
    )
}