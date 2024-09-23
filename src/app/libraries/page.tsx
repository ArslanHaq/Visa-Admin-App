import LibrariesComponent from "@/components/organisms/LibrariesComponent";
import { cookies } from 'next/headers'

export default function LibrariesPage() {

    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')
    const responseStatus = cookieStore.get('status')
    return (
        <div className='h-full'>
            <LibrariesComponent accessToken={accessToken} responseStatus={responseStatus} />
        </div>
    )
}