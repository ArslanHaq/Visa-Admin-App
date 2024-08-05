import ViewApplicationCompleteComponent from "@/components/molecules/ViewApplicationCompleteComponent";
import { CountriesDataDto, OccupationDto } from "@/components/organisms/Signup.dto";
import { accomodationType, maritalStatus, sex, sponsorType } from "@/constants/constants";
import { visaTypeResponse } from "@/dto/ApplicationData.dto";
import { getCountryData, getOccupationsData, getVisaTypes } from "@/server/feeder";

export default async function ApplicationReviewPage(
    {
        params,
        searchParams,
    }: {
        params: { slug: string };
        searchParams: { [key: string]: string | string[] | undefined };
    }
) {
    const applicationTrackingID = searchParams.trackingId as string;
    const lastSection = searchParams.lastSection as string;
    const visaTypes: visaTypeResponse = await getVisaTypes();
    const nationalities: CountriesDataDto = await getCountryData();
    const occupations: OccupationDto = await getOccupationsData();
    return (
        <div>
            <ViewApplicationCompleteComponent
                accomodationType={accomodationType}
                countires={nationalities.data}
                maritalStatus={maritalStatus}
                occupation={occupations.data}
                sex={sex}
                sponsorType={sponsorType}
                status="in progress"
                trackingId={applicationTrackingID}
                visaSubType={[
                    {
                        value: 1,
                        label: 'buisness'
                    }
                ]}
                visaType={visaTypes.data}
            />
        </div>
    );
}