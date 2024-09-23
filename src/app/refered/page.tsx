import ReactFlowComponent from "@/components/molecules/ReactFlowComponent";
import { CountriesDataDto } from "@/components/organisms/Signup.dto";
import { getCountryData, getVisaTypes } from "@/server/feeder";


export default async function ReferedPage({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {


    const workFlowName = searchParams.workFlowName as string;
    const workFlowType = searchParams.workFlowType as string;
    const workFlowValue = searchParams.workFlowValue as string;
    const nationalities: CountriesDataDto = await getCountryData();
    const visaTypes = await getVisaTypes();

    return (
        <ReactFlowComponent workFlowData={
            {
                name: workFlowName,
                type: workFlowType,
                value: workFlowValue
            }
        }
            countries={nationalities.data}
            visaTypes={visaTypes.data}

        />
    )
}