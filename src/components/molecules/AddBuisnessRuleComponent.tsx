import classNames from "classnames"
import InputComponent from "../atoms/InputComponent";
import React, { ChangeEvent, useEffect, useState } from "react";
import Select from 'react-select';
import { addBuisnessRules, getCountryData, getVisaTypes } from "@/server/feeder";
import { toast } from "react-toastify";
import { BuisnessRulesTabs, Colors, InterviewOptions, sex } from "@/constants/constants";
import { getDocuments, getVerifiedStackHolders } from "@/server/users";
import MultiSelectDropdown from "../atoms/StakeHolderDropDownComponent";
import { capitalizeWords } from "@/constants/functions";
import Loader from "../atoms/Loader";
import { remove } from "winston";
import { useBuisnessRule } from "@/hooks/useBuisnessRule";


interface Props {
    setActiveTab: React.Dispatch<React.SetStateAction<any>>;
}
export default function AddBuisnessRuleComponent({ setActiveTab: setAcitveTab }: Props) {
    const {
        formValues,
        setFormValues,
        addCountries,
        countriesOptions,
        removeCountry,
        countriesDropdownOptions,
        addVisaType,
        visaTypesOptions,
        removeVisaType,
        visaTypesDropdownOptions,
        addStakeholder,
        stakeHoldersOptions,
        removeStakeholder,
        stakeHolderDropdownOptions,
        documentsOptions,
        removeDocument,
        documentDropdownOptions,
        otherRequirements,
        handleOtherRequirementsChange,
        handleGenderSelect,
        selectedGender,
        loading,
        handleFormSubmit,
        visaTypeStyles,
        handleInterviewSelect,
        selectedInterview,
        addDocument
    } = useBuisnessRule({ setActiveTab: setAcitveTab });
    return (
        <div className='h-full'>
            {
                loading ? (
                    <Loader />
                ) : (
                    <form
                        className="flex h-full  items-center justify-center"
                        onSubmit={handleFormSubmit}
                    >
                        <div className="w-full">
                            <div className="mt-5 flex justify-center gap-x-44">
                                <div className="mr-2 mt-1 w-full">
                                    <div className="flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                                        <div className="mt-5 flex w-full md:w-2/3  items-center justify-between gap-x-44 md:flex-row flex-col ">
                                            <InputComponent
                                                label={'Name of Buisness Rule'}
                                                maxLength={32}
                                                minLength={3}
                                                type={'text'}
                                                placeholder={'Enter your buisness rule name'}
                                                name={'firstName'}
                                                value={formValues.name}
                                                className="w-4/5 md:w-1/2"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {

                                                    setFormValues({
                                                        ...formValues,
                                                        name: e.target.value
                                                    })
                                                }}
                                                error={''}
                                                required
                                            />

                                            <div className="w-4/5 md:w-1/2"
                                            >

                                                <div className="flex items-center">
                                                    <div className="w-full">
                                                        <label className="text-sm font-semibold text-logoColorBlue">
                                                            Minimim Age
                                                        </label>
                                                        <InputComponent
                                                            label={''}
                                                            maxLength={32}
                                                            minLength={3}
                                                            type={'number'}
                                                            placeholder={'Enter your age'}
                                                            name={'age'}
                                                            value={formValues.minAge}
                                                            className=" mr-5"
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {

                                                                setFormValues({
                                                                    ...formValues,
                                                                    minAge: e.target.value
                                                                })
                                                            }}
                                                            error={''}

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
                                                            type={'number'}
                                                            placeholder={'Enter your age'}
                                                            name={'age'}
                                                            value={formValues.maxAge}
                                                            className=""
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {

                                                                setFormValues({
                                                                    ...formValues,
                                                                    maxAge: e.target.value
                                                                })
                                                            }}
                                                            error={''}

                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="mt-4 flex justify-center gap-x-44">
                                        <div className=" mt-1 w-full flex justify-center">
                                            <div className="flex w-full md:w-2/3 items-center justify-between gap-x-44  md:flex-row flex-col ">
                                                <div className="w-4/5 md:w-1/2"
                                                >
                                                    <label className="text-sm font-semibold text-logoColorBlue">
                                                        Gender
                                                    </label>
                                                    <Select
                                                        options={sex}
                                                        styles={visaTypeStyles}
                                                        onChange={handleGenderSelect}
                                                        value={selectedGender}

                                                    />
                                                </div>
                                                <div
                                                    className="w-4/5 md:w-1/2"

                                                >
                                                    <label className="text-sm font-semibold text-logoColorBlue">
                                                        Interview Required
                                                    </label>
                                                    <Select
                                                        options={InterviewOptions}
                                                        styles={visaTypeStyles}
                                                        onChange={handleInterviewSelect}
                                                        value={selectedInterview}

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-center">
                                            <div className='h-[0.5px] w-full md:w-2/3  mb-12 mt-16 bg-logoColorBlue'></div>
                                        </div>

                                        <div className=" flex justify-center gap-x-44 mb-5">
                                            <div className="mr-2 mt-1 w-full md:w-2/3 ">
                                                <div className="flex w-full items-center justify-start gap-x-44  md:flex-row flex-col">
                                                    <div className="md:w-1/3 w-4/5">
                                                        <MultiSelectDropdown stakeHoldersOptions={countriesDropdownOptions} addStakeHolder={addCountries} title="Countries List" />
                                                    </div>
                                                    <div className="w-1/4">
                                                        <div className="hidden"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" flex justify-center gap-x-44">
                                            <div className="mr-2 mt-8 w-full text-center ">
                                                <p className="text-logoColorBlue underline underline-offset-4 font-serif text-xl font-bold text-center">
                                                    Countries List
                                                </p>
                                                {
                                                    countriesOptions.length === 0 ? (
                                                        <p className="text-logoColorBlue font-serif text-xl font-bold text-center mt-10">
                                                            No countries selected
                                                        </p>
                                                    ) : (
                                                        <div className="flex w-full items-center justify-center gap-x-44  md:flex-row flex-col ">

                                                            <table className="w-full md:w-2/3 mt-8 ms-5 ">
                                                                <thead>
                                                                    <tr className=" text-logoColorBlue font-serif text-sm font-bold text-center ">
                                                                        <th className="ps-5 py-2">S/N</th>
                                                                        <th className="">Country Name</th>
                                                                        <th className="">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        countriesOptions.map((countries, index) => (
                                                                            <tr key={index}
                                                                                className="bg-gradient-to-r from-logoColorGreen to-logoColorBlue text-white font-sans font-semibold text-base text-center border-2 rounded-2xl border-white items-center"

                                                                            >
                                                                                <td className="py-4  border-logoColorBlue rounded-s-xl">{index + 1}</td>
                                                                                <td className=" py-2">{capitalizeWords(countries.label)}</td>
                                                                                <td className="py-2  rounded-e-xl ">
                                                                                    <button
                                                                                        type="button"
                                                                                        className={classNames("rounded-md mt-1 bg-red-600 px-5 py-2 text-xs text-white hover:bg-black")}
                                                                                        onClick={() => {
                                                                                            removeCountry(countries.value)
                                                                                        }}
                                                                                    >
                                                                                        Remove
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
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-center">
                                            <div className='h-[0.5px] w-2/3  mb-7 mt-12 bg-logoColorBlue'></div>
                                        </div>
                                        <div className=" flex justify-center gap-x-44 mb-5">
                                            <div className="mr-2 mt-1 w-full md:w-2/3 ">
                                                <div className="flex w-full items-center justify-start gap-x-44  md:flex-row flex-col">
                                                    <div className="md:w-1/3 w-4/5">
                                                        <MultiSelectDropdown stakeHoldersOptions={visaTypesDropdownOptions} addStakeHolder={addVisaType} title="Visa Types List" />
                                                    </div>
                                                    <div className="w-1/4">
                                                        <div className="hidden"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className=" flex justify-center gap-x-44">
                                            <div className="mr-2 mt-8 w-full text-center ">
                                                <p className="text-logoColorBlue underline underline-offset-8 font-serif text-xl font-bold text-center">
                                                    VisaTypes List
                                                </p>
                                                {
                                                    visaTypesOptions.length === 0 ? (
                                                        <p className="text-logoColorBlue font-serif text-xl font-bold text-center mt-10">
                                                            No visa type is  selected
                                                        </p>
                                                    ) : (
                                                        <div className="flex w-full items-center justify-center gap-x-44  md:flex-row flex-col ">

                                                            <table className="w-full md:w-2/3 mt-8 ms-5 ">
                                                                <thead>
                                                                    <tr className=" text-logoColorBlue font-serif text-sm font-bold text-center ">
                                                                        <th className="ps-5 py-2">S/N</th>
                                                                        <th className="">VisaType</th>
                                                                        <th className="">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        visaTypesOptions.map((visaTypes, index) => (
                                                                            <tr key={index}
                                                                                className="bg-gradient-to-r from-logoColorGreen to-logoColorBlue text-white font-sans font-semibold text-base text-center border-2 rounded-2xl border-white items-center"

                                                                            >
                                                                                <td className="py-4  border-logoColorBlue rounded-s-xl">{index + 1}</td>
                                                                                <td className=" py-2">{capitalizeWords(visaTypes.label)}</td>
                                                                                <td className="py-2  rounded-e-xl">
                                                                                    <button
                                                                                        type="button"
                                                                                        className={classNames("rounded-md mt-1 bg-red-600 px-5 py-2 text-xs text-white hover:bg-black")}
                                                                                        onClick={() => {
                                                                                            removeVisaType(visaTypes.value)
                                                                                        }}
                                                                                    >
                                                                                        Remove
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
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-center">
                                            <div className='h-[0.5px] w-2/3  mb-7 mt-12 bg-logoColorBlue'></div>
                                        </div>
                                        <div className=" flex justify-center gap-x-44 mb-5">
                                            <div className="mr-2 mt-1 w-full md:w-2/3 ">
                                                <div className="flex w-full items-center justify-start gap-x-44  md:flex-row flex-col">
                                                    <div className="md:w-1/3 w-4/5">
                                                        <MultiSelectDropdown stakeHoldersOptions={stakeHolderDropdownOptions} addStakeHolder={addStakeholder} title="Stakeholders List" />
                                                    </div>
                                                    <div className="w-1/4">
                                                        <div className="hidden"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" flex justify-center gap-x-44">
                                            <div className="mr-2 mt-8 w-full text-center ">
                                                <p className="text-logoColorBlue underline underline-offset-8 font-serif text-xl font-bold text-center">
                                                    Stakeholders List
                                                </p>
                                                {
                                                    stakeHoldersOptions.length === 0 ? (
                                                        <p className="text-logoColorBlue font-serif text-xl font-bold text-center mt-10">
                                                            No stakeholder is  selected
                                                        </p>
                                                    ) : (
                                                        <div className="flex w-full items-center justify-center gap-x-44  md:flex-row flex-col ">

                                                            <table className="w-full md:w-2/3 mt-8 ms-5 ">
                                                                <thead>
                                                                    <tr className=" text-logoColorBlue font-serif text-sm font-bold text-center ">
                                                                        <th className="ps-5 py-2">S/N</th>
                                                                        <th className="">Stakeholder Name</th>
                                                                        <th className="">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        stakeHoldersOptions.map((stakeholders, index) => (
                                                                            <tr key={index}
                                                                                className="bg-gradient-to-r from-logoColorGreen to-logoColorBlue text-white font-sans font-semibold text-base text-center border-2 rounded-2xl border-white items-center"

                                                                            >
                                                                                <td className="py-4  border-logoColorBlue rounded-s-xl">{index + 1}</td>
                                                                                <td className=" py-2">{capitalizeWords(stakeholders.label)}</td>
                                                                                <td className="py-2  rounded-e-xl">
                                                                                    <button
                                                                                        type="button"
                                                                                        className={classNames("rounded-md mt-1 bg-red-600 px-5 py-2 text-xs text-white hover:bg-black")}
                                                                                        onClick={() => {
                                                                                            removeStakeholder(stakeholders.value)
                                                                                        }}
                                                                                    >
                                                                                        Remove
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
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-center">
                                            <div className='h-[0.5px] w-2/3  mb-7 mt-12 bg-logoColorBlue'></div>
                                        </div>
                                        <p className="text-logoColorBlue font-serif text-3xl font-bold text-center my-6">
                                            Checklist
                                        </p>
                                        <div className=" flex justify-center gap-x-44 mb-5">
                                            <div className="mr-2 mt-1 w-full md:w-2/3 ">
                                                <div className="flex w-full items-center justify-start gap-x-44  md:flex-row flex-col">
                                                    <div className="md:w-1/3 w-4/5">
                                                        <MultiSelectDropdown stakeHoldersOptions={documentDropdownOptions} addStakeHolder={addDocument} title="Documents List" />
                                                    </div>
                                                    <div className="w-full md:w-1/4">
                                                        <div className="hidden"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" flex justify-center gap-x-44">
                                            <div className="mr-2 mt-8 w-full text-center ">
                                                <p className="text-logoColorBlue underline underline-offset-8 font-serif text-xl font-bold text-center">
                                                    Required Documents
                                                </p>
                                                {
                                                    documentsOptions.length === 0 ? (
                                                        <p className="text-logoColorBlue font-serif text-xl font-bold text-center mt-10">
                                                            No document is  selected
                                                        </p>
                                                    ) : (
                                                        <div className="flex w-full items-center justify-center gap-x-44  md:flex-row flex-col ">

                                                            <table className="w-full md:w-2/3 mt-8 ms-5 ">
                                                                <thead>
                                                                    <tr className=" text-logoColorBlue font-serif text-sm font-bold text-center ">
                                                                        <th className="ps-5 py-2">S/N</th>
                                                                        <th className="">Document Name</th>
                                                                        <th className="">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        documentsOptions.map((documents, index) => (
                                                                            <tr key={index}
                                                                                className="bg-gradient-to-r from-logoColorGreen to-logoColorBlue text-white font-sans font-semibold text-base text-center border-2 rounded-2xl border-white items-center"

                                                                            >
                                                                                <td className="py-4  border-logoColorBlue rounded-s-xl">{index + 1}</td>
                                                                                <td className=" py-2">{capitalizeWords(documents.label)}</td>
                                                                                <td className="py-2   rounded-e-xl ">
                                                                                    {documents.label === 'passport' ? null : <button
                                                                                        type="button"
                                                                                        className={classNames("rounded-md mt-1 bg-red-600 px-5 py-2 text-xs text-white hover:bg-black")}
                                                                                        onClick={() => {
                                                                                            removeDocument(documents.value)
                                                                                        }}
                                                                                    >
                                                                                        Remove
                                                                                    </button>}

                                                                                </td>

                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    )
                                                }
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
                                                    value={otherRequirements}
                                                    onChange={handleOtherRequirementsChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>



                            </div>
                            <div className="flex justify-center">
                                <div className="my-20 flex w-4/5 md:w-1/2 gap-x-10 justify-center">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setAcitveTab(BuisnessRulesTabs.VIEWLIST)
                                        }}
                                        className="w-full md:w-1/3 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-base text-white"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="w-full md:w-1/3 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-base text-white"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div >
                    </form >
                )
            }
        </div >
    )
}