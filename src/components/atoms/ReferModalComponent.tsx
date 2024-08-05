interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setRefer: React.Dispatch<React.SetStateAction<boolean>>;
    checkListItems: any[];
    setCheckListItems: React.Dispatch<React.SetStateAction<any[]>>;
}
export default function ReferModalComponent(
    { setShowModal, setRefer, checkListItems, setCheckListItems }: Props
) {
    const sentEmail = (stackholders: string) => {
        console.log('Email sent to stackholders:', stackholders);
        reset();
    }
    function reset() {
        const newCheckListItems = [...checkListItems];
        newCheckListItems.forEach((item) => {
            item.isChecked = false;
        });
        setCheckListItems(newCheckListItems);
    }
    return (
        <div className="flex w-96 flex-col items-center justify-center">
            <p className="text-2xl font-bold text-white font-serif">
                Refer To Stackholders
            </p>
            <p className="text-xl font-semibold text-white text-start w-full mt-6 mb-1 font-sans">
                Stackholders
            </p>

            <div className='w-full'>
                {checkListItems.map((item, index) => (
                    <div key={index} className='relative'>
                        <div className='text-white font-sans font-normal text-sm bg-dark my-2 rounded-lg border py-2 flex gap-3 items-center w-full'>
                            <input
                                type='checkbox'
                                checked={item.isChecked}
                                className='rounded-2xl ml-2 px-1'
                                onChange={(e) => {
                                    const newCheckListItems = [...checkListItems];
                                    newCheckListItems[index].isChecked = e.target.checked;
                                    setCheckListItems(newCheckListItems);
                                }}
                            />
                            <span>{item.name}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex gap-x-5  w-full justify-between mt-5'>
                <button
                    onClick={() => {
                        setShowModal(false);
                        setRefer(false);
                    }}
                    className="mt-4 rounded-lg bg-red-900 px-10 py-2 text-white hover:bg-black w-1/2"
                >
                    Back
                </button>

                <button
                    onClick={() => {
                        setShowModal(false);
                        setRefer(false);
                        sentEmail(
                            checkListItems.filter((item) => item.isChecked).map((item) => item.name).join(', ')
                        );
                    }}
                    className="mt-4 rounded-lg bg-green-900 px-6 py-2 text-white hover:bg-black w-1/2"
                >
                    Sent Email
                </button>
            </div>
        </div>
    )
}