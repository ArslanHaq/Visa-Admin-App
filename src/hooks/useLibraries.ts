import { Libraries } from "@/constants/constants";
import { visaTypeDto } from "@/dto/ApplicationData.dto";
import { getVisaTypes } from "@/server/feeder";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const useLibraries = () => {
  const [activeTab, setActiveTab] = useState<Libraries>(() => {
    if (typeof window !== "undefined") {
      // Check if there is a saved tab in localStorage
      const savedTab = localStorage.getItem("activeTab") as Libraries | null;
      return savedTab ?? Libraries.VISA; // Default to VISA if no savedTab
    }
    return Libraries.VISA; // Fallback in case it's server-side rendering
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [loader, setLoader] = useState(true);
  const [visaTypes, setVisaTypes] = useState<visaTypeDto[]>([]);

  async function getVisaTypesList() {
    const response = await getVisaTypes();
    if (response.error && response.error.length > 0) {
      response.error.forEach((error: any) => {
        toast.error(`Error ${error.code}: ${error.description}`);
      });
    } else {
      if (!response.data) return;
      setLoader(false);
      setVisaTypes(response.data);
    }
  }
  useEffect(() => {
    if (activeTab === Libraries.VISA) {
      getVisaTypesList();
    } else {
      setLoader(false);
    }
  }, [activeTab, searchQuery]);
  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    loader,
    visaTypes,
  };
};
