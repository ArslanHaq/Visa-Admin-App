'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Loader from '../atoms/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import classNames from 'classnames';

import WorkflowCard from '../molecules/WorkflowCard';
import { WorkflowDto } from '@/dto/Workflow.dto';
import Modal from '../molecules/Modal';

import AddWorkFlowModalComponent from '../atoms/AddWorkFlowModalComponent';


export default function WorkFlowListComponent() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [applications, setApplications] = useState<WorkflowDto[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const isInitialMount = useRef(true);
    const [showModal, setShowModal] = useState(false);

    async function getApplicationDataList() {
        const response = await fetch("/workflow.json");
        const data = await response.json() as any;

        // Paginate the data
        const pageSize = 5;
        const startIndex = (page - 1) * pageSize;
        const newApplications = data.slice(startIndex, startIndex + pageSize);

        // Handle empty data case
        if (newApplications.length === 0) {
            setHasMore(false);
        } else {
            setApplications((prevApplications) => [
                ...prevApplications,
                ...newApplications,
            ]);

            setPage(page + 1);
        }
    }
    useEffect(() => {
        if (isInitialMount.current) {
            getApplicationDataList();
            isInitialMount.current = false;
        }
    }, []);
    return (
        <>
            <Modal showModal={showModal}>
                <AddWorkFlowModalComponent setShowModal={setShowModal} />
            </Modal >
            <div className="mt-10 flex items-center ">
                <div className="w-full">
                    <div className="mt-5 flex justify-center">
                        <p className="font-serif text-2xl font-bold text-logoColorBlue lg:text-5xl">
                            WorkFlow List
                        </p>
                    </div>

                    <div className="mt-20">
                        <div className='flex justify-center'>
                            <div className={classNames("mb-10 flex justify-end")}>
                                <button
                                    onClick={() => {
                                        setShowModal(true);
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
                                            Add New Workflow
                                        </p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <InfiniteScroll
                            dataLength={applications.length}
                            next={page > 1 ? getApplicationDataList : () => { }}
                            hasMore={hasMore}
                            loader={<Loader />}
                            endMessage={
                                <div className="flex cursor-pointer justify-center">
                                    <div className="my-10 w-7/12 rounded-xl text-center opacity-90 drop-shadow-[0px_10px_25px_rgba(0,10,10,10)]">
                                        <p className="text-3xl font-bold text-logoColorBlue">
                                            {applications.length > 0 ? "No more workflows found" : "No workflows found"}
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


                                        }}
                                    >
                                        <WorkflowCard workflow={application} />
                                    </div>
                                ))
                            }
                        </InfiniteScroll>
                        {/* )} */}
                    </div>
                </div>
            </div>
        </>
    );
}
