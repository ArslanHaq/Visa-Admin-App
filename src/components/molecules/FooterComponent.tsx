'use client';
// import Image from 'next/image';
// import FacebookIcon from '../atoms/Svg/FacebookIcon';
// import TwitterIcon from '../atoms/Svg/TwitterIcon';
// import LinkedInIcon from '../atoms/Svg/LinkedinIcon';
// import SkypeIcon from '../atoms/Svg/SkypeIcon';
// import NavbarItem from '../atoms/NavbarItemComponent';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
// import { useSession } from 'next-auth/react';

export default function FooterComponent() {
  //   const logo = '/logo.png';
  // const { data: session } = useSession();
  const pathname = usePathname();
  //   const [pages, setPages] = useState<NavbarTitles>(NavbarTitles.INBOX);
  //   function changePage(value: NavbarTitles) {
  //     setPages(value);
  //   }
  //   useEffect(() => {
  //     if (pathname.includes('planning')) {
  //       setPages(NavbarTitles.PLANNING);
  //     } else if (pathname.includes('statistics')) {
  //       setPages(NavbarTitles.STATISTICS);
  //     } else if (pathname.includes('setting')) {
  //       setPages(NavbarTitles.SETTINGS);
  //     } else if (pathname.includes('contact')) {
  //       setPages(NavbarTitles.CONTACT);
  //     } else if (pathname.includes('signup')) {
  //       setPages(NavbarTitles.SIGNUPNOW);
  //     } else if (pathname.includes('signin')) {
  //       setPages(NavbarTitles.SIGNIN);
  //     } else {
  //       setPages(NavbarTitles.INBOX);
  //     }
  //   }, [pathname]);
  // const hiddenPaths = [
  //   Pages.VERIFICATION,
  //   Pages.SENTEMAIL,
  //   Pages.TWOFACTORAUTH,
  // ];
  // const shouldHideNavbar = hiddenPaths.some((path) => pathname.includes(path));

  const shouldHideNavbar = false;
  return (
    <>

      <>
        {shouldHideNavbar ? (
          <></>
        ) : (
          <div>
            {/* <div className="flex items-start justify-around bg-slate-100 py-10">
                <div>
                  <div className="flex items-center justify-start">
                    <Image
                      src={logo}
                      alt="Picture of the author"
                      width={50}
                      height={50}
                      quality={100}
                    />
                    <p className="mx-2 font-serif text-base font-bold text-logoColorBlue">
                      Visa App
                    </p>
                  </div>
                  <div className="mt-3">
                    <p className="max-w-60 text-xs text-logoColorGreen lg:max-w-80 lg:text-base">
                      Lorem ipsum dolor sit sed dmi amet, consectetur
                      adipiscing. Cdo tellus, sed condimentum volutpat.
                    </p>
                  </div>
                </div>
                <div>
                  <p className="mt-4 text-base font-bold lg:text-base">
                    Social
                  </p>
                  <div className="mt-3">
                    <p className="max-w-80 text-xs text-logoColorGreen lg:text-base">
                      themefisher@gmail.com
                    </p>
                  </div>
                  <div className="ml-[-8px] mt-4 flex gap-x-3 lg:gap-x-5">
                    <button className="rounded-3xl bg-white px-1 py-1 hover:bg-green-700">
                      <FacebookIcon />
                    </button>
                    <button className="rounded-3xl bg-white px-2 py-1 hover:bg-green-700">
                      <TwitterIcon />
                    </button>
                    <button className="rounded-3xl bg-white px-[10px] py-1 hover:bg-green-700">
                      <LinkedInIcon />
                    </button>
                    <button className="rounded-3xl bg-white px-2 py-1 hover:bg-green-700">
                      <SkypeIcon />
                    </button>
                  </div>
                </div>
                <div>
                  <p className="mt-4 text-base font-bold">Quick Links</p>
                  <div className="mt-3 gap-y-10">
                    <NavbarItem
                      href={Pages.APPLICATIONDATA}
                      label={NavbarTitles.INBOX}
                      active={pages === NavbarTitles.INBOX}
                      onClick={() => changePage(NavbarTitles.INBOX)}
                    />
                    <NavbarItem
                      href={Pages.PLANNING}
                      label={NavbarTitles.PLANNING}
                      active={pages === NavbarTitles.PLANNING}
                      onClick={() => changePage(NavbarTitles.PLANNING)}
                    />{' '}
                    <NavbarItem
                      href={Pages.STATISTICS}
                      label={NavbarTitles.STATISTICS}
                      active={pages === NavbarTitles.STATISTICS}
                      onClick={() => changePage(NavbarTitles.STATISTICS)}
                    />{' '}
                    <NavbarItem
                      href={Pages.SETTINGS}
                      label={NavbarTitles.SETTINGS}
                      active={pages === NavbarTitles.SETTINGS}
                      onClick={() => changePage(NavbarTitles.SETTINGS)}
                    />
                    <NavbarItem
                      href={Pages.CONTACT}
                      label={NavbarTitles.CONTACT}
                      active={pages === NavbarTitles.CONTACT}
                      onClick={() => changePage(NavbarTitles.CONTACT)}
                    />
                  </div>
                </div>
                <div>
                  <p className="mt-4 text-base font-bold">Location & Contact</p>
                  <p className="mt-3 max-w-60 text-xs text-logoColorGreen lg:max-w-80 lg:text-base">
                    2118 Thornridge Cir. Syracuse, Connecticut 35624 (704)
                    555-0127
                  </p>
                </div>
              </div> */}
            <div className="flex items-start justify-center border-t-2 bg-transparent py-3">
              <p className="text-sm lg:text-sm">
                <span className="font-bold text-logoColorBlue">Powered by Idanimo LLC</span>{' '}
                © 2024. All Rights Reserved.
              </p>
            </div>
          </div>
        )}
      </>

    </>
  );
}
