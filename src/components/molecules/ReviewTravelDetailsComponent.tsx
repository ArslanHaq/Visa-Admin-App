import { ChangeEvent, useState } from 'react';
import InputComponent from '../atoms/InputComponent';
import {
  ApplicationDataRequestDto,

  TravelHistory,
  TravelPlanDto,
} from '@/dto/ApplicationData.dto';
import TravelHistoryCardComponent from './travelHistoryCardComponent';

interface Props {
  travelFormValues: TravelPlanDto;
  countries: any;

}
export default function ReviewTravelDetailsComponent({
  travelFormValues,
  countries,
}: Props) {
  const [travelHistoryRecord, setTravelHistoryRecord] =
    useState<TravelHistory[]>(travelFormValues.travelHistory as TravelHistory[]);
  const [travelHistory, setTravelHistory] = useState<TravelHistory>({
    finalDestination: '',
    travelDate: '',
    travelPurpose: '',
  });
  return (
    <>
      <div className="flex w-full items-center justify-center gap-x-44 mt-6 lg:flex-row flex-col">
        <InputComponent
          label={'Travel Date'}
          maxLength={30}
          minLength={3}
          type={'date'}
          placeholder={'Enter your travel Date'}
          name={'travelDate'}
          value={travelFormValues.travelDate.split('T')[0]}
          className="w-1/2 lg:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            console.log(e)
          }
          error={''}
          required
          disabled
        />
        <InputComponent
          label={'Arrival Port'}
          maxLength={50}
          minLength={3}
          type={'text'}
          placeholder={'Enter your Arrival Port'}
          name={'arrivalPort'}
          value={travelFormValues.arrivalPort}
          className="w-1/2 lg:w-1/4"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            console.log(e)
          }
          error={''}
          required
          disabled
        />
      </div>
      <div className="mt-4 w-full">
        <div className="flex w-full items-center justify-center gap-x-44 lg:flex-row flex-col">
          <InputComponent
            label={'City / Cities'}
            maxLength={50}
            minLength={3}
            type={'text'}
            placeholder={''}
            name={'cities'}
            value={travelFormValues.cities}
            className="w-1/2 lg:w-1/4"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              console.log(e)
            }
            error={''}
            required
            disabled
          />
          <div className="w-1/4"></div>
        </div>
      </div>
      <div className="w-full">
        <div className="my-3 flex w-full items-center justify-center gap-x-44">
          <div className="w-1/4">
            <p className="font-bold text-logoColorBlue underline">
              Travel History:
            </p>
          </div>
          <div className="w-1/4"></div>
        </div>

        {travelFormValues.travelHistory?.map((travelHistory, index) => (
          <div className="my-2 flex w-full justify-center" key={index}>
            <TravelHistoryCardComponent
              travelHistory={travelHistory}
              setTravelHistory={setTravelHistory}
              travelHistoryRecord={travelHistoryRecord}
              setTravelHistoryRecord={setTravelHistoryRecord}
              countries={countries}
              isDelete={false}
              index={index}
            />
          </div>
        ))}
      </div>
    </>
  );
}
