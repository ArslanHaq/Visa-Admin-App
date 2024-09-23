"use client"
import { capitalizeWords } from "@/constants/functions";
import { getDocumentData, getUploadedDocuments } from "@/server/documents";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../atoms/Loader";
import { ViewDocumentDto } from "@/dto/documentData.dto";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface Props {
    trackingId: string;
}
export default function DecisonMakerViewDocumentsComponent({ trackingId }: Props) {
    const [loading, setLoading] = useState(true);
    const [uploadedDocument, setUploadedDocument] = useState<{
        applicantDocumentId: string;
        documentId: string;
        trackingId: string;
        documentName: string;
    }[]>([]);
    const [previewDocumentData, setPreviewDocumentData] = useState<ViewDocumentDto>();

    const [dimensions, setDimensions] = useState({ height: 300, width: 400 });
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [numPages, setNumPages] = useState<number | null>(null);
    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }
    function goToPrevPage() {
        setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
    }
    function goToNextPage() {
        setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages as number));
    }

    // Adjust height and width based on screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                // Set larger size for md screens and up
                setDimensions({ height: 300, width: 400 });
            } else {
                // Default size for small screens
                setDimensions({ height: 200, width: 300 });
            }
        };

        // Initial check
        handleResize();

        // Add event listener to handle window resize
        window.addEventListener("resize", handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    async function getDocuments() {

        const response = await getUploadedDocuments(trackingId);
        if (response.error && response.error.length > 0) {
            response.error.forEach((err: any) => {
                toast.error(`Error ${err.code}: ${err.description}`);
            });
        } else {
            if (!response.data) {
                setLoading(false);
                return;
            }
            setUploadedDocument(response.data.data);
        }
        setLoading(false);
    }


    useEffect(() => {
        if (trackingId)
            getDocuments();
    }, [trackingId]);



    async function viewDocumentData(applicantDocumentId: string) {
        const response = await getDocumentData(trackingId, applicantDocumentId);
        if (response.error && response.error.length > 0) {
            response.error.forEach((err: any) => {
                toast.error(`Error ${err.code}: ${err.description}`);
            });
        } else {
            if (!response.data) {
                setLoading(false);
                return;
            }
            setPreviewDocumentData(response.data.data as ViewDocumentDto);

        }
        setLoading(false);

    }
    return (
        <>
            {
                loading ? (< div className="flex justify-center items-center mt-20"> <Loader /></div >) : (
                    <div className="w-full pb-20">
                        <>
                            {previewDocumentData && (
                                <>
                                    <div className="flex w-full justify-center ">
                                        <div className='md:w-1/4 px-2  rounded-xl'>
                                            <div className="flex justify-center">
                                                <Document file={previewDocumentData ? previewDocumentData.documentData : null} onLoadSuccess={onDocumentLoadSuccess}>
                                                    <Page pageNumber={pageNumber} height={dimensions.height} width={dimensions.width} />
                                                </Document>
                                            </div>

                                            <div className="flex justify-center mt-4 gap-x-4">
                                                {
                                                    numPages && numPages > 1 && (

                                                        <button
                                                            type="button"
                                                            className="text-sm font-bold text-logoColorBlue "
                                                            onClick={goToPrevPage}
                                                            disabled={pageNumber <= 1}
                                                        >
                                                            {'<-'}
                                                        </button>
                                                    )
                                                }
                                                <p className="text-sm font-bold text-logoColorBlue ">
                                                    Page {pageNumber} of {numPages}
                                                </p>
                                                {
                                                    numPages && numPages > 1 && (
                                                        <button
                                                            type="button"
                                                            className="text-sm font-bold text-logoColorBlue"
                                                            onClick={goToNextPage}
                                                            disabled={pageNumber >= (numPages as number)}
                                                        >
                                                            {'->'}
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className=" w-full flex justify-center pb-20 mt-10 gap-x-4 md:gap-x-8">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPageNumber(1);
                                                setPreviewDocumentData(undefined);

                                            }}
                                            className="w-40 md:w-52 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-3 text-sm text-white "
                                        >
                                            Back
                                        </button>

                                    </div>
                                </>
                            )}
                        </>
                        <div className=" flex justify-center gap-x-44">
                            <div className="mr-2 mt-8 w-full text-center ">
                                <p className="text-logoColorBlue underline underline-offset-8 font-serif md:text-xl font-bold text-center">
                                    Uploaded Documents
                                </p>
                                {
                                    uploadedDocument.length === 0 ? (
                                        <p className="text-logoColorBlue font-serif text-xl font-bold text-center mt-10">
                                            No document is uploaded yet
                                        </p>
                                    ) : (
                                        <div className="flex w-full items-center justify-center gap-x-44  lg:flex-row flex-col ">

                                            <table className="md:w-2/3 mt-8 ms-5 ">
                                                <thead>
                                                    <tr className=" text-logoColorBlue font-serif text-xs md:text-sm font-bold text-center ">
                                                        <th className="px-5 py-2">S/N</th>
                                                        <th className="">Document Name</th>
                                                        <th className="">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        uploadedDocument?.map((documents, index) => (
                                                            <tr key={index}
                                                                className="bg-gradient-to-r from-logoColorGreen to-logoColorBlue text-white font-sans font-semibold text-sm md:text-base text-center border-2 rounded-2xl border-white items-center"

                                                            >
                                                                <td className="py-4  border-logoColorBlue rounded-s-xl">{index + 1}</td>
                                                                <td className=" py-2">{capitalizeWords(documents.documentName)}</td>
                                                                <td className="py-2   rounded-e-xl ">

                                                                    <button
                                                                        type="button"
                                                                        className={classNames("rounded-md mt-1 mx-3 bg-red-600 px-3 md:px-5 py-1 md:py-2 text-xs text-white hover:bg-black")}
                                                                        onClick={() => {
                                                                            viewDocumentData(documents.applicantDocumentId)
                                                                        }}
                                                                    >
                                                                        View Document
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
                )
            }
        </>
    )
}