import { Colors } from '@/constants/constants';
import { getStackHolders } from '@/server/users';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';

interface Props {
    stakeHoldersOptions: any[]
    isDocument?: boolean;
    addStakeHolder?: (stakeHolder: any) => void;
    title: string;
}
const MultiSelectDropdown = ({ stakeHoldersOptions, isDocument, addStakeHolder, title }: Props) => {
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
    const [status, setStatus] = useState("all");

    const [selectedOptions, setSelectedOptions] = useState(null);

    const options = stakeHoldersOptions

    const handleChange = (selectedOptions: any) => {
        setSelectedOptions(selectedOptions);
        if (addStakeHolder) {
            addStakeHolder(selectedOptions);
            setSelectedOptions(null);
        }
    };

    return (
        <div>
            <label className="text-sm font-semibold text-logoColorBlue py-2 ">
                {title}
            </label>
            <Select
                value={selectedOptions}
                onChange={handleChange}
                options={options}
                styles={visaTypeStyles}
                placeholder="Choose options..."
            />

        </div>
    );
};

export default MultiSelectDropdown;
