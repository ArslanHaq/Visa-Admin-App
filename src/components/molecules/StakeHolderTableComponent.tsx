import { formatString } from "@/constants/constants";
import { capitalizeWords } from "@/constants/functions";

interface Props {
    filteredList: any[];
    setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setEditUserData?: React.Dispatch<React.SetStateAction<any>>;
}
export default function StakeHolderTableComponent({ filteredList, setEditModal, setShowModal, setEditUserData }: Props) {
    return (
        <div className=''>
            <table className="w-full text-left ">
                <thead>
                    <tr className=" text-logoColorBlue font-serif text-sm md:text-xl font-bold text-center ">
                        <th className="md:ps-20 px-5 pt-4 pb-9">S/N</th>
                        <th className="px-5 pt-4 pb-9">Stakeholder Name</th>
                        <th className="px-5 pt-4 pb-9">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map((application, index) => (
                        <tr
                            key={index}
                            className="bg-gradient-to-r from-logoColorGreen to-logoColorBlue text-white font-sans font-semibold text-sm md:text-lg text-center border-b-8 border-white items-center"
                        >
                            <td className="md:ps-20 px-5 py-10 rounded-s-2xl">{index + 1}</td>
                            <td className=" py-10">{formatString(application.description)}</td>
                            <td className="py-7 px-2  mt-3 rounded-e-2xl">
                                <button
                                    type="button"
                                    className="rounded-xl m-0 bg-orange-600 w-36 py-2 text-base text-white hover:bg-black"
                                    onClick={() => {
                                        setEditModal(true)
                                        setShowModal(true)
                                        if (setEditUserData) setEditUserData(application)
                                    }}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}