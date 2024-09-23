import { ChangeEvent } from 'react';
import InputComponent from '../atoms/InputComponent';
import {
    ApplicationDataRequestDto,
    ContactDetailsDto,
    FinancialDetailsDto,
    personalDetailsDto,
} from '@/dto/ApplicationData.dto';
import Image from 'next/image';

interface Props {
    financialFormValues: FinancialDetailsDto;
    sponsorType: any;
    accomodationType: any;
}
export default function ReviewFinancialDetailsComponent({
    financialFormValues,
    sponsorType,
    accomodationType,
}: Props) {
    return (
        <>
            <div className="mt-5 flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                <InputComponent
                    label={'Sponsor Type'}
                    maxLength={32}
                    minLength={3}
                    type={'text'}
                    placeholder={''}
                    name={'sponsorType'}
                    value={sponsorType.find((item: any) => item.value === financialFormValues.sponsorType)?.label}
                    className="w-3/4 md:w-1/4"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
                    error={''}
                    disabled
                    required
                />

                <InputComponent
                    label={'Sponsor Details'}
                    maxLength={32}
                    minLength={3}
                    type={'text'}
                    placeholder={''}
                    name={'sponsorDetails'}
                    value={financialFormValues.sponsorDetails}
                    className="w-3/4 md:w-1/4"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
                    error={''}
                />
            </div>
            <div className="mt-4 flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                <InputComponent
                    label={'Cash Holding Amount'}
                    maxLength={32}
                    minLength={3}
                    type={'text'}
                    placeholder={''}
                    name={'cashHoldingAmount'}
                    value={financialFormValues.cashHoldingAmount}
                    className="w-3/4 md:w-1/4"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
                    error={''}
                    disabled
                    required
                />

                <InputComponent
                    label={'Accomodation Type'}
                    maxLength={32}
                    minLength={3}
                    type={'text'}
                    placeholder={''}
                    name={'accomodationType'}
                    value={accomodationType.find((item: any) => item.value === financialFormValues.accomodationType)?.label}
                    className="w-3/4 md:w-1/4"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
                    error={''}
                    required
                />
            </div>
            <div className="mt-4 flex w-full items-center justify-center gap-x-44 md:flex-row flex-col">
                <InputComponent
                    label={'City'}
                    maxLength={32}
                    minLength={3}
                    type={'text'}
                    placeholder={''}
                    name={'city'}
                    value={financialFormValues.city}
                    className="w-3/4 md:w-1/4"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
                    error={''}
                    disabled
                    required
                />
                <InputComponent
                    label={'Name'}
                    maxLength={32}
                    minLength={3}
                    type={'text'}
                    placeholder={''}
                    name={'hotelName'}
                    value={financialFormValues.hotelName}
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
                    value={financialFormValues.addressLineOne}
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
                    value={financialFormValues.addressLineTwo}
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
                    value={financialFormValues.postalCode}
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
