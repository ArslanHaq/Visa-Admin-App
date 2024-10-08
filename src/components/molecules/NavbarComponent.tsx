'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Colors, NavbarTitles, Pages } from '@/constants/constants';
// import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// import { getCountryOrigin } from '@/server/Signup';
import classNames from 'classnames';
import NavbarItem from '../atoms/NavbarItemComponent';
import { OriginDto } from '../organisms/Signup.dto';
import { getCountryOrigin } from '@/server/feeder';
import { toast } from 'react-toastify';
import { signOut, useSession } from 'next-auth/react';
import { capitalizeFirstLetter, capitalizeWords } from '@/constants/functions';
import CrossSvg from '../atoms/Svg/Cross';

export default function NavbarComponent() {
  const { data: session } = useSession();

  const [coatSrc, setCoatSrc] = useState('')
  const [countryName, setCountryName] = useState('')
  const router = useRouter();
  const pathname = usePathname();
  const [pages, setPages] = useState<NavbarTitles>(NavbarTitles.INBOX);
  function changePage(value: NavbarTitles) {
    setPages(value);
  }
  useEffect(() => {
    if (pathname.includes('refered')) {
      setPages(NavbarTitles.REFERED);
    }
    else if (pathname.includes('signin')) {
      setPages(NavbarTitles.SIGNIN);
    }
    else if (pathname.includes('workflow')) {
      setPages(NavbarTitles.WORKFLOW);
    }
    else if (pathname.includes('users')) {
      setPages(NavbarTitles.USERS);
    }
    else if (pathname.includes('libraries')) {
      setPages(NavbarTitles.LIBRARIES);
    }
    else if (pathname.includes('buisnessRules')) {
      setPages(NavbarTitles.BUISNESSRULES);
    }
    else if (pathname.includes('documents')) {
      setPages(NavbarTitles.DOCUMENTS);
    }
    else {
      setPages(NavbarTitles.INBOX);
    }
  }, [pathname]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hiddenPaths = [
    Pages.SIGNIN,
  ];
  const shouldHideNavbar = hiddenPaths.some((path) => pathname.includes(path));

  const handleSignOut = async () => {

    setIsMobileMenuOpen(false)
    await signOut({ redirect: false }); // Prevent default redirect
    router.push(Pages.SIGNIN); // Redirect to the desired URL
  };

  const getCountryData = async () => {
    const response: any = await getCountryOrigin();
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {

      setCoatSrc(
        response.data?.coat
          ? String(response.data?.coat).replace('+html', '+xml')
          : ''
      )
      setCountryName(response.data?.countryFullName as string)
    }
  }


  useEffect(() => {
    getCountryData();
  }, [session]);

  const isInitiator = session?.user?.roles.includes("initiater") || session?.user?.roles.includes("verification") || session?.user?.roles.includes("decision_maker");
  const isAdmin = session?.user?.roles.includes("admin");
  return (
    <>

      <>
        {shouldHideNavbar ? (
          <></>
        ) : (
          <>
            <div className="flex items-center justify-between bg-transparent px-2 md:px-20 py-2 ">
              <div className={classNames("flex items-center justify-start ",
                // {
                //   'lg:-ml-36': !session?.user
                // },
                // {
                //   'lg:-ml-16': session?.user
                // }
              )}>
                <Image
                  src={coatSrc ? coatSrc : '/next.svg'}
                  alt='/next.svg'
                  width={90}
                  height={90}
                  quality={100}
                  style={{
                    maxWidth: '80px',
                    minWidth: '90px',
                    maxHeight: '90px',
                    minHeight: '90px',
                  }}
                />
                <div className='text-center'>
                  <p className="mx-2 font-serif text-xl font-bold text-logoColorBlue">
                    Online Visa System
                  </p>
                  <p className="mx-2 font-sans text-sm font-bold text-logoColorGreen italic">
                    {countryName}
                  </p>

                </div>
              </div>
              <div className="hidden items-center gap-x-10 lg:flex -ml-40">
                {
                  isInitiator && (
                    <NavbarItem
                      href={session?.user ? Pages.INBOX : Pages.SIGNIN}
                      label={NavbarTitles.INBOX}
                      active={pages === NavbarTitles.INBOX}
                      onClick={() => {
                        if (session?.user)
                          changePage(NavbarTitles.INBOX)
                      }
                      }
                    // disabled={session?.user ? false : true}

                    />
                  )
                }
                {
                  isAdmin && (
                    <>
                      <NavbarItem
                        href={session?.user ? Pages.USERS : Pages.SIGNIN}
                        label={NavbarTitles.USERS}
                        active={pages === NavbarTitles.USERS}
                        onClick={() => {
                          if (session?.user)
                            changePage(NavbarTitles.USERS)
                        }}
                      // disabled={session?.user ? false : true}
                      />{' '}
                      <NavbarItem
                        href={session?.user ? Pages.LIBRARIES : Pages.SIGNIN}
                        label={NavbarTitles.LIBRARIES}
                        active={pages === NavbarTitles.LIBRARIES}
                        onClick={() => {
                          if (session?.user)
                            changePage(NavbarTitles.LIBRARIES)
                        }}
                      // disabled={session?.user ? false : true}
                      />{' '}
                      <NavbarItem
                        href={session?.user ? Pages.BUISNESSRULES : Pages.SIGNIN}
                        label={NavbarTitles.BUISNESSRULES}
                        active={pages === NavbarTitles.BUISNESSRULES}
                        onClick={() => {
                          if (session?.user)
                            changePage(NavbarTitles.BUISNESSRULES)
                        }}
                      // disabled={session?.user ? false : true}
                      />{' '}
                      <NavbarItem
                        href={session?.user ? Pages.DOCUMENTS : Pages.SIGNIN}
                        label={NavbarTitles.DOCUMENTS}
                        active={pages === NavbarTitles.DOCUMENTS}
                        onClick={() => {
                          if (session?.user)
                            changePage(NavbarTitles.DOCUMENTS)
                        }}
                      // disabled={session?.user ? false : true}
                      />{' '}
                    </>
                  )
                }

              </div>
              {session?.user ? (
                <>
                  <div
                    className="hidden cursor-pointer rounded-xl bg-logoColorGreen px-10 py-3 text-white hover:bg-logoColorGreen lg:block"
                    onClick={handleSignOut}
                  >
                    <button className="flex items-center text-sm">
                      <p>Logout</p>
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  href={Pages.SIGNIN}
                  className="hidden flex-col items-center justify-center lg:flex"
                  onClick={() => changePage(NavbarTitles.SIGNIN)}
                >
                </Link>
              )}

              <div className="flex items-center lg:hidden">
                <button
                  className="text-logoColorBlue focus:outline-none"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {isMobileMenuOpen && (
              <div className="absolute z-10 w-full bg-slate-100 py-10 text-base lg:hidden">
                <div className='font-bold absolute right-6 text-xl cursor-pointer' onClick={() => setIsMobileMenuOpen(false)}>
                  <CrossSvg color={Colors.PRIMARYBLUE} size={18} />
                </div>

                {
                  isInitiator && (
                    <div className="flex justify-center py-1 ">
                      <NavbarItem
                        href={session?.user ? Pages.INBOX : Pages.SIGNIN}
                        label={NavbarTitles.INBOX}
                        active={pages === NavbarTitles.INBOX}
                        onClick={() => {
                          if (session?.user)
                            changePage(NavbarTitles.INBOX)

                          setIsMobileMenuOpen(false)
                        }
                        }
                      // disabled={session?.user ? false : true}

                      />
                    </div>
                  )
                }
                {isAdmin &&
                  < >   <div className="flex justify-center py-1 ">
                    <NavbarItem
                      href={session?.user ? Pages.USERS : Pages.SIGNIN}
                      label={NavbarTitles.USERS}
                      active={pages === NavbarTitles.USERS}
                      onClick={() => {
                        if (session?.user)
                          changePage(NavbarTitles.USERS)

                        setIsMobileMenuOpen(false)
                      }}
                    // disabled={session?.user ? false : true}
                    />{' '}
                  </div>

                    <div className="flex justify-center py-2 ">
                      <NavbarItem
                        href={session?.user ? Pages.LIBRARIES : Pages.SIGNIN}
                        label={NavbarTitles.LIBRARIES}
                        active={pages === NavbarTitles.LIBRARIES}
                        onClick={() => {
                          if (session?.user)
                            changePage(NavbarTitles.LIBRARIES)


                          setIsMobileMenuOpen(false)
                        }}
                      // disabled={session?.user ? false : true}
                      />{' '}
                    </div>

                    <div className="flex justify-center py-2 ">
                      <NavbarItem
                        href={session?.user ? Pages.BUISNESSRULES : Pages.SIGNIN}
                        label={NavbarTitles.BUISNESSRULES}
                        active={pages === NavbarTitles.BUISNESSRULES}
                        onClick={() => {
                          if (session?.user)
                            changePage(NavbarTitles.BUISNESSRULES)


                          setIsMobileMenuOpen(false)
                        }}
                      // disabled={session?.user ? false : true}
                      />{' '}
                    </div>

                    <div className="flex justify-center py-2">
                      <NavbarItem
                        href={session?.user ? Pages.DOCUMENTS : Pages.SIGNIN}
                        label={NavbarTitles.DOCUMENTS}
                        active={pages === NavbarTitles.DOCUMENTS}
                        onClick={() => {
                          if (session?.user)
                            changePage(NavbarTitles.DOCUMENTS)


                          setIsMobileMenuOpen(false)
                        }}
                      // disabled={session?.user ? false : true}
                      />{' '}
                    </div>
                  </>}
                <div className="flex justify-center py-3">
                  {session ? (
                    <>
                      <button
                        className="flex cursor-pointer items-center rounded-xl bg-logoColorBlue py-3 text-xs text-white hover:bg-logoColorGreen"
                        onClick={handleSignOut}
                      >
                        <span className={`mx-7 cursor-pointer`}>Logout</span>
                      </button>
                    </>
                  ) : (
                    <Link
                      href={Pages.SIGNIN}
                      onClick={() => changePage(NavbarTitles.SIGNIN)}
                    >
                      <div className="hidden cursor-pointer rounded-xl bg-logoColorBlue py-3 text-white hover:bg-logoColorGreen">
                        <button className="flex items-center text-xs">
                          <span className={`mx-7 cursor-pointer`}>
                            {NavbarTitles.SIGNIN}
                          </span>
                        </button>
                      </div>
                    </Link>
                  )}
                </div>

              </div>
            )}
            <div className="hidden lg:flex justify-end pr-20 ">
              <div>
                <p className="text-center text-sm font-serif font-bold text-logoColorBlue">
                  <span className="text-sm text-logoColorGreen font-bold font-sans">Username :</span>  {session?.user && (session?.user.username as string)}
                </p>
                <p className="text-center text-sm font-serif font-bold text-logoColorBlue">
                  <span className="text-sm text-logoColorGreen font-bold font-sans">Role :</span>  {session?.user && (session?.user.roles[0] as string)}
                </p>
              </div>
            </div>
          </>
        )}
      </>

    </>
  );
}
