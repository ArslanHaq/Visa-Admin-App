import InboxComponent from "@/components/organisms/InboxComponent";
import { authOptions } from "@/utils/AuthOptions";
import { getServerSession } from "next-auth";


export default async function InboxPage() {
    const session = await getServerSession(authOptions);

    return (
        <div className="h-full">
            <InboxComponent />
        </div>
    );
}