import { ChangeEvent, use, useEffect, useState } from 'react';
import InputComponent from '../atoms/InputComponent';
import { ApplicationDataRequestDto } from '@/dto/ApplicationData.dto';
import { capitalizeFirstLetter, formatCurrency } from '@/constants/functions';
// import { getVisaSubTypeResponse } from '@/server/Application';

interface Props {
  applicationFormValues: ApplicationDataRequestDto;
  visaType: any;
}
export default function ReviewApplicationDataComponent({
  applicationFormValues,
  visaType,
}: Props) {
  const [visaSubType, setVisaSubType] = useState([
    { value: '', label: '' },
  ]);

  // async function getVisaSubType() {
  //   const response = await getVisaSubTypeResponse(applicationFormValues.visaType)
  //   if (response.error && response.error.length > 0) {
  //     response.error.forEach((error: any) => {
  //       console.log(`Error ${error.code}: ${error.description}`);
  //     }
  //     )
  //   } else {
  //     setVisaSubType(
  //       response.data.map((visa: any) => ({
  //         value: visa.visaSubType,
  //         label: visa.description,
  //       })),
  //     );
  //   }

  // }
  // useEffect(() => {
  //   getVisaSubType();
  // }, [applicationFormValues.visaType]);


  return (
    <>
      <div className="mt-5 flex w-full items-center justify-center gap-x-44 lg:flex-row flex-col">
        <InputComponent
          label={'Visa Type'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'visaType'}
          value={capitalizeFirstLetter(
            visaType.find(
              (visaType: any) =>
                visaType.value === applicationFormValues.visaType,
            )?.label || '',
          )}
          className="w-1/2 lg:w-1/4"
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
          value={capitalizeFirstLetter(visaSubType.find(
            (visaSubType: any) =>
              visaSubType.value === applicationFormValues.visaSubType,
          )?.label || '')}
          className="w-1/2 lg:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          required
          disabled
        />
      </div>
      <div className="mt-4 flex w-full items-center justify-center gap-x-44 lg:flex-row flex-col">
        <InputComponent
          label={'Nationality'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'nationality'}
          value={applicationFormValues.nationality}
          className="w-1/2 lg:w-1/4"
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
          className="w-1/2 lg:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
          error={''}
          required
          disabled
        />
      </div>
      <div className="mt-4 flex w-full items-center justify-center gap-x-44 lg:flex-row flex-col">
        <InputComponent
          label={'Visa Fee'}
          maxLength={32}
          minLength={3}
          type={'text'}
          placeholder={''}
          name={'visaFee'}
          // value={formatCurrency(parseInt(applicationFormValues.visaFee), applicationFormValues.visaCurrency)}
          value='100'

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
