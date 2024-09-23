'use client';
import {
  ApplicationDataRequestDto,
  ContactDetailsDto,
  FinancialDetailsDto,
  personalDetailsDto,
  TravelHistory,
  TravelPlanDto,
  ViewApplicationDataDto,
} from '@/dto/ApplicationData.dto';
import { useEffect, useState } from 'react';
import Loader from '../atoms/Loader';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ApplicationStatus, DecisionMakerTabs, isFinalizedVerifierStatus, Pages } from '@/constants/constants';
import ReviewApplicationDataComponent from './ReviewApplicationDataComponent';
import ReviewPersonalDetailsComponent from './ReviewPersonalDetailsComponent';
import ReviewContactDetailsComponent from './ReviewContactDetailsComponent';
import ReviewFinancialDetailsComponent from './ReviewFinancialDetailsComponent';
import ReviewTravelDetailsComponent from './ReviewTravelDetailsComponent';
import Modal from './Modal';
import { handleFetch } from '@/constants/functions';
import { getApplicationData, proceedVerifierApplication } from '@/server/application';
import classNames from 'classnames';
import RejectModalComponent from '../atoms/RejectModalComponent';
import RefferedToUserModalComponent from '../atoms/RefferedToUserModalComponent';
import DecisonMakerViewDocumentsComponent from './DecisionMakerViewDocumentsComponent';
interface Props {
  trackingId: string;
  countires: any;
  sex: any;
  maritalStatus: any;
  occupation: any;
  sponsorType: any;
  accomodationType: any;
  status: string;

}
export default function ViewVerifierApplicationCompleteComponent({
  trackingId,
  countires,
  maritalStatus,
  occupation,
  sex,
  sponsorType,
  accomodationType,
  status,

}: Props) {
  const router = useRouter();
  // ------------------- State -------------------
  const [loader, setLoader] = useState<boolean>(true);
  const [comment, setComment] = useState('');
  const [activeTab, setActiveTab] = useState(DecisionMakerTabs.VIEWAPPLICATIONS);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value); // Store the comment as the user types
  };
  const [applicationFormValues, setApplicationFormValues] =
    useState<ApplicationDataRequestDto>({
      visaType: '',
      visaSubType: '',
      nationality: '',
      visaFee: '',
      visaCurrency: '',
      visaTypeDescription: '',
      visaSubTypeDescription: '',
    });

  const [personalFormValues, setPersonalFormValues] =
    useState<personalDetailsDto>({
      trackingId: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      birthCity: '',
      birthCountry: '',
      issuingCountry: '',
      maritalStatus: '',
      nationality: '',
      occupation: '',
      passportNumber: '',
      photographBase64: '',
      sex: '',
    });

  const [contactFormValues, setContactFormValues] = useState<ContactDetailsDto>(
    {
      email1: '',
      email2: '',
      city: '',
      country: '',
      postalCode: '',
      addressLineOne: '',
      addressLineTwo: '',
      landline1: '',
      landline2: '',
      mobile1: '',
      mobile2: '',
      phoneCode1: '',
      phoneCode2: '',
      trackingId,
      socialMedia: [] as any,
      countryName: '',
    },
  );
  const [financialFormValues, setFinancialFormValues] =
    useState<FinancialDetailsDto>({
      sponsorType: '',
      sponsorDetails: '',
      cashHoldingAmount: '',
      city: '',
      accomodationType: '',
      addressLineOne: '',
      addressLineTwo: '',
      hotelName: '',
      postalCode: '',
      trackingId,
    });

  const [travelFormValues, setTravelFormValues] = useState<TravelPlanDto>({
    arrivalPort: '',
    cities: '',
    travelDate: '',
    travelHistory: [] as TravelHistory[],
    trackingId,

  })
  async function handleVerifiedFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoader(true);

    const response = await proceedVerifierApplication(trackingId, 't', comment)
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      if (!response.data) {
        setLoader(false);
        return
      }
      toast.success('Application Proceeded Successfully');
      router.push(Pages.INBOX);
    }
    setLoader(false);
  }
  async function handleNotVerifedFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoader(true);

    const response = await proceedVerifierApplication(trackingId, 'f', comment)
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      if (!response.data) {
        setLoader(false);
        return
      }
      toast.success('Application Proceeded Successfully');
      router.push(Pages.INBOX);
    }
    setLoader(false);
  }
  async function getApplicationComplete(trackingId: string) {
    const {
      applicationData,
      personalInformation,
      contactDetail,
      financialInformation,
      travelPlan
    } = await handleFetch<ViewApplicationDataDto>(getApplicationData as any,
      trackingId,
      'Application') as ViewApplicationDataDto;


    setApplicationFormValues({
      visaType: applicationData?.visaType ?? '',
      visaFee: applicationData?.visaFee ?? '',
      visaSubType: applicationData?.visaSubType ?? '',
      visaCurrency: applicationData?.visaCurrency ?? '',
      nationality: applicationData?.nationality ?? '',
      visaTypeDescription: applicationData?.visaTypeDescription ?? '',
      visaSubTypeDescription: applicationData?.visaSubTypeDescription ?? '',
      duration: applicationData?.duration ?? '',
      durationId: applicationData?.durationId ?? '',
      entryType: applicationData?.entryType ?? '',
      nationalityName: applicationData?.nationalityName ?? '',
    });

    setPersonalFormValues({
      firstName: personalInformation?.firstName as string,
      lastName: personalInformation?.lastName as string,
      birthDate: personalInformation?.birthDate.split('T')[0] as string,
      birthCity: personalInformation?.birthCity as string,
      birthCountry: personalInformation?.birthCountry as string,
      issuingCountry: personalInformation?.issuingCountry as string,
      maritalStatus: personalInformation?.maritalStatus as string,
      nationality: personalInformation?.nationality as string,
      occupation: personalInformation?.occupation as string,
      passportNumber: personalInformation?.passportNumber as string,
      photographBase64: personalInformation?.photographBase64 as string,
      sex: personalInformation?.sex as string,
      trackingId,
      birthCountryName: personalInformation?.birthCountryName as string,
      issuingCountryName: personalInformation?.issuingCountryName as string,
      nationalityName: personalInformation?.nationalityName as string,
      occupationName: personalInformation?.occupationName as string,
    });
    setContactFormValues({
      addressLineOne: contactDetail?.addressLineOne as string,
      addressLineTwo: contactDetail?.addressLineTwo as string,
      city: contactDetail?.city as string,
      country: contactDetail?.country as string,
      email1: contactDetail?.email1 as string,
      email2: contactDetail?.email2 as string,
      landline1: contactDetail?.landline1 as string,
      landline2: contactDetail?.landline2 as string,
      mobile1: contactDetail?.mobile1 as string,
      mobile2: contactDetail?.mobile2 as string,
      phoneCode1: contactDetail?.phoneCode1 as string,
      phoneCode2: contactDetail?.phoneCode2 as string,
      postalCode: contactDetail?.postalCode as string,
      trackingId,
      socialMedia: contactDetail?.socialMedia as any,
      countryName: contactDetail?.countryName as string,
    });
    setFinancialFormValues({
      sponsorType: financialInformation?.sponsorType as string,
      sponsorDetails: financialInformation?.sponsorDetails as string,
      cashHoldingAmount: financialInformation?.cashHoldingAmount as string,
      city: financialInformation?.city as string,
      accomodationType: financialInformation?.accomodationType as string,
      addressLineOne: financialInformation?.addressLineOne as string,
      addressLineTwo: financialInformation?.addressLineTwo as string,
      hotelName: financialInformation?.hotelName as string,
      postalCode: financialInformation?.postalCode as string,
      trackingId,
    });

    setTravelFormValues({
      arrivalPort: travelPlan?.arrivalPort as string,
      cities: travelPlan?.cities as string,
      travelDate: travelPlan?.travelDate.split('T')[0] as string,
      travelHistory: travelPlan?.travelHistory as TravelHistory[],
      trackingId,
    })
    setLoader(false);
  }

  useEffect(() => {
    if (trackingId) {
      getApplicationComplete(trackingId);
    } else {
      setLoader(false);
    }

  }, [, trackingId]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const nationalitiesOptions = countires.map((item: any) => {
    return { value: item.alpha3, label: item.countryName }
  })
  const occupationOptions = occupation.map((item: any) => {
    return { value: item.occupationId, label: item.description }
  })

  const [proceed, setProceed] = useState<boolean>(false);
  const [refferedToUser, setRefferedToUser] = useState<boolean>(false);
  const [rejectApplication, setRejectApplication] = useState<boolean>(false);
  return (
    <>
      {
        proceed && (
          <Modal showModal={showModal}>

            <div className="flex h-36 w-96 flex-col items-center justify-center">
              <p className="mt-4 font-sans text-base text-slate-200 w-60 text-center">
                Are you sure you want to verified this application?
              </p>
              <div className='flex gap-x-5'>

                <button
                  onClick={() => {
                    setShowModal(false);
                    setProceed(false);
                  }}
                  className="mt-4 rounded-xl bg-red-900 px-10 py-2 text-white hover:bg-black"
                >
                  Back
                </button>

                <button
                  onClick={() => {
                    setShowModal(false);
                    handleVerifiedFormSubmit(event as any);
                    setProceed(false);
                  }}
                  className="mt-4 rounded-xl bg-logoColorGreen px-6 py-2 text-white hover:bg-black"
                >
                  Continue
                </button>
              </div>
            </div>
          </Modal >
        )
      }
      {refferedToUser &&
        <Modal showModal={showModal}>
          {/* <RefferedToUserModalComponent
            setReject={setRefferedToUser}
            setShowModal={setShowModal}
          /> */}
          <div className="flex h-36 w-96 flex-col items-center justify-center">
            <p className="mt-4 font-sans text-base text-slate-200 w-60 text-center">
              Are you sure you want not to verified the application?
            </p>
            <div className='flex gap-x-5'>

              <button
                onClick={() => {
                  setShowModal(false);
                  setRefferedToUser(false);
                }}
                className="mt-4 rounded-xl bg-red-900 px-10 py-2 text-white hover:bg-black"
              >
                Back
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  handleNotVerifedFormSubmit(event as any);
                  setRefferedToUser(false);
                }}
                className="mt-4 rounded-xl bg-logoColorGreen px-6 py-2 text-white hover:bg-black"
              >
                Continue
              </button>
            </div>
          </div>
        </Modal>
      }

      {rejectApplication &&
        <Modal showModal={showModal}>
          <RejectModalComponent
            setReject={setRejectApplication}
            setShowModal={setShowModal}
          />
        </Modal>
      }

      {
        loader ? (
          <div className="flex h-screen items-center justify-center">
            <Loader />
          </div>
        ) : (
          <form className="mt-24 relative" onSubmit={handleVerifiedFormSubmit}>
            <div className="absolute right-20 -top-20">
              <p className="text-center text-sm font-serif font-bold text-logoColorBlue">
                Tracking ID: {trackingId}
              </p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl font-bold text-logoColorBlue md:text-5xl">
                {activeTab === DecisionMakerTabs.VIEWAPPLICATIONS ? "Review Application" : "View Documents"}
              </p>
            </div>

            <div className="flex justify-center  mt-10">
              <div className='w-3/4 flex justify-between flex-wrap px-3'>
                <div className="flex flex-wrap mt-2 gap-x-4">
                  {[DecisionMakerTabs.VIEWAPPLICATIONS, DecisionMakerTabs.VIEWDOCUMENTS].map(tab => (
                    <button
                      key={tab}
                      type='button'
                      onClick={() => setActiveTab(tab)}
                      className={`w-40 py-2 text-sm md:text-base mt-2 font-semibold rounded-lg transition-all duration-300 ${activeTab === tab
                        ? 'bg-logoColorGreen text-white shadow-lg'
                        : 'bg-white text-gray-700 border border-logoColorGreen hover:bg-logoColorBlue hover:text-white'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex text-sm md:text-base items-center gap-x-2 mt-2">
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-logoColorGreen"
                  />

                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className='h-[0.5px] w-3/4  mb-7 mt-12 bg-logoColorBlue'></div>
            </div>
            {
              activeTab === DecisionMakerTabs.VIEWAPPLICATIONS && (
                <div className="w-full">

                  <div className="mt-10">
                    <div className="flex w-full items-center justify-center gap-x-44">
                      <div className="flex w-3/5 cursor-pointer" >
                        <p className="text-lg md:text-2xl font-bold text-logoColorBlue underline">
                          {' '}
                          Application Data
                        </p>
                      </div>
                    </div>
                    <ReviewApplicationDataComponent
                      applicationFormValues={applicationFormValues}

                    />
                  </div>

                  <div className="mt-10">
                    <div className="flex w-full items-center justify-center gap-x-44">
                      <div className="flex w-3/5 cursor-pointer" >
                        <p className="text-lg md:text-2xl font-bold text-logoColorBlue underline">
                          {' '}
                          Personal Details
                        </p>
                      </div>
                    </div>
                    <ReviewPersonalDetailsComponent
                      personalFormValues={personalFormValues}
                      maritalStatus={maritalStatus}
                      sex={sex}
                    />
                  </div>
                  <div className="mt-10">
                    <div className="flex w-full items-center justify-center gap-x-44">
                      <div className="flex w-3/5 cursor-pointer">
                        <p className="text-lg md:text-2xl font-bold text-logoColorBlue underline">
                          {' '}
                          Contact Details
                        </p>
                      </div>
                    </div>
                    <ReviewContactDetailsComponent
                      contactFormValues={contactFormValues}
                    />
                  </div>
                  <div className="mt-10">
                    <div className="flex w-full items-center justify-center gap-x-44">
                      <div className="flex w-3/5 cursor-pointer">
                        <p className="text-lg md:text-2xl font-bold text-logoColorBlue underline">
                          {' '}
                          Financial & Accomodation Details
                        </p>
                      </div>
                    </div>
                    <ReviewFinancialDetailsComponent
                      financialFormValues={financialFormValues}
                      sponsorType={sponsorType}
                      accomodationType={accomodationType}
                    />
                  </div>
                  <div className="mt-10">
                    <div className="flex w-full items-center justify-center gap-x-44">
                      <div className="flex w-3/5 cursor-pointer" >
                        <p className="text-lg md:text-2xl font-bold text-logoColorBlue underline">
                          {' '}
                          Travel & History Details
                        </p>
                      </div>
                    </div>
                    <ReviewTravelDetailsComponent
                      travelFormValues={travelFormValues}
                      countries={countires}
                    />
                  </div>

                  <div className="w-full my-10">
                    <div className="text-center">
                      <p className="font-serif text-lg md:text-2xl font-bold text-logoColorBlue ">
                        Add Comments
                      </p>
                    </div>
                    <div className='flex w-full justify-center'>
                      <textarea
                        className="mt-4 w-4/5 md:w-2/3 h-52 p-2 rounded-xl bg-slate-200 text-black"
                        placeholder="Write down the requirements"
                        value={comment}
                        onChange={handleCommentChange}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center gap-x-10 px-3 py-20">
                    <button
                      type="button"
                      onClick={() => {
                        if (isFinalizedVerifierStatus(status as ApplicationStatus)) {
                          router.push('/inbox'); // Assuming Pages.INBOX is the inbox path
                          return;
                        }

                        setShowModal(true);
                        setProceed(true);
                      }}
                      className={classNames(
                        "w-4/5 md:w-1/6 rounded-xl py-3 md:py-4 text-sm md:text-base text-white",
                        {
                          'bg-slate-600': isFinalizedVerifierStatus(status as ApplicationStatus),
                          'bg-gradient-to-r from-logoColorGreen to-logoColorBlue': !isFinalizedVerifierStatus(status as ApplicationStatus),
                        }
                      )}
                    >
                      {isFinalizedVerifierStatus(status as ApplicationStatus) ? "Close" : "Verified"}
                    </button>

                    {!isFinalizedVerifierStatus(status as ApplicationStatus) && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowModal(true);
                          setRefferedToUser(true);
                        }}
                        className="w-4/5 md:w-1/6 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-3 md:py-4 text-sm md:text-base text-white"
                      >
                        Not Verified
                      </button>
                    )}
                  </div>
                </div>
              )
            }
            {
              activeTab === DecisionMakerTabs.VIEWDOCUMENTS && (
                <DecisonMakerViewDocumentsComponent trackingId={trackingId} />
              )
            }

          </form>
        )
      }
    </>
  );
}
