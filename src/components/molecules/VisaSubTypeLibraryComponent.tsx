import { capitalizeFirstLetter, capitalizeWords } from "@/constants/functions";
import { visaTypeDto } from "@/dto/ApplicationData.dto";
import { getCountryData, getVisaDuration, getVisaSubTypes } from "@/server/feeder";
import classNames from "classnames";
import React, { ChangeEvent, use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";
import AddCountryModalComponent from "../atoms/AddCountryModalComponent";
import { countryRequestDto, countryResponseDto, visaDurationDto, visaSubTypeDto } from "@/dto/libraries.dto";
import { addCountry, addDuration, addVisaSubType, removeActivity } from "@/server/libraries";
import InputComponent from "../atoms/InputComponent";
import Loader from "../atoms/Loader";
import { formatString } from "@/constants/constants";

interface Props {
    visaType: string | undefined;
    setShowMore: React.Dispatch<React.SetStateAction<boolean>>;
    showMore: boolean;
}


export default function VisaSubTypeLibraryComponent({ visaType, setShowMore, showMore }: Props) {

    const [loader, setLoader] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showAddVisaModal, setShowAddVisaModal] = useState(false);
    const [addVisaSubTypeFormValues, setAddVisaSubTypeFormValues] = useState<visaSubTypeDto>({
        description: '',
        visaSubType: '',
        visaType: visaType as string
    })

    const [visaSubTypes, setVisaSubTypes] = useState<visaSubTypeDto[]>([]);


    async function getVisaSubTypesData() {

        const response = await getVisaSubTypes(visaType as string)
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            setVisaSubTypes(response.data)
        }
        setLoader(false);
    }
    useEffect(() => {
        getVisaSubTypesData();
    }, [])

    const editVisaSubType = async (description: string, visaSubType: string, visaType: string, status: string) => {
        const response = await addVisaSubType(
            {
                description: description,
                visaSubType: visaSubType,
                visaType: visaType,
                isActive: status === 't' ? 'f' : 't'
            }
        );
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            toast.success('visa sub type status changed successfully');
            window.location.reload();

        }
    }

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();

        const response = await addVisaSubType({
            description: addVisaSubTypeFormValues.description,
            visaType: addVisaSubTypeFormValues.visaType,
            isActive: 't'
        })
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            toast.success('Visa sub type added successfully');
            setShowModal(false);
            setShowAddVisaModal(false);
            window.location.reload();

        }
    }


    return (
        <div>
            {
                showAddVisaModal && (
                    <Modal showModal={showModal}>
                        <form onSubmit={handleFormSubmit} className='w-72 md:w-96'>
                            <div className="flex  flex-col items-center justify-center px-3 py-10">
                                <p className=" font-sans text-xl text-slate-200 w-60 text-center">
                                    Add New Sub Type
                                </p>
                                <p className="mt-6 font-sans text-base text-slate-200 w-full  text-start">
                                    Description
                                </p>
                                <InputComponent
                                    label={''}
                                    maxLength={38}
                                    minLength={3}
                                    type={'text'}
                                    placeholder={''}
                                    name={'description'}
                                    value={addVisaSubTypeFormValues.description}
                                    className="w-full text-white"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setAddVisaSubTypeFormValues({ ...addVisaSubTypeFormValues, description: e.target.value })
                                    }}
                                    error={''}
                                    required

                                />
                                <div className='flex gap-x-5 mt-5'>

                                    <button
                                        type='button'
                                        onClick={() => {
                                            setShowModal(false);
                                            setShowAddVisaModal(false);

                                        }}
                                        className="mt-4 rounded-xl bg-red-900 px-10 py-2 text-white hover:bg-black"
                                    >
                                        Back
                                    </button>

                                    <button
                                        type='submit'
                                        className="mt-4 rounded-xl bg-logoColorGreen px-6 py-2 text-white hover:bg-black"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>


                        </form>
                    </Modal>
                )
            }

            {
                loader ? (
                    <Loader />
                )
                    : (
                        <>
                            <div className="flex justify-between">

                                <div className={classNames("mb-10 flex justify-start ps-2")}>
                                    <button
                                        onClick={() => {
                                            setShowMore(!showMore);
                                        }}
                                    >
                                        <div className="rounded-md bg-logoColorGreen  py-3 text-white w-24 md:w-36 text-center">
                                            <p className="text-xs md:text-sm font-semibold  gap-x-2">
                                                Back
                                            </p>
                                        </div>
                                    </button>
                                </div>
                                <div className={classNames("mb-10 flex justify-end mr-2")}>
                                    <button
                                        onClick={() => {
                                            setShowModal(true);
                                            setShowAddVisaModal(true);
                                        }}
                                    >
                                        <div className="rounded-md bg-logoColorGreen px-5 py-3 text-white">
                                            <p className="text-xs md:text-sm font-semibold flex items-center gap-x-2">
                                                <span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <g>
                                                            <g
                                                                fill="none"
                                                                stroke="#ffff"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                data-name="add"
                                                            >
                                                                <path strokeLinecap="round" d="M12 19L12 5"></path>
                                                                <path d="M5 12L19 12"></path>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </span>
                                                Add New Visa Sub Type
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            {
                                visaSubTypes.length <= 0 ? (
                                    <div className="flex justify-center items-center h-full">
                                        <p className="text-2xl font-semibold text-logoColorBlue">
                                            No Visa Sub Types available
                                        </p>
                                    </div>
                                ) : (
                                    <div className="mt-5">
                                        <table className="w-full">
                                            <thead>
                                                <tr className=" text-logoColorBlue font-serif text-sm md:text-xl font-bold text-center ">
                                                    <th className="px-5 pt-4 pb-9">S/N</th>
                                                    <th className="px-5 pt-4 pb-9">Visa Sub Type</th>
                                                    <th className="px-5 pt-4 pb-9">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    visaSubTypes.map((visaSubType, index) => (
                                                        <tr key={index}
                                                            className="bg-gradient-to-r from-logoColorGreen to-logoColorBlue text-white font-sans font-semibold text-sm md:text-lg text-center border-b-8 border-white items-center"

                                                        >
                                                            <td className="px-5 py-10 rounded-s-2xl">{index + 1}</td>
                                                            <td className="px-5 py-10">{formatString(visaSubType.description)}</td>
                                                            <td className="py-7 mt-3 rounded-e-2xl ">
                                                                <button
                                                                    type="button"
                                                                    className="rounded-xl m-0 w-28 bg-orange-600 px-4 py-2 text-sm md:text-base text-white hover:bg-black"
                                                                    onClick={() => {
                                                                        editVisaSubType(visaSubType.description, visaSubType.visaSubType as string, visaSubType.visaType, visaSubType.isActive as string)
                                                                    }}
                                                                >
                                                                    {visaSubType.isActive === 't' ? 'Deactivate' : 'Activate'}
                                                                </button>

                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            }
                        </>
                    )
            }
        </div>
    )
}