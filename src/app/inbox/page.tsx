import DecisionMakerInboxComponent from "@/components/organisms/DecisionMakerInboxComponent";
import InboxComponent from "@/components/organisms/InboxComponent";
import VerifierInboxComponent from "@/components/organisms/VerifierInboxComponent";
import { authOptions } from "@/utils/AuthOptions";
import { getServerSession } from "next-auth";



export default async function InboxPage() {
    const session: any = await getServerSession(authOptions);

    return (
        <div className="h-full relative">
            {
                session?.user.roles.includes('initiater') && <InboxComponent />
            }
            {
                session?.user.roles.includes('verification') && (
                    <VerifierInboxComponent />
                )
            }
            {
                session?.user.roles.includes('decision_maker') && (
                    <DecisionMakerInboxComponent />
                )
            }
        </div>
    );
}