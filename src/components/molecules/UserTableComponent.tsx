import { capitalizeFirstLetter, capitalizeWords } from "@/constants/functions";

interface Props {
    filteredList: any[];
    setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setEditUserData?: React.Dispatch<React.SetStateAction<any>>;
}
export default function UserTableComponent({ filteredList, setEditModal, setShowModal, setEditUserData }: Props) {
    return (
        <div className=''>
            <table className="w-full text-left ">
                <thead>
                    <tr className=" text-logoColorBlue font-serif text-sm md:text-xl font-bold text-center ">
                        <th className="px-5 pt-4 pb-9">S/N</th>
                        <th className="px-5 pt-4 pb-9">First Name</th>
                        <th className="px-5 pt-4 pb-9">Last Name</th>
                        <th className="px-5 pt-4 pb-9">Email</th>
                        <th className="px-5 pt-4 pb-9">Status</th>
                        <th className="px-5 pt-4 pb-9">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map((application, index) => (
                        <tr
                            key={index}
                            className="bg-gradient-to-r from-logoColorGreen to-logoColorBlue text-white font-sans font-semibold text-sm md:text-lg text-center border-b-8 border-white items-center"
                            style={{ borderRadius: '12px' }} // optional to apply border-radius to the entire row
                        >
                            <td className="px-5 py-10 rounded-s-2xl">{index + 1}</td>
                            <td className="px-5 py-10">{capitalizeFirstLetter(application.firstName)}</td>
                            <td className="px-5 py-10">{capitalizeFirstLetter(application.lastName)}</td>
                            <td className="px-5 py-10">{application.email}</td>
                            <td className="px-5 py-10">{capitalizeFirstLetter(application.status)}</td>
                            <td className="py-7 px-2 mt-3 rounded-e-2xl">
                                <button
                                    type="button"
                                    className="rounded-xl m-0 bg-orange-600 w-28 py-2 text-base text-white hover:bg-black"
                                    onClick={() => {
                                        setEditModal(true)
                                        setShowModal(true)
                                        if (setEditUserData) {
                                            setEditUserData(application)
                                        }
                                    }}
                                >
                                    Edit
                                </button>
                                {/* <button
                                    type="button"
                                    className="rounded-xl m-0 bg-red-600 px-3 py-2 text-base text-white hover:bg-black"
                                >
                                    Disable User
                                </button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}