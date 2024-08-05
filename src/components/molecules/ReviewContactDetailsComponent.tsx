import { ChangeEvent } from 'react';
import InputComponent from '../atoms/InputComponent';
import {
  ContactDetailsDto,
} from '@/dto/ApplicationData.dto';

interface Props {
  contactFormValues: ContactDetailsDto;
  countires: any;
  sex: any;
  maritalStatus: any;
  occupation: any;
}
export default function ReviewContactDetailsComponent({
  contactFormValues,
  countires,
  maritalStatus,
  occupation,
  sex,
}: Props) {
  return (
    <>
      <div className="mt-5 flex w-full items-center justify-center gap-x-44 lg:flex-row flex-col">
        <InputComponent
          label={'Email Address 1'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'email1'}
          value={contactFormValues.email1}
          className="w-1/2 lg:w-1/4"
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
          className="w-1/2 lg:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}

        />
      </div>
      <div className="mt-4 flex w-full items-center justify-center gap-x-44 lg:flex-row flex-col">
        <InputComponent
          label={'Mobile Number 1'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'mobile1'}
          value={contactFormValues.phoneCode1 + contactFormValues.mobile1}
          className="w-1/2 lg:w-1/4"
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
          className="w-1/2 lg:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}

        />
      </div>
      <div className="mt-4 flex w-full items-center justify-center gap-x-44 lg:flex-row flex-col">
        <InputComponent
          label={'Country'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'country'}
          value={
            countires.find(
              (country: any) => country.value === contactFormValues.country,
            )?.label
          }
          className="w-1/2 lg:w-1/4"
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
          className="w-1/2 lg:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          disabled
          required
        />
      </div>
      <div className="mt-4 flex w-full items-center justify-center gap-x-44 lg:flex-row flex-col">
        <InputComponent
          label={'Address Line 1'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'addressLineOne'}
          value={contactFormValues.addressLineOne}
          className="w-1/2 lg:w-1/4"
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
          className="w-1/2 lg:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          disabled

        />
      </div>
      <div className="mt-4 flex w-full items-center justify-center gap-x-44 lg:flex-row flex-col">
        <InputComponent
          label={'Postal Code'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'postalCode'}
          value={contactFormValues.postalCode}
          className="w-1/2 lg:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          disabled
          required
        />
        <div className="w-1/4">
          <div className="hidden"></div>
        </div>
      </div>
    </>
  );
}
