import { ChangeEvent, useEffect, useState } from 'react';
import InputComponent from '../atoms/InputComponent';
import { TravelHistory } from '@/dto/ApplicationData.dto';
import { set } from 'animejs';
import classNames from 'classnames';
import Select from 'react-select';
import { Colors } from '@/constants/constants';

interface Props {
  travelHistory: TravelHistory;
  setTravelHistory: (travelHistory: TravelHistory) => void;
  travelHistoryRecord?: TravelHistory[];
  setTravelHistoryRecord: (travelHistoryRecord: TravelHistory[]) => void;
  showbutton?: boolean;
  countries: any;
  isDelete: boolean;
  index: number;
}
export default function TravelHistoryCardComponent({
  travelHistory,
  setTravelHistory,
  travelHistoryRecord,
  setTravelHistoryRecord,
  showbutton,
  countries,
  isDelete,
  index,
}: Props) {

  const visaTypeStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderWidth: 1,
      fontSize: '14px',
      paddingTop: '5px',
      paddingBottom: '5px',
      borderColor: state.isFocused ? Colors.PRIMARYBLUE : Colors.PRIMARYGREEN,
      boxShadow: 'none',
      '&:hover': {
        borderColor: state.isFocused ? Colors.PRIMARYBLUE : Colors.PRIMARYGREEN,
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

  const [selectedNationality, setSelectedNationality] = useState<any>(null);
  const [selectedTravelPurpose, setSelectedTravelPurpose] = useState<any>(null);
  const travelPurpose = [
    { value: 'visit relatives', label: 'Visit' },
    { value: 'tourism', label: 'Tourism' },
    { value: 'religious', label: 'Religious' },
    { value: 'study', label: 'Study' },
    { value: 'others', label: 'Others' },
    { value: 'business', label: 'Business' },
  ];
  function handleNationalitySelect(selectedOption: any) {
    setSelectedNationality(selectedOption);
    setTravelHistory({
      ...travelHistory,
      finalDestination: selectedOption.value,
    });
  }
  function handleTravelPurposeSelect(selectedOption: any) {
    setTravelHistory({
      ...travelHistory,
      travelPurpose: selectedOption.value,
    });
    setSelectedTravelPurpose(selectedOption);
  }
  return (
    <div className="flex w-full items-center justify-center gap-x-5 flex-col md:flex-row">
      <div className="flex w-3/4 md:w-1/6">
        <InputComponent
          label={index === 0 ? 'Travel Date' : ''}
          maxLength={30}
          minLength={3}
          type={'date'}
          placeholder={'Enter your travel Date'}
          name={'travelDate'}
          value={travelHistory.travelDate.split('T')[0]}
          className="w-full"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTravelHistory({
              ...travelHistory,
              travelDate: e.target.value,
            })
          }
          error={''}
          disabled={!showbutton}
          max={new Date().toISOString().split('T')[0]}
        />
      </div>
      <div
        className={classNames(
          'w-3/4 md:w-1/6',
          { hidden: !showbutton },
          { block: showbutton },
        )}
      >
        <label className="text-sm font-semibold text-logoColorBlue">
          Final Destination
        </label>
        <div className="mt-1">
          <Select
            options={countries}
            styles={visaTypeStyles}
            onChange={handleNationalitySelect}
            value={selectedNationality}
            isDisabled={!showbutton}
          />
        </div>
      </div>
      <div
        className={classNames(
          'flex w-3/4 md:w-1/6',
          { hidden: showbutton },
          { block: !showbutton },
        )}
      >
        <InputComponent
          label={index === 0 ? 'Final Destination ' : ''}
          maxLength={30}
          minLength={3}
          type={'text'}
          placeholder={'Enter your travel Date'}
          name={'travelDate'}
          value={
            travelHistory.finalDestinationName || ''
          }
          className="w-full"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTravelHistory({
              ...travelHistory,
              travelDate: e.target.value,
            })
          }
          error={''}
          disabled={!showbutton}
        />
      </div>
      <div
        className={classNames(
          'w-3/4 md:w-1/6',
          { hidden: !showbutton },
          { block: showbutton },
        )}
      >
        <label className="text-sm font-semibold text-logoColorBlue">
          Travel Purpose
        </label>
        <div className="mt-1">
          <Select
            options={travelPurpose}
            styles={visaTypeStyles}
            onChange={handleTravelPurposeSelect}
            value={selectedTravelPurpose}
            isDisabled={!showbutton}
          />
        </div>
      </div>
      <div
        className={classNames(
          'flex w-3/4 md:w-1/6',
          { hidden: showbutton },
          { block: !showbutton },
        )}
      >
        <InputComponent
          label={index === 0 ? 'Travel Purpose' : ''}
          maxLength={30}
          minLength={3}
          type={'text'}
          placeholder={'Enter your travel Date'}
          name={'travelPurpose'}
          value={
            travelPurpose.find(
              (item: any) => item.value === travelHistory.travelPurpose,
            )?.label || ''
          }
          className="w-full"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTravelHistory({
              ...travelHistory,
              travelDate: e.target.value,
            })
          }
          error={''}
          disabled={!showbutton}
        />
      </div>
      <div className="mt-6 w-36">
        {isDelete && (
          <div className="flex w-full">
            <button
              className={classNames(
                'rounded-md px-3 py-2',
                {
                  'bg-red-500': !showbutton,
                },
                {
                  'bg-logoColorGreen': showbutton,
                },
              )}
              type="button"
              onClick={() => {
                if (
                  travelHistory.finalDestination === '' ||
                  travelHistory.travelDate === '' ||
                  travelHistory.travelPurpose === ''
                ) {
                  return;
                } else {
                  if (showbutton) {
                    setTravelHistoryRecord(
                      travelHistoryRecord
                        ? [...travelHistoryRecord, travelHistory]
                        : [travelHistory],
                    );
                    setTravelHistory({
                      travelDate: '',
                      finalDestination: '',
                      travelPurpose: '',
                    });

                    setSelectedNationality(null);
                    setSelectedTravelPurpose(null);

                  } else {
                    setTravelHistoryRecord(
                      travelHistoryRecord?.filter(
                        (item) =>
                          item.travelDate !== travelHistory.travelDate &&
                          item.finalDestination !==
                          travelHistory.finalDestination &&
                          item.travelPurpose !== travelHistory.travelPurpose,
                      ) || [],
                    );
                  }
                }
              }}
            >
              <span className="text-xs text-white ">
                {showbutton ? '+ Add To Hsitory' : 'Delete From History'}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
