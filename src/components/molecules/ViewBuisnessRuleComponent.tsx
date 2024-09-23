import { buisnessRuleDto } from "@/dto/libraries.dto";
import React, { ChangeEvent, FormEvent, use, useEffect, useState } from "react";
import InputComponent from "../atoms/InputComponent";
import { capitalizeWords } from "@/constants/functions";
import { InterviewOptions, sex } from "@/constants/constants";
import { getCountryData, getVisaTypes } from "@/server/feeder";
import { toast } from "react-toastify";


interface Props {
    buisnessRule?: buisnessRuleDto | null;
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ViewBuisnessRuleComponent({ buisnessRule, setIsOpened }: Props) {

    const [selectedGender, setSelectedGender] = useState<string>('');
    const [selectedInterviewRequired, setSelectedInterviewRequired] = useState<string>('');
    const [selectedVisaType, setSelectedVisaType] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<string>('');


    async function getVisaTypesList() {
        const response = await getVisaTypes();
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            if (!response.data) return;

        }
    }

    async function getCountryList() {
        const response = await getCountryData('t');
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            if (!response.data) return;

        }
    }
    useEffect(() => {
        if (buisnessRule) {
            setSelectedGender(
                sex.find((sex) => buisnessRule.sex === sex.value)?.label as string
            )
            setSelectedInterviewRequired(
                InterviewOptions.find((option) => buisnessRule.interviewRequired === option.value)?.label as string
            )
            getVisaTypesList();
            getCountryList();
        }
    }, [buisnessRule]);



    return (
        <form
            className="flex h-full  items-center justify-center"
        >
            <div className="w-full">
                <div className="mt-5 flex justify-center gap-x-44">
                    <div className="mr-2 mt-1 w-full">
                        <div className="flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                            <div className="mt-5 flex w-full md:w-2/3 items-center justify-between gap-x-44 md:flex-row flex-col ">
                                <InputComponent
                                    label={'Name of Buisness Rule'}
                                    maxLength={32}
                                    minLength={3}
                                    type={'text'}
                                    placeholder={'Enter your buisness rule name'}
                                    name={'firstName'}
                                    value={String(buisnessRule?.name)}
                                    className="w-4/5 md:w-1/2"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    }}
                                    error={''}
                                    disabled />

                                <div className="w-4/5 md:w-1/2">

                                    <div className="flex items-center">
                                        <div className="w-full">
                                            <label className="text-sm font-semibold text-logoColorBlue">
                                                Minimim Age
                                            </label>
                                            <InputComponent
                                                label={''}
                                                maxLength={32}
                                                minLength={3}
                                                type={'text'}
                                                placeholder={'Enter your age'}
                                                name={'age'}
                                                value={buisnessRule?.minAge ? String(buisnessRule.minAge) : 'Not Specified'}
                                                className=" mr-5"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                }}
                                                error={''}
                                                disabled

                                            />
                                        </div>
                                        <div className="w-full">
                                            <label className="text-sm font-semibold text-logoColorBlue">
                                                Maximum Age
                                            </label>
                                            <InputComponent
                                                label={''}
                                                maxLength={32}
                                                minLength={3}
                                                type={'text'}
                                                placeholder={'Enter your age'}
                                                name={'age'}
                                                value={buisnessRule?.maxAge ? String(buisnessRule.maxAge) : 'Not Specified'}
                                                className=""
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                }}
                                                error={''}
                                                disabled

                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                            <div className="mt-5 flex w-full md:w-2/3 items-center justify-center gap-x-44 md:flex-row flex-col">
                                <InputComponent
                                    label={'Gender'}
                                    maxLength={32}
                                    minLength={3}
                                    type={'text'}
                                    placeholder={''}
                                    name={'gender'}
                                    value={selectedGender ? capitalizeWords(selectedGender) : 'Not Specified'}
                                    className="w-4/5 md:w-1/2 "
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    }}
                                    error={''}
                                    required
                                    disabled
                                />
                                <InputComponent
                                    label={'Interview Required'}
                                    maxLength={32}
                                    minLength={3}
                                    type={'text'}
                                    placeholder={'Enter your age'}
                                    name={'inerViewRequired'}
                                    value={selectedInterviewRequired ? capitalizeWords(selectedInterviewRequired) : 'Not Specified'}
                                    className="w-4/5 md:w-1/2 "
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    }}
                                    error={''}
                                    required
                                />
                            </div>

                        </div>
                        <div>
                            <div className="flex justify-center">
                                <div className='h-[0.5px] w-full md:w-2/3  mb-7 mt-12 bg-logoColorBlue'></div>
                            </div>
                            <div className=" flex justify-center gap-x-44">
                                <div className="mr-2 mt-1 w-full text-center ">
                                    <p className="text-logoColorBlue font-serif text-xl font-bold text-center underline underline-offset-8">
                                        VisaType List
                                    </p>
                                    {buisnessRule?.visaTypes?.length === 0 ?
                                        <p className="text-logoColorBlue font-serif text-xl font-bold text-center mt-10">
                                            All Visa Types
                                        </p> :
                                        <div className="flex w-full items-center justify-center gap-x-44  md:flex-row flex-col ">

                                            <table className="w-full md:w-2/3 mt-8 ms-5 ">
                                                <thead>
                                                    <tr className=" text-logoColorBlue font-serif text-base font-bold text-center ">
                                                        <th className="md:ps-16 py-2">S/N</th>
                                                        <th className="">Description</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        buisnessRule?.visaTypes?.map((visaTypes, index) => (
                                                            <tr key={index}
                                                                className="bg-gradient-to-r from-logoColorGreen to-logoColorBlue text-white font-sans font-semibold text-base text-center border-2 rounded-2xl border-white items-center"

                                                            >
                                                                <td className="py-4 md:ps-16 rounded-s-xl  border-logoColorBlue ">{index + 1}</td>
                                                                <td className=" py-2 rounded-e-xl">{capitalizeWords(String(visaTypes.description))}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-center">
                                <div className='h-[0.5px] w-2/3  mb-7 mt-12 bg-logoColorBlue'></div>
                            </div>
                            <div className=" flex justify-center gap-x-44">
                                <div className="mr-2 mt-1 w-full text-center ">
                                    <p className="text-logoColorBlue font-serif text-xl font-bold text-center underline underline-offset-8">
                                        Countries List
                                    </p>
                                    {buisnessRule?.countries.length === 0 ?
                                        <p className="text-logoColorBlue font-serif text-xl font-bold text-center mt-10">
                                            All Countries
                                        </p>
                                        : <div className="flex w-full items-center justify-center gap-x-44  md:flex-row flex-col ">

                                            <table className="w-full md:w-2/3 mt-8 ms-5 ">
                                                <thead>
                                                    <tr className=" text-logoColorBlue font-serif text-base font-bold text-center ">
                                                        <th className="md:ps-16 py-2">S/N</th>
                                                        <th className="">Description</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        buisnessRule?.countries?.map((countries, index) => (
                                                            <tr key={index}
                                                                className="bg-gradient-to-r from-logoColorGreen to-logoColorBlue text-white font-sans font-semibold text-base text-center border-2 rounded-2xl border-white items-center"

                                                            >
                                                                <td className="py-4 md:ps-16 rounded-s-xl  border-logoColorBlue ">{index + 1}</td>
                                                                <td className=" py-2 rounded-e-xl">{capitalizeWords(String(countries.countryName))}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-center">
                                <div className='h-[0.5px] w-2/3  mb-7 mt-12 bg-logoColorBlue'></div>
                            </div>
                            <div className=" flex justify-center gap-x-44">
                                <div className="mr-2 mt-1 w-full text-center ">
                                    <p className="text-logoColorBlue font-serif text-xl font-bold text-center underline underline-offset-8  ">
                                        Stakeholders List
                                    </p>
                                    <div className="flex w-full items-center justify-center gap-x-44  md:flex-row flex-col ">

                                        <table className="w-full md:w-2/3 mt-8 ms-5 ">
                                            <thead>
                                                <tr className=" text-logoColorBlue font-serif text-base font-bold text-center ">
                                                    <th className="md:ps-16 py-2">S/N</th>
                                                    <th className="">Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    buisnessRule?.stakeHolders?.map((stakeholder, index) => (
                                                        <tr key={index}
                                                            className="bg-gradient-to-r from-logoColorGreen to-logoColorBlue text-white font-sans font-semibold text-base text-center border-2 rounded-2xl border-white items-center"

                                                        >
                                                            <td className="py-4 md:ps-16 rounded-s-xl  border-logoColorBlue ">{index + 1}</td>
                                                            <td className=" py-2 rounded-e-xl">{capitalizeWords(stakeholder.description)}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-center">
                                <div className='h-[0.5px] w-2/3  mb-7 mt-12 bg-logoColorBlue'></div>
                            </div>

                            <div className=" flex justify-center gap-x-44">
                                <div className="mr-2 mt-1 w-full text-center ">
                                    <p className="text-logoColorBlue font-serif text-xl font-bold text-center underline underline-offset-8">
                                        Docnuments List
                                    </p>
                                    <div className="flex w-full items-center justify-center gap-x-44  md:flex-row flex-col ">

                                        <table className="w-full md:w-2/3 mt-8 ms-5 ">
                                            <thead>
                                                <tr className=" text-logoColorBlue font-serif text-base font-bold text-center ">
                                                    <th className="py-2">S/N</th>
                                                    <th className="">Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    buisnessRule?.documents?.map((document, index) => (
                                                        <tr key={index}
                                                            className="bg-gradient-to-r from-logoColorGreen to-logoColorBlue text-white font-sans font-semibold text-base text-center border-2 rounded-2xl border-white items-center"

                                                        >
                                                            <td className="py-4 md:ps-16 rounded-s-xl  border-logoColorBlue ">{index + 1}</td>
                                                            <td className=" py-2 rounded-e-xl">{capitalizeWords(document.documentName)}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mr-2 mt-10 w-full text-center ">
                        <p className="text-logoColorBlue font-serif text-xl font-bold text-center underline underline-offset-8">
                            Other Requirments
                        </p>
                    </div>

                    <div className='flex w-full justify-center'>
                        <textarea
                            className="mt-4 w-4/5 md:w-2/3 h-52 p-2 rounded-xl bg-slate-200 text-black"
                            placeholder="Write down the requirements"
                            value={buisnessRule?.otherRequirements}
                            onChange={() => { }}
                            disabled
                        />
                    </div>
                </div>
                <div className="my-20 flex justify-center">
                    <button
                        type="button"
                        onClick={() => {
                            setIsOpened(false);
                        }}
                        className="w-4/5 md:w-1/4 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-base text-white"
                    >
                        Back
                    </button>
                </div>
            </div >
        </form >
    )
}