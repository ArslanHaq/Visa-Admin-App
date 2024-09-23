import { Colors } from '@/constants/constants';
import { getStackHolders } from '@/server/users';
import { maxHeaderSize } from 'http';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';

interface Props {
    stakeHoldersOptions: any[]
    isDocument?: boolean;
    addStakeHolder?: (stakeHolder: any) => void;
    title: string;
    setLastSelectedValue?: any;
}
const MultiSelectDocumentDropdown = ({ stakeHoldersOptions, isDocument, addStakeHolder, title, setLastSelectedValue }: Props) => {
    const visaTypeStyles = {
        control: (provided: any, state: any) => ({
            display: 'flex',
            ...provided,
            borderWidth: 1,
            fontSize: '14px',
            borderColor: 'white',
            boxShadow: 'none',
            color: "white",
            backgroundColor: 'transparent',
            '&:hover': {
                borderColor: 'white',
            },
            maxWidth: '320px',
            minWidth: '320px',
            maxHeight: '80px',
            overflow: 'scroll',
            '&::-webkit-scrollbar': {
                display: 'none', // Hide scrollbar in Chrome, Safari, and Opera
            },
            msOverflowStyle: 'none', // Hide scrollbar in Internet Explorer and Edge
            scrollbarWidth: 'none',  // Hide scrollbar in Firefox
        }),
        input: (provided: any) => ({
            ...provided,
            color: "white",
            backgroundColor: 'transparent',
            maxWidth: '320px',
            minWidth: '320px',
            maxHeight: '40px',
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: "white",
            backgroundColor: 'transparent',
            maxWidth: '320px',
            minWidth: '320px',
            maxHeight: '40px',
        }),
        dropdownIndicator: (provided: any, state: any) => ({
            ...provided,
            color: "white",
            display: 'none',
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: Colors.PRIMARYSLATE,
        }),
        menu: (provided: any) => ({
            ...provided,
            backgroundColor: 'transparent',
            maxWidth: '320px',
            minWidth: '320px',
            maxHeight: '40px',
        }),
        menuList: (provided: any) => ({
            ...provided,
            color: "white",
            backgroundImage: 'linear-gradient(to right, #016433, #003366)', // Gradient background
            maxHeight: '120px',
            fontFamily: 'sans-serif',
            fontSize: '14px',
            fontWeight: 'semibold',
            maxWidth: '320px',
            minWidth: '320px',
            '&::-webkit-scrollbar': {
                display: 'none', // Hide scrollbar in Chrome, Safari, and Opera
            },
            msOverflowStyle: 'none', // Hide scrollbar in Internet Explorer and Edge
            scrollbarWidth: 'none',  // Hide scrollbar in Firefox
        }),
        multiValue: (provided: any) => ({
            ...provided,
            backgroundColor: 'transparent',
            color: "white",
        }),
        multiValueLabel: (provided: any) => ({
            ...provided,
            color: "white", // Change the color of the selected value
            // backgroundColor: Colors.PRIMARYBLUE, // You can also set a background color if needed
        }),
        multiValueRemove: (provided: any) => ({
            ...provided,
            color: "white",
            '&:hover': {
                backgroundColor: Colors.PRIMARYBLUE,
                color: 'white',
            },
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: 'transparent', // Background color on hover
            color: "white", // Text color on hover
            padding: 10,
            '&:hover': {
                backgroundColor: Colors.PRIMARYSLATE, // Change to desired color on hover
                color: 'white', // Change text color on hover
            }
        }),
        clearIndicator: (provided: any) => ({
            ...provided,
            display: 'none', // Hide the clear indicator (the 'x' icon to remove all selected items)
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
        if (setLastSelectedValue) {
            setLastSelectedValue(selectedOptions);
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
                isMulti
            />

        </div>
    );
};

export default MultiSelectDocumentDropdown;
