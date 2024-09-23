"use client"

import { Colors } from "@/constants/constants";
import { ChangeEvent, useEffect, useState } from "react";
import Loader from "../atoms/Loader";
import { capitalizeWords } from "@/constants/functions";
import { toast } from "react-toastify";
import { getVisaSubTypes, getVisaTypes } from "@/server/feeder";
import Select from 'react-select';
import Modal from "../molecules/Modal";
import InputComponent from "../atoms/InputComponent";
import { addDocument, addDocumentLink, disableDocument } from "@/server/documents";
import { getDocuments } from "@/server/users";
import { DocumentGetResponseDto } from "@/dto/documentData.dto";
import ViewDocumentDetailsComponent from "../molecules/ViewDocumentDetailsComponent";

export default function DocumentComponent() {
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
    const [documentName, setDocumentName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [requireddocuments, setRequiredDocuments] = useState<DocumentGetResponseDto[]>([]);
    const [viewDetails, setViewDetails] = useState(false);
    const [viewDetailsData, setViewDetailsData] = useState<DocumentGetResponseDto | null>();
    const [visaTypeOptions, setVisaTypeOptions] = useState<any>(null);
    const [visaSubTypeOptions, setVisaSubTypeOptions] = useState<any>(null);
    const [isAddDocument, setIsAddDocument] = useState(false);
    const [isAddLink, setIsAddLink] = useState(false);
    const [selectedVisaType, setSelectedVisaType] = useState<any>(null);
    const [selectedVisaSubType, setSelectedVisaSubType] = useState<any>(null);
    const [isEdit, setIsEdit] = useState(false);

    const handleValueSelect = (selectedOption: any) => {
        setSelectedVisaType(selectedOption);
    }
    const handleVisaSubTypeSelect = (selectedOption: any) => {
        setSelectedVisaSubType(selectedOption);
    }

    async function getDocumentList() {
        const response = await getDocuments();
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            if (!response.data) {
                setLoading(false)
                return
            };
            setRequiredDocuments(
                response.data.map((document: any) => {
                    return {
                        documentId: document.documentId,
                        documentName: document.documentName,
                        isActive: document.isActive,
                        links: document.links,
                    };
                }
                )
            );
        }
        setLoading(false);

    }



    async function addDocumentLinkData(e: any) {
        e.preventDefault();
        const response = await addDocumentLink(parseInt(viewDetailsData?.documentId as string), selectedVisaType.value, selectedVisaSubType === null ? null : selectedVisaSubType.value);
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            if (!response.data) {
                setLoading(false);
                return;
            };
            toast.success('Link Added Successfully');
            setShowModal(false);
            setSelectedVisaType(null);
            setSelectedVisaSubType(null);
            setIsAddLink(false);
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    }


    async function disableDocumentStatus(documentId: string, status: string) {
        const response = await disableDocument(parseInt(documentId), status === 't' ? 'f' : 't');
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            if (!response.data) {
                setLoading(false);
                return;
            };
            toast.success('Document Status Updated Successfully');
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    }

    async function handleFormSubmit(e: any) {
        e.preventDefault();
        const response = await addDocument(!isEdit ? documentName : documentName, viewDetailsData?.documentId);
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            if (!response.data) {
                setLoading(false);
                return;
            };
            toast.success('Document Added Successfully');
            setShowModal(false);
            setDocumentName('');
            setIsAddDocument(false);
            setIsEdit(false);
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    }

    async function fetchVisaTypes() {
        const response = await getVisaTypes();
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            setVisaTypeOptions(response.data.map((visa: any) => {
                return {
                    value: visa.visaType,
                    label: capitalizeWords(visa.description),
                };
            }));
        }
    }

    async function fetchVisaSubTypeDescription() {
        const response = await getVisaSubTypes(selectedVisaType.value);
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            setVisaSubTypeOptions(response.data.map((visaSub: any) => {
                return {
                    value: visaSub.visaSubType,
                    label: capitalizeWords(visaSub.description),
                };
            }));
        }

    }

    useEffect(() => {
        getDocumentList();
        fetchVisaTypes();
    }, []);


    useEffect(() => {
        if (selectedVisaType) {
            fetchVisaSubTypeDescription()
        }
    }, [selectedVisaType]);


    return (

        <>
            {isAddDocument &&
                <Modal showModal={showModal} >

                    <form onSubmit={handleFormSubmit} className="flex  flex-col items-center justify-center px-3 py-10">
                        <p className=" font-sans text-xl text-slate-200 w-60 text-center">
                            {isEdit ? 'Edit Document' : 'Add Document'}
                        </p>

                        <p className="mt-6 font-sans text-base text-slate-200 w-full  text-start">
                            Name
                        </p>

                        <InputComponent
                            label={''}
                            maxLength={32}
                            minLength={3}
                            type={'text'}
                            placeholder={'Enter the name of the document'}
                            name={'description'}
                            value={documentName}
                            className="w-72 md:w-96 text-white"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setDocumentName(e.target.value);
                            }}
                            error={''}
                            required

                        />
                        <div className='flex gap-x-5 mt-5'>

                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setIsAddDocument(false);
                                    setDocumentName('');
                                    setIsEdit(false);
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
                    </form>

                </Modal>
            }
            <div className="my-10 flex items-center ">

                {isAddLink &&
                    <Modal showModal={showModal} >

                        <form onSubmit={addDocumentLinkData} className="flex  flex-col items-center justify-center px-3 py-10">
                            <p className=" font-sans text-xl text-slate-200 w-60 text-center">
                                Add Link
                            </p>

                            <p className="mt-6 font-sans text-base text-slate-200 w-full  text-start">
                                Name
                            </p>

                            <InputComponent
                                label={''}
                                maxLength={32}
                                minLength={3}
                                type={'text'}
                                placeholder={'Enter the name of the document'}
                                name={'description'}
                                value={capitalizeWords(viewDetailsData?.documentName as string)}
                                className="w-96 text-white"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setDocumentName(e.target.value);
                                }}
                                error={''}
                                required
                            // disabled

                            />
                            <div className="w-full mt-5">
                                <label className="font-sans text-base text-slate-200">
                                    Visa Types
                                </label>
                                <Select
                                    options={visaTypeOptions}
                                    styles={visaTypeStyles}
                                    onChange={handleValueSelect}
                                    value={selectedVisaType}
                                    required
                                />
                            </div>
                            <div className="w-full mt-5">
                                <label className="font-sans text-base text-slate-200">
                                    Visa Sub Types
                                </label>
                                <Select
                                    options={visaSubTypeOptions ? visaSubTypeOptions : []}
                                    styles={visaTypeStyles}
                                    onChange={handleVisaSubTypeSelect}
                                    value={selectedVisaSubType}

                                />
                            </div>


                            <div className='flex gap-x-5 mt-5'>

                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setIsAddLink(false);
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
                        </form>

                    </Modal>
                }
                <div className="w-full">
                    <div className="mt-5 flex justify-center">
                        <p className="font-serif text-2xl font-bold text-logoColorBlue lg:text-5xl">
                            Documents Details
                        </p>
                    </div>
                    <div className="mt-10">
                        <div className="container mx-auto">
                            <div className='h-[0.5px] mt-7 mb-7 bg-slate-400'></div>

                            <div className='flex justify-between px-2 mb-7'>
                                <div>
                                    {viewDetails && <button
                                        onClick={() => {
                                            setViewDetails(false);
                                        }}
                                    >
                                        <div className="rounded-md bg-logoColorGreen  py-[10px] text-white hover:bg-black">
                                            <p className="text-xs md:text-sm font-semibold flex  w-32 md:w-48 justify-center items-center gap-x-2">
                                                Back
                                            </p>
                                        </div>
                                    </button>}
                                </div>
                                <div>
                                    <button
                                        onClick={() => {
                                            setShowModal(true);
                                            if (viewDetails) {
                                                setIsAddLink(true);
                                            } else {
                                                setIsAddDocument(true);
                                            }
                                        }}
                                    >
                                        <div className="rounded-md bg-logoColorGreen  py-[10px] text-white hover:bg-black">
                                            <p className="text-xs md:text-sm font-semibold flex w-36 md:w-48 justify-center items-center ">
                                                <span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
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
                                                {viewDetails ? "Add new Link" : "Add New Document"}
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {
                                viewDetails ? (
                                    <ViewDocumentDetailsComponent setViewDetails={setViewDetails} viewDetailsData={viewDetailsData} />
                                ) : (
                                    <>
                                        {
                                            loading ? (
                                                <Loader />
                                            ) : (
                                                requireddocuments.length <= 0 ? (
                                                    <p className="text-logoColorBlue font-serif text-xl font-bold text-center mt-10">
                                                        No Required Documents Found
                                                    </p>
                                                ) : (
                                                    <>

                                                        <div>
                                                            <div className="flex justify-between">
                                                            </div>
                                                            <div className="mt-5">
                                                                <table className="w-full">
                                                                    <thead>
                                                                        <tr className=" text-logoColorBlue font-serif text-sm md:text-xl font-bold text-center ">
                                                                            <th className="md:ps-20 px-5 pt-4 pb-9">S/N</th>
                                                                            <th className="px-5 pt-4 pb-9">Document Name</th>
                                                                            <th className="px-5 pt-4 pb-9">Status</th>
                                                                            <th className="px-5  w-1/3 pt-4 pb-9 ">Actions</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            requireddocuments.map((requiredDocument, index) => (
                                                                                <tr key={index}
                                                                                    className="bg-gradient-to-r from-logoColorGreen to-logoColorBlue text-white font-sans font-semibold tex-sm md:text-lg text-center border-b-8 border-white items-center"


                                                                                >
                                                                                    <td className=" px-5 md:ps-16 py-10 rounded-s-2xl" >{index + 1}</td>
                                                                                    <td className="px-5 py-10" >{capitalizeWords(requiredDocument.documentName)}</td>
                                                                                    <td className="px-5 py-10" >{requiredDocument.isActive === 't' ? 'Active' : 'Disabled'}</td>

                                                                                    <td className="py-7  mt-3 rounded-e-2xl">
                                                                                        {
                                                                                            requiredDocument.documentName.toLowerCase() === 'passport' ? (<></>) : (
                                                                                                <button
                                                                                                    type="button"
                                                                                                    className="rounded-xl m-0 bg-orange-600 w-28 py-2 text-sm text-white hover:bg-black"
                                                                                                    onClick={() => {
                                                                                                        disableDocumentStatus(requiredDocument.documentId, requiredDocument.isActive);
                                                                                                    }}
                                                                                                >
                                                                                                    {requiredDocument.isActive === 't' ? 'Deactivate' : 'Activate'}
                                                                                                </button>
                                                                                            )
                                                                                        }
                                                                                        <button
                                                                                            type="button"
                                                                                            className=" mt-2 rounded-xl mx-3 bg-orange-600 w-28 py-2 text-sm text-white hover:bg-black"
                                                                                            onClick={() => {
                                                                                                setViewDetails(true);
                                                                                                setViewDetailsData(requiredDocument);
                                                                                            }}
                                                                                        >
                                                                                            Details
                                                                                        </button>
                                                                                        {requiredDocument.documentName.toLowerCase() === 'passport' ? (<></>) : (
                                                                                            <button
                                                                                                type="button"
                                                                                                className=" mt-2 rounded-xl m-0 bg-orange-600 w-28 py-2 text-sm text-white hover:bg-black"
                                                                                                onClick={() => {
                                                                                                    setIsAddDocument(true);
                                                                                                    setShowModal(true);
                                                                                                    setIsEdit(true);
                                                                                                    setViewDetailsData(requiredDocument);
                                                                                                    setDocumentName(requiredDocument.documentName);
                                                                                                }}
                                                                                            >
                                                                                                Edit
                                                                                            </button>
                                                                                        )}
                                                                                    </td>
                                                                                </tr>
                                                                            ))
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>


                                                        </div >

                                                    </>
                                                )
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}