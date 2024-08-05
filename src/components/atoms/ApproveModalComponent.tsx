interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setApprove: React.Dispatch<React.SetStateAction<boolean>>;

}
export default function ApproveModalComponent(
    { setShowModal, setApprove }: Props
) {
    const sentApproveEmail = () => {
        console.log('Email sent to applicant');
    }
    return (
        <div className="flex  flex-col items-center justify-center py-5 px-10">
            <p className="mt-4 font-sans text-lg text-slate-200 w-72 text-center">
                Are you sure you want to approve this application?
            </p>
            <div className='flex gap-x-5 mt-5'>
                <button
                    onClick={() => {
                        setShowModal(false);
                        setApprove(false);
                    }}
                    className="mt-4 rounded-xl bg-red-900 px-10 py-2 text-white hover:bg-black"
                >
                    Back
                </button>

                <button
                    onClick={() => {
                        setShowModal(false);
                        setApprove(true);
                        sentApproveEmail();
                    }}
                    className="mt-4 rounded-xl bg-logoColorGreen px-6 py-2 text-white hover:bg-black"
                >
                    Approve
                </button>
            </div>
        </div>
    )
}