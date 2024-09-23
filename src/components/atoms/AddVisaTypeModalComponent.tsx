import { ChangeEvent, useEffect, useState } from "react";
import InputComponent from "./InputComponent";
import { visaTypeRequestDto } from "@/dto/libraries.dto";
import { addVisaType } from "@/server/libraries";
import { toast } from "react-toastify";

interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setAddModal: React.Dispatch<React.SetStateAction<boolean>>;
    setEditModal?: React.Dispatch<React.SetStateAction<boolean>>;
    editVisaData?: visaTypeRequestDto | null;

}
export default function AddVisaTypeModalComponent({ setShowModal, setAddModal, editVisaData, setEditModal }: Props) {
    const [addVisaFormValues, setAddVisaFormValues] = useState<visaTypeRequestDto>({
        description: '',
        visaType: '',
    })
    const resetForm = () => {
        setAddVisaFormValues({
            description: '',
            visaType: '',
        })
    }

    async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const response = await addVisaType({
            description: addVisaFormValues.description,
            isActive: 't',
        });
        if (response.error && response.error.length > 0) {
            response.error.forEach((err: any) => {
                toast.error(`Error ${err.code}: ${err.description}`);
            });
        } else {
            toast.success('Visa Type added successfully');
            setShowModal(false);
            setAddModal(false);
            resetForm();
            setTimeout(() => {
                window.location.reload();
            }, 500);

        }

    }
    return (
        <form onSubmit={handleFormSubmit}>
            <div className="flex  flex-col items-center justify-center px-3 py-10">
                <p className=" font-sans text-xl text-slate-200 w-60 text-center">
                    Add Visa Type
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
                    value={addVisaFormValues.description}
                    className="w-72 md:w-96  text-white"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setAddVisaFormValues({ ...addVisaFormValues, description: e.target.value })
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