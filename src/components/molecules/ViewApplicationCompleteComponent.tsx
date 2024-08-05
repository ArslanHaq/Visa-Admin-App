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
// import submitCompleteApplication, {
//   getApplicationData
// } from '@/server/Application';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
// import { handleFetch } from '@/constants/functions';
import Loader from '../atoms/Loader';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Pages } from '@/constants/constants';
import ReviewApplicationDataComponent from './ReviewApplicationDataComponent';
import ReviewPersonalDetailsComponent from './ReviewPersonalDetailsComponent';
import ReviewContactDetailsComponent from './ReviewContactDetailsComponent';
import ReviewFinancialDetailsComponent from './ReviewFinancialDetailsComponent';
import ReviewTravelDetailsComponent from './ReviewTravelDetailsComponent';
import Modal from './Modal';
import ReferModalComponent from '../atoms/ReferModalComponent';
import ApproveModalComponent from '../atoms/ApproveModalComponent';
import RejectModalComponent from '../atoms/RejectModalComponent';
interface Props {
  trackingId: string;
  countires: any;
  sex: any;
  maritalStatus: any;
  occupation: any;
  visaType: any;
  visaSubType: any;
  sponsorType: any;
  accomodationType: any;
  status: string;

}
export default function ViewApplicationCompleteComponent({
  trackingId,
  countires,
  maritalStatus,
  occupation,
  sex,
  visaType,
  sponsorType,
  accomodationType,
  status,

}: Props) {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [applicationFormValues, setApplicationFormValues] =
    useState<ApplicationDataRequestDto>({
      visaType: '',
      visaSubType: '',
      nationality: '',
      visaFee: '',
      visaCurrency: '',
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
  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // if (status === 'submitted') {
    //   router.push(Pages.APPLICATIONDATA);
    //   return
    // }
    // setLoader(true);
    // const response = await submitCompleteApplication(trackingId)
    // if (response.error && response.error.length > 0) {
    //   response.error.forEach((err: any) => {
    //     toast.error(`Error ${err.code}: ${err.description}`);
    //   });
    //   return null;
    // } else {
    //   toast.success('Application submitted successfully');
    //   setLoader(false);
    //   setCurrentStep(6);
    // }
  }
  // async function getApplicationComplete(trackingId: string) {
  //   const {
  //     applicationData,
  //     personalInformation,
  //     contactDetail,
  //     financialInformation,
  //     travelPlan
  //   } = await handleFetch<ViewApplicationDataDto>(getApplicationData as any,
  //     trackingId,
  //     'Application') as ViewApplicationDataDto;

  //   setStatus(applicationData?.status as string);
  //   setApplicationFormValues({
  //     visaType: applicationData?.visaType ?? '',
  //     visaFee: applicationData?.visaFee ?? '',
  //     visaSubType: applicationData?.visaSubType ?? '',
  //     visaCurrency: applicationData?.visaCurrency ?? '',
  //     nationality: applicationData?.nationality ?? '',
  //   });

  //   setPersonalFormValues({
  //     firstName: personalInformation?.firstName as string,
  //     lastName: personalInformation?.lastName as string,
  //     birthDate: personalInformation?.birthDate.split('T')[0] as string,
  //     birthCity: personalInformation?.birthCity as string,
  //     birthCountry: personalInformation?.birthCountry as string,
  //     issuingCountry: personalInformation?.issuingCountry as string,
  //     maritalStatus: personalInformation?.maritalStatus as string,
  //     nationality: personalInformation?.nationality as string,
  //     occupation: personalInformation?.occupation as string,
  //     passportNumber: personalInformation?.passportNumber as string,
  //     photographBase64: personalInformation?.photographBase64 as string,
  //     sex: personalInformation?.sex as string,
  //     trackingId,
  //   });
  //   setContactFormValues({
  //     addressLineOne: contactDetail?.addressLineOne as string,
  //     addressLineTwo: contactDetail?.addressLineTwo as string,
  //     city: contactDetail?.city as string,
  //     country: contactDetail?.country as string,
  //     email1: contactDetail?.email1 as string,
  //     email2: contactDetail?.email2 as string,
  //     landline1: contactDetail?.landline1 as string,
  //     landline2: contactDetail?.landline2 as string,
  //     mobile1: contactDetail?.mobile1 as string,
  //     mobile2: contactDetail?.mobile2 as string,
  //     phoneCode1: contactDetail?.phoneCode1 as string,
  //     phoneCode2: contactDetail?.phoneCode2 as string,
  //     postalCode: contactDetail?.postalCode as string,
  //     trackingId,
  //   });
  //   setFinancialFormValues({
  //     sponsorType: financialInformation?.sponsorType as string,
  //     sponsorDetails: financialInformation?.sponsorDetails as string,
  //     cashHoldingAmount: financialInformation?.cashHoldingAmount as string,
  //     city: financialInformation?.city as string,
  //     accomodationType: financialInformation?.accomodationType as string,
  //     addressLineOne: financialInformation?.addressLineOne as string,
  //     addressLineTwo: financialInformation?.addressLineTwo as string,
  //     hotelName: financialInformation?.hotelName as string,
  //     postalCode: financialInformation?.postalCode as string,
  //     trackingId,
  //   });

  //   setTravelFormValues({
  //     arrivalPort: travelPlan?.arrivalPort as string,
  //     cities: travelPlan?.cities as string,
  //     travelDate: travelPlan?.travelDate.split('T')[0] as string,
  //     travelHistory: travelPlan?.travelHistory as TravelHistory[],
  //     trackingId,
  //   })
  //   setLoader(false);
  // }

  // useEffect(() => {
  //   if (trackingId) {
  //     getApplicationComplete(trackingId);
  //   } else {
  //     setLoader(false);
  //   }

  // }, [, trackingId]);
  const [showModal, setShowModal] = useState<boolean>(true);
  const [refer, setRefer] = useState<boolean>(false);
  const [reject, setReject] = useState<boolean>(false);
  const [approve, setApprove] = useState<boolean>(false);
  const [needDocuments, setNeedDocuments] = useState<boolean>(false);
  const [checkListItems, setCheckListItems] = useState<any[]>([
    { name: 'Passport', isChecked: false },
    { name: 'Visa', isChecked: false },
    { name: 'Photograph', isChecked: false },
    { name: 'Financial Documents', isChecked: false },
    { name: 'Travel History', isChecked: false },
  ]);

  const visaTypeOptions = visaType.map((item: any) => {
    return { value: item.visaType, label: item.description }
  })
  const nationalitiesOptions = countires.map((item: any) => {
    return { value: item.alpha3, label: item.countryName }
  })
  const occupationOptions = occupation.map((item: any) => {
    return { value: item.occupationId, label: item.description }
  })
  console.log(visaTypeOptions, nationalitiesOptions, occupationOptions, maritalStatus, sex, sponsorType, accomodationType)
  return (
    <>
      {
        refer && (
          <Modal showModal={showModal} className='bg-gradient-to-r from-orange-600 to-orange-900  py-10 px-10'>
            <ReferModalComponent checkListItems={checkListItems}
              setCheckListItems={setCheckListItems} setShowModal={setShowModal}
              setRefer={setRefer} />
          </Modal >
        )
      }

      {
        approve && (
          <Modal showModal={showModal}>
            <ApproveModalComponent setShowModal={setShowModal} setApprove={setApprove} />
          </Modal>
        )
      }
      {
        reject && (
          <Modal showModal={showModal} className='bg-gradient-to-r from-red-600 to-red-950'>
            <RejectModalComponent setShowModal={setShowModal} setReject={setReject} />
          </Modal>
        )
      }
      {
        loader ? (
          <div className="flex h-screen items-center justify-center">
            <Loader />
          </div>
        ) : (
          <form className="mt-24" onSubmit={handleFormSubmit}>
            <div className="w-full">
              <div className="text-center">
                <p className="font-serif text-2xl font-bold text-logoColorBlue lg:text-5xl">
                  Review Application
                </p>
              </div>
              <div className="mt-3 flex justify-center">
                <p className="text-xs text-logoColorGreen lg:text-base">
                  Please review your application before submitting
                </p>
              </div>
              <div className="mt-10">
                <div className="flex w-full items-center justify-center gap-x-44">
                  <div className="flex w-3/5 cursor-pointer" >
                    <p className="text-2xl font-bold text-logoColorBlue underline">
                      {' '}
                      Application Data
                    </p>
                  </div>
                </div>
                <ReviewApplicationDataComponent
                  applicationFormValues={applicationFormValues}
                  visaType={visaType}
                />
              </div>

              <div className="mt-10">
                <div className="flex w-full items-center justify-center gap-x-44">
                  <div className="flex w-3/5 cursor-pointer" >
                    <p className="text-2xl font-bold text-logoColorBlue underline">
                      {' '}
                      Personal Details
                    </p>
                  </div>
                </div>
                <ReviewPersonalDetailsComponent
                  personalFormValues={personalFormValues}
                  countires={countires}
                  maritalStatus={maritalStatus}
                  occupation={occupation}
                  sex={sex}
                />
              </div>
              <div className="mt-10">
                <div className="flex w-full items-center justify-center gap-x-44">
                  <div className="flex w-3/5 cursor-pointer">
                    <p className="text-2xl font-bold text-logoColorBlue underline">
                      {' '}
                      Contact Details
                    </p>
                  </div>
                </div>
                <ReviewContactDetailsComponent
                  contactFormValues={contactFormValues}
                  countires={countires}
                  maritalStatus={maritalStatus}
                  occupation={occupation}
                  sex={sex}
                />
              </div>
              <div className="mt-10">
                <div className="flex w-full items-center justify-center gap-x-44">
                  <div className="flex w-3/5 cursor-pointer">
                    <p className="text-2xl font-bold text-logoColorBlue underline">
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
                    <p className="text-2xl font-bold text-logoColorBlue underline">
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
            </div>
            <div className='flex w-full justify-center'>
              <div className="flex justify-center gap-x-10 py-20 w-10/12 ">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(true);
                    setApprove(true);
                  }}
                  className="w-1/2 lg:w-1/6 rounded-xl bg-gradient-to-r from-logoColorGreen to-logoColorBlue py-4 text-base text-white"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(true);
                    setReject(true);
                  }}
                  className="w-1/2 lg:w-1/6 rounded-xl bg-gradient-to-r from-red-500 to-red-950 py-4 text-base text-white"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(true);
                    setRefer(true);
                  }}
                  className="w-1/2 lg:w-1/6 rounded-xl bg-gradient-to-r from-orange-500 to-orange-900 py-4 text-base text-white"
                >
                  Refer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(true);
                  }}
                  className="w-1/2 lg:w-1/6 rounded-xl bg-gradient-to-r from-green-500 to-green-900 py-4 text-base text-white"
                >
                  Need Documents
                </button>
              </div>
            </div>

          </form>
        )
      }
    </>
  );
}
