import { BuisnessRulesTabs, Colors } from "@/constants/constants";
import {
  addBuisnessRules,
  getCountryData,
  getVisaTypes,
} from "@/server/feeder";
import { getVerifiedStackHolders, getDocuments } from "@/server/users";
import { useState, ChangeEvent, useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
  setActiveTab: React.Dispatch<React.SetStateAction<any>>;
}

export const useBuisnessRule = ({ setActiveTab }: Props) => {
  const visaTypeStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderWidth: 1,
      fontSize: "14px",
      paddingTop: "5px",
      paddingBottom: "5px",
      borderColor: state.isFocused ? Colors.PRIMARYGREEN : Colors.PRIMARYBLUE,
      boxShadow: "none",
      "&:hover": {
        borderColor: state.isFocused ? Colors.PRIMARYGREEN : Colors.PRIMARYBLUE,
      },
    }),
    input: (provided: any) => ({
      ...provided,
      color: Colors.PRIMARYBLUE,
      backgroundColor: "transparent",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: Colors.PRIMARYBLUE,
      backgroundColor: "transparent",
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused ? Colors.PRIMARYGREEN : Colors.PRIMARYBLUE,
      "&:hover": {
        color: state.isFocused ? Colors.PRIMARYGREEN : Colors.PRIMARYBLUE,
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: Colors.PRIMARYSLATE,
    }),
  };
  const [loading, setLoading] = useState(true);
  const [countriesOptions, setCountriesOptions] = useState<any[]>([]);
  const [countriesDropdownOptions, setCountriesDropdownOptions] = useState<
    any[]
  >([]);
  const [otherRequirements, setOtherRequirements] = useState("");
  const handleOtherRequirementsChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setOtherRequirements(e.target.value);
  };
  const [selectedCountryValue, setSelectedCountryValue] = useState<any>({
    value: "",
    label: "",
  });
  const handleValueSelect = (value: any) => {
    setSelectedCountryValue(value);
  };
  const [visaTypesOptions, setVisaTypesOptions] = useState<any[]>([]);
  const [visaTypesDropdownOptions, setVisaTypesDropdownOptions] = useState<
    any[]
  >([]);

  const [selectedVisaTypeValue, setSelectedVisaTypeValue] = useState<any>({
    value: "",
    label: "",
  });
  const handleVisaTypeSelect = (value: any) => {
    setSelectedVisaTypeValue(value);
  };

  const [stakeHoldersOptions, setStakeHoldersOptions] = useState<any[]>([]);
  const [stakeHolderDropdownOptions, setStakeHolderDropdownOptions] = useState<
    any[]
  >([]);

  const [documentsOptions, setDocumentsOptions] = useState<any[]>([]);
  const [documentDropdownOptions, setDocumentDropdownOptions] = useState<any[]>(
    []
  );

  const [selectedGender, setSelectedGender] = useState<any>({
    value: "",
    label: "",
  });
  const handleGenderSelect = (value: any) => {
    setSelectedGender(value);
  };

  const [selectedInterview, setSelectedInterview] = useState<any>({
    value: "f",
    label: "No",
  });
  const handleInterviewSelect = (value: any) => {
    setSelectedInterview(value);
  };
  const [formValues, setFormValues] = useState({
    name: "",
    country: "",
    visaType: "",
    minAge: "",
    maxAge: "",
    gender: "",
    stakeHolders: [],
    documents: [],
  });
  const [status, setStatus] = useState("all");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newStakeHolders = stakeHoldersOptions.filter(
      (stakeholder) =>
        stakeholder.label.toLowerCase() !== "decision maker" &&
        stakeholder.label.toLowerCase() !== "initiater"
    );
    const response = await addBuisnessRules({
      name: formValues.name,
      minAge: formValues.minAge ? parseInt(formValues.minAge) : null,
      maxAge: formValues.maxAge ? parseInt(formValues.maxAge) : null,
      countries: countriesOptions.map((country) => country.value),
      visaTypes: visaTypesOptions.map((visaType) => visaType.value),
      interviewRequired: selectedInterview.value,
      documents: documentsOptions.map((document) => document.value),
      stakeHolders: newStakeHolders.map((stakeholder) => stakeholder.value),
      sex: selectedGender.value,
      otherRequirements: otherRequirements,
    });
    if (response.error && response.error.length > 0) {
      response.error.forEach((error: any) => {
        toast.error(`Error ${error.code}: ${error.description}`);
      });
    } else {
      toast.success("Buisness Rule Added Successfully");
      setFormValues({
        name: "",
        country: "",
        visaType: "",
        minAge: "",
        maxAge: "",
        documents: [],
        gender: "",
        stakeHolders: [],
      });
      setSelectedCountryValue(null);
      setSelectedVisaTypeValue(null);
      setSelectedGender(null);
      setSelectedInterview(null);
      setDocumentsOptions([]);
      setStakeHoldersOptions([]);
      setDocumentDropdownOptions([]);
      setStakeHolderDropdownOptions([]);
      setActiveTab(BuisnessRulesTabs.VIEWLIST);
    }
  };

  async function getCountryDataList() {
    const response = await getCountryData("t");
    if (response.error && response.error.length > 0) {
      response.error.forEach((error: any) => {
        toast.error(`Error ${error.code}: ${error.description}`);
      });
    } else {
      if (!response.data) return;
      setCountriesDropdownOptions(
        response.data.map((country) => {
          return {
            value: country.alpha3,
            label: country.countryName,
          };
        })
      );
    }
  }
  async function getVisaTypesList() {
    const response = await getVisaTypes();
    if (response.error && response.error.length > 0) {
      response.error.forEach((error: any) => {
        toast.error(`Error ${error.code}: ${error.description}`);
      });
    } else {
      if (!response.data) return;
      setVisaTypesDropdownOptions(
        response.data.map((visaType) => {
          return {
            value: visaType.visaType,
            label: visaType.description,
          };
        })
      );
    }
  }

  async function getStackHolderRolesData() {
    let response = await getVerifiedStackHolders(1, 30, status, "");
    if (response.error && response.error.length > 0) {
      response.error.forEach((error: any) => {
        toast.error(`Error ${error.code}: ${error.description}`);
      });
    } else {
      if (!response.data) return;
      setStakeHoldersOptions(
        response.data.dataList.map((stakeHolder) => {
          return {
            value: stakeHolder.stakeHolderId,
            label: stakeHolder.description,
          };
        })
      );
    }
  }

  async function getDocumentsData() {
    let response = await getDocuments();
    if (response.error && response.error.length > 0) {
      response.error.forEach((error: any) => {
        toast.error(`Error ${error.code}: ${error.description}`);
      });
    } else {
      if (!response.data) return;
      setDocumentsOptions(
        response.data.map((document) => {
          return {
            value: document.documentId,
            label: document.documentName,
          };
        })
      );
    }
  }

  function removeStakeholder(value: string) {
    const stakeholderToRemove = stakeHoldersOptions.find(
      (stakeholder) => stakeholder.value === value
    );
    const updatedStakeholders = stakeHoldersOptions.filter(
      (stakeholder) => stakeholder.value !== value
    );
    setStakeHolderDropdownOptions((prevOptions) => [
      ...prevOptions,
      stakeholderToRemove,
    ]);
    setStakeHoldersOptions(updatedStakeholders);
  }
  function addStakeholder(selectedOption: any) {
    const stakeholderToAdd = stakeHolderDropdownOptions.find(
      (stakeholder) => stakeholder.value === selectedOption.value
    );
    const updatedDropdownOptions = stakeHolderDropdownOptions.filter(
      (stakeholder) => stakeholder.value !== selectedOption.value
    );
    setStakeHoldersOptions((prevOptions) => [...prevOptions, stakeholderToAdd]);
    setStakeHolderDropdownOptions(updatedDropdownOptions);
  }
  function addVisaType(selectedOption: any) {
    const visaTypeToAdd = visaTypesDropdownOptions.find(
      (visaType) => visaType.value === selectedOption.value
    );
    const updatedDropdownOptions = visaTypesDropdownOptions.filter(
      (visaType) => visaType.value !== selectedOption.value
    );
    setVisaTypesOptions((prevOptions) => [...prevOptions, visaTypeToAdd]);
    setVisaTypesDropdownOptions(updatedDropdownOptions);
  }
  function addCountries(selectedOption: any) {
    const countryToAdd = countriesDropdownOptions.find(
      (country) => country.value === selectedOption.value
    );
    const updatedDropdownOptions = countriesDropdownOptions.filter(
      (country) => country.value !== selectedOption.value
    );
    setCountriesOptions((prevOptions) => [...prevOptions, countryToAdd]);
    setCountriesDropdownOptions(updatedDropdownOptions);
  }
  function removeVisaType(value: string) {
    const visaTypeToRemove = visaTypesOptions.find(
      (visaType) => visaType.value === value
    );
    const updatedVisaTypes = visaTypesOptions.filter(
      (visaType) => visaType.value !== value
    );
    setVisaTypesDropdownOptions((prevOptions) => [
      ...prevOptions,
      visaTypeToRemove,
    ]);
    setVisaTypesOptions(updatedVisaTypes);
  }
  function removeCountry(value: string) {
    const countryToRemove = countriesOptions.find(
      (country) => country.value === value
    );
    const updatedCountries = countriesOptions.filter(
      (country) => country.value !== value
    );
    setCountriesDropdownOptions((prevOptions) => [
      ...prevOptions,
      countryToRemove,
    ]);
    setCountriesOptions(updatedCountries);
  }

  function removeDocument(value: string) {
    const documentToRemove = documentsOptions.find(
      (document) => document.value === value
    );
    const updatedDocuments = documentsOptions.filter(
      (document) => document.value !== value
    );
    setDocumentDropdownOptions((prevOptions) => [
      ...prevOptions,
      documentToRemove,
    ]);
    setDocumentsOptions(updatedDocuments);
  }
  function addDocument(selectedOption: any) {
    const documentToAdd = documentDropdownOptions.find(
      (document) => document.value === selectedOption.value
    );
    const updatedDropdownOptions = documentDropdownOptions.filter(
      (document) => document.value !== selectedOption.value
    );

    setDocumentsOptions((prevOptions) => [...prevOptions, documentToAdd]);
    setDocumentDropdownOptions(updatedDropdownOptions);
  }

  useEffect(() => {
    Promise.all([
      getCountryDataList(),
      getVisaTypesList(),
      getStackHolderRolesData(),
      getDocumentsData(),
    ])
      .then(() => {
        // All API calls are completed
        setLoading(false);
      })
      .catch((error) => {
        // Handle errors if any API call fails
        toast.error(`Error: ${error.message}`);
        setLoading(false); // Even on error, we stop loading
      });
  }, []);
  return {
    visaTypeStyles,
    loading,
    countriesOptions,
    countriesDropdownOptions,
    otherRequirements,
    handleOtherRequirementsChange,
    selectedCountryValue,
    handleValueSelect,
    visaTypesOptions,
    visaTypesDropdownOptions,
    selectedVisaTypeValue,
    handleVisaTypeSelect,
    stakeHoldersOptions,
    stakeHolderDropdownOptions,
    documentsOptions,
    documentDropdownOptions,
    selectedGender,
    handleGenderSelect,
    selectedInterview,
    handleInterviewSelect,
    formValues,
    setFormValues,
    handleFormSubmit,
    removeStakeholder,
    addStakeholder,
    addVisaType,
    addCountries,
    removeVisaType,
    removeCountry,
    removeDocument,
    addDocument,
  };
};
