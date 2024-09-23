interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setReject: React.Dispatch<React.SetStateAction<boolean>>;

}
export default function RefferedToUserModalComponent(
    { setShowModal, setReject }: Props
) {
    const sentRejectEmail = () => {
        console.log('Email sent to applicant');
    }
    return (
        <div className="flex  flex-col items-center justify-center py-2 w-96 px-5">
            <p className="mt-4 font-sans text-lg text-slate-200 w-full  text-start">
                Write down the requirments
            </p>
            <textarea
                className="mt-4 w-full h-36 p-2 rounded-xl bg-slate-200 text-black"
                placeholder="Write down the requirements"
            />
            <div className='flex gap-x-5 mt-5'>
                <button
                    onClick={() => {
                        setShowModal(false);
                        setReject(false);
                    }}
                    className="mt-4 rounded-xl bg-logoColorBlue px-10  py-2 text-white hover:bg-black"
                >
                    Back
                </button>

                <button
                    onClick={() => {
                        setShowModal(false);
                        setReject(false);
                        sentRejectEmail();
                    }}
                    className="mt-4 rounded-xl  bg-green-700 px-9 py-2 text-white hover:bg-black"
                >
                    Reffered To User
                </button>
            </div>
        </div>
    )
}