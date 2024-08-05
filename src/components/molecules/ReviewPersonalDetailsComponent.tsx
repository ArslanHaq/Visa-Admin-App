import { ChangeEvent } from 'react';
import InputComponent from '../atoms/InputComponent';
import {
  personalDetailsDto,
} from '@/dto/ApplicationData.dto';
import Image from 'next/image';

interface Props {
  personalFormValues: personalDetailsDto;
  countires: any;
  sex: any;
  maritalStatus: any;
  occupation: any;
}
export default function ReviewPersonalDetailsComponent({
  personalFormValues,
  countires,
  maritalStatus,
  occupation,
  sex,
}: Props) {
  return (
    <>
      <div className="my-10 flex w-full items-center justify-center gap-x-44">
        <div>
          <Image
            src={`data:image/png;base64,${personalFormValues.photographBase64}`}
            alt="Picture of the author"
            width={200}
            height={200}
            layout='responsive'
            style={{ maxWidth: '150px', minWidth: '150px', maxHeight: '150px', minHeight: '150px' }}
            className="rounded-lg border-2 border-dashed border-gray-300 p-2"
          />
        </div>
      </div>

      <div className="mt-5 flex w-full items-center justify-center gap-x-44 lg:flex-row flex-col">
        <InputComponent
          label={'First Name'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'firstName'}
          value={personalFormValues.firstName}
          className="w-1/2 lg:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          disabled
          required
        />

        <InputComponent
          label={'Last Name'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'lastName'}
          value={personalFormValues.lastName}
          className="w-1/2 lg:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          required
        />
      </div>
      <div className="mt-4 flex w-full items-center justify-center gap-x-44 lg:flex-row flex-col">
        <InputComponent
          label={'Birth Date'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'birthDate'}
          value={personalFormValues.birthDate}
          className="w-1/2 lg:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          disabled
          required
        />

        <InputComponent
          label={'Birth City'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'birthCity'}
          value={personalFormValues.birthCity}
          className="w-1/2 lg:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          required
        />
      </div>
      <div className="mt-4 flex w-full items-center justify-center gap-x-44 lg:flex-row flex-col">
        <InputComponent
          label={'Birth Country'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'birthCountry'}
          value={
            countires.find(
              (country: any) =>
                country.value === personalFormValues.birthCountry,
            )?.label
          }
          className="w-1/2 lg:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          disabled
          required
        />
        <InputComponent
          label={'Marital Status'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'maritalStatus'}
          value={
            maritalStatus.find(
              (status: any) =>
                status.value === personalFormValues.maritalStatus,
            )?.label
          }
          className="w-1/2 lg:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          disabled
          required
        />
      </div>
      <div className="mt-4 flex w-full items-center justify-center gap-x-44 lg:flex-row flex-col">
        <InputComponent
          label={'Sex'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'sex'}
          value={
            sex.find((gender: any) => gender.value === personalFormValues.sex)
              ?.label
          }
          className="w-1/2 lg:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          disabled
          required
        />
        <InputComponent
          label={'Nationality'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'nationality'}
          value={
            countires.find(
              (country: any) =>
                country.value === personalFormValues.nationality,
            )?.label
          }
          className="w-1/2 lg:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          disabled
          required
        />
      </div>
      <div className="mt-4 flex w-full items-center justify-center gap-x-44 lg:flex-row flex-col">
        <InputComponent
          label={'Issuing Country'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'issuingCountry'}
          value={
            countires.find(
              (country: any) =>
                country.value === personalFormValues.issuingCountry,
            )?.label
          }
          className="w-1/2 lg:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          disabled
          required
        />
        <InputComponent
          label={'Passport Number'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'passportNumber'}
          value={personalFormValues.passportNumber}
          className="w-1/2 lg:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          disabled
          required
        />
      </div>
      <div className="mt-4 flex w-full items-center justify-center gap-x-44 lg:flex-row flex-col">
        <InputComponent
          label={'Occupation'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'issuingCountry'}
          value={
            occupation.find(
              (job: any) => job.value === personalFormValues.occupation,
            )?.label
          }
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
