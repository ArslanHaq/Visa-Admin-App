'use client';
import { DecisionMakerApplicationStatus, Pages } from '@/constants/constants';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { lockDecisionMakerApplicationUser } from '@/server/application';

import AllDecisionMakerApplicationComponent from '../molecules/AllDecisionMakerApplicationComponent';
import ApprovedApplicationComponent from '../molecules/ApprovedApplicationComponent';
import RejectedApplicationComponent from '../molecules/RejectedApplicationComponent';
import ReadyDecisionApplicationComponent from '../molecules/ReadyDecisionApplicationComponent';

export default function DecisionMakerInboxComponent() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(DecisionMakerApplicationStatus.ALL);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch application data list
  // Lock application function
  async function lockApplication(trackingId: string, status: string) {
    const response = await lockDecisionMakerApplicationUser(trackingId);
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      const query = `?trackingId=${trackingId}&status=${status}`;
      router.push(`${Pages.DECISIONMAKERAPPLICATIONREVIEW}${query}`);
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
                <div className="flex flex-wrap gap-x-4 ps-2">
                  {[DecisionMakerApplicationStatus.ALL, DecisionMakerApplicationStatus.APPROVED, DecisionMakerApplicationStatus.REJECTED, DecisionMakerApplicationStatus.READYFORDECISION].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 mt-2 text-sm  md:text-base font-semibold rounded-lg transition-all duration-300 ${activeTab === tab
                        ? 'bg-logoColorGreen text-white shadow-lg'
                        : 'bg-white text-gray-700 border border-logoColorGreen hover:bg-logoColorBlue hover:text-white'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex mt-2 ps-2 items-center text-sm md:text-base">
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-logoColorGreen"
                  />
                </div>
              </div>
            </div>

            <div className='h-[0.5px] mt-2 mb-7 bg-slate-400'></div>
            {
              activeTab === DecisionMakerApplicationStatus.ALL &&
              <AllDecisionMakerApplicationComponent lockApplication={lockApplication} />
            }
            {
              activeTab === DecisionMakerApplicationStatus.APPROVED &&
              <ApprovedApplicationComponent lockApplication={lockApplication} />
            }
            {
              activeTab === DecisionMakerApplicationStatus.REJECTED &&
              <RejectedApplicationComponent lockApplication={lockApplication} />
            }{
              activeTab === DecisionMakerApplicationStatus.READYFORDECISION &&
              <ReadyDecisionApplicationComponent lockApplication={lockApplication} />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
