import { ChangeEvent, useEffect, useState } from "react";
import InputComponent from "./InputComponent";
import { visaTypeRequestDto } from "@/dto/libraries.dto";
import { addOccupation, addVisaType } from "@/server/libraries";
import { toast } from "react-toastify";

interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setAddModal: React.Dispatch<React.SetStateAction<boolean>>;
    setEditModal?: React.Dispatch<React.SetStateAction<boolean>>;
    editVisaData?: visaTypeRequestDto | null;

}
export default function AddOccupationModalComponent({ setShowModal, setAddModal, editVisaData, setEditModal }: Props) {
    const [occupationFormValues, setOccupationFormValues] = useState<
        {
            description: string;
            isActive: string;
        }
    >({
        description: '',
        isActive: 'f'
    })
    const resetForm = () => {
        setOccupationFormValues(
            {
                description: '',
                isActive: 'f'
            }
        )
    }

    async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const response = await addOccupation(occupationFormValues.description, 't');
        if (response.error && response.error.length > 0) {
            response.error.forEach((err: any) => {
                toast.error(`Error ${err.code}: ${err.description}`);
            });
        } else {
            toast.success('Occupation is added successfully');
            setShowModal(false);
            setAddModal(false);
            resetForm();
            window.location.reload();
        }

    }
    return (
        <form onSubmit={handleFormSubmit}>
            <div className="flex  flex-col items-center justify-center px-3 py-10">
                <p className=" font-sans text-xl text-slate-200 w-60 text-center">
                    Add New Occupation
                </p>

                <p className="mt-6 font-sans text-base text-slate-200 w-full  text-start">
                    Description
                </p>
                <InputComponent
                    label={''}
                    maxLength={32}
                    minLength={3}
                    type={'text'}
                    placeholder={''}
                    name={'firstName'}
                    value={occupationFormValues.description}
                    className="md:w-96 w-72 text-white"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setOccupationFormValues({ ...occupationFormValues, description: e.target.value })
                    }}
                    error={''}
                    required

                />
                <div className='flex gap-x-5 mt-5'>

                    <button
                        onClick={() => {
                            setShowModal(false);
                            setAddModal(false);
                            setEditModal && setEditModal(false);
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