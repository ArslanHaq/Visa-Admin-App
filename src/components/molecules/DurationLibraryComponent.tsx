import { capitalizeFirstLetter, capitalizeWords } from "@/constants/functions";
import { visaTypeDto } from "@/dto/ApplicationData.dto";
import { getCountryData, getVisaDuration } from "@/server/feeder";
import classNames from "classnames";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";
import AddCountryModalComponent from "../atoms/AddCountryModalComponent";
import { countryRequestDto, countryResponseDto, visaDurationDto } from "@/dto/libraries.dto";
import { addCountry, addDuration, removeActivity } from "@/server/libraries";
import InputComponent from "../atoms/InputComponent";
import Loader from "../atoms/Loader";




export default function DurationLibraryComponent() {

    const [loader, setLoader] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showAddVisaModal, setShowAddVisaModal] = useState(false);

    const [addVisaFormValues, setAddVisaFormValues] = useState<visaDurationDto>({
        duration: '',
        isActive: 't'
    })

    const [visaDurations, setVisaDurations] = useState<visaDurationDto[]>([]);


    async function getVisaDurationList() {
        const response = await getVisaDuration()
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            if (!response.data) {
                setLoader(false);
                return
            };
            setVisaDurations(response.data)
        }
        setLoader(false);
    }
    useEffect(() => {
        getVisaDurationList();
    }, [])

    const removeActivityData = async (duration: string, isActive: string) => {

        const activeValue = isActive === 't' ? 'f' : 't';

        const response = await removeActivity({ duration, isActive: activeValue });
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            toast.success('activity toggled successfully');
            window.location.reload();

        }
    }

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();

        const response = await addDuration({
            duration: addVisaFormValues.duration,
            isActive: addVisaFormValues.isActive
        })
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            toast.success('duration added successfully');
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
                                    Add Duration
                                </p>
                                <p className="mt-6 font-sans text-base text-slate-200 w-full  text-start">
                                    Duration
                                </p>
                                <div className="w-full flex items-center">
                                    <InputComponent
                                        label={''}
                                        maxLength={5}
                                        minLength={3}
                                        type={'number'}
                                        placeholder={''}
                                        name={'firstName'}
                                        value={addVisaFormValues.duration}
                                        className="w-1/3 text-white"
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            setAddVisaFormValues({ ...addVisaFormValues, duration: e.target.value })
                                        }}
                                        error={''}
                                        required

                                    />
                                    <p className="ms-3 font-sans text-lg font-bold text-slate-200 w-full  text-start">
                                        Days
                                    </p>
                                </div>
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
            <div className="flex justify-between">
                <p className="font-serif text-xl font-bold text-logoColorBlue">

                </p>
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
                                Add New Duration
                            </p>
                        </div>
                    </button>
                </div>
            </div>
            <div>{
                loader ? (<Loader />) : (<>
                    {
                        visaDurations.length <= 0 ? (
                            <div className="flex justify-center items-center h-full">
                                <p className="text-xl font-semibold text-logoColorBlue">No Duration Added Yet</p>
                            </div>
                        ) : (
                            <div className="mt-5">
                                <table className="w-full">
                                    <thead>
                                        <tr className=" text-logoColorBlue font-serif text-sm md:text-xl font-bold text-center ">
                                            <th className="px-5 pt-4 pb-9">S/N</th>
                                            <th className="px-5 pt-4 pb-9">Duration</th>
                                            <th className="px-5 pt-4 pb-9">Status</th>
                                            <th className="px-5 pt-4 pb-9">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            visaDurations.map((visaDurations, index) => (
                                                <tr key={index}
                                                    className="bg-gradient-to-r from-logoColorGreen to-logoColorBlue text-white font-sans font-semibold text-sm md:text-lg text-center border-b-8 border-white items-center"

                                                >
                                                    <td className="px-5 py-10 rounded-s-2xl">{index + 1}</td>
                                                    <td className="px-5 py-10">{visaDurations.duration} Days</td>
                                                    <td className="px-5 py-10">{capitalizeFirstLetter(visaDurations.isActive === 't' ? 'active' : 'disable')}</td>
                                                    <td className="py-7 mt-3 rounded-e-2xl ">
                                                        <button
                                                            type="button"
                                                            className="rounded-xl m-0 bg-orange-600 w-32 py-2 text-sm md:text-base text-white hover:bg-black"
                                                            onClick={() => {
                                                                removeActivityData(visaDurations.duration, visaDurations.isActive)
                                                            }}
                                                        >
                                                            {visaDurations.isActive === 't' ? 'Deactivate' : 'Activate'}
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
                )}
            </div>

        </div>
    )
}