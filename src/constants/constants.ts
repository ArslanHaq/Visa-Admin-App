export enum Pages {
  SIGNIN = "/signin",
  INBOX = "/inbox",
  REFERED = "/refered",
  APPLICATIONREVIEW = "/applicationReview",
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
}

export enum NavbarTitles {
  INBOX = "Inbox",
  REFERED = "Refered",
  SIGNIN = "Sign In",
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
