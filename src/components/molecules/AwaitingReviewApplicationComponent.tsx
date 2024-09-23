import { DataList } from "@/dto/ApplicationData.dto";
import { getApplicationList } from "@/server/application";
import { use, useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import Loader from "../atoms/Loader";
import ApplicationCard from "./ApplicationCard";
import { ApplicationResponseStatus } from "@/constants/constants";

interface Props {
    lockApplication: (trackingId: string, status: string) => void;
}
export default function AwaitingReviewApplicationComponent({ lockApplication }: Props) {
    const [page, setPage] = useState(1);
    const [applications, setApplications] = useState<DataList[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    const isInitialMount = useRef(true);
    // Fetch application data list
    const getApplicationDataList = useCallback(async () => {
        let response = await getApplicationList(page, 5, ApplicationResponseStatus.INPROGRESS);
        if (response.error && response.error.length > 0) {
            response.error.forEach((err) => {
                toast.error(`Error ${err.code}: ${err.description}`);
            });
        } else {
            const newApplications = response.data?.dataList as DataList[];
            if (totalCount === 0) {
                setTotalCount(response.data?.totalCount as number);
            }

            setApplications((prevApplications) => [...prevApplications, ...newApplications]);

            if (applications.length + newApplications.length >= (response.data?.totalCount as number)) {
                console.log('No more applications');
                setHasMore(false);
            } else {
                setPage((prevPage) => prevPage + 1);
            }
        }
    }, [page, applications.length, totalCount]);


    useEffect(() => {
        if (isInitialMount.current) {
            setPage(1);
            setApplications([]);
            setHasMore(true);
            setTotalCount(0);
            getApplicationDataList();
            isInitialMount.current = false;
        }
    }, []);

    return (
        <InfiniteScroll
            dataLength={applications.length}
            next={page > 1 ? getApplicationDataList : () => { }}
            hasMore={hasMore}
            loader={<Loader />}
            endMessage={
                <div className="flex cursor-pointer justify-center">
                    <div className="my-10 w-7/12 rounded-xl text-center opacity-90 drop-shadow-[0px_10px_25px_rgba(0,10,10,10)]">
                        <p className="text-xl md:text-3xl font-bold text-logoColorBlue">
                            {applications.length > 0 ? "No more applications found" : "No applications found"}
                        </p>
                    </div>
                </div>
            }
            style={{ overflow: 'unset' }}
        >
            <div className='flex gap-x-6 w-full flex-wrap justify-center'>
                {applications.map((application, index) => (
                    <div
                        key={index}
                        onClick={() => lockApplication(application.trackingId, application.status)}
                    >
                        <ApplicationCard application={application} />
                    </div>
                ))}
            </div>
        </InfiniteScroll>
    )
}