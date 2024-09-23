import UserComponent from "@/components/organisms/UserComponent";
import { cookies } from 'next/headers'

export default function UsersPage() {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')
    const responseStatus = cookieStore.get('status')
    return (
        <div>
            <UserComponent accessToken={accessToken} responseStatus={responseStatus} />
        </div>
    );
}