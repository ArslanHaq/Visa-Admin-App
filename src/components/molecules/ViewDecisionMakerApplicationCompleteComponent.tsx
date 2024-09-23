'use client';
import {
  ApplicationDataRequestDto,
  ContactDetailsDto,
  DocumentDataType,
  FinancialDetailsDto,
  personalDetailsDto,
  StakeholderData,
  TravelHistory,
  TravelPlanDto,
  ViewApplicationDataDto,
} from '@/dto/ApplicationData.dto';
import { ChangeEvent, useEffect, useState } from 'react';
import Loader from '../atoms/Loader';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ApplicationStatus, Colors, DecisionMakerTabs, isFinalizedDecisionStatus, Pages } from '@/constants/constants';
import ReviewApplicationDataComponent from './ReviewApplicationDataComponent';
import ReviewPersonalDetailsComponent from './ReviewPersonalDetailsComponent';
import ReviewContactDetailsComponent from './ReviewContactDetailsComponent';
import ReviewFinancialDetailsComponent from './ReviewFinancialDetailsComponent';
import ReviewTravelDetailsComponent from './ReviewTravelDetailsComponent';
import Modal from './Modal';
import { capitalizeWords, handleFetch } from '@/constants/functions';
import { approveDecisionMakerApplication, getApplicationData, getBuisnessRuleData, getStackHoldersComments, referToUserApplication } from '@/server/application';
import classNames from 'classnames';
import RejectModalComponent from '../atoms/RejectModalComponent';
import InputComponent from '../atoms/InputComponent';
import Select from 'react-select';
import { getVisaDuration } from '@/server/feeder';
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
export default function ViewDecisionMakerApplicationCompleteComponent({
  trackingId,
  countires,
  maritalStatus,
  occupation,
  sex,
  sponsorType,
  accomodationType,
  status,

}: Props) {

  const visaTypeStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderWidth: 1,
      fontSize: '14px',
      paddingTop: '5px',
      paddingBottom: '5px',
      borderColor: state.isFocused
        ?
        Colors.PRIMARYGREEN

        : Colors.PRIMARYBLUE,
      boxShadow: 'none',
      '&:hover': {
        borderColor: state.isFocused

          ? Colors.PRIMARYGREEN

          : Colors.PRIMARYBLUE,
      },
    }),
    input: (provided: any) => ({
      ...provided,
      color: Colors.PRIMARYBLUE,
      backgroundColor: 'transparent',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: Colors.PRIMARYBLUE,
      backgroundColor: 'transparent',
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused ? Colors.PRIMARYGREEN : Colors.PRIMARYBLUE,
      '&:hover': {
        color: state.isFocused ? Colors.PRIMARYGREEN : Colors.PRIMARYBLUE,
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: Colors.PRIMARYSLATE,
    }),
  };
  const router = useRouter();
  // --------------------------------- State ----------------------------------
  const [loader, setLoader] = useState<boolean>(true);
  const [stakeHoldersOptions, setStakeHoldersOptions] = useState<StakeholderData[] | null>([]);
  const [documentsOptions, setDocumentsOptions] = useState<DocumentDataType[]>([]);
  const [otherDocumentsOptions, setOtherDocumentsOptions] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState(DecisionMakerTabs.VIEWAPPLICATIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [interview, setInterview] = useState<string>('f');

  const [decisionAdditionalFormValues, setDecisionAdditionalFormValues] = useState({
    decisionComments: '',
    decision: '',
    durationId: '',
    entryType: '',
    expiryDate: '',
  })
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDecisionAdditionalFormValues({
      ...decisionAdditionalFormValues,
      decisionComments: e.target.value
    })
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
      socialMedia: [],
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
  const [visaDurationOptions, setVisaDurationOptions] = useState<any>([]);
  const [visaEntryTypeOptions, setVisaEntryTypeOptions] = useState<any>([
    {
      value: 'single',
      label: 'Single Entry'
    }, {
      value: 'multiple',
      label: 'Multiple Entry'
    }
  ]);

  const [selectedVisaDuration, setSelectedVisaDuration] = useState<any>();
  const [selectedVisaEntryType, setSelectedVisaEntryType] = useState<any>(null);


  const handleVisaDurationSelect = (selectedOption: any) => {
    setSelectedVisaDuration(selectedOption);
    setDecisionAdditionalFormValues({
      ...decisionAdditionalFormValues,
      durationId: selectedOption.value
    })
  }
  const handleVisaEntryTypeSelect = (selectedOption: any) => {
    setSelectedVisaEntryType(selectedOption);
    setDecisionAdditionalFormValues({
      ...decisionAdditionalFormValues,
      entryType: selectedOption.value
    })

  }
  async function handleApproveFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoader(true);

    const response = await approveDecisionMakerApplication(
      trackingId,
      decisionAdditionalFormValues.decisionComments,
      't',
      decisionAdditionalFormValues.durationId,
      decisionAdditionalFormValues.entryType,
      decisionAdditionalFormValues.expiryDate,
    )
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      if (!response.data) {
        setLoader(false);
        return
      }
      toast.success('Application Approved Successfully');
      router.push(Pages.INBOX);
    }
    setLoader(false);
  }
  async function handleRejectFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoader(true);
    const response = await approveDecisionMakerApplication(
      trackingId,
      decisionAdditionalFormValues.decisionComments,
      'f',
      decisionAdditionalFormValues.durationId,
      decisionAdditionalFormValues.entryType,
      decisionAdditionalFormValues.expiryDate,
    )
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      if (!response.data) {
        setLoader(false);
        return
      }
      toast.success('Application rejected Successfully');
      router.push(Pages.INBOX);
    }
    setLoader(false);
  }
  async function handleRefferedFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoader(true);
    const response = await referToUserApplication(trackingId, decisionAdditionalFormValues.decisionComments)
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      if (!response.data) {
        setLoader(false);
        return
      }
      toast.success('Application reffered Successfully');
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
    setSelectedVisaDuration({
      value: applicationData?.durationId,
      label: applicationData?.duration + ' Days'
    });
    setSelectedVisaEntryType({
      value: applicationData?.entryType,
      label: applicationData?.entryType === 'single' ? 'Single Entry' : 'Multiple Entry'
    })

    setDecisionAdditionalFormValues({
      ...decisionAdditionalFormValues,
      durationId: applicationData?.durationId as string,
      entryType: applicationData?.entryType as string,
      expiryDate: applicationData?.expiryDate as string,
    })

    if (applicationData?.durationId) {
      setVisaDurationOptions((prevOptions: any[]) => {
        const exists = prevOptions.some(option => option.value === applicationData.durationId);
        if (!exists) {
          return [
            ...prevOptions,
            {
              value: applicationData.durationId,
              label: applicationData.duration + ' Days',
            }
          ];
        }
        // If it already exists, return the previous options unchanged
        return prevOptions;
      });
    }

    setLoader(false);
  }
  async function getStakeHoldersComments(trackingId: string) {
    const response = await getStackHoldersComments(trackingId);
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      if (!response.data) {
        setLoader(false);
        return
      }
      setStakeHoldersOptions(response.data.data);
    }
  }

  async function getBuisnessRule(trackingId: string) {

    const response = await getBuisnessRuleData(trackingId);
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      if (!response.data) {
        setLoader(false);
        return
      }
      setDocumentsOptions(response.data.data?.documents ?? []);
      setOtherDocumentsOptions(response.data.data?.otherRequirements ?? ['']);
      setInterview(response.data.data?.interviewRequired ?? 'f');
    }
    setLoader(false);

  }

  async function getvisaDurationData() {
    const response = await getVisaDuration();
    if (response.error && response.error.length > 0) {
      response.error.forEach((err: any) => {
        toast.error(`Error ${err.code}: ${err.description}`);
      });
    } else {
      setVisaDurationOptions(response.data.map((visa: any) => ({
        value: visa.durationId,
        label: visa.duration + ' Days'
      })));

    }
  }
  useEffect(() => {
    getvisaDurationData();
    if (trackingId) {
      getApplicationComplete(trackingId);
      getStakeHoldersComments(trackingId);
      getBuisnessRule(trackingId)
    } else {
      setLoader(false);
    }

  }, [, trackingId]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [proceed, setProceed] = useState<boolean>(false);
  const [rejectApplication, setRejectApplication] = useState<boolean>(false);
  const [refferedToUser, setRefferedToUser] = useState<boolean>(false);
  return (
    <>
      {
        proceed && (
          <Modal showModal={showModal}>

            <div className="flex h-36 w-96 flex-col items-center justify-center">
              <p className="mt-4 font-sans text-base text-slate-200 w-60 text-center">
                Are you sure you want to approve this application?
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

                    if (decisionAdditionalFormValues.durationId === '' && decisionAdditionalFormValues.entryType === '' && decisionAdditionalFormValues.expiryDate === '') {
                      toast.error('Please fill all the required fields');
                      setShowModal(false);
                      return;
                    }
                    handleApproveFormSubmit(event as any);
                    setProceed(false);
                    setShowModal(false);

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
      {rejectApplication &&
        <Modal showModal={showModal}>
          {/* <RefferedToUserModalComponent
            setReject={setRefferedToUser}
            setShowModal={setShowModal}
          /> */}
          <div className="flex h-36 w-96 flex-col items-center justify-center">
            <p className="mt-4 font-sans text-base text-slate-200 w-60 text-center">
              Are you sure you want to reject the application?
            </p>
            <div className='flex gap-x-5'>

              <button
                onClick={() => {
                  setShowModal(false);
                  setRejectApplication(false);
                }}
                className="mt-4 rounded-xl bg-red-900 px-10 py-2 text-white hover:bg-black"
              >
                Back
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  handleRejectFormSubmit(event as any);
                  setRejectApplication(false);
                }}
                className="mt-4 rounded-xl bg-logoColorGreen px-6 py-2 text-white hover:bg-black"
              >
                Continue
              </button>
            </div>
          </div>
        </Modal>
      }
      {refferedToUser &&
        <Modal showModal={showModal}>
          {/* <RefferedToUserModalComponent
            setReject={setRefferedToUser}
            setShowModal={setShowModal}
          /> */}
          <div className="flex h-36 w-96 flex-col items-center justify-center">
            <p className="mt-4 font-sans text-base text-slate-200 w-60 text-center">
              Are you sure you want to reffered this application back to user?
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
                  handleRefferedFormSubmit(event as any);
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

      {
        loader ? (
          <div className="flex h-screen items-center justify-center">
            <Loader />
          </div>
        ) : (
          <form className="mt-24 relative" onSubmit={handleApproveFormSubmit}>
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
            {activeTab === DecisionMakerTabs.VIEWAPPLICATIONS && < div className="w-full">




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
              <div className="flex w-full items-center justify-center  mt-16 mb-5">
                <div className="flex w-3/5 cursor-pointer">
                  <p className="text-lg md:text-2xl font-bold text-logoColorBlue underline">
                    {' '}
                    Additional Visa Details
                  </p>
                </div>
              </div>
              <div className="   flex justify-center gap-x-44">
                <div className="mr-2  w-full">
                  <div className="flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                    <div className="w-3/4 md:w-1/4">
                      <label className="text-sm font-semibold text-logoColorBlue">
                        Visa Duration
                      </label>
                      <Select
                        options={visaDurationOptions}
                        styles={visaTypeStyles}
                        onChange={handleVisaDurationSelect}
                        value={selectedVisaDuration}
                        required
                      />
                    </div>
                    <div className="w-3/4 md:w-1/4">
                      <label className="text-sm font-semibold text-logoColorBlue">
                        Visa Entry Type
                      </label>
                      <Select
                        options={visaEntryTypeOptions}
                        styles={visaTypeStyles}
                        onChange={handleVisaEntryTypeSelect}

                        value={selectedVisaEntryType}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                <InputComponent
                  label={'Visa Expiration Date'}
                  maxLength={32}
                  minLength={3}
                  type={'date'}
                  placeholder={'mm/dd/yyyy'}
                  name={'visaFee'}
                  value={decisionAdditionalFormValues.expiryDate.split('T')[0]}

                  className="w-3/4 md:w-1/4"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setDecisionAdditionalFormValues({
                      ...decisionAdditionalFormValues,
                      expiryDate: e.target.value
                    })
                  }}
                  error={''}

                  required
                />
                <div className="w-1/4">
                  <div className="hidden"></div>
                </div>
              </div>
              <div className="mt-10">
                <div className="flex w-full items-center justify-center gap-x-44">
                  <div className="flex w-3/5 cursor-pointer">
                    <p className="text-lg md:text-2xl font-bold text-logoColorBlue underline">
                      {' '}
                      Interview Details
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                  <InputComponent
                    label={'Interview Required'}
                    maxLength={32}
                    minLength={3}
                    type={'text'}
                    placeholder={''}
                    name={'postalCode'}
                    value={interview === 't' ? 'Yes' : 'No'}
                    className="w-3/4 md:w-1/4"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
                    error={''}
                    disabled
                    required
                  />
                  <div className="w-1/4">
                    <div className="hidden"></div>
                  </div>
                </div>
              </div>

              <div className=" flex justify-center  mt-10">
                <div className="mx-4 mt-1 w-full text-center ">
                  <p className="font-serif text-lg font-bold text-logoColorBlue md:text-2xl underline underline-offset-8">
                    Stakeholder&apos;s Comments
                  </p>
                  <div className="flex w-full items-center justify-center gap-x-44  md:flex-row flex-col ">
                    {
                      stakeHoldersOptions?.length === 0 ? (
                        <p className="text-logoColorBlue font-serif text-xl font-bold text-center mt-10">
                          No stakeholder&apos;s comments
                        </p>
                      ) : (
                        <table className="w-full md:w-2/3 mt-4 ">
                          <thead>
                            <tr className=" text-logoColorBlue font-serif text-sm md:text-base font-bold text-center ">
                              <th className="py-3">S/N</th>
                              <th className="">Name</th>
                              <th className="">Comments</th>
                              <th className="">Status</th>
                            </tr>
                          </thead>
                          <tbody>

                            {
                              stakeHoldersOptions?.map((stakeholder, index) => (
                                <tr key={index}
                                  className="bg-gradient-to-r from-logoColorGreen to-logoColorBlue text-white font-sans font-semibold text-sm md:text-base text-center   items-center"

                                >
                                  <td className="py-4 rounded-s-lg ">{index + 1}</td>
                                  <td className=" py-3">{capitalizeWords(stakeholder.stakeholderDesc)}</td>
                                  <td className=" py-2">{stakeholder.comments}</td>
                                  <td className=" py-2 rounded-e-lg">{stakeholder.status}</td>
                                </tr>
                              ))
                            }
                          </tbody>
                        </table>
                      )
                    }
                  </div>
                </div>
              </div>


              <div className="w-full my-10">
                <div className="text-center">
                  <p className="font-serif text-lg font-bold text-logoColorBlue md:text-2xl underline underline-offset-8">
                    Add Comments
                  </p>
                </div>
                <div className='flex w-full justify-center'>
                  <textarea
                    className="mt-4 w-3/4 text-sm md:text-base md:w-2/3 h-52 p-2 rounded-xl bg-slate-200 text-black"
                    placeholder="Write down the requirements"
                    value={decisionAdditionalFormValues.decisionComments}
                    onChange={handleCommentChange}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-center">
                  <div className='h-[0.5px] w-2/3  mb-7 mt-12 bg-logoColorBlue'></div>
                </div>
                <p className="text-logoColorBlue font-serif text-xl md:text-3xl font-bold text-center my-6">
                  Checklist
                </p>
                <div className=" mx-4 flex justify-center ">
                  <div className="mt-8 w-full text-center ">
                    <p className="text-logoColorBlue underline underline-offset-8 font-serif text-base md:text-xl font-bold text-center">
                      Required Documents
                    </p>
                    {
                      documentsOptions.length === 0 ? (
                        <p className="text-logoColorBlue font-serif text-base md:text-xl font-bold text-center mt-10">
                          No document is  selected
                        </p>
                      ) : (
                        <div className="flex w-full items-center justify-center gap-x-44  md:flex-row flex-col ">

                          <table className="w-full md:w-2/3 mt-8  ">
                            <thead>
                              <tr className=" text-logoColorBlue font-serif :text-sm font-bold text-center ">
                                <th className="ps-5 py-2">S/N</th>
                                <th className="">Document Name</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                documentsOptions.map((documents, index) => (
                                  <tr key={index}
                                    className="bg-gradient-to-r from-logoColorGreen to-logoColorBlue text-white font-sans font-semibold text-sm md:text-base text-center border-2 rounded-2xl border-white items-center"

                                  >
                                    <td className="py-4  border-logoColorBlue rounded-s-xl">{index + 1}</td>
                                    <td className=" py-2  rounded-e-xl">{capitalizeWords(documents.documentName)}</td>

                                  </tr>
                                ))
                              }
                            </tbody>
                          </table>
                        </div>
                      )
                    }
                  </div>

                </div>

              </div>
              <div className=" mt-8 w-full text-center ">
                <p className="text-logoColorBlue underline underline-offset-8 font-serif text-base md:text-xl font-bold text-center">
                  Other Documents
                </p>
                {
                  otherDocumentsOptions.length === 0 ? (
                    <p className="text-logoColorBlue font-serif text-xl font-bold text-center mt-10">
                      No other documents are required
                    </p>
                  ) : (
                    <div className="flex w-full items-center justify-center gap-x-44  md:flex-row flex-col ">

                      <table className="w-11/12 md:w-2/3 mt-8  ">
                        <thead>
                          <tr className=" text-logoColorBlue font-serif text-sm font-bold text-center ">
                            <th className="md:ps-5 py-2">S/N</th>
                            <th className="">Requirements</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            otherDocumentsOptions.map((documents, index) => (
                              <tr key={index}
                                className="bg-gradient-to-r from-logoColorGreen to-logoColorBlue text-white font-sans font-semibold text-sm md:text-base text-center border-2 rounded-2xl border-white items-center"

                              >
                                <td className="py-4  border-logoColorBlue rounded-s-xl">{index + 1}</td>
                                <td className=" py-2  rounded-e-xl">{capitalizeWords(documents)}</td>

                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  )
                }
              </div>
              <div className="flex justify-center px-4 gap-x-5 md:gap-x-10 py-20">
                <button
                  type="button"
                  onClick={() => {
                    if (isFinalizedDecisionStatus(status as ApplicationStatus)) {
                      router.push('/inbox'); // Assuming Pages.INBOX is the inbox path
                      return;
                    }
                    setShowModal(true);
                    setProceed(true);
                  }}
                  className={classNames(
                    "w-1/2 md:w-1/6 rounded-xl py-3 md:py-4 text-sm md:text-base text-white",
                    {
                      'bg-slate-600': isFinalizedDecisionStatus(status as ApplicationStatus),
                      'bg-gradient-to-r from-logoColorGreen to-logoColorBlue': !isFinalizedDecisionStatus(status as ApplicationStatus)
                    }
                  )}
                >
                  {isFinalizedDecisionStatus(status as ApplicationStatus) ? "Close" : "Approve"}
                </button>

                {!isFinalizedDecisionStatus(status as ApplicationStatus) && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(true);
                      setRejectApplication(true);
                    }}
                    className="w-1/2 md:w-1/6 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-3 md:py-4 text-sm md:text-base text-white"
                  >
                    Reject
                  </button>
                )}
                {!isFinalizedDecisionStatus(status as ApplicationStatus) && (
                  <>
                    <button
                      type="button"
                      onClick={() => {

                        if (decisionAdditionalFormValues.decisionComments.trim() === '') {
                          toast.error('Please add a comment');
                          return;
                        }
                        setShowModal(true);
                        setRefferedToUser(true);
                      }}
                      className="w-1/2 md:w-1/6 rounded-xl bg-red-700 py-3 md:py-4 text-sm md:text-base text-white"
                    >
                      Refer to User
                    </button>
                  </>
                )}
              </div>
            </div>}

            {
              activeTab === DecisionMakerTabs.VIEWDOCUMENTS && (
                <DecisonMakerViewDocumentsComponent trackingId={trackingId} />
              )
            }
          </form >
        )
      }
    </>
  );
}
