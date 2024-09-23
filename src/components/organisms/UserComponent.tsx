"use client"
import { UserList } from "@/constants/constants";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../atoms/Loader";
import UserTableComponent from "../molecules/UserTableComponent";
import Modal from "../molecules/Modal";
import AddUserModalComponent from "../atoms/AddUserModalComponent";
import EditUserModalComponent from "../atoms/EditUserModalComponent";
import { useUser } from "@/hooks/useUser";
import StakeHolderTableComponent from "../molecules/StakeHolderTableComponent";
import AddStakeHolderModalComponent from "../atoms/AddStakeHolderModalComponent";
import EditStakeHolderModalComponent from "../atoms/EditStackHolderModalComponent";
import { useSession } from 'next-auth/react';
import { useAccessTokenMonitor } from "@/hooks/useAccessTokenMonitor";

interface UserComponentProps {
    accessToken: any
    responseStatus: any;
}

export default function UserComponent({ accessToken, responseStatus }: UserComponentProps) {
    const { data: session, update } = useSession();


    const monitoredToken = useAccessTokenMonitor({ accessTokenCookie: accessToken, accessToken: session?.user.accessToken, update, session, responseStatus });

    const {
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        userPage,
        stackHolderPage,
        usersList,
        userHasMore,
        stackHolderHasMore,
        getUserDataList,
        stackHolderUsersList,
        getStackHolderDataList,
        addUser,
        editUser,
        setAddUser,
        setEditUser,
        setShowModal,
        showModal
    } = useUser()
    // Filter applications based on active tab and search query




    const [editUserData, setEditUserData] = useState<any>(null)


    return (
        <>
            {addUser && activeTab === UserList.USER &&
                <Modal showModal={showModal}>
                    <AddUserModalComponent setShowModal={setShowModal} setAddModal={setAddUser} stackHoldersList={stackHolderUsersList} />
                </Modal >}

            {addUser && activeTab === UserList.STACKHOLDER && <Modal showModal={showModal}>
                <AddStakeHolderModalComponent setShowModal={setShowModal} setAddModal={setAddUser} stackHoldersList={stackHolderUsersList} />
            </Modal >}

            {editUser && activeTab === UserList.USER && <Modal showModal={showModal}>
                <EditUserModalComponent setShowModal={setShowModal} setAddModal={setEditUser} editUserData={editUserData} stackHoldersList={stackHolderUsersList} />
            </Modal >}
            {editUser && activeTab === UserList.STACKHOLDER && <Modal showModal={showModal}>
                <EditStakeHolderModalComponent setShowModal={setShowModal} setAddModal={setEditUser} editUserData={editUserData} stackHoldersList={stackHolderUsersList} />
            </Modal >}


            <div className="mt-10 flex items-center ">
                <div className="w-full">
                    <div className="mt-5 flex justify-center">
                        <p className="font-serif text-xl font-bold text-logoColorBlue md:text-5xl">
                            {activeTab === UserList.USER ? ' User List' : 'Stakeholder List'}
                        </p>
                    </div>
                    <div className="mt-20">
                        <div className="container mx-auto">
                            <div className="flex justify-center mb-6">
                                <div className='w-full flex justify-between flex-wrap px-3'>
                                    <div className="flex flex-wrap mt-2 gap-x-4">
                                        {[UserList.USER, UserList.STACKHOLDER].map(tab => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`w-40 py-2 text-sm md:text-base mt-2 font-semibold rounded-lg transition-all duration-300 ${activeTab === tab
                                                    ? 'bg-logoColorGreen text-white shadow-lg'
                                                    : 'bg-white text-gray-700 border border-logoColorGreen hover:bg-logoColorBlue hover:text-white'
                                                    }`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex text-sm md:text-base items-center gap-x-2 mt-2">
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
                            <div className='flex justify-end mb-7'>
                                <div>
                                    <button
                                        onClick={() => {
                                            setShowModal(true)
                                            setAddUser(true)
                                        }}
                                    >
                                        <div className="rounded-md bg-logoColorGreen px-7 py-[10px] text-white hover:bg-black">
                                            <p className="text-sm font-semibold flex items-center gap-x-2">
                                                <span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
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
                                                {activeTab === UserList.USER ? "Add User" : "Add Stakeholder"}
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            {
                                activeTab === UserList.USER && (

                                    <InfiniteScroll
                                        dataLength={usersList.length}
                                        next={userPage > 1 ? getUserDataList : () => { }}
                                        hasMore={userHasMore}
                                        loader={<Loader />}
                                        endMessage={
                                            <div className="flex cursor-pointer justify-center">
                                                <div className="my-10 w-7/12 rounded-xl text-center opacity-90 drop-shadow-[0px_10px_25px_rgba(0,10,10,10)]">
                                                    <p className="text-3xl font-bold text-logoColorBlue">
                                                        {usersList.length > 0 ? "" : "No users found"}
                                                    </p>
                                                </div>
                                            </div>
                                        }
                                        style={{ overflow: 'unset' }}
                                    >
                                        <UserTableComponent filteredList={usersList} setEditModal={setEditUser} setShowModal={setShowModal} setEditUserData={setEditUserData} />
                                    </InfiniteScroll>
                                )}

                            {activeTab === UserList.STACKHOLDER && (

                                <InfiniteScroll
                                    dataLength={stackHolderUsersList.length}
                                    next={stackHolderPage > 1 ? getStackHolderDataList : () => { }}
                                    hasMore={stackHolderHasMore}
                                    loader={<Loader />}
                                    endMessage={
                                        <div className="flex cursor-pointer justify-center">
                                            <div className="my-10 w-7/12 rounded-xl text-center opacity-90 drop-shadow-[0px_10px_25px_rgba(0,10,10,10)]">
                                                <p className="text-3xl font-bold text-logoColorBlue">
                                                    {stackHolderUsersList.length > 0 ? "" : "No users found"}
                                                </p>
                                            </div>
                                        </div>
                                    }
                                    style={{ overflow: 'unset' }}
                                >
                                    <StakeHolderTableComponent filteredList={stackHolderUsersList} setEditModal={setEditUser} setShowModal={setShowModal} setEditUserData={setEditUserData} />
                                </InfiniteScroll>
                            )}

                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}