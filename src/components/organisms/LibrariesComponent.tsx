'use client'
import { useEffect, useState } from "react";
import { Libraries } from "@/constants/constants";
import { useLibraries } from "@/hooks/useLibraries";
import VisaLibraryComponent from "../molecules/VisaLibraryComponent";
import Modal from "../molecules/Modal";
import AddVisaTypeModalComponent from "../atoms/AddVisaTypeModalComponent";
import CountryLibraryComponent from "../molecules/CountryLibraryComponent";
import DurationLibraryComponent from "../molecules/DurationLibraryComponent";
import VisaSubTypeLibraryComponent from "../molecules/VisaSubTypeLibraryComponent";
import Loader from "../atoms/Loader";
import { getVisaSubTypes } from "@/server/feeder";
import { toast } from "react-toastify";
import { visaTypeDto } from "@/dto/ApplicationData.dto";
import OccupationLibraryComponent from "../molecules/OccupationLibraryComponent";
import { useSession } from "next-auth/react";
import { useAccessTokenMonitor } from "@/hooks/useAccessTokenMonitor";


interface LibrariesComponentProps {
    accessToken: any
    responseStatus: any;
}
export default function LibrariesComponent({ accessToken, responseStatus }: LibrariesComponentProps) {
    const { data: session, update } = useSession();


    const monitoredToken = useAccessTokenMonitor({ accessTokenCookie: accessToken, accessToken: session?.user.accessToken, update, session, responseStatus });

    const {
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        loader,
        visaTypes,
    } = useLibraries();

    const [showModal, setShowModal] = useState(false);
    const [showAddVisaModal, setShowAddVisaModal] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [showMoreData, setSetShowMoreData] = useState<visaTypeDto | null>(null);

    useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

    async function getVisaSubTypesData() {
        const response = await getVisaSubTypes(showMoreData?.visaType as string);
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            if (!response.data) return;
        }
    }

    useEffect(() => {
        if (showMore && showMoreData) {
            getVisaSubTypesData();
        }
    }, [showMore, showMoreData]);

    return (
        <>
            {showAddVisaModal && (
                <Modal showModal={showModal}>
                    <AddVisaTypeModalComponent setShowModal={setShowModal} setAddModal={setShowAddVisaModal} />
                </Modal>
            )}
            {loader ? (
                <div className="flex justify-center items-center h-full">
                    <Loader />
                </div>
            ) : (
                <div className="my-10 flex items-center">
                    <div className="w-full">
                        <div className="mt-5 flex justify-center">
                            <p className="font-serif text-2xl font-bold text-logoColorBlue lg:text-5xl">
                                {activeTab === Libraries.VISA ? 'Visa Types' : activeTab === Libraries.COUNTRY ? 'Excluded Countries' : activeTab === Libraries.OCCUPATION ? 'Occupations' : 'Visa Durations'}
                            </p>
                        </div>
                        <div className="mt-20">
                            <div className="container mx-auto">
                                <div className="flex justify-center mb-6">
                                    <div className="w-full flex flex-wrap justify-between">
                                        <div className="flex px-2 flex-wrap gap-x-4 text-sm md:text-base">
                                            {[Libraries.VISA, Libraries.COUNTRY, Libraries.OCCUPATION, Libraries.DURATION].map((tab) => (
                                                <button
                                                    key={tab}
                                                    onClick={() => setActiveTab(tab)}
                                                    className={`w-36 py-2 mt-2 font-semibold rounded-lg transition-all duration-300 ${activeTab === tab
                                                        ? 'bg-logoColorGreen text-white shadow-lg'
                                                        : 'bg-white text-gray-700 border border-logoColorGreen hover:bg-logoColorBlue hover:text-white'
                                                        }`}
                                                >
                                                    {tab}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex items-center px-2 mt-2 gap-x-2 md:text-base text-sm">
                                            <input
                                                type="text"
                                                placeholder="Search applications..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-logoColorGreen"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[0.5px] mt-2 mb-7 bg-slate-400"></div>
                                {activeTab === Libraries.VISA && showMore === false && (
                                    <VisaLibraryComponent
                                        visaTypes={visaTypes}
                                        setShowModal={setShowModal}
                                        setShowAddVisaModal={setShowAddVisaModal}
                                        setShowMore={setShowMore}
                                        showMore={showMore}
                                        setShowMoreData={setSetShowMoreData}
                                    />
                                )}
                                {activeTab === Libraries.VISA && showMore && (
                                    <VisaSubTypeLibraryComponent
                                        visaType={showMoreData?.visaType}
                                        setShowMore={setShowMore}
                                        showMore={showMore}
                                    />
                                )}
                                {activeTab === Libraries.COUNTRY && <CountryLibraryComponent />}
                                {activeTab === Libraries.OCCUPATION && <OccupationLibraryComponent />}

                                {activeTab === Libraries.DURATION && <DurationLibraryComponent />}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
