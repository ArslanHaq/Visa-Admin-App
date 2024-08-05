import InboxPage from "./inbox/page";
import SignInPage from "./signin/page";

export default function Page() {

    return (
        <div className="flex h-full w-full items-center justify-center">
            <SignInPage />
            {/* <InboxPage /> */}
        </div>
    );
}