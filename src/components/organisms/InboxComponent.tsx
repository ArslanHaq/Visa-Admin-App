'use client';
import { Pages } from '@/constants/constants';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
// import { getApplicationList } from '@/server/Application';
import { toast } from 'react-toastify';
import Loader from '../atoms/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import classNames from 'classnames';
import { DataList } from '@/dto/ApplicationData.dto';
import ApplicationCard from '../molecules/ApplicationCard';

export default function InboxComponent() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [applications, setApplications] = useState<DataList[]>([
    {
      trackingId: "123456",
      lastSection: "personal",
      nationality: "Nigerian",
      status: "pending",
      userId: "123456",
      visaCurrency: "USD",
      visaType: "Business",
      visaFee: '100',
      visaSubType: "Tourist",
    }
  ]);
  const [hasMore, setHasMore] = useState(true);
  // const isInitialMount = useRef(true);

  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     getApplicationDataList();
  //     isInitialMount.current = false;
  //   }
  // }, []);
  // async function getApplicationDataList() {
  //   let response = await getApplicationList(page, 5);
  //   if (response.error && response.error.length > 0) {
  //     response.error.forEach((err) => {
  //       toast.error(`Error ${err.code}: ${err.description}`);
  //     });
  //   } else {
  //     const newApplications = response.data?.dataList as DataList[];
  //     if (newApplications.length === 0) {
  //       setHasMore(false);
  //     } else {
  //       setApplications((prevApplications) => [
  //         ...prevApplications,
  //         ...newApplications,
  //       ]);

  //       setPage(page + 1);
  //     }
  //   }
  // }



  return (
    <div className="mt-10 flex items-center ">
      <div className="w-full">
        <div className="mt-5 flex justify-center">
          <p className="font-serif text-2xl font-bold text-logoColorBlue lg:text-5xl">
            Applications Inbox
          </p>
        </div>
        {/* <div className="mt-3 flex justify-center">
          <p className="text-xs text-logoColorGreen lg:text-base">
            Sign up to enjoy all the benefits of visa
          </p>
        </div> */}

        <div className="mt-20">
          {/* <div className='flex justify-center'>
            <div className={classNames("mb-10 flex justify-end")}>
              <button
                onClick={() => {
                  const query = `?trackingId=`;
                  // router.push(`${Pages.PLANNING}${query}`);
                }}
              >
                <div className="rounded-md bg-logoColorGreen px-5 py-3 text-white">
                  <p className="text-sm font-semibold flex items-center gap-x-2">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                      >
                        <g>
                          <g
                            fill="none"
                            stroke="#ffff"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            data-name="add"
                          >
                            <path strokeLinecap="round" d="M12 19L12 5"></path>
                            <path d="M5 12L19 12"></path>
                          </g>
                        </g>
                      </svg>
                    </span>
                    Start New Application
                  </p>
                </div>
              </button>
            </div>
          </div> */}

          <InfiniteScroll
            dataLength={applications.length}
            // next={page > 1 ? getApplicationDataList : () => { }}
            next={() => { }}
            hasMore={hasMore}
            loader={<Loader />}
            endMessage={
              <div className="flex cursor-pointer justify-center">
                <div className="my-10 w-7/12 rounded-xl text-center opacity-90 drop-shadow-[0px_10px_25px_rgba(0,10,10,10)]">
                  <p className="text-3xl font-bold text-logoColorBlue">
                    {applications.length > 0 ? "No more applications found" : "No applications found"}
                  </p>
                </div>
              </div>
            }
            style={{ overflow: 'unset' }}
          >
            {
              applications.map((application, index) => (
                <div
                  className="flex justify-center"
                  key={index}
                  onClick={() => {
                    const query = `?trackingId=${application.trackingId}&lastSection=${application.lastSection}`;
                    router.push(`${Pages.APPLICATIONREVIEW}${query}`);
                  }}
                >
                  <ApplicationCard application={application} />
                </div>
              ))
            }
          </InfiniteScroll>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}
