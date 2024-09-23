import { statusOptions } from "@/constants/constants";
import { ChangeEvent } from "react";
import InputComponent from './InputComponent';
import Select from 'react-select';
import { UserDto } from "@/dto/User.dto";
import { useEditUser } from "@/hooks/useEditUser";
interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setAddModal: React.Dispatch<React.SetStateAction<boolean>>;
    editUserData: UserDto | null;
    stackHoldersList: any[];
}
export default function EditUserModalComponent({ setShowModal, setAddModal, editUserData, stackHoldersList }: Props) {
    const {
        addUserFormValues,
        setAddUserFormValues,
        selectedUserStatus,
        handleValueSelect,
        visaTypeStyles,
        handleFormSubmit,
        resetForm,
        selectedStackHolder, StackHoldersOptions,
        handleStackHolderSelect
    } = useEditUser({ editUserData, stackHoldersList });
    return (
        <div className="flex  flex-col items-center justify-center px-3 py-10">
            <p className=" font-sans text-xl text-slate-200 w-60 text-center">
                Edit User
            </p>

            <p className="mt-6 font-sans text-base text-slate-200 w-full  text-start">
                First Name
            </p>
            <InputComponent
                label={''}
                maxLength={32}
                minLength={3}
                type={'text'}
                placeholder={''}
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
                placeholder={''}
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

            <div className="w-full mt-6">
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
                    onClick={() => {
                        setAddModal(false);
                        setShowModal(false);
                        handleFormSubmit(event as any);
                    }}
                    className="mt-4 rounded-xl bg-logoColorGreen px-6 py-2 text-white hover:bg-black"
                >
                    Continue
                </button>
            </div>
        </div>
    )
}