'use client';
import { useState } from "react";
import ReviewBuisnessRulesComponent from "../molecules/ReviewBuisnessRules";
import AddBuisnessRuleComponent from "../molecules/AddBuisnessRuleComponent";
import { BuisnessRulesTabs } from "@/constants/constants";

interface BuisnessRulesComponentProps {
    accessToken: any;
    responseStatus: any;
}
export default function BuisnessRulesComponent({ accessToken, responseStatus }: BuisnessRulesComponentProps) {
    const [activeTab, setActiveTab] = useState(BuisnessRulesTabs.VIEWLIST);
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <div className="my-10 flex items-center ">
            <div className="w-full">
                <div className="mt-5 flex justify-center">
                    <p className="font-serif text-2xl font-bold text-logoColorBlue lg:text-5xl">
                        Buisness Rules
                    </p>
                </div>
                <div className="mt-10">
                    <div className="container mx-auto">
                        {activeTab === BuisnessRulesTabs.VIEWLIST && <><div className="flex justify-center ">
                            <div className='w-full flex justify-between'>
                                <div className="flex space-x-4">
                                    {[].map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`w-36 py-2 font-semibold rounded-lg transition-all duration-300 ${activeTab === tab
                                                ? 'bg-logoColorGreen text-white shadow-lg'
                                                : 'bg-white text-gray-700 border border-logoColorGreen hover:bg-logoColorBlue hover:text-white'
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center gap-x-2">
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
                            <div className='h-[0.5px] mt-7 mb-7 bg-slate-400'></div></>}
                        {activeTab === BuisnessRulesTabs.VIEWLIST && <div className='flex justify-end mb-7'>
                            <div>
                                <button
                                    onClick={() => {
                                        setActiveTab(BuisnessRulesTabs.ADDRULE)
                                    }}
                                >
                                    <div className="rounded-md bg-logoColorGreen  py-[10px] text-white hover:bg-black">
                                        <p className="text-sm font-semibold flex w-36 justify-center items-center gap-x-2">
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
                                            {
                                                BuisnessRulesTabs.ADDRULE
                                            }
                                        </p>
                                    </div>
                                </button>
                            </div>
                        </div>}

                        {
                            activeTab === BuisnessRulesTabs.ADDRULE &&
                            <AddBuisnessRuleComponent setActiveTab={setActiveTab} />

                        }
                        {
                            activeTab === BuisnessRulesTabs.VIEWLIST &&
                            <ReviewBuisnessRulesComponent />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}