import BuisnessRulesComponent from "@/components/organisms/BuisnessRulesComponent";
import { cookies } from 'next/headers'

export default function BusinessRulesPage() {

    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')
    const responseStatus = cookieStore.get('status')
    return (
        <div>
            <BuisnessRulesComponent accessToken={accessToken} responseStatus={responseStatus} />
        </div>
    );
}