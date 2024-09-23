import { formatString } from "@/constants/constants";
import { capitalizeFirstLetter, capitalizeWords } from "@/constants/functions";
import { visaTypeDto } from "@/dto/ApplicationData.dto";
import { addVisaType } from "@/server/libraries";
import classNames from "classnames";
import { stat } from "fs";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
    visaTypes: visaTypeDto[];
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setShowAddVisaModal: React.Dispatch<React.SetStateAction<boolean>>;
    setShowMore: React.Dispatch<React.SetStateAction<boolean>>;
    showMore: boolean;
    setShowMoreData: React.Dispatch<React.SetStateAction<visaTypeDto | null>>;

}

async function statusChange(visaType: string, description: string, isActive: string) {
    const response = await addVisaType({
        description: description,
        visaType: visaType,
        isActive: isActive === 't' ? 'f' : 't'
    });
    if (response.error && response.error.length > 0) {
        response.error.forEach((err: any) => {
            toast.error(`Error ${err.code}: ${err.description}`);
        });
    } else {
        toast.success('Visa type status changed successfully');
        setTimeout(() => {
            window.location.reload();
        }, 500);

    }
}
export default function VisaLibraryComponent({ visaTypes, setShowModal, setShowAddVisaModal, setShowMore, showMore, setShowMoreData }: Props) {
    return (
        <div>
            <div className="flex justify-between">
                <p className="font-serif text-xl font-bold text-logoColorBlue">

                </p>
                <div className={classNames("mb-10 flex justify-end")}>
                    <button
                        onClick={() => {
                            setShowModal(true);
                            setShowAddVisaModal(true);
                        }}
                    >
                        <div className="rounded-md bg-logoColorGreen px-5 py-3 text-white mr-2">
                            <p className="text-xs pe-2md:text-sm font-semibold flex items-center gap-x-2">
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
                                Add New Visa Type
                            </p>
                        </div>
                    </button>
                </div>
            </div>
            {
                visaTypes.length <= 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-2xl font-semibold text-logoColorBlue">
                            No Visa Types available
                        </p>
                    </div>
                ) : (
                    <div className="mt-5">
                        <table className="w-full">
                            <thead>
                                <tr className=" text-logoColorBlue font-serif text-base md:text-xl font-bold text-center ">
                                    <th className="ps-10 pt-4 pb-9">S/N</th>
                                    <th className="px-5 pt-4 pb-9">Visa Type</th>
                                    <th className="px-5 w-1/3 pt-4 pb-9">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    visaTypes.map((visaType, index) => (
                                        <tr key={index}
                                            className="bg-gradient-to-r from-logoColorGreen to-logoColorBlue text-white font-sans font-semibold text-base md:text-lg text-center border-b-8 border-white items-center"

                                        >
                                            <td className="ps-20 py-10 rounded-s-2xl">{index + 1}</td>
                                            <td className="px-5 py-10">{formatString(visaType.description)}</td>
                                            <td className="py-7  mt-3 rounded-e-2xl">
                                                <button
                                                    type="button"
                                                    className="rounded-xl m-0 bg-orange-600 w-28 py-2 text-sm text-white hover:bg-black"
                                                    onClick={() => {
                                                        setShowModal(true)
                                                        statusChange(visaType.visaType, visaType.description, visaType.isActive)
                                                    }}
                                                >
                                                    {visaType.isActive === 't' ? 'Deactivate' : 'Activate'}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mx-3 mt-2 rounded-xl m-0 bg-orange-600 w-28 py-2 text-sm text-white hover:bg-black"
                                                    onClick={() => {
                                                        setShowMore(!showMore)
                                                        setShowMoreData(visaType)
                                                        setShowModal(true)
                                                    }}
                                                >
                                                    Show More
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
    )
}