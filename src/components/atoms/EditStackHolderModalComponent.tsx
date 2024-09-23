'use client'
import { Colors } from "@/constants/constants";
import { useState, ChangeEvent, use, useEffect } from "react";
import InputComponent from './InputComponent';
import Select from 'react-select';

import { addStakeHolder, addUser } from "@/server/users";
import { toast } from "react-toastify";
import { getStackHolderRoles } from "@/server/feeder";
import { capitalizeFirstLetter, capitalizeWords } from "@/constants/functions";
interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setAddModal: React.Dispatch<React.SetStateAction<boolean>>;
    stackHoldersList: any[];
    editUserData: any;
}
export default function EditStakeHolderModalComponent({ setShowModal, setAddModal, stackHoldersList, editUserData }: Props) {


    const [addUserFormValues, setAddUserFormValues] = useState({
        description: '',
        stakeHolderId: '',
        roleId: ''
    })
    const [stackHolderRoles, setStackHolderRoles] = useState<any[]>([]);
    const [stackHolderRolesOptions, setStackHolderRolesOptions] = useState<any[]>([]);
    const [selectedStackHolder, setSelectedStackHolder] = useState<any>(null as any);
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



    const handleStackHolderRoleSelect = (selectedOption: any) => {
        setAddUserFormValues({
            ...addUserFormValues,
            roleId: selectedOption.value,
        });
        setSelectedStackHolder(selectedOption);
    }

    async function handleFormSubmit(event: any) {
        event.preventDefault();

        const response = await addStakeHolder({
            description: addUserFormValues.description,
            roleId: selectedStackHolder.value,
            stakeHolderId: editUserData.stakeHolderId
        });
        if (response.error && response.error.length > 0) {
            response.error.forEach((err: any) => {
                toast.error(`Error ${err.code}: ${err.description}`);
            });
        } else {
            toast.success('Stakeholder edit successfully');
            setAddModal(false);
            setShowModal(false);
            window.location.reload();
        }
    }

    function resetForm() {
        setAddUserFormValues({
            description: '',
            stakeHolderId: '',
            roleId: ''
        });

        setSelectedStackHolder(null);
    }

    async function getStackHolderRolesData() {
        const response = await getStackHolderRoles()
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            setStackHolderRoles(response.data)
        }
    }
    useEffect(() => {
        getStackHolderRolesData()
    }, [])

    useEffect(() => {
        if (stackHolderRoles.length > 0) {
            const roles = stackHolderRoles.map((role) => {
                return {
                    label: role.description,
                    value: role.roleId
                }
            })
            setStackHolderRolesOptions(roles)
        }
    }, [stackHolderRoles])

    useEffect(() => {
        if (editUserData) {
            setAddUserFormValues({
                description: editUserData.description,
                stakeHolderId: editUserData.stakeHolderId,
                roleId: editUserData.roleId
            });

            if (stackHolderRolesOptions.length > 0) {
                const selectedRole = stackHolderRolesOptions.find((role) => role.value === editUserData.roleId)
                setSelectedStackHolder(selectedRole)
            }


        }
    }, [editUserData, stackHolderRolesOptions])
    return (
        <form onSubmit={handleFormSubmit}>
            <div className="flex  flex-col items-center justify-center px-3 py-10">
                <p className=" font-sans text-xl text-slate-200 w-60 text-center">
                    Edit Stakeholder
                </p>

                <p className="mt-6 font-sans text-base text-slate-200 w-full  text-start">
                    Name
                </p>
                <InputComponent
                    label={''}
                    maxLength={32}
                    minLength={3}
                    type={'text'}
                    placeholder={'Enter description'}
                    name={'description'}
                    value={addUserFormValues.description}
                    className="md:w-96 w-64 text-white"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setAddUserFormValues({
                            ...addUserFormValues,
                            description: e.target.value
                        });
                    }}
                    error={''}
                    required

                />

                <div className="w-full mt-5">
                    <label className="font-sans text-base text-slate-200">
                        Role
                    </label>
                    <Select
                        options={stackHolderRolesOptions}
                        styles={visaTypeStyles}
                        onChange={handleStackHolderRoleSelect}
                        value={selectedStackHolder}
                        required
                    />
                </div>

                <div className='flex md:gap-x-5 gap-x-3 mt-5'>

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