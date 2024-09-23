import { capitalizeWords } from "@/constants/functions";
import { getBuisnessRule, getBuisnessRules } from "@/server/feeder";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { buisnessRuleDto } from "@/dto/libraries.dto";
import Loader from "../atoms/Loader";
import ViewBuisnessRuleComponent from "./ViewBuisnessRuleComponent";



interface Props {
}
export default function ReviewBuisnessRulesComponent({ }: Props) {


    const [loading, setLoading] = useState(true);
    const [buisnessRules, setbuisnessRules] = useState<buisnessRuleDto[]>([]);
    const [openedData, setOpenedData] = useState<string | null>(null);
    const [isOpened, setIsOpened] = useState(false);
    const [openedBuisnessRule, setOpenedBuisnessRule] = useState<buisnessRuleDto | null>(null);

    async function getBuisnessRulesData() {
        const response = await getBuisnessRules();
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            if (!response.data) {
                setLoading(false);
                return;
            }
            setbuisnessRules(response.data);
        }
        setLoading(false);
    }

    async function getBuisnessRuleData(businessRuleId: string) {
        const response = await getBuisnessRule(businessRuleId);
        console.log(response);
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });


        } else {
            if (!response.data) {
                setLoading(false);
                return;
            }
            setOpenedBuisnessRule(response.data);
        }
        setLoading(false);
    }


    useEffect(() => {
        getBuisnessRulesData();
    }, [])

    useEffect(() => {
        if (isOpened && openedData) {
            setLoading(true);
            getBuisnessRuleData(openedData);
        }
    }, [isOpened, openedData])
    return (
        <>
            {
                loading ? (
                    <Loader />
                ) : (
                    buisnessRules.length <= 0 ? (
                        <p className="text-logoColorBlue font-serif text-xl font-bold text-center mt-10">
                            No Buisness Rules Found
                        </p>
                    ) : (
                        <>
                            {isOpened && !loading ? (
                                <div>
                                    <ViewBuisnessRuleComponent
                                        buisnessRule={openedBuisnessRule}
                                        setIsOpened={setIsOpened}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <div className="flex justify-between">
                                    </div>
                                    <div className="mt-5">
                                        <table className="w-full">
                                            <thead>
                                                <tr className=" text-logoColorBlue font-serif text-sm md:text-xl font-bold text-center ">
                                                    <th className="px-5 pt-4 pb-9">S/N</th>
                                                    <th className="px-5 pt-4 pb-9">Name</th>
                                                    <th className="px-5 pt-4 pb-9">Status</th>
                                                    <th className="px-5 pt-4 pb-9">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    buisnessRules.map((buisnessRule, index) => (
                                                        <tr key={index}
                                                            className="bg-gradient-to-r from-logoColorGreen to-logoColorBlue text-white font-sans font-semibold text-sm md:text-lg text-center border-b-8 border-white items-center"


                                                        >
                                                            <td className="px-5 py-10 rounded-s-2xl" onClick={() => {
                                                                setOpenedData(String(buisnessRule.businessRuleId));
                                                                setIsOpened(true);
                                                            }}>{index + 1}</td>
                                                            <td className="px-5 py-10" onClick={() => {
                                                                setOpenedData(String(buisnessRule.businessRuleId));
                                                                setIsOpened(true);
                                                            }}>{capitalizeWords(buisnessRule.name)}</td>
                                                            <td className="px-5 py-10" onClick={() => {
                                                                setOpenedData(String(buisnessRule.businessRuleId));
                                                                setIsOpened(true);
                                                            }}>{capitalizeWords(buisnessRule.status)}</td>
                                                            <td className="py-7  mt-3 rounded-e-2xl">
                                                                <button
                                                                    type="button"
                                                                    className="rounded-xl md:mr-2 bg-orange-600 w-32 py-2 text-sm md:text-base text-white hover:bg-black"
                                                                    onClick={() => {
                                                                        toast.warn('This feature is coming soon');
                                                                    }}
                                                                >
                                                                    {buisnessRule.status === 'active' ? 'Deactivate' : 'Activate'}
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="rounded-xl m-0 mt-2 md:mt-0 bg-orange-600 w-32 py-2 text-sm md:text-base text-white hover:bg-black"
                                                                    onClick={() => {
                                                                        setOpenedData(String(buisnessRule.businessRuleId));
                                                                        setIsOpened(true);
                                                                    }}
                                                                >
                                                                    Details
                                                                </button>

                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>


                                </div >
                            )
                            }
                        </>
                    )
                )
            }
        </>
    )

}