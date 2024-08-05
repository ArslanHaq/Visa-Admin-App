
import BgTextureIcon from '../atoms/Svg/BgTextureIcon';
import Image from 'next/image';
import PlaneIcon from '../atoms/Svg/PlaneIcon';
import { OriginDto } from '../organisms/Signup.dto';

interface Props {
  origin: OriginDto;
}
export default function SignInRightComponent({ origin }: Props) {
  const flagSrc = origin.data?.flag ? String(origin.data?.flag) : '';
  const coatSrc = origin.data?.coat
    ? String(origin.data?.coat).replace('+html', '+xml')
    : '';
  return (
    <>
      <div className="absolute z-0">
        <BgTextureIcon />
      </div>
      <div className="">
        <div>
          {flagSrc ? (
            <Image
              src={coatSrc}
              alt="Picture of the author"
              width={350}
              height={350}
              quality={500}
              className="rounded-xl"
              style={{
                maxWidth: '250px',
                minWidth: '250px',
                maxHeight: '250px',
                minHeight: '250px',
              }}
            />
          ) : (
            <PlaneIcon width={400} height={400} />
          )}
        </div>
      </div>
      <div className="ml-[-30px] mt-28 flex items-center space-x-6">
        {coatSrc && (
          <Image
            src={flagSrc}
            alt="Picture of the author"
            width={110}
            height={110}
            quality={100}
            style={{
              maxWidth: '150px',
              minWidth: '150px',
              maxHeight: '100px',
              minHeight: '100px',
            }}
          />
        )}

        <p className="mt-4 font-serif text-lg lg:text-2xl font-extrabold text-white">
          {origin.data?.countryFullName}
        </p>
      </div>
    </>
  );
}
