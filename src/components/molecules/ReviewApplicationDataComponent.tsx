import { ChangeEvent, use, useEffect, useState } from 'react';
import InputComponent from '../atoms/InputComponent';
import { ApplicationDataRequestDto } from '@/dto/ApplicationData.dto';
import { capitalizeFirstLetter, capitalizeWords, formatCurrency } from '@/constants/functions';

interface Props {
  applicationFormValues: ApplicationDataRequestDto;
}
export default function ReviewApplicationDataComponent({
  applicationFormValues,
}: Props) {



  return (
    <>
      <div className="mt-5 flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
        <InputComponent
          label={'Visa Type'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'visaType'}
          value={capitalizeFirstLetter(
            applicationFormValues.visaTypeDescription || '',
          )}
          className="w-3/4 md:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          disabled
          required
        />

        <InputComponent
          label={'Visa Sub Type'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'visaSubType'}
          value={capitalizeFirstLetter(applicationFormValues.visaSubTypeDescription || '')}
          className="w-3/4 md:w-1/4 mt-3 md:mt-0"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          required
          disabled
        />
      </div>
      <div className="mt-4 flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
        <InputComponent
          label={'Visa Entry Type'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'nationality'}
          value={capitalizeWords(applicationFormValues.entryType + ' Entry') as string}
          className="w-3/4 md:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          disabled
          required
        />

        <InputComponent
          label={'Visa Duration'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'visaCurrency'}
          value={applicationFormValues.duration + ' Days' as string}
          className="w-3/4 md:w-1/4 mt-3 md:mt-0"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          required
          disabled
        />
      </div>
      <div className="mt-4 flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
        <InputComponent
          label={'Nationality'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'nationality'}
          value={applicationFormValues.nationalityName as string}
          className="w-3/4 md:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          disabled
          required
        />

        <InputComponent
          label={'Visa Currency'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'visaCurrency'}
          value={applicationFormValues.visaCurrency}
          className="w-3/4 md:w-1/4 mt-3 md:mt-0"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          required
          disabled
        />
      </div>
      <div className="mt-4 flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
        <InputComponent
          label={'Visa Fee'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'visaFee'}
          value={formatCurrency(parseInt(applicationFormValues.visaFee), applicationFormValues.visaCurrency)}

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
    </>
  );
}
