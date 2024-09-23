import ViewApplicationCompleteComponent from "@/components/molecules/ViewApplicationCompleteComponent";
import { CountriesDataDto, OccupationResponse } from "@/components/organisms/Signup.dto";
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
    const ApplicationStatus = searchParams.status as string;
    const nationalities: CountriesDataDto = await getCountryData();
    const occupations: OccupationResponse = await getOccupationsData();
    return (
        <div>
            <ViewApplicationCompleteComponent
                accomodationType={accomodationType}
                countires={nationalities.data}
                maritalStatus={maritalStatus}
                occupation={occupations.data}
                sex={sex}
                sponsorType={sponsorType}
                status={ApplicationStatus}
                trackingId={applicationTrackingID}
            />
        </div>
    );
}