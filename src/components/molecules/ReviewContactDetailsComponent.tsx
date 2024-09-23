import { ChangeEvent } from 'react';
import InputComponent from '../atoms/InputComponent';
import {
  ApplicationDataRequestDto,
  ContactDetailsDto,
  personalDetailsDto,
} from '@/dto/ApplicationData.dto';
import Image from 'next/image';
import { capitalizeFirstLetter } from '@/constants/functions';

interface Props {
  contactFormValues: ContactDetailsDto;

}
export default function ReviewContactDetailsComponent({
  contactFormValues,

}: Props) {
  return (
    <>
      <div className="mt-5 flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
        <InputComponent
          label={'Email Address 1'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'email1'}
          value={contactFormValues.email1}
          className="w-3/4 md:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          disabled
          required
        />

        <InputComponent
          label={'Email Address 2'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'email2'}
          value={contactFormValues.email2}
          className="w-3/4 md:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}

        />
      </div>
      <div className="mt-4 flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
        <InputComponent
          label={'Mobile Number 1'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'mobile1'}
          value={contactFormValues.phoneCode1 + contactFormValues.mobile1}
          className="w-3/4 md:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          disabled
          required
        />

        <InputComponent
          label={'Mobile Number 2'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'mobile2'}
          value={contactFormValues.phoneCode2 + contactFormValues.mobile2}
          className="w-3/4 md:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}

        />
      </div>
      <div className="mt-4 flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
        <InputComponent
          label={'Country'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'country'}
          value={
            capitalizeFirstLetter(contactFormValues.countryName || '')
          }
          className="w-3/4 md:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          disabled
          required
        />
        <InputComponent
          label={'City'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'city'}
          value={contactFormValues.city}
          className="w-3/4 md:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          disabled
          required
        />
      </div>
      <div className="mt-4 flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
        <InputComponent
          label={'Address Line 1'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'addressLineOne'}
          value={contactFormValues.addressLineOne}
          className="w-3/4 md:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          disabled
          required
        />
        <InputComponent
          label={'Address Line 2'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'addressLineTwo'}
          value={contactFormValues.addressLineTwo}
          className="w-3/4 md:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          disabled

        />
      </div>
      <div className="mt-4 flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
        <InputComponent
          label={'Postal Code'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'postalCode'}
          value={contactFormValues.postalCode}
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
      <div className=" mt-16 mb-5 flex w-full items-center justify-center gap-x-44">
        <div className="flex -ml-5 w-3/5">
          <p className="md:text-base font-bold text-logoColorBlue underline underline-offset-4 ">
            {' '}
            Social Media Handles:
          </p>
        </div>
      </div>
      {
        contactFormValues.socialMedia.length === 0 ? <div className="mt-4 flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
          <p className="md:text-base font-bold text-logoColorBlue ">
            {' '}
            No Social Media Handles
          </p>
        </div> : null
      }
      {
        contactFormValues.socialMedia ? contactFormValues.socialMedia.map((handle, index: number) => {
          return (

            <div className="mt-4 flex justify-center gap-x-44" key={index}>
              <div className="mr-2 mt-1 w-3/4 md:w-2/3">
                <div className="flex w-full items-center md:ms-10  justify-center gap-x-20  md:flex-row flex-col ">

                  <InputComponent
                    label={index === 0 ? 'Handler' : ''}
                    maxLength={32}
                    minLength={3}
                    type={'text'}
                    placeholder={'Enter your social handler here'}
                    name={'Link'}
                    value={handle.socialMediaApp}
                    className="w-full"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => { }
                    }
                    error={""}
                    disabled
                  />


                  <InputComponent
                    label={index === 0 ? 'Link ' : ''}
                    maxLength={32}
                    minLength={3}
                    type={'text'}
                    placeholder={''}
                    name={'Link'}
                    value={handle.link}
                    className="w-full"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => { }}
                    error={''}
                    disabled

                  />


                </div>
              </div>
            </div>
          )

        }) :
          null
      }


    </>
  );
}
