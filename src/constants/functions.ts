import { SignInDto } from "@/dto/SignIn.dto";
import { Dispatch, SetStateAction } from "react";

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

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
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
