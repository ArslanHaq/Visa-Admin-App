import { capitalizeFirstLetter, capitalizeWords } from "@/constants/functions";
import { visaTypeDto } from "@/dto/ApplicationData.dto";
import { getCountryData } from "@/server/feeder";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";
import AddCountryModalComponent from "../atoms/AddCountryModalComponent";
import { countryRequestDto, countryResponseDto } from "@/dto/libraries.dto";
import { addCountry } from "@/server/libraries";
import Loader from "../atoms/Loader";




export default function CountryLibraryComponent() {


    const [showModal, setShowModal] = useState(false);
    const [showAddVisaModal, setShowAddVisaModal] = useState(false);
    const [loading, setLoading] = useState(true);


    const [countries, setCountries] = useState<countryResponseDto[]>([]);


    async function getCountryDataList() {
        const response = await getCountryData("f");
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            if (!response.data) {
                setLoading(false);
                return
            };
            setCountries(response.data)
        }
        setLoading(false);
    }
    useEffect(() => {
        getCountryDataList();
    }, [])

    const removeCountry = async (alpha3: string) => {


        const response = await addCountry({
            alpha3: alpha3,
            isActive: 't'
        })
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            toast.success('Country removed successfully');
            window.location.reload();

        }
    }
    return (
        <div>
            {
                showAddVisaModal && (
                    <Modal showModal={showModal}>
                        <AddCountryModalComponent setShowModal={setShowModal} setAddCountryModal={setShowAddVisaModal} />
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
                                Add Country
                            </p>
                        </div>
                    </button>
                </div>
            </div>
            {
                loading ? (
                    <Loader />
                ) : (
                    <div>

                        {
                            countries.length <= 0 ? (
                                <div className="flex justify-center items-center h-full">
                                    <p className="text-2xl font-semibold text-logoColorBlue">
                                        No country in the country exclusion list
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-5">
                                    <table className="w-full">
                                        <thead>
                                            <tr className=" text-logoColorBlue font-serif text-sm md:text-xl font-bold text-center ">
                                                <th className="px-5 pt-4 pb-9">S/N</th>
                                                <th className="px-5 pt-4 pb-9">Country Name</th>
                                                <th className="px-5 pt-4 pb-9">Code</th>
                                                <th className="px-5 pt-4 pb-9">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                countries.map((countries, index) => (
                                                    <tr key={index}
                                                        className="bg-gradient-to-r from-logoColorGreen to-logoColorBlue text-white font-sans font-semibold text-sm md:text-lg text-center border-b-8 border-white items-center"

                                                    >
                                                        <td className="px-5 py-10 rounded-s-2xl">{index + 1}</td>
                                                        <td className="px-5 py-10">{countries.countryName}</td>
                                                        <td className="px-5 py-10">{countries.alpha3}</td>
                                                        <td className="py-7 mt-3 rounded-e-2xl">
                                                            <button
                                                                type="button"
                                                                className="rounded-xl m-0 bg-orange-600 px-4 py-2 text-sm md:text-base md:mr-0 mr-2 text-white hover:bg-black"
                                                                onClick={() => {
                                                                    removeCountry(countries.alpha3)
                                                                }}
                                                            >
                                                                Remove Country
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
        </div>
    )
}