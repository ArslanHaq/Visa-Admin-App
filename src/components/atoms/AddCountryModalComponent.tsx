
import Select from 'react-select';
import { Colors } from "@/constants/constants";
import { use, useEffect, useState } from 'react';
import { getCountryData } from '@/server/feeder';
import { toast } from 'react-toastify';
import { addCountry } from '@/server/libraries';


interface Props {
    setShowModal: any;
    setAddCountryModal: any;
}
export default function AddCountryModalComponent({ setShowModal, setAddCountryModal }: Props) {

    const [selectedCountryValue, setSelectedCountryValue] = useState<any>(null);
    const [countriesOptions, setCountriesOptions] = useState<any[]>([]);
    const handleValueSelect = (value: any) => {
        setSelectedCountryValue(value);
    };
    const visaTypeStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            borderWidth: 1,
            fontSize: '14px',
            paddingTop: '5px',
            paddingBottom: '5px',
            borderColor: state.isFocused
                ? Colors.PRIMARYGREEN
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

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();

        const response = await addCountry({
            alpha3: selectedCountryValue.value,
            isActive: 'f'
        })
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            toast.success('Country added in exception list successfully');
            setShowModal(false);
            setAddCountryModal(false);
            window.location.reload();

        }
    }

    async function getCountryDataList() {
        const response = await getCountryData('t');
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        } else {
            setCountriesOptions(response.data.map((country) => {
                return {
                    value: country.alpha3,
                    label: country.countryName
                }
            }
            ))
        }
    }
    useEffect(() => {
        getCountryDataList();
    }, [])
    return (
        <form onSubmit={handleFormSubmit} className='w-72 md:w-96'>
            <div className="flex  flex-col items-center justify-center px-3 py-10">
                <p className=" font-sans text-xl text-slate-200 w-60 text-center">
                    Add Into Excluded List
                </p>

                <div className="w-full mt-3">
                    <label className="font-sans text-base text-slate-200">
                        Countries
                    </label>
                    <Select
                        options={countriesOptions}
                        styles={visaTypeStyles}
                        onChange={handleValueSelect}
                        value={selectedCountryValue}
                        required
                    />
                </div>

                <div className='flex gap-x-5 mt-5'>

                    <button
                        type='button'
                        onClick={() => {
                            setShowModal(false);
                            setAddCountryModal(false);

                        }}
                        className="mt-4 rounded-xl bg-red-900 px-10 py-2 text-white hover:bg-black"
                    >
                        Back
                    </button>

                    <button
                        type='submit'
                        className="mt-4 rounded-xl bg-logoColorGreen px-6 py-2 text-white hover:bg-black"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </form>
    )
}