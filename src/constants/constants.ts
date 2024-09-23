export enum Pages {
  SIGNIN = "/signin",
  INBOX = "/inbox",
  REFERED = "/refered",
  APPLICATIONREVIEW = "/applicationReview",
  VERIFIERAPPLICATIONREVIEW = "/verifierApplicationReview",
  DECISIONMAKERAPPLICATIONREVIEW = "/decisionMakerApplicationReview",
  WORKFLOW = "/workflow",
  USERS = "/users",
  LIBRARIES = "/libraries",
  FORBIDDEN = "/forbidden",
  BUISNESSRULES = "/buisnessRules",
  DOCUMENTS = "/documents",
}
export const Colors = {
  PRIMARYBLUE: "#003366",
  PRIMARYGREEN: "#016433",
  PRIMARYRED: "#FF0000",
  PRIMARYSLATE: "#718096",
};

export enum ApplicationStatus {
  INPROGRESS = "in progress",
  REJECTED = "rejected",
  APPROVED = "submitted",
  REFERRED = "reference_queue",
  DEFERRED = "defered",
  SUPPORTED = "supported",
  NOTSUPPORTED = "not supported",
  READYFORDECISION = "ready for decision",
  APPROVEDAPPLICATION = "approved",
  REJECTEDAPPLICATION = "rejected",
  REFFEREDAPPLICATION = "referred",
  ADDITIONALDOCUMENTS = "additional documents",
}

export enum WorkflowTypes {
  COUNTRY = "Country",
  VISA = "Visa",
  GENERAL = "General",
}
export enum NavbarTitles {
  INBOX = "Inbox",
  REFERED = "Refered",
  SIGNIN = "Sign In",
  WORKFLOW = "Workflow",
  USERS = "Users",
  LIBRARIES = "Libraries",
  BUISNESSRULES = "Business Rules",
  DOCUMENTS = "Documents",
}

export enum ApiRoutes {
  COUNTRY = "api/Feeders/Countries",
  PHONECODE = "api/Feeders/PhoneCodes",
  COUNTRYORIGIN = "api/Feeders/Origin",
  REGISTER = "api/Registration/Request",
  RESENDVERIFICATIONEMAIL = "api/Registration/Request/Resend",
  CODEVERIFICATION = "api/Registration/Verification",
  CHECKCODEVERIFICATION = "api/Registration/Verification/Check",
  LOGIN = "api/Authentication/Login",
  AUTHENTICATOR = "api/Authentication/Register/Authenticator",
  VERIFYAUTHENTICATOR = "api/Authentication/Register/Authenticator/Validate",
  TWOFACTORAUTH = "api/Authentication/Login/TwoFactorAuthenticate",
  FORGOTPASSWORD = "api/Authentication/Password/Forget",
  FORGOTPASSWORDVERIFY = "api/Authentication/Password/Forget/Check",
  FORGOTPASSWORDWITHLINK = "api/Authentication/Password/ChangeWithLink",
  VISATYPES = "api/Feeders/VisaTypes",
  VISASUBTYPES = "api/Feeders/VisaSubTypes",
  APPLICATION = "api/Application",
  PERSONALDETAILS = "api/Application/Personal",
  OCCUPATION = "api/Feeders/Occupation",
  ADDOCCUPATION = "api/Occupation",
  CONTACTDETAILS = "api/Application/Contact",
  FINANCIALDETAILS = "api/Application/FinancialPlan",
  LASTSECTION = "api/Application/LastSection",
  APPLICATIONLIST = "api/Application/All",
  FEES = "api/Fees",
  TRAVELPLAN = "api/Application/TravelPlan",
  APPLICATIONDATA = "api/Application/Data",
  SUBMITAPPLICATION = "api/Application/Submit",
  COATOFARMS = "CoatOfArms",
  FLAGDETAILS = "FlagsDetail",
  PROCESSINGQUEUE = "api/ProcessingQueue/All",
  REFERENCEQUEUE = "api/ReferenceQueue/All",
  DECISIONQUEUE = "api/ProcessingQueue/Decision",
  LOCKAPPLICATIONUSER = "api/ProcessingQueue/Lock",
  LOCKVERIFIERAPPLICATIONUSER = "api/ReferenceQueue/Lock",
  LOCKDECISIONMAKERAPPLICATIONUSER = "api/ProcessingQueue/Decision/Lock",
  PROCEEDAPPLICATION = "api/ProcessingQueue/Proceed",
  PROCEEDVERIFIERAPPLICATION = "api/ReferenceQueue/Proceed",
  DEFFEREDAPPLICATION = "api/ProcessingQueue/Defer",
  REFFEREDTOUSERAPPLICATION = "api/ProcessingQueue/Refer",
  STACKHOLDERCOMMENTS = "api/StakeHolder/Decision/All",
  ADDUSER = "api/User",
  GETUSERS = "api/User/All",
  GETSTACKHOLDERS = "api/StakeHolder/All",
  GETVERIFIEDSTACKHOLDERS = "api/StakeHolder/Verification/All",
  ADDVISATYPE = "api/Visa",
  ROLES = "api/StakeHolder/Roles",
  ADDSTACKHOLDER = "api/StakeHolder",
  ADDCOUNTRY = "api/Country",
  VISADURATION = "api/Feeders/VisaDuration",
  UPDATEVISADURATION = "api/Visa/Duration",
  ADDVISASUBTYPE = "api/Visa/SubType",
  GETDOCUMENTS = "api/Documents",
  BUISENESSRULES = "api/BusinessRulesControler",
  REJECTAPPLICATION = "api/ProcessingQueue/Reject",
  APPROVEAPPLICATION = "api/ProcessingQueue/Decision/Proceed",
  BUISNESSRULEDATA = "api/BusinessRulesControler/Link",
  ADDDOCUMENT = "api/Documents",
  ADDDOCUMENTLINK = "api/Documents/Link",
  DISABLEDOCUMENT = "api/Documents/Disable",
  REFRESHTOKEN = "api/Authentication/Refresh",
  GETALLDOCUMENTS = "api/Documents/Application/All",
  GETDOCUMENTDATA = "api/Documents/Application",
}

export const maritalStatus = [
  { value: "s", label: "Unmarried" },
  { value: "m", label: "Married" },
  { value: "d", label: "Divorced" },
  { value: "w", label: "Widowed" },
];

export const sex = [
  { value: "m", label: "Male" },
  { value: "f", label: "Female" },
  { value: "x", label: "Other" },
];

export const InterviewOptions = [
  { value: "t", label: "Yes" },
  { value: "f", label: "No" },
];
export const sponsorType = [
  { value: "self", label: "Self" },
  { value: "relative", label: "Relatives" },
  { value: "employer", label: "Employer" },
  { value: "other", label: "Other" },
];
export const accomodationType = [
  { value: "hotel", label: "Hotel" },
  { value: "other", label: "Other" },
];

// constants.ts

export enum BackendType {
  BACKEND_1 = "BACKEND_1",
  BACKEND_2 = "BACKEND_2",
}

export type Backend = `${BackendType}`;

export const WorkFlowTypesOptions = [
  {
    label: "Country",
    value: "Country",
  },
  {
    label: "Visa",
    value: "Visa",
  },
  {
    label: "General",
    value: "General",
  },
];

export enum InitiatorApplicationStatus {
  ALL = "All Applications",
  INPROGRESS = "In Progress Applications",
  AWAITINGREVIEW = "Awaiting Review Applications",
  DEFFERED = "Deferred Applications",
  REFFEREDTOUSERAPPLICATION = "Referred To User Applications",
  APPROVEDAPPLICATION = "Approved Applications",
  REJECTEDAPPLICATION = "Rejected Applications",
}

export enum DecisionMakerApplicationStatus {
  ALL = "All Applications",
  REJECTED = "Rejected Applications",
  APPROVED = "Approved Applications",
  READYFORDECISION = "Ready For Decision Applications",
}

export enum ApplicationResponseStatus {
  DEFFERED = "defered",
  REFERRED = "referred",
  INPROGRESS = "in progress",
  READYFORDECISION = "ready for decision",
}
export enum UserList {
  USER = "User List",
  STACKHOLDER = "Stakeholder List",
}
export enum DecisionMakerTabs {
  VIEWAPPLICATIONS = "View Application",
  VIEWDOCUMENTS = "View Documents",
}
export const statusOptions = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Disabled",
    value: "disabled",
  },
  {
    label: "Barred",
    value: "barred",
  },
];

export enum Libraries {
  VISA = "Visa",
  COUNTRY = "Country",
  DURATION = "Duration",
  OCCUPATION = "Occupation",
}

export enum BuisnessRulesTabs {
  VIEWLIST = "View List",
  ADDRULE = "Add Rule",
}

export function formatString(input: string): string {
  if (!input) return "";

  // Trim whitespace and split the string by spaces
  const words = input.trim().split(/\s+/);

  // If there's only one word, capitalize the whole word
  if (words.length === 1) {
    return words[0].toUpperCase();
  }

  // If there are multiple words, capitalize the first letter of each word (Title Case)
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export const isFinalizedStatus = (status: ApplicationStatus): boolean =>
  [
    ApplicationStatus.REFERRED,
    ApplicationStatus.APPROVEDAPPLICATION,
    ApplicationStatus.REJECTEDAPPLICATION,
    ApplicationStatus.ADDITIONALDOCUMENTS,
  ].includes(status);

export const isFinalizedVerifierStatus = (status: ApplicationStatus): boolean =>
  [
    ApplicationStatus.REFERRED,
    ApplicationStatus.DEFERRED,
    ApplicationStatus.NOTSUPPORTED,
    ApplicationStatus.SUPPORTED,
  ].includes(status);

export const isFinalizedDecisionStatus = (status: ApplicationStatus): boolean =>
  [
    ApplicationStatus.NOTSUPPORTED,
    ApplicationStatus.SUPPORTED,
    ApplicationStatus.APPROVEDAPPLICATION,
    ApplicationStatus.REJECTEDAPPLICATION,
    ApplicationStatus.ADDITIONALDOCUMENTS,
  ].includes(status);

export const getStatusColor = (status: ApplicationStatus): string => {
  switch (status) {
    case ApplicationStatus.REFERRED:
    case ApplicationStatus.SUPPORTED:
    case ApplicationStatus.READYFORDECISION:
    case ApplicationStatus.APPROVEDAPPLICATION:
    case ApplicationStatus.REFFEREDAPPLICATION:
      return "bg-logoColorGreen";
    case ApplicationStatus.INPROGRESS:
    case ApplicationStatus.REJECTEDAPPLICATION:
    case ApplicationStatus.ADDITIONALDOCUMENTS:
      return "bg-red-600";
    case ApplicationStatus.NOTSUPPORTED:
      return "bg-black";
    case ApplicationStatus.DEFERRED:
      return "bg-yellow-800";
    default:
      return "";
  }
};

export const getStatusText = (status: ApplicationStatus): string => {
  switch (status) {
    case ApplicationStatus.REFERRED:
      return "In Process";
    case ApplicationStatus.INPROGRESS:
      return "Awaiting Review";
    case ApplicationStatus.SUPPORTED:
      return "Verified";
    case ApplicationStatus.NOTSUPPORTED:
      return "Not Verified";
    case ApplicationStatus.ADDITIONALDOCUMENTS:
      return "Referred To User";
    default:
      return status; // Fallback to raw status value if no match
  }
};
