import { capitalizeWords } from "@/constants/functions";
import { DocumentGetResponseDto } from "@/dto/documentData.dto";
import { getVisaTypes, getVisaSubTypes } from "@/server/feeder";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ViewDocumentDetailsComponentProps {
    setViewDetails: React.Dispatch<React.SetStateAction<boolean>>;
    viewDetailsData: DocumentGetResponseDto | undefined | null;
}

export default function ViewDocumentDetailsComponent({ setViewDetails, viewDetailsData }: ViewDocumentDetailsComponentProps) {

    console.log('viewDetailsData', viewDetailsData);
    const [visaListOptions, setVisaListOptions] = useState<any>(null);
    const [visaTypeDescriptions, setVisaTypeDescriptions] = useState<Record<string, string>>({});
    const [visaSubTypeDescriptions, setVisaSubTypeDescriptions] = useState<Record<string, string>>({});
    const [loader, setLoader] = useState(true);

    async function fetchVisaTypes() {
        const response = await getVisaTypes();
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            const descriptions: Record<string, string> = {};
            response.data.forEach((visa: any) => {
                descriptions[visa.visaType] = capitalizeWords(visa.description);
            });
            setVisaTypeDescriptions(descriptions);
        }
        setLoader(false);
    }

    async function fetchVisaSubTypeDescription(visaType: string, visaSubType: string) {
        const response = await getVisaSubTypes(visaType);
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            const foundSubType = response.data.find((visaSub: any) => visaSub.visaSubType === visaSubType);
            return foundSubType ? foundSubType.description : null;
        }
        return null;
    }

    useEffect(() => {
        fetchVisaTypes();
    }, []);

    useEffect(() => {
        if (viewDetailsData?.links) {
            const fetchSubTypes = async () => {
                const descriptions: Record<string, string> = {};
                if (!viewDetailsData.links) return;
                for (const link of viewDetailsData.links) {
                    const description = await fetchVisaSubTypeDescription(link.visaType, link.visaSubType);
                    if (description) {
                        descriptions[`${link.visaType}-${link.visaSubType}`] = description;
                    }
                }
                setVisaSubTypeDescriptions(descriptions);
            };
            fetchSubTypes();
        }
    }, [viewDetailsData]);

    return (
        <div>
            {viewDetailsData?.links && viewDetailsData?.links.length <= 0 ? (
                <p className="text-logoColorBlue font-serif text-xl font-bold text-center mt-10">
                    No document links are found
                </p>
            ) : (
                <div>
                    <div className="mt-5">
                        <table className="w-full">
                            <thead>
                                <tr className="text-logoColorBlue font-serif text-sm md:text-xl font-bold text-center">
                                    <th className="px-3 md:ps-20 pt-4 pb-9">S/N</th>
                                    <th className="px-5 pt-4 pb-9">Visa Type</th>
                                    <th className="px-5 pt-4 pb-9">Visa Sub Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viewDetailsData?.links && viewDetailsData?.links.map((link, index) => (
                                    <tr key={index}
                                        className="bg-gradient-to-r from-logoColorGreen to-logoColorBlue text-white font-sans font-semibold text-sm md:text-lg text-center border-b-8 border-white items-center"
                                    >
                                        <td className="px-3 md:ps-16 py-10 rounded-s-2xl">{index + 1}</td>
                                        <td className="px-5 py-10">
                                            {visaTypeDescriptions[link.visaType] || "Loading..."}
                                        </td>
                                        <td className="px-5 py-10 rounded-e-2xl">
                                            {capitalizeWords(visaSubTypeDescriptions[`${link.visaType}-${link.visaSubType}`]) || "Loading..."}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
