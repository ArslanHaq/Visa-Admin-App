import { getCountryOrigin } from '@/server/feeder';
import SignInLeftContainerComponent from '../molecules/SignInLeftContainerComponent';
import SignInRightComponent from '../molecules/SignInRightComponent';
import { OriginDto } from './Signup.dto';


export default async function SignInComponent() {
  const origin: OriginDto = await getCountryOrigin()
  return (

    <div className="flex w-full items-center">
      <div className="hidden w-full items-center md:flex">
        <div className="w-full pt-14 md:w-1/2 md:pt-0">
          <SignInLeftContainerComponent origin={origin} />
        </div>
        <div className="relative flex h-svh w-1/2 flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-logoColorGreen to-logoColorBlue px-3">
          <SignInRightComponent origin={origin} />
        </div>
      </div>
      <div className="w-full flex-col md:hidden">
        <div className="relative flex py-20 w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-logoColorGreen to-logoColorBlue">
          <SignInRightComponent origin={origin} />
        </div>
        <div className="w-full py-20 relative">
          <SignInLeftContainerComponent origin={origin} />
        </div>
      </div>
    </div>
  );
}
