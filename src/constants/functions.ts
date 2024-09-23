import { SignInDto } from "@/dto/SignIn.dto";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

export const handleChangeSignIn = (
  e: React.ChangeEvent<HTMLInputElement>,
  formValues: SignInDto,
  setFormValues: Dispatch<SetStateAction<SignInDto>>,
  errors: SignInDto,
  setErrors: Dispatch<SetStateAction<SignInDto>>
) => {
  const { name, value } = e.target;

  if (name === "userName") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(value);
    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (!isValidEmail) {
      setErrors({
        ...errors,
        [name]: "Invalid email address",
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  } else {
    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (value.trim() !== "") {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  }
};

export const validateSignInForm = (formValues: SignInDto) => {
  return {
    userName: validateEmail(formValues.userName),
    password:
      formValues.password.trim() === "" ? "Password cannot be empty" : "",
  };
};

export const validateEmail = (value: string) => {
  if (value.trim() === "") {
    return "Email cannot be empty";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value) ? "Invalid email address" : "";
  }
};

export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export async function handleFetch<T>(
  fetchFunction: (
    trackingId: string
  ) => Promise<{ data: { data: T } | null; error: any[] | null }>,
  trackingId: string,
  detailName: string
): Promise<T | null> {
  const result = await fetchFunction(trackingId);
  if (result.error && result.error.length > 0) {
    result.error.forEach((err: any) => {
      toast.error(`${detailName} Error ${err.code}: ${err.description}`);
    });
    return null;
  } else {
    if (!result.data?.data) return null;
    return result.data.data;
  }
}

export function capitalizeWords(str: string | null | undefined): string {
  // Check if the input is null or undefined and return an empty string or a default value
  if (str == null) {
    return "";
  }

  // Capitalize the first letter of each word in the string
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

export const capitalizeFirstLetter = (
  str: string | null | undefined
): string => {
  if (str == null) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};
