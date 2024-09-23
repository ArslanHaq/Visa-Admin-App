'use client';
import { ApplicationStatus, InitiatorApplicationStatus, Pages } from '@/constants/constants';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../atoms/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DataList } from '@/dto/ApplicationData.dto';
import ApplicationCard from '../molecules/ApplicationCard';
import { getApplicationList, lockApplicationUser } from '@/server/application';
import InProgressApplicationComponent from '../molecules/InProgressApplicationComponent';
import AllApplicationComponent from '../molecules/AllApplicationComponent';
import AwaitingReviewApplicationComponent from '../molecules/AwaitingReviewApplicationComponent';
import DefferedApplicationComponent from '../molecules/DefferedApplicationComponent';

export default function InboxComponent() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(InitiatorApplicationStatus.ALL);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch application data list


  // Lock application function
  async function lockApplication(trackingId: string, status: string) {
    const response = await lockApplicationUser(trackingId);
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      const query = `?trackingId=${trackingId}&status=${status}`;
      router.push(`${Pages.APPLICATIONREVIEW}${query}`);
    }
  }




  return (
    <div className="mt-10 flex items-center ">
      <div className="w-full">
        <div className="mt-5 flex justify-center">
          <p className="font-serif text-2xl font-bold text-logoColorBlue lg:text-5xl">
            Applications Inbox
          </p>
        </div>

        <div className="mt-20">
          <div className="container mx-auto">
            <div className="flex justify-center mb-6">
              <div className='w-full flex flex-wrap justify-between'>
                <div className="flex ps-2 flex-wrap gap-x-4 mt-2">
                  {[InitiatorApplicationStatus.ALL, InitiatorApplicationStatus.INPROGRESS, InitiatorApplicationStatus.AWAITINGREVIEW, InitiatorApplicationStatus.DEFFERED,

                  ].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 mt-2 text-sm md:text-base font-semibold rounded-lg transition-all duration-300 ${activeTab === tab
                        ? 'bg-logoColorGreen text-white shadow-lg'
                        : 'bg-white text-gray-700 border border-logoColorGreen hover:bg-logoColorBlue hover:text-white'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex mt-2 ps-2 items-center">
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-3 py-2 text-xs md:text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-logoColorGreen"
                  />
                </div>
              </div>
            </div>

            <div className='h-[0.5px] mt-2 mb-7 bg-slate-400'></div>
            {
              activeTab === InitiatorApplicationStatus.ALL &&
              <AllApplicationComponent lockApplication={lockApplication} />
            }
            {
              activeTab === InitiatorApplicationStatus.INPROGRESS &&
              <InProgressApplicationComponent lockApplication={lockApplication} />
            }
            {
              activeTab === InitiatorApplicationStatus.AWAITINGREVIEW &&
              <AwaitingReviewApplicationComponent lockApplication={lockApplication} />
            }{
              activeTab === InitiatorApplicationStatus.DEFFERED &&
              <DefferedApplicationComponent lockApplication={lockApplication} />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
