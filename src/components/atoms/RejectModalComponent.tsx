interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setReject: React.Dispatch<React.SetStateAction<boolean>>;

}
export default function RejectModalComponent(
    { setShowModal, setReject }: Props
) {
    const sentRejectEmail = () => {
        console.log('Email sent to applicant');
    }
    return (
        <div className="flex  flex-col items-center justify-center py-5 px-10">
            <p className="mt-4 font-sans text-lg text-slate-200 w-72 text-center">
                Are you sure you want to reject this application?
            </p>
            <div className='flex gap-x-5 mt-5'>
                <button
                    onClick={() => {
                        setShowModal(false);
                        setReject(false);
                    }}
                    className="mt-4 rounded-xl bg-green-700 px-10  py-2 text-white hover:bg-black"
                >
                    Back
                </button>

                <button
                    onClick={() => {
                        setShowModal(false);
                        setReject(false);
                        sentRejectEmail();
                    }}
                    className="mt-4 rounded-xl bg-red-600 px-9 py-2 text-white hover:bg-black"
                >
                    Reject
                </button>
            </div>
        </div>
    )
}