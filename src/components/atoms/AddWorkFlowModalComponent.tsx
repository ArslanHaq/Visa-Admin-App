import { Colors, Pages, WorkflowTypes, WorkFlowTypesOptions } from "@/constants/constants";
import { useState, ChangeEvent, use, useEffect } from "react";
import InputComponent from '../atoms/InputComponent';
import Select from 'react-select';
import { get } from "http";
import { CountriesDataDto } from "../organisms/Signup.dto";
import { getCountryData, getVisaTypes } from "@/server/feeder";
import { toast } from "react-toastify";
import { visaTypeDto } from "@/dto/ApplicationData.dto";
import { useRouter } from "next/navigation";
interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AddWorkFlowModalComponent({ setShowModal }: Props) {
    const router = useRouter();
    const [workFlowFormValues, setWorkFlowFormValues] = useState({
        name: '',
        type: '',
        value: '',

    })
    const [countryList, setCountryList] = useState([]);
    const [visaList, setVisaList] = useState([]);

    const [selectedWorkflowType, setSelectedWorkflowType] = useState<any>(null as any);
    const [selectedWorkflowValue, setSelectedWorkflowValue] = useState<any>(null as any);
    const [Options, setOptions] = useState<any>(null as any);

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

    const visaListOptions = visaList.map((visa: visaTypeDto) => {
        return {
            value: visa.visaType,
            label: visa.description,
        };
    });

    const countryListOptions = countryList.map((country: any) => {
        return {
            value: country.alpha3,
            label: country.countryName,
        };
    });
    const handleWorkflowTypeSelect = (selectedOption: any) => {
        setWorkFlowFormValues({
            ...workFlowFormValues,
            type: selectedOption.value,
        });
        setSelectedWorkflowType(selectedOption);

    };

    const handleValueSelect = (selectedOption: any) => {
        setWorkFlowFormValues({
            ...workFlowFormValues,
            value: selectedOption.value,
        });
        setSelectedWorkflowValue(selectedOption);
    }
    async function handleFormSubmit(event: any) {
        event.preventDefault();
        const query = `?workFlowName=${workFlowFormValues.name}&workFlowType=${workFlowFormValues.type}&workFlowValue=${workFlowFormValues.value}`;
        router.push(`${Pages.REFERED}${query}`);
    }

    async function getCountryList() {
        // API call to get country list
        const response = await getCountryData();
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        }
        else {
            if (!response.data) return;

            setCountryList(response.data as any);
        }

    }
    async function getVisaList() {
        // API call to get country list
        const response = await getVisaTypes();
        if (response.error && response.error.length > 0) {
            response.error.forEach((error: any) => {
                toast.error(`Error ${error.code}: ${error.description}`);
            });
        }
        else {
            if (!response.data) return;
            setVisaList(response.data as any);
        }

    }

    function resetForm() {
        setWorkFlowFormValues({
            name: '',
            type: '',
            value: '',
        })
        setSelectedWorkflowType(null);
        setSelectedWorkflowValue(null);

    }
    useEffect(() => {
        if (workFlowFormValues.type === WorkflowTypes.COUNTRY) {
            getCountryList()
        }
        else if (workFlowFormValues.type === WorkflowTypes.VISA) {
            getVisaList()
        }
    }, [workFlowFormValues.type]);

    return (
        <div className="flex  flex-col items-center justify-center px-3 py-10">
            <p className=" font-sans text-xl text-slate-200 w-60 text-center">
                Create a new workflow
            </p>

            <p className="mt-6 font-sans text-base text-slate-200 w-full  text-start">
                Workflow Name
            </p>
            <InputComponent
                label={''}
                maxLength={32}
                minLength={3}
                type={'text'}
                placeholder={''}
                name={'visaSubType'}
                value={workFlowFormValues.name}
                className="w-96 text-white"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setWorkFlowFormValues({
                        ...workFlowFormValues,
                        name: e.target.value
                    });
                }}
                error={''}
                required

            />
            <div className="w-full mt-3">
                <label className="font-sans text-base text-slate-200">
                    Workflow Type
                </label>
                <Select
                    options={WorkFlowTypesOptions}
                    styles={visaTypeStyles}
                    onChange={handleWorkflowTypeSelect}
                    value={selectedWorkflowType}
                    required
                />
            </div>
            {
                (workFlowFormValues.type === WorkflowTypes.COUNTRY || workFlowFormValues.type === WorkflowTypes.VISA) && (

                    <div className="w-full mt-3">
                        <label className="font-sans text-base text-slate-200">
                            Workflow Values
                        </label>
                        <Select
                            options={workFlowFormValues.type === WorkflowTypes.COUNTRY ? countryListOptions : visaListOptions}
                            styles={visaTypeStyles}
                            onChange={handleValueSelect}
                            value={selectedWorkflowValue}
                            required
                        />
                    </div>
                )
            }

            <div className='flex gap-x-5 mt-5'>

                <button
                    onClick={() => {
                        setShowModal(false);
                        resetForm();

                    }}
                    className="mt-4 rounded-xl bg-red-900 px-10 py-2 text-white hover:bg-black"
                >
                    Back
                </button>

                <button
                    onClick={() => {
                        setShowModal(false);
                        handleFormSubmit(event as any);
                    }}
                    className="mt-4 rounded-xl bg-logoColorGreen px-6 py-2 text-white hover:bg-black"
                >
                    Continue
                </button>
            </div>
        </div>
    )
}